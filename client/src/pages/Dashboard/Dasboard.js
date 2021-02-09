import React from "react";
import coverVideo from "../../assets/video.mp4";
import coverImage from "../../assets/loading.gif";
import Menu from "../Menu/Menu";
import "./Dashboard.css";
import { Typography } from "antd";
import { Button } from "antd";
const { Title } = Typography;
// import React, { Component } from "react";
// import coverImage from "../../media/loading.gif";

const Dashboard = () => {
	const [order, setOrder] = React.useState(false);
	const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
	const onLoadedData = () => {
		setIsVideoLoaded(true);
	};
	const makeOrder = () => {
		setOrder(true);
	};
	if (order == true) {
		return <Menu />;
	}
	return (
		<div className="cover-container">
			<div className={`loading ${isVideoLoaded === true ? "load" : null}`}>
				<img src={coverImage} alt="thumb" />
			</div>
			<video
				className="video"
				src={coverVideo}
				width="100%"
				height="100vh"
				autoPlay
				loop
				muted
				onLoadedData={onLoadedData}
			/>
			<Title> Welcome to Delilah Resto</Title>
			<Button type="primary" onClick={makeOrder}>
				Make your order
			</Button>
		</div>
	);
};
export default Dashboard;
