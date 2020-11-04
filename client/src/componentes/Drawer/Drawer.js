import React, { useState } from "react";
import { Drawer, Button, InputNumber } from "antd";

const DrawerComponent = (product) => {
	const [amount, setAmount] = useState(0);
	const onChange = (value) => {
		console.log(value);
		setAmount(value);
		console.log("changed", amount);
	};
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
			</Drawer>
		</>
	);
};

export default DrawerComponent;
