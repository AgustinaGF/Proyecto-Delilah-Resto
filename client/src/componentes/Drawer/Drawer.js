import React, { useState } from "react";
import { Drawer, Button, InputNumber } from "antd";
import InfiniteListExample from "../List/List";
import ButtonConfim from "../Button/Button";

// este es mi objeto que va a tener toda la info para hacer mi post a order
let order = { method_of_payment: null, details: [] };
// este array va a tener la info preliminar del pedido para que el usuario pueda verlo
let subtotal = [];
const DrawerComponent = (product) => {
	const [amount, setAmount] = React.useState(1);

	const onChange = (value) => {
		// console.log(title);
		console.log(value);
		// fijarme aca que problema tengo con la cantidad
		setAmount(value);
	};

	const confirm = (idProduct, productPrice, productTitle) => {
		// aca le cargo la data, solo falta que cuando confirme pedido se pueda selecionar el metodo de pago
		order.details.push({ product_id: idProduct, product_amount: amount });

		subtotal.push({
			subtotal: productPrice * amount,
			productTitle: productTitle,
		});
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
				<InputNumber
					min={0}
					max={10}
					defaultValue={1}
					onChange={onChange}
				/>{" "}
				<Button
					onClick={() =>
						confirm(
							product.props.product_id,
							product.props.product_price,
							product.props.product_title
						)
					}
				>
					Add to order{" "}
				</Button>{" "}
			</Drawer>{" "}
			<ButtonConfim details={order} subtotal={subtotal} />
		</>
	);
};

export default DrawerComponent;
