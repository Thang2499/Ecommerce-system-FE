import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axiosInstance from '../jwt/refreshAccessToken';

const Profile = () => {
  const authStore = useSelector(state => state.auth);
  const [form,setForm] = useState({
    name:authStore.user?.name?authStore.user.name:'',
    email:authStore.user?.email?authStore.user.email:'',
    phone:authStore.user?.phone?authStore.user.phone : '' ,
    address:authStore.user?.address? authStore.user.address:''
  })
  const inputChange = (e) =>{
    const {name,value} = e.target;
    setForm((prev => ({
      ...prev,
      [name]:value
    })))
  }
  const handleUpdate = async () =>{
    try{
        const response = await axiosInstance.post('/users/editProfile/',
          form,
        // {
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
           console.log(response)
        const data = await response.data;
        // setForm(data);
      }catch(err){
        console.error(err);
      }
  }
  return (
   <>
     <form onSubmit={handleUpdate} className='  mt-4'>
     <h1 className='h-12 ml-5 text-red-500 font-semibold'>Edit Your Profile</h1>
     <div  className='flex justify-around w-full h-24'>
      <div>
      <p className='w-12'>Name</p>
      <input className='bg-gray-200 p-3 w-96 text-sm' name='name'  type="text" placeholder="Tên" 
      value={form.name} onChange={inputChange}
       />
      </div>
      <div>
      <p className=''>Email</p>
      <input className='bg-gray-200 p-3 w-96 text-sm' name='email' type="email" placeholder="Email" 
      value={form.email} onChange={inputChange}
       /><br />
      </div>
     </div> 
     <div className='flex justify-around w-full'>
      <div>
      <p className=''>Address</p>
      <input className='bg-gray-200 p-3 w-96 text-sm' name='address' type="text" placeholder="Địa chỉ"
       value={form.address} onChange={inputChange}
       />
      </div>
      <div>
      <p className='w-32'>Phone</p>
      <input className='bg-gray-200 p-3 w-96 text-sm' name='phone' type="number" placeholder="Phone" 
      value={form.phone} onChange={inputChange}
      />
      </div>
     </div>
     <div className='ml-96 w-1/2 leading-10'>
      <h1>Password Changes</h1>
      <input className='bg-gray-200 p-3 w-full text-sm' placeholder="Current Password" type="text" /><br />
      <input className='bg-gray-200 p-3 w-full text-sm mt-3' placeholder="New Password " type="text" /><br />
      <input className='bg-gray-200 p-3 w-full text-sm mt-3' placeholder="Confirm New Password" type="text" />
     </div>
      <button type='submit' className='float-right w-44 pt-2 pb-2 rounded bg-red-500 hover:bg-red-700 mr-8 mt-4 cursor-pointer' >Lưu thông tin</button>
    </form>
   </>
  )
}

export default Profile