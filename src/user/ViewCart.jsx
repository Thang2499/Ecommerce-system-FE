import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ViewCartChild from '../componentChild/ViewCartChild';
import axiosInstance from '../jwt/refreshAccessToken';
const ViewCart = () => {
  const authStore = useSelector(state => state.auth);
  const [cart, setCart] = useState([]);
  const handleViewCart = async () => {
    try {
      const res = await axiosInstance.get('/users/viewCart',
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${authStore.accessToken}`
        //   },
        // }
      )
        setCart(res.data.itemsInCart)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleViewCart();
  }, [])
  return (
    <>
  
      <div className=' flex justify-between items-center  mr-28 ml-32 mt-12 h-20 shadow-md'>
          <p className='pl-4'>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className='pr-8'>Subtotal</p>
        </div>
      {cart ? <div>{cart.map(item =><ViewCartChild key={item._id} items={item} />)}</div>
        : <p>bạn không có sản phẩm nào trong giỏ hàng</p>}
                <div className='flex justify-between mr-32 ml-32 mt-8'>
          <Link to='/'><button className='border-2 p-2 px-5 rounded'>Return To Shop</button></Link>
          <button className='border-2 p-2 px-5 rounded'> Update Cart</button>
        </div>
                <div className='flex justify-between ml-32 mt-16 mb-24 w-10/12'>
          <div>
            <input className='border-2 py-2 px-4 rounded' placeholder='Coupon Code' type="text" />
            <button className='bg-red-600 text-white w-40 h-11 ml-3 rounded'>Apply Coupon</button>
          </div>
          <div className='w-5/12 border-2 p-5'>
            <h1 className='text-xl mt-3'>Cart Total</h1>
            <div className='flex justify-between mt-4'>
              <p>Subtotal</p>
              {/* <p>${total}</p> */}
            </div>
            <hr className='mt-1 mb-2' />
            <div className='flex justify-between'>
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <hr className='mt-1 mb-2' />
            <div className='flex justify-between mb-2'>
              <p>Total</p>
              {/* <p>${total}</p> */}
            </div>
            <div className='text-center'>

              <Link to='/Order'><button className='bg-red-600 text-white w-48 h-12 rounded'>Procees to checkout</button></Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default ViewCart