import React, { useState } from "react";
import { Button } from "antd";
import PaymentMethod from "../Select/Select";

const ButtonConfim = (props) => {
	const [confirm, setConfirm] = React.useState(false);
	const onConfirm = () => {
		setConfirm(true);
	};
	console.log(props);
	if (confirm == true) {
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
					Confirmar Pedido
				</Button>
			</div>
		);
	}
};

export default ButtonConfim;
