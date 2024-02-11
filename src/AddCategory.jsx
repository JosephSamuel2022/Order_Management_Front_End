import React, { useState } from "react";
import axios from "axios";
import "./AddCategory.css"; // Import the CSS file for styling

const AddCategory = () => {
	const [categoryName, setCategoryName] = useState("");

	const handleChange = (e) => {
		setCategoryName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:8080/category/addCategory",
				{
					category_name: categoryName,
				}
			);

			console.log(response.data); // Handle response as needed

			// Reset the category name field after successful submission
			setCategoryName("");
		} catch (error) {
			console.error("Error adding category:", error);
		}
	};

	return (
		<div className='add-category-container'>
			<h2 className='add-category-heading'>Add Category</h2>
			<form onSubmit={handleSubmit} className='add-category-form'>
				<div className='form-group'>
					<label htmlFor='categoryName' className='form-label'>
						Category Name:
					</label>
					<input
						type='text'
						id='categoryName'
						name='categoryName'
						value={categoryName}
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

export default AddCategory;
