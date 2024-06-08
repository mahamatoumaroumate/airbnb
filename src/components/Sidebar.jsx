import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { handleSidebar } from '../helper/productSlice'
import { UserButton, UserProfile } from '@clerk/clerk-react'

const Sidebar = () => {
  const dispatch = useDispatch()
  return (
    <div
      className='fixed top-0 left-0 w-screen h-screen flex items-center z-10 justify-center'
      style={{ background: 'rgba(0,0,0,0.75)' }}
    >
      <div className='w-[80vw] max-w-4xl mx-auto bg-white relative p-4 rounded-md'>
        <button
          onClick={() => dispatch(handleSidebar())}
          className='absolute right-2 top-2 font-extrabold text-3xl text-red-500'
        >
          <FaTimes />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
