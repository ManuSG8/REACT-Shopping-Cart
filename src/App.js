import "./App.css"
import { useEffect, useState } from "react"
import { productos } from "./productos"
import { ListaProductos } from "./components/ListaProductos"
import { CarritoProductos } from "./components/CarritoProductos"
import { FooterCarrito } from "./components/FooterCarrito"

function App() {
	const [productosCarrito, setProductosCarrito] = useState([])
	const [count, setCount] = useState(0)

	const addToCart = (e) => {
		e.preventDefault()
		if (!productosCarrito.find((obj) => obj.id === parseInt(e.target.id))) {
			setCount(count + 1)
			setProductosCarrito([
				...productosCarrito,
				{
					id: productos[e.target.id - 1].id,
					item: productos[e.target.id - 1].title,
					cantidad: 1,
					posicion: count,
					total: function () {
						return productos[e.target.id - 1].precio * this.cantidad
					},
				},
			])
		} else {
			setProductosCarrito(productosCarrito.map((item) => (item.id === parseInt(e.target.id) ? { ...item, cantidad: (item.cantidad += 1) } : item)))
		}
	}

	const more = (e) => {
		setProductosCarrito(productosCarrito.map((item) => (item.id === parseInt(e.target.id) ? { ...item, cantidad: (item.cantidad += 1) } : item)))
	}

	const less = (e) => {
		setProductosCarrito(
			productosCarrito
				.map((item) => {
					if (item.id === parseInt(e.target.id)) {
						const newCantidad = item.cantidad - 1
						if (newCantidad === 0) {
							return null
						} else {
							return { ...item, cantidad: newCantidad }
						}
					} else {
						return item
					}
				})
				.filter(Boolean) // Devuelve los elementos que no son nulos
		)
	}

	const calcularCantidad = () => {
		let cantidad = 0
		productosCarrito.forEach((item) => (cantidad += item.cantidad))
		return cantidad
	}

	const calcularTotal = () => {
		let total = 0
		productosCarrito.forEach((item) => {
			if (item.cantidad > 0) total += item.total()
		})
		return total
	}

	const vaciarCarrito = () => {
		setProductosCarrito([])
		setCount(1)
	}

	useEffect(() => {
		console.log(productosCarrito)
	}, [productosCarrito])

	return (
		<div className="container">
			<h1 className="mt-2">Carrito de Compras</h1>
			<div className="row my-5" id="lista-productos">
				{productos.map((producto) => (
					<ListaProductos key={producto.id} title={producto.title} price={producto.precio} src={producto.thumbnailUrl} id={producto.id} addToCart={(e) => addToCart(e)} />
				))}
			</div>
			<div className="my-5">
				<h4>Carrito de la compra</h4>
				<table className="table">
					<thead>
						<tr>
							<td>#</td>
							<td>Item</td>
							<td>Cantidad</td>
							<td>Acción</td>
							<td>Total</td>
						</tr>
					</thead>
					<tbody id="body-carrito">
						{productosCarrito.map((producto, index) => (
							<CarritoProductos key={producto.id} num={index + 1} item={producto.item} cantidad={producto.cantidad} total={producto.total()} id={producto.id} more={(e) => more(e)} less={(e) => less(e)} />
						))}
					</tbody>
					<tfoot>
						<tr id="footer-carrito">
							{productosCarrito.length === 0 ? (
								<th scope="row" colSpan="5">
									Carrito vacío - comience a comprar!
								</th>
							) : (
								<FooterCarrito cantidad={calcularCantidad()} total={calcularTotal()} vaciarCarrito={vaciarCarrito} />
							)}
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	)
}

export default App
