import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const ShopManage = () => {
    const [shop,setShop] = useState({})
    const getShop = async () =>{
        try{
            const response = await fetch('http://localhost:8080/shop/shop/shopPage',{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
               credentials: 'include'
            });
            if(!response.ok){
              const errorData = await response.json();
              console.error('Error details:', errorData);
              throw new Error('đăng nhập thất bại');
            }
            const data = await response.json();
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
      {shop.shopInfo ? (
        <>
          {/* <p>{shop.shopInfo.name}</p>
          <p>{shop.shopInfo.email}</p>
          <p>{shop.shopInfo.phone}</p> */}
          <div className='profile  mt-4'>
     <h1 className='h-12 ml-5 text-red-500 font-semibold'>Edit Your Profile</h1>
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
          <Link to='/productManage'><button className='bg-red-500 hover:bg-red-600 w-44 pt-2 pb-2 rounded mr-8 mt-4 hover-bt cursor-pointer'>Quản lý sản phẩm</button></Link>
        </>
      ) : (
        <p>Loading shop information...</p>
      )}

    </div>
  </>
  )
}

export default ShopManage