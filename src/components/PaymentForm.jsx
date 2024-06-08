import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements() // Declare and assign 'elements'

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    setCheckIn(getCurrentDateTime())
    setCheckOut(getCurrentDateTime())
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Check if both stripe and elements are defined
      setError('Stripe.js has not loaded yet.')
      return
    }

    const { error, token } = await stripe.createToken(
      elements.getElement(CardElement)
    )

    if (error) {
      setError(error.message)
      return
    }

    // Simulate processing payment
    try {
      // Simulate processing payment for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast.success('successfully booked')
      return navigate('/')
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className='card'>
      <form onSubmit={handleSubmit} className='card-body'>
        <h1 className='card-title'>Price</h1>
        <div className='grid lg:grid-cols-2 gap-2'>
          <article className='border border-red-400 p-2 rounded-lg'>
            <label htmlFor='checkin' className='text-lg font-bold text-red-500'>
              Check-In
            </label>
            <br />
            <input
              type='datetime-local'
              id='checkin'
              name='checkin'
              className='w-full'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </article>
          <article className='border border-red-400 p-2 rounded-lg'>
            <label
              htmlFor='checkout'
              className='text-lg font-bold text-red-500'
            >
              Check-Out
            </label>
            <br />
            <input
              type='datetime-local'
              id='checkout'
              name='checkout'
              className='w-full'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </article>
        </div>
        <CardElement className='input input-bordered pt-3 border-red-400' />
        <button type='submit' className='btn btn-error' disabled={!stripe}>
          {stripe ? 'Pay' : 'Please wait...'}
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
