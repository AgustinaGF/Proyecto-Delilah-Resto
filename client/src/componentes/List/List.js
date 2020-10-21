import React, { useState } from "react";
import DrawerComponent from "../Drawer/Drawer";
import { List, message, Avatar, Spin, Button, Drawer } from "antd";
import style from "../List/List.css";
import reqwest from "reqwest";
// fijarme de poner el scroll este
// import InfiniteScroll from "react-infinite-scroller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// esta variable es la que me permite pasar la info de un solo producto al Drawer
var product = null;

const fakeDataUrl =
	"https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

const plusCircleIcon = (
	<FontAwesomeIcon icon={faPlusCircle} size="3x" color="darksalmon" />
);

function InfiniteListExample(props) {
	console.log(props);
	//Utiliza el hook useState
	const [buttonClicked, setButtonClicked] = useState(false);

	function handleButtonClick(data) {
		setButtonClicked(true);
		product = data;
	}

	function changeButtonClick() {
		setButtonClicked(false);
	}
	return (
		<div className="demo-infinite-container">
			<List>
				{props.value.map((l) => {
					return (
						<List.Item key={l.product_id}>
							<List.Item.Meta
								avatar={
									<Avatar
										className="columImage"
										size={64}
										src={l.product_image}
									/>
								}
								title={<p className="nameProduct"> {l.product_title} </p>}
								description={
									<p className="nameProduct">
										{" "}
										{l.description} <br /> $ {l.product_price}{" "}
									</p>
								}
							/>
							<Button
								type="primary"
								shape="circle"
								onClick={() => handleButtonClick(l)}
							>
								+
							</Button>{" "}
						</List.Item>
					);
				})}{" "}
			</List>{" "}
			{buttonClicked ? (
				<DrawerComponent value={product} visible={true} />
			) : null}{" "}
		</div>
	);
}

export default InfiniteListExample;
