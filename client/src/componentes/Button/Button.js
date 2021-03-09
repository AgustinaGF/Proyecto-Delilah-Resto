import React, { useState } from "react";
import { Button } from "antd";
import PaymentMethod from "../Select/Select";

const ButtonConfim = (props) => {
	let price = [];
	let arrayProductName = [];
	let productName = "";
	let total = null;
	let subtotal = props.subtotal;
	const [confirm, setConfirm] = React.useState(false);
	const onConfirm = () => {
		setConfirm(true);
	};

	console.log(props);
	console.log(props.details);

	subtotal.forEach((element) => {
		price.push(element.subtotal);
		arrayProductName.push(element.productTitle);
	});
	for (let index = 0; index < arrayProductName.length; index++) {
		productName += arrayProductName[index];
	}
	for (let index = 0; index < price.length; index++) {
		total += price[index];
	}

	if (confirm == true) {
		// aca que me devuelva un drawer con los datos de mi pedido
		return <PaymentMethod value={props} />;
	} else {
		return (
			<div>
				<Button
					type="primary"
					className="button"
					block
					onClick={() => onConfirm(props)}
				>
					{/* me falta	que los datos de product name que se vean en el drawer */}
					Ver mi pedido {productName} ${total}
				</Button>
			</div>
		);
	}
};

export default ButtonConfim;
