import React from 'react'
import { useAppContext } from '../../Context'
import Carousel from './componentes/Carousel/Carousel'

function Shop() {
  const { categories, productsByImages, promotions, banners, ajustes } = useAppContext()

  return (
    <>
      <div className="container__wrapper">
        <h2 className="title">Bienvenidos a Eco-wMacetas</h2>
        <div className="main-container">
          <Carousel/>
        </div>
      </div>
    </>
  )
}

export default Shop