import React from 'react'

export const ListaProductos = ({title, price, src, id, addToCart}) => {
  return (
    <div className="col-12 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex justify-content-center">
      <div className="card">
          <img src={src} className="card-img-top" alt="item-producto" />
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{price}</p>
              <button className="btn btn-dark" id={id} onClick={addToCart}>Comprar</button>
          </div>
      </div>
    </div>
  )
}
