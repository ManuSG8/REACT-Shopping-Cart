import React from 'react'

export const CarritoProductos = ({num, item, cantidad, total, id, more, less}) => {
  return (
    <tr>
      <td>{num}</td>
      <td>{item}</td>
      <td>{cantidad}</td>
      <td>
          <button className="btn btn-info btn-sm" id={id} onClick={more}>
              +
          </button>
          <button className="btn btn-danger btn-sm" id={id} onClick={less}>
              -
          </button>
      </td>
      <td>{total}</td>
    </tr>
  )
}
