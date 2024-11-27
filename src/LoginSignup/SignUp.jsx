import React, { useState } from 'react'
import signUp from '../image/login-signup.png'
import axios from 'axios';
const SignUp = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPass,setconfirmPass] = useState('');
  const handleSignUp = async (event)=>{
    event.preventDefault();
    if(password !== confirmPass){
      console.log('mat khau khong trung nhau')
      return
    }
    await axios.post('http://localhost:8080/users/register',{
      email,password
    },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
  return (
   <>
    <div className=' flex border-t-2 w-full'>
      <div className='h-lvh w-1/2'>
        <img className='h-5/6 mt-16 w-full ' src={signUp} alt="" />
      </div>
      <div onSubmit={handleSignUp} className='mt-16 pl-48 w-2/4'>
        <form className='h-96 mt-20'>
          <h1 className='text-3xl font-medium '>Log in to Exclusive</h1>
          <p className='mt-4 text-sm'>Enter your details below</p><br/>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className='focus:outline-none border-b-2 pt-8 w-96 pb-2'  placeholder='Email' /><br />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='focus:outline-none border-b-2 pt-8 w-96 pb-2' placeholder='Password' />
          <input type="password" value={confirmPass} onChange={(e)=>setconfirmPass(e.target.value)} className='focus:outline-none border-b-2 pt-8 w-96 pb-2' placeholder='Confirm Password' />
          <div className='mt-8 w-96 flex justify-between '>
            <button type='submit' className='  h-12 text-center w-32 border rounded-md  shadow-sm bg-red-500 hover:bg-red-800 hover:text-white '>Sign Up</button>
            {/* <span className=' li-hover pt-4 red-text '>Forget Password?</span> */}
          </div>
        </form>
      </div>
  
    </div>
   </>
  )
}

export default SignUp