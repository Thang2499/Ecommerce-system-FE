import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import axios from 'axios';
import { useSelector } from 'react-redux';
const HomeChild = ({items}) => {
  const authStore = useSelector(state => state.auth);
  console.log(authStore.user._id)
    const {productName,image,price,_id} = items
    const [quantity,setQuantity] = useState(1)
    // const user = useUser();
    // const {user} = a
    const addWishList = async (event) =>{
      event.preventDefault();
      try {
          const res = await axios.post('http://localhost:8080/users/wishList',{
            id: authStore.user._id,
            wishlist: [{ productId: _id }],
          },
            {
               headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${authStore.accessToken}`
            },
            // withCredentials: true,
            } )
          console.log(res)
        } catch (err) {
          console.log(err);
        }
    }
    const addToCart = async (event) =>{
      event.preventDefault();
      try {
          const res = await axios.post('http://localhost:8080/users/addToCart',{
               id: authStore.user._id, 
                productId: _id, 
                quantity: quantity, 
                unitPrice: price, 
          },
            {
               headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authStore.accessToken}`
            },
            } )
          console.log(res.data)
        } catch (err) {
          console.log(err);
        }
    }
  return (
    <>
    <div className='relative group'>
    {image?<img className='w-36 h-36' src={image} alt="" />: <p>img...</p>}
    <button
      onClick={addToCart}
        className='bg-black text-white w-36 text-center absolute top-28 h-8  opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-in-out'
      >
        Add to cart
      </button>
    <p className='w-32'>Name: {productName}</p>
    <p>Price: {price}</p>
   
    </div>
      
    </>
  )
}

export default HomeChild