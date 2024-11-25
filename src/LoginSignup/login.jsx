import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import login from '../image/login-signup.png'
const Login = () => {
  const {setUser} = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:8080/users/login',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
         credentials: 'include',
        body: JSON.stringify({email,password})
      });
      if(!response.ok){
        throw new Error('đăng nhập thất bại');
      }
      const data = await response.json();
      // console.log('đăng nhập thành công',data);
      setUser(data.user);
      // console.log(data.user.name)
      navigate('/');
    }catch(err){
      console.error(err);
    }
  }
  return (
    <>
      <div className=' flex border-t-2 w-full'>
      <div className='h-lvh w-1/2'>
        <img className='h-5/6 mt-16 w-full ' src={login} alt="" />
      </div>
      <div onSubmit={handleLogin} className='mt-16 pl-48 w-2/4'>
        <form className='h-96 mt-20'>
          <h1 className='text-3xl font-medium '>Log in to Exclusive</h1>
          <p className='mt-4 text-sm'>Enter your details below</p><br/>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className='focus:outline-none border-b-2 pt-8 w-96 pb-2'  placeholder='Email' /><br />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='focus:outline-none border-b-2 pt-8 w-96 pb-2' placeholder='Password' />
          <div className='mt-8 w-96 flex justify-between '>
            <button type='submit' className='  h-12 text-center w-32 border rounded-md  shadow-sm bg-red-500 hover:bg-red-800 hover:text-white '>Log in</button>
            <span className=' li-hover pt-4 red-text '>Forget Password?</span>
          </div>
        </form>
      </div>
  
    </div>
    </>
  )
}

export default Login