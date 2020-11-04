import React, { useState } from "react";
import DrawerComponent from "../Drawer/Drawer";
import { List, message, Avatar, Spin, Button, InputNumber } from "antd";
import style from "../List/List.css";
import reqwest from "reqwest";
// fijarme de poner el scroll este
// import InfiniteScroll from "react-infinite-scroller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const fakeDataUrl =
	"https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

const plusCircleIcon = (
	<FontAwesomeIcon icon={faPlusCircle} size="3x" color="darksalmon" />
);

function InfiniteListExample(props) {
	const [selectedPlayer, setSelectedPlayer] = useState("");

	const [visible, setVisible] = useState(false);

	const onSelect = (name) => {
		setSelectedPlayer(name);
		setVisible(true);
	};

	const ViewProfileButton = ({ name }) => {
		return (
			<Button type="primary" shape="circle" onClick={() => onSelect(name)}>
				+
			</Button>
		);
	};
	const onClose = () => setVisible(false);

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
								// onClick={() => onSelect(l)}
								description={
									<p className="nameProduct">
										{l.description} <br /> $ {l.product_price}
									</p>
								}
							/>
							<ViewProfileButton name={l} />
						</List.Item>
					);
				})}
				<Button type="primary" className="button" block>
					Confirmar Pedido
				</Button>

				<DrawerComponent
					props={selectedPlayer}
					visible={visible}
					onClose={onClose}
				/>
			</List>
		</div>
	);
}

export default InfiniteListExample;
