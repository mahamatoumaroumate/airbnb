import Slider from './Slider'
const Products = ({ data }) => {
  return (
    <div className='max-w-7xl mx-auto px-8  flex flex-col'>
      <div className='py-6'>
        <div className='images-container grid sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
          {data.map((item, index) => {
            const images = [item.mainImageURL, ...item.subImageURLs]
            return <Slider key={item.id} images={images} {...item} />
          })}
        </div>
      </div>
    </div>
  )
}
export default Products
