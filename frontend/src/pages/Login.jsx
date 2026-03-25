import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setstate] = useState('Login')
const [email,setEmail]=useState('')
const [name,setName]=useState('')
const [password,setPassword]=useState('')

const navigate = useNavigate()

const onSubmitHandler = async (e) => {
  e.preventDefault()
  try {
    if (state === 'Sign Up') {
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/register', { name, email, password })
      if (data.success) {
        localStorage.setItem('token', data.token)
        // Dispatch event to notify Navbar of token change
        window.dispatchEvent(new Event('tokenUpdated'));
        toast.success('Account created successfully')
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } else {
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/login', { email, password })
      if (data.success) {
        localStorage.setItem('token', data.token)
        // Dispatch event to notify Navbar of token change
        window.dispatchEvent(new Event('tokenUpdated'));
        toast.success('Login successful')
        navigate('/')
      } else {
        toast.error(data.message)
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message)
  }
}

  return (
   <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>

<div className='flex flex-col  gap-3 m-auto items-start p-8 min-w-[340px] text-sm shadow-lg sm:min-w-96 border rounded-xl text-zinc-600'>
  <p className='text-2xl font-semibold'>{state==='Sign Up'?"Create Account":"Login"}</p>
  <p >Please {state==="Sign Up"?"sign up":"log in"} to book appointment </p>
{
  state==="Sign Up"&& <div className='w-full'>
  <p>Full Name</p>
  <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" onChange={(e)=>setName(e.target.value)} value={name} required />
</div>
}


<div className='w-full'>
  <p>Email</p>
  <input  className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  required/>
</div>
<div className='w-full'>
  <p>Password</p>
  <input  className="border border-zinc-300 rounded w-full p-2 mt-1" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  required/>
</div>

<button type="submit" className='bg-primary text-white w-full py-2 rounded-md text-base'>{state==="Sign Up"?"Create Account":"Login"} </button>


{
  state==="Sign Up"?<p>Already have an account? <span  onClick={()=>setstate('Login')}className='cursor-pointer underline text-[#5f6fff]'>Login here</span> </p>:
  <p>Create a new account ?<span onClick={()=>setstate('Sign Up')} className='text-[#5f6fff] underline cursor-pointer'>click here</span></p>
}
</div>

   </form>
  )
}

export default Login
