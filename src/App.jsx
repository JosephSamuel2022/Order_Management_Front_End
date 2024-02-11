import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import AddCategory from "./AddCategory";
import ViewOrder from "./ViewOrder";
function App() {
	return (
		<Routes>
			<Route path='/add-product' element={<AddProduct />}></Route>
			<Route path='/' element={<ViewProduct />}></Route>
			<Route path='/add-category' element={<AddCategory />}></Route>
			<Route path='/view-order' element={<ViewOrder />}></Route>
		</Routes>
	);
}

export default App;
