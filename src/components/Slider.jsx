import React, { memo } from 'react'
import Carousel from './Carousel'
import { Link } from 'react-router-dom'

const Slider = memo(({ images, id, price, name, country, docId }) => {
  return (
    <div className='w-full bg-base-200 pb-2 rounded-b-lg'>
      <Carousel
        key={id}
        slides={images}
        docId={docId}
        price={price}
        name={name}
        country={country}
      />
      <div className='p-2'>
        <h2 className='font-bold'>${price}</h2>
        <h3>
          {name}, {country}
        </h3>
      </div>
    </div>
  )
})

export default Slider
