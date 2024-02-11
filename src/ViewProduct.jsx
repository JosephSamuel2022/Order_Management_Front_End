import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons from react-icons
import axios from "axios";
import "./ViewProduct.css"; // Import the CSS file for styling

const ViewProduct = () => {
	const [orders, setOrders] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:8080/product/get");
				setOrders(response.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};

		fetchData();
	}, []);

	// Function to decode base64 image string
	const decodeBase64Image = (dataString) => {
		if (!dataString) return ""; // Handle empty dataString
		const base64Index = dataString.indexOf(";base64,");
		if (base64Index === -1) return ""; // Invalid base64 format
		return `data:image/jpeg;base64,${dataString.substring(base64Index + 8)}`;
	};

	const handleEditOrder = (order) => {
		// Handle view order action
		navigate("add-product", {
			state: {
				productDetails: order,
			},
		});
	};

	const handleDeleteOrder = async (orderId) => {
		try {
			// Send DELETE request to delete the product with the specified p_id
			await axios.delete(`http://localhost:8080/product/delete/${orderId}`);
			// Update the orders list by refetching the data
			const response = await axios.get("http://localhost:8080/product/get");
			setOrders(response.data);
		} catch (error) {
			console.error(`Error deleting order with ID ${orderId}:`, error);
		}
	};

	return (
		<div className='view-order-container'>
			<h2 className='view-order-heading'>View Order</h2>
			<table className='order-table'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Thumbnail</th>
						<th>Category ID</th>
						<th>Price</th>
						<th>Details</th>
						<th>Quantity</th>
						<th>Actions</th> {/* Added Actions column */}
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.p_id}>
							<td>{order.p_id}</td>
							<td>{order.name}</td>
							<td>
								<img
									src={decodeBase64Image(order.thumbnail)} // Decoding the thumbnail
									alt={order.name}
									className='thumbnail-image'
								/>
							</td>
							<td>{order.category.category_name}</td>
							<td>${order.price}</td>
							<td>{order.details}</td>
							<td>{order.qty}</td>
							<td className='action-icons'>
								<FaEdit
									className='edit-icon'
									onClick={() => handleEditOrder(order)}
								/>
								<FaTrash
									className='delete-icon'
									onClick={() => handleDeleteOrder(order.p_id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ViewProduct;
