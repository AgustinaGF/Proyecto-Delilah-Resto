import React from "react";
import { PageHeader, Card, Carousel, Row, Col } from "antd";
import pizza from "./Imagenes/pizza.jpg";
import hamburguesa from "./Imagenes/hamburguesa.png";
import sushi from "./Imagenes/sushi.jpg";
import loading from "./Imagenes/loading.gif";
import style from "../src/Menu.css";
import InfiniteListExample from "../src/componentes/List/List";

const { Meta } = Card;

// function onload() {
// 	fetch("/api/products", {
// 		credentials: "include",
// 	})
// 		.then((response) => response.json())
// 		.then((resultado) => {
// 			console.log(resultado, "hola");
// 			// nombreUsuario(resultado);
// 			// let productoUsuario = resultado.data.misProductos;
// 		});
// }

// const data = [
// 	{
// 		product_id: 1,
// 		product_title: "Veggie Burguer",
// 		product_price: 400,
// 		product_image: "/static/media/hamburguesa.36521135.png",
// 		description: "Lentil burger with lettuce and tomato",
// 		createdDate: "2020-09-14T20:29:33.000Z",
// 		updateDate: "2020-09-14T20:29:33.000Z",
// 	},
// 	{
// 		product_id: 2,
// 		product_title: "Tuna and Prawns Salad",
// 		product_price: 500,
// 		product_image: "/static/media/sushi.bd98b65c.jpg",
// 		description: "Rice with Tuna and Prawns",
// 		createdDate: "2020-09-14T20:46:26.000Z",
// 		updateDate: "2020-09-14T21:19:00.000Z",
// 	},
// 	{
// 		product_id: 3,
// 		product_title: "Pepperoni pizza",
// 		product_price: 250,
// 		product_image: "/static/media/pizza.47c94dd9.jpg",
// 		description: "Pepperoni classic extra large pizza",
// 		createdDate: "2020-09-14T21:25:11.000Z",
// 		updateDate: "2020-09-14T21:26:48.000Z",
// 	},
// ];
// function Menu() {
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
		// products.push(resultado);
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
									<p className="textCard"> Añadir </p>
								</div>
							</Card>
						))}
					</Carousel>
				</div>
				<PageHeader className="nameProduct" title="Nuestros Platos" />
				{/* <InfiniteListExample value={products} /> */}
			</div>
		);
	}
}
export default Menu;
