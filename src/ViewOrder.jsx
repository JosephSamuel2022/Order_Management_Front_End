import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewOrder.css"; // Import your CSS file for styling

const ViewOrder = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get("http://localhost:8080/order/get");
				setOrders(response.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};

		fetchOrders();
	}, []);

	const handleAssign = (orderId) => {
		// Handle assign action for the orderId
		console.log(`Assign order with ID: ${orderId}`);
	};

	return (
		<div className='view-order-container'>
			<h2>View Orders</h2>
			<table>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Product ID</th>
						<th>Quantity</th>
						<th>Staff ID</th>
						<th>Order Date</th>
						<th>Delivery Date</th>
						<th>Status</th>
						<th>Payment Mode</th>
						<th>Assign</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.o_id}>
							<td>{order.o_id}</td>
							<td>
								{order.p_id.map((product) => (
									<div key={product}>{product}</div>
								))}
							</td>
							<td>
								{order.p_qty.map((product) => (
									<div key={product}>{product}</div>
								))}
							</td>
							<td>{order.staff_id}</td>

							<td className='custom-width'>{order.o_date.slice(0, 10)}</td>
							<td>{order.o_delivery.slice(0, 10)}</td>
							<td>{order.status}</td>
							<td>{order.payment_mode}</td>
							<td>
								<div className='action-container'>
									<select className='assign-select'>
										<option value=''>Assign To:</option>
										<option value='staff1'>Staff 1</option>
										<option value='staff2'>Staff 2</option>
										<option value='staff3'>Staff 3</option>
									</select>

									<button
										className='assign-button'
										onClick={() => handleAssign(order.order_id)}>
										Assign
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ViewOrder;
