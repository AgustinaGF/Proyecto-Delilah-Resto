import React, { useState } from "react";
import { Drawer, Button, InputNumber } from "antd";

function onChange(value) {
	console.log("changed", value);
}

const DrawerComponent = (props) => {
	console.log(props, "aca");
	const [visible, setVisible] = useState(true);

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Drawer
				title={props.value.product_title}
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<p> {props.value.description} </p> <p> Cantidad </p>
				<InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
			</Drawer>
		</>
	);
};
export default DrawerComponent;
