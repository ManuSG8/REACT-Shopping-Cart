import React from 'react'

export const FooterCarrito = ({cantidad, total, vaciarCarrito}) => {
  return (
    <>
      <th scope="row" colSpan="2">Total productos</th>
      <td>{cantidad}</td>
      <td>
          <button className="btn btn-danger btn-sm" id="vaciar-carrito" onClick={vaciarCarrito}>
              Vaciar Carrito
          </button>
      </td>
      <td className="font-weight-bold"><span>{total}</span>&euro;</td>
    </>
  )
}
