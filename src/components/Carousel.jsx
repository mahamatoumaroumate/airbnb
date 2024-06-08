import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  deleteUserFromDatabase,
  getUserFromDataBase,
  setUserLike,
} from '../utils/userLike'

const Carousel = ({ slides, docId, price, name, country }) => {
  const [curr, setCurr] = useState(0)
  const [active, setActive] = useState(false)
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const { user } = useUser()
  useEffect(() => {
    const initializeUserData = async () => {
      if (user) {
        const { id } = user
        const data = await getUserFromDataBase({ docId, userId: id })
        if (data.length !== 0) {
          setIsLiked(true)
        }
      }
    }
    initializeUserData()
  }, [user])
  const setUserData = async () => {
    const { id } = user
    const data = await getUserFromDataBase({ docId, userId: id })
    if (data.length === 0) {
      setUserLike({ docId, userId: id })
      setIsLiked(true)
    } else {
      const { userDocId } = data[0]
      deleteUserFromDatabase({ docId: userDocId })
      setIsLiked(false)
    }
  }
  const handleUser = async () => {
    if (!user) return navigate('/login')
    else {
      setUserData()
    }
  }
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  return (
    <div
      className='overflow-hidden relative transition-all duration-150'
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        className='flex transition-transform ease-out duration-500'
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img, index) => (
          <Link key={index} to={`${docId}`} className='flex-shrink-0 w-full'>
            <img
              key={index}
              src={img}
              alt=''
              className='h-[16rem] w-full object-cover rounded-md '
            />
          </Link>
        ))}
      </div>
      <div className='flex justify-between '>
        <button
          onClick={prev}
          className={`p-1 rounded-full shadow bg-white/80 text-gray-500 absolute top-[50%] hover:bg-white ${
            active ? '' : 'hidden'
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className={`p-1 rounded-full shadow bg-white/80 text-gray-500 absolute top-[50%] right-0 hover:bg-white ${
            active ? '' : 'hidden'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-2'>
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 bg-white rounded-full ${
                curr === i ? 'p-2' : 'bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
      <div className='icons absolute top-2 right-2 cursor-pointer'>
        {!isLiked ? (
          <FaRegHeart size={20} className='text-red-300' onClick={handleUser} />
        ) : (
          <FaHeart size={20} className='text-red-500' onClick={handleUser} />
        )}
      </div>
    </div>
  )
}

export default Carousel
