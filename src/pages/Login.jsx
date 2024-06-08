import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Login = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <SignIn />
    </div>
  )
}

export default Login
