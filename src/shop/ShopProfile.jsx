import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import axiosInstance from '../jwt/refreshAccessToken';

export const ShopProfile = () => {
     const [shop,setShop] = useState({});
    const authStore = useSelector(state => state.auth);
    const getShop = async () =>{
        try{
            const response = await axiosInstance.get('/shop/shop/shopPage',
            //   {
            //   headers: {
            //     'Content-Type': 'application/json',
            //      authorization: `Bearer ${authStore.accessToken}`
            //   },
            //     credentials: 'include'
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
        {shop.shopInfo ? (
        <>
          <div className='profile  mt-4'>
     <h1 className='h-12 ml-5 text-red-500 font-semibold'>Edit Your Shop Profile</h1>
     <div  className='flex justify-around w-full h-24'>
      <div>
      <p className='w-12'>Name</p>
      <input value={shop.shopInfo.name} className='bg-gray-200 p-3 w-96 text-sm'  type="text" placeholder="Tên"  />
      </div>
      <div>
      <p className=''>Email</p>
      <input value={shop.shopInfo.email} className='bg-gray-200 p-3 w-96 text-sm' type="email" placeholder="Email" readOnly /><br />
      </div>
     </div> 
     <div className='flex justify-around w-full'>
      <div>
      <p className=''>Address</p>
      <input className='bg-gray-200 p-3 w-96 text-sm' type="text" placeholder="Địa chỉ" />
      </div>
      <div>
      <p className='w-32'>Phone</p>
      <input value={shop.shopInfo.phone} className='bg-gray-200 p-3 w-96 text-sm' type="number" placeholder="Phone" />
      </div>
     </div>
     {/* <div className='ml-5 leading-10'>
      <h1>Password Changes</h1>
      <input className='bg-gray-200 p-3 w-full text-sm' placeholder="Current Password" type="text" /><br />
      <input className='bg-gray-200 p-3 w-full text-sm mt-3' placeholder="New Password " type="text" /><br />
      <input className='bg-gray-200 p-3 w-full text-sm mt-3' placeholder="Confirm New Password" type="text" />
     </div> */}
      <button className='float-right bg-red-500 hover:bg-red-600 w-44 pt-2 pb-2 rounded mr-8 mt-4 hover-bt cursor-pointer'>Lưu thông tin</button>
    </div>
          
        </>
      ) : (
        <p>Loading shop information...</p>
      )}
   </>
  )
}
