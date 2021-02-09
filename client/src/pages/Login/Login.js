import React, { useState } from "react";
import Menu from "../Menu/Menu";
import Register from "../CreateUser/Register";
import { Form, Input, Button } from "antd";
import Dashboard from "../Dashboard/Dasboard";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};
const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

// Funcion que colecta datos y renderiza el form
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [login, setLogin] = React.useState(false);
	const [register, setRegister] = React.useState(false);

	// funcion que cambia el estado de registrar usuario
	const registerUser = () => {
		setRegister(true);
	};
	const onFinish = async (values) => {
		try {
			let pedido = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				body: JSON.stringify(values),
				headers: {
					"Content-Type": "application/json",
				},
			});
			let contenido = await pedido.json();
			if (contenido.success == false) {
				let error = contenido.message;
				error.forEach((element) => {
					alert(element.message);
				});
			} else {
				setLogin(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	if (register == true) {
		return <Register />;
	}
	if (login == true) {
		return <Dashboard />;
		// return <Menu />;
	} else {
		return (
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				method="POST"
				// onSubmitCapture={(e) => this.setState({ login: true })}
			>
				<Form.Item
					label="Username"
					name="username"
					type="username"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input
						placeholder="username o email"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					type="password"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Login
					</Button>
				</Form.Item>
				<Button type="secondary" onClick={registerUser}>
					Create User
				</Button>
			</Form>
		);
	}
};
// }
export default Login;
