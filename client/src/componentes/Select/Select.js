import React, { useState } from "react";

import { Select } from "antd";

const { Option } = Select;

// modificar esto para que sea un drawer donde veo los datos del pedido y puedo confirmar pedido

const PaymentMethod = (props) => {
	let datos = [props.value];
	const [payment, setPayment] = useState("");

	function handleChange(value) {
		console.log(`selected ${value}`);
		setPayment(value);
	}
	datos.push(payment);
	console.log(datos);
	return (
		<div>
			<h2> Select payment method </h2>{" "}
			<Select
				defaultValue="cash"
				style={{ width: 120 }}
				onChange={handleChange}
			>
				<Option value="cash"> Cash </Option>{" "}
				<Option value="creditCard"> Credit Card </Option>{" "}
			</Select>{" "}
		</div>
	);
};

export default PaymentMethod;
