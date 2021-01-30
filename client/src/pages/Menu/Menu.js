import React from "react";
import { PageHeader, Card, Carousel, Row, Col } from "antd";
import loading from "./../../Imagenes/loading.gif";
import style from "../Menu/Menu.css";
import InfiniteListExample from "../../componentes/List/List";

const { Meta } = Card;

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			isLoading: true,
		};
	}
	componentDidMount() {
		fetch("http://localhost:3000/api/products")
			.then((response) => response.json())
			.then((resultado) =>
				this.setState({ products: resultado, isLoading: false })
			);
	}

	render() {
		console.log(this.state.products, "hola");
		if (this.state.isLoading) {
			return <img alt="example" src={loading}></img>;
		}
		return (
			<div>
				<PageHeader className="title" title="Delilah Restó" />
				<div>
					<Carousel autoplay>
						{" "}
						{this.state.products.map((product) => (
							<Card
								hoverable
								style={{ width: 240 }}
								cover={
									<img
										alt="example"
										src={product.product_image}
										className="image"
									/>
								}
							>
								<div className="contentCard">
									<Meta
										title={product.product_title}
										description={product.product_description}
										className="nameProduct"
									/>
									<p className="textCard"> Añadir </p>{" "}
								</div>{" "}
							</Card>
						))}{" "}
					</Carousel>{" "}
				</div>{" "}
				<PageHeader className="nameProduct" title="Nuestros Platos" />
				<InfiniteListExample value={this.state.products} />{" "}
			</div>
		);
	}
}
export default Menu;
