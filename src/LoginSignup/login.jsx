import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import logins from '../image/login-signup.png'
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading } from '../store/authSlice';
import axios from 'axios';
const Login = () => {
  const authStore = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // const {setUser} = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
    dispatch(setLoading(true))
      const response = await axios.post('http://localhost:8080/users/login',{
        //  credentials: 'include',
      email,password
      });
      if (response.status !== 200) {
        throw new Error('Đăng nhập thất bại');
      }
      // setUser(response.data.user);
      dispatch(login({
        user:response.data.user,
        accessToken:response.data.accessToken,
        refreshToken: response.data.refreshToken
      }))
      localStorage.setItem('accessToken',response.data.accessToken);
      localStorage.setItem('refreshToken',response.data.refreshToken);
      localStorage.setItem('user',JSON.stringify(response.data.user));
      navigate('/');
    }catch(err){
      console.error(err.message);
    }finally{
      dispatch(setLoading(false))
    }
  }
  return (
    <>
      <div className=' flex border-t-2 w-full'>
      <div className='h-lvh w-1/2'>
        <img className='h-5/6 mt-16 w-full ' src={logins} alt="" />
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