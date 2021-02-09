import React, { useState } from "react";
import { Drawer, Button, InputNumber } from "antd";
import InfiniteListExample from "../List/List";
import ButtonConfim from "../Button/Button";

let details = [];
const DrawerComponent = (product) => {
	const [amount, setAmount] = React.useState(1);

	const onChange = (value) => {
		// console.log(title);
		console.log(value);
		setAmount(value);
	};

	const confirm = (idProduct) => {
		details.push({ product_id: idProduct, product_amount: amount });
	};
	console.log("changed", amount);
	console.log(details, "que hay");

	return (
		<>
			<Drawer
				destroyOnClose
				title={product.props.product_title}
				placement="right"
				// closable={false}
				onClose={product.onClose}
				visible={product.visible}
			>
				<p> {product.props.description} </p> <p> Cantidad </p>
				<InputNumber min={0} max={10} defaultValue={1} onChange={onChange} />
				<Button onClick={() => confirm(product.props.product_id)}>
					Add to order
				</Button>
			</Drawer>
			<ButtonConfim details={details} />
		</>
	);
};

export default DrawerComponent;
