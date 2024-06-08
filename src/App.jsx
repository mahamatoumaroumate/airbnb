import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY)
import { Home, Error, SingleProduct, Login } from './pages'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/:id',
    element: <SingleProduct />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
])

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <RouterProvider router={router}></RouterProvider>
    </Elements>
  )
}
export default App
