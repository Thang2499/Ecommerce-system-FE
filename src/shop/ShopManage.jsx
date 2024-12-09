import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import axiosInstance from '../jwt/refreshAccessToken';
const ShopManage = () => {
    const [shop,setShop] = useState({});
    const authStore = useSelector(state => state.auth);
    // console.log(authStore)
    const getShop = async () =>{
        try{
            const response = await axiosInstance.get('/shop/shop/shopPage',
            //   {
            //   headers: {
            //     'Content-Type': 'application/json',
            //      authorization: `Bearer ${authStore.accessToken}`
            //   },
            //    credentials: 'include'
            // }
          );
            if(response.status !== 200){
              // const errorData = await response;
              // console.error('Error details:', errorData);
              throw new Error('đăng nhập thất bại');
            }
            const data = await response.data;
            setShop(data);
          }catch(err){
            console.error(err);
          }
      }
      useEffect(() => {
        getShop();
      }, []);
  return (
    <>
    <div>
    <Link to='productManage'><button className='bg-red-500 hover:bg-red-600 w-44 pt-2 pb-2 rounded mr-8 mt-4 hover-bt cursor-pointer'>Manage Product</button></Link>
    <Link to='ManageOrder'><button className='bg-red-500 hover:bg-red-600 w-44 pt-2 pb-2 rounded mr-8 mt-4 hover-bt cursor-pointer'>Manage Order</button></Link>
    <Link to='ManageProfile'><button className='bg-red-500 hover:bg-red-600 w-44 pt-2 pb-2 rounded mr-8 mt-4 hover-bt cursor-pointer'>Manage Profile</button></Link>
    <Outlet/>
    </div>
  </>
  )
}

export default ShopManage;