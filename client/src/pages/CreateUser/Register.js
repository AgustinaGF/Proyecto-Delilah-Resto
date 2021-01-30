import React from "react";
import Menu from "../Menu/Menu";
import { Form, Input, Button } from "antd";
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

const Register = () => {
	const [registerUser, setRegisterUser] = React.useState(false);
	const onFinishRegister = async (values) => {
		console.log("Success:", values);
		try {
			let pedido = await fetch("http://localhost:3000/api/auth/register", {
				method: "POST",
				body: JSON.stringify(values),
				headers: {
					"Content-Type": "application/json",
				},
			});
			let contenido = await pedido.json();
			console.log(contenido);
			if (contenido.exito == false) {
				let error = contenido.data;
				error.forEach((element) => {
					alert(element.mensaje);
				});
			} else {
				let success = contenido.data;
				success.forEach((element) => {
					alert(element.mensaje);
					setRegisterUser(true);
				});
			}
		} catch (error) {
			// arreglar esto que siempre me tira error
			console.log(error);
		}
	};

	const onFinishFailedRegister = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	if (registerUser == true) {
		return <Menu />;
	} else {
		return (
			<Form
				{...layout}
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinishRegister}
				onFinishFailed={onFinishFailedRegister}
				method="POST"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>{" "}
				<Form.Item
					label="Full Name"
					name="full_name"
					rules={[
						{
							required: true,
							message: "Please input your Full Name!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your Email!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Phone Number"
					name="phone_number"
					rules={[
						{
							required: true,
							message: "Please input your Phone Number!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Address"
					name="address"
					rules={[
						{
							required: true,
							message: "Please input your Address!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Register
					</Button>
				</Form.Item>
			</Form>
		);
	}
};

export default Register;
