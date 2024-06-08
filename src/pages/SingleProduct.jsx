import React, { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { Link, useParams } from 'react-router-dom'
import { app } from '../firebase'
import PaymentForm from '../components/PaymentForm'

const SingleProduct = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app)
        const docRef = doc(db, 'data', id)
        const docSnapshot = await getDoc(docRef)

        if (!docSnapshot.exists()) {
          setError('No data found')
        } else {
          setData({ userDocId: docSnapshot.id, ...docSnapshot.data() })
        }
      } catch (err) {
        setError(`Error fetching data: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading)
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <p className='loading'></p>
      </div>
    )
  if (error) return <div>Error: {error}</div>

  console.log(data)
  return (
    <div className='max-w-7xl mx-auto p-8 '>
      <Link to={'/'} className='btn btn-error mb-4 '>
        Home
      </Link>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <img
          src={data.mainImageURL}
          alt=''
          className='object-cover h-[24rem] w-full rounded-lg'
        />
        <div className='grid grid-cols-2 md:grid-cols-2 gap-1'>
          {data.subImageURLs.map((img, index) => {
            return (
              <img
                key={img}
                src={img}
                alt=''
                className={
                  index === 0
                    ? 'col-span-2 md:col-span-2 h-[12rem] w-full object-cover rounded-lg '
                    : 'h-[12rem] w-full object-cover md:col-span-1 rounded-lg'
                }
              />
            )
          })}
        </div>
      </div>
      <article className='grid lg:grid-cols-2 pt-8 '>
        <p className='px-8 leading-loose lg:mt-[3rem]'>{data.description}</p>

        <PaymentForm />
      </article>
    </div>
  )
}

export default SingleProduct
