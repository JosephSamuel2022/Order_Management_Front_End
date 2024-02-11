import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css"; // Import the CSS file
import { useEffect } from "react";

const AddProduct = () => {
	const location = useLocation();
	const { productDetails } = location.state || {};

	const [formData, setFormData] = useState(
		productDetails || {
			name: "",
			thumbnail: null,
			category: { category_id: "" },
			price: "",
			details: "",
			qty: "",
		}
	);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		// Fetch categories from the backend when the component mounts
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/category/getCategory"
				);
				setCategories(response.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	const handleChange = async (e) => {
		const { name, type } = e.target;
		let val;

		if (type === "file") {
			const file = e.target.files[0];
			val = await handleImageEncode(file);
		} else {
			val = e.target.value;
		}

		if (name === "categoryId") {
			setFormData({
				...formData,
				category: { category_id: val },
			});
		} else {
			setFormData({
				...formData,
				[name]: val,
			});
		}
	};

	const handleImageEncode = (file) => {
		console.log(file);
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				resolve(reader.result);
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const decodeBase64Image = (dataString) => {
		if (!dataString) return ""; // Handle empty dataString
		const base64Index = dataString.indexOf(";base64,");
		if (base64Index === -1) return ""; // Invalid base64 format
		return `data:image/jpeg;base64,${dataString.substring(base64Index + 8)}`;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Handle form submission, for example, send data to a server or perform validation
		const thumbnailString =
			formData.thumbnail instanceof File
				? await handleImageEncode(formData.thumbnail)
				: formData.thumbnail;

		// Update form data with encoded image
		const formDataWithImage = { ...formData, thumbnail: thumbnailString };

		try {
			// Send form data to backend
			const response = await axios.post(
				"http://localhost:8080/product/addProduct",
				formDataWithImage
			);

			console.log(response.data); // Handle response as needed
		} catch (error) {
			console.error("Error adding product:", error);
		}
	};

	return (
		<div className='add-product-container'>
			<h2 className='form-heading'>Add Product</h2>
			<form onSubmit={handleSubmit} className='form'>
				<div className='form-group'>
					<label htmlFor='name' className='form-label'>
						Name:
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleChange}
						className='form-input'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='thumbnail' className='form-label'>
						Thumbnail URL:
					</label>
					{formData.thumbnail && (
						<img
							src={decodeBase64Image(formData.thumbnail)} // Decoding the thumbnail
							className='thumbnail-image'
						/>
					)}
					<input
						type='file'
						id='thumbnail'
						name='thumbnail'
						onChange={handleChange}
						className='form-input'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='categoryId' className='form-label'>
						Category ID:
					</label>
					<select
						id='categoryId'
						name='categoryId'
						value={formData.category.category_id}
						onChange={handleChange}
						className='form-input'>
						<option value=''>Select Category</option>
						{categories.map((category) => (
							<option key={category.category_id} value={category.category_id}>
								{category.category_name}
							</option>
						))}
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='price' className='form-label'>
						Price:
					</label>
					<input
						type='text'
						id='price'
						name='price'
						value={formData.price}
						onChange={handleChange}
						className='form-input'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='details' className='form-label'>
						Details:
					</label>
					<textarea
						id='details'
						name='details'
						value={formData.details}
						onChange={handleChange}
						className='form-input'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='quantity' className='form-label'>
						Quantity:
					</label>
					<input
						type='text'
						id='quantity'
						name='qty'
						value={formData.qty}
						onChange={handleChange}
						className='form-input'
					/>
				</div>
				<button type='submit' className='submit-button'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddProduct;
