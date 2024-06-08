import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LogoSvg from '../assets/LogoSvg'
import { FaSearch } from 'react-icons/fa'
import { HiMiniUserCircle } from 'react-icons/hi2'
import { handleChange, handleSidebar } from '../helper/productSlice'
import Sidebar from './Sidebar'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = () => {
    if (value.trim() === '') return
    dispatch(handleChange({ name: 'search', value }))
  }
  return (
    <>
      <div className='sm:navbar z-10  pb-4  sm:flex items-center  '>
        <div className='logo-container flex items-center sm:navbar-start'>
          <LogoSvg />
          <h2 className='text-2xl font-bold ' style={{ color: '#ff5a5f' }}>
            Airbnb
          </h2>
        </div>
        <div className='search-container items-center justify-center flex mt-4 sm:navbar-center '>
          <input
            placeholder='search'
            type='text'
            value={value}
            className='input input-bordered input-sm rounded-full w-[90%]  sm:input-md sm:ml-8  lg:w-96 xl:w-[26rem] rounded-r-none'
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className='text-white btn btn-circle rounded-full rounded-l-none btn-sm sm:btn-md text-xl sm:rounded-l-none'
            style={{ background: '#ff5a5f' }}
            onClick={handleSubmit}
          >
            <FaSearch />
          </button>
        </div>

        <div className='user-info sm:navbar-end'>
          <div className='absolute top-5 right-12 sm:relative sm:right-0 sm:top-0'>
            {user ? (
              <UserButton />
            ) : (
              <HiMiniUserCircle
                className='hover:cursor-pointer'
                size={40}
                onClick={() => {
                  return navigate('/login')
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
