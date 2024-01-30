import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ProductPage from './pages/ProductPage'
import Products from './pages/Products'
import Cart from './pages/Cart'

import Success from './pages/Success'

import {
  HashRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,

} from "react-router-dom";
import { useSelector } from 'react-redux'

import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Order from './pages/Order'



function App() {

  const user = useSelector(state => state.user.currentUser);

  return (

    <Router>

      <Routes>
        <Route index element={<Home />} />

        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />

        <Route path='/products' element={<Products />} />
        <Route path='/products/:param' element={<Products />} />
        <Route path='/product' element={<ProductPage />} />


        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/order/:orderId' element={<Order />} />

      </Routes>

    </Router>


  )
}

export default App;
