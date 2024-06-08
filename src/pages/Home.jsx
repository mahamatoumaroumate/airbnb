import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { app } from '../firebase'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Products from '../components/Products'
import { categories } from '../data'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { handleChange } from '../helper/productSlice'

// Initialize Firestore outside of the component
const db = getFirestore(app)

const fetchItems = async ({ queryKey }) => {
  const [, category, search] = queryKey
  let q
  if (category === 'All') {
    q = query(collection(db, 'data'))
  } else {
    q = query(collection(db, 'data'), where('category', '==', category))
  }

  if (search) {
    q = query(
      q,
      where('country', '>=', search),
      where('country', '<=', search + '\uf8ff')
    )
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    return { docId: doc.id, ...doc.data() }
  })
}

const Home = () => {
  const { search } = useSelector((store) => store.product)
  const dispatch = useDispatch()
  const [category, setCategory] = useState('All')
  const [categoryIndex, setCategoryIndex] = useState(0)

  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['items', category, search],
    queryFn: fetchItems,
    keepPreviousData: true,
  })

  if (isLoading) {
    return (
      <div className='text-center py-24'>
        <p className='loading'>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-24'>
        <p className='error'>Error fetching data</p>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-8 h-screen flex flex-col  relative'>
      <article className='fixed w-[90vw] top-0 pb-4 bg-white max-w-[1200px] mx-auto px-8 z-10'>
        <Navbar />
      </article>

      <div className='fixed z-10 bg-white w-full mt-[8rem] mb-[10rem] sm:mt-20 px-8 flex flex-wrap'>
        {search ? (
          <button
            className='mt-8 btn btn-error '
            onClick={() =>
              dispatch(handleChange({ name: 'search', value: '' }))
            }
          >
            clear filter
          </button>
        ) : (
          categories.map((cat, index) => (
            <div
              key={index}
              className={`flex items-center m-2 p-2 ${
                categoryIndex === index
                  ? 'border-b-2 border-black'
                  : 'hover:cursor-pointer'
              }`}
              onClick={() => {
                setCategoryIndex(index)
                setCategory(cat.name)
              }}
            >
              <div className='mr-2'>{cat.icon}</div>
              <div>{cat.name}</div>
            </div>
          ))
        )}
      </div>

      <div className='mt-[22rem] sm:mt-[12rem] lg:mt-[10rem]'>
        {items.length > 0 ? (
          <Products data={items} />
        ) : (
          <div className='mt-8 px-8'>
            <h1>Sorry,no item matches...</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
