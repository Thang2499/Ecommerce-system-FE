import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../jwt/refreshAccessToken';
const HomeChild = ({ items }) => {
  const authStore = useSelector(state => state.auth);
  const { productName, image, price, _id } = items
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate();
  // const user = useUser();
  // const {user} = a
  const addWishList = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/users/wishList', {
        id: authStore.user._id,
        wishlist: [{ productId: _id }],
      },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${authStore.accessToken}`
          },
          // withCredentials: true,
        })
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }
  const addToCart = async (event) => {
    event.preventDefault();
    if(authStore.isAuth === false){
      toast.info('Đang nhập để mua hàng')
      return;
    }
    try {
      const res = await axiosInstance.post('/users/addToCart', {
        id: authStore.user._id,
        productId: _id,
        quantity: quantity,
        unitPrice: price,
      },
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     // Authorization: `Bearer ${authStore.accessToken}`
        //   },
        // }
      )
        if(res.status !== 200){
         toast.error('Fail to add Product');
          throw new Error('đăng nhập thất bại');
        }
        toast.success('Add product success')
    } catch (err) {
      console.log(err);
    }
  }
   const handleProductDetail = (idProduct) =>{
        navigate(`/productDetail/${idProduct}`)
  
   }
  return (
    <>
      <div className="relative w-full group border border-gray-200 rounded-lg shadow-md  hover:shadow-2xl p-4 bg-white flex flex-col justify-between">
        {image ? (
          <img
            className="w-full  object-cover rounded-t-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
            src={image}
            alt=""
          />
        ) : (
          <p className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-t-lg">
            img...
          </p>
        )}
        <div className="text-center mt-4">
         <p onClick={() => handleProductDetail(_id)} className="font-semibold cursor-pointer hover:text-blue-600">{productName}</p>
          <p className="text-gray-600 mt-1">Price: ${price}</p>
        </div>
        <button
          onClick={addToCart}
          className="bg-black text-white w-full py-2 mt-4 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
        >
          Add to cart
        </button>
      <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition:Bounce
/> 
      </div>
    </>
  )
}

export default HomeChild