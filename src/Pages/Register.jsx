import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import axios from "axios"
import Loading from '../Components/Loading';

function Register() {
   const [formData , setFormData] = useState({
     username : '',
     password : ''
   });
   const [err ,setErr] = useState('');
   const [loading , setLoading] = useState(false);
   const navigate = useNavigate();
   const handleChange = (e)=>{
     const {name , value} = e.target;
     setFormData({
      ...formData,
      [name] : value
     })
   }


   const handleRegister = async(e)=>{
      e.preventDefault();
      setLoading(true)
      setErr('');  
      if(!formData.username.trim() || !formData.password.trim()){
        setLoading(false)
        setErr("both fields are required");
       return
      }
      if(formData.password.length < 5){
        
        setLoading(false) 
        setErr("password must bt 6 char long");
        return 
      }
      
      try {
        const req = await axios.post('https://food-management-api.vercel.app/api/register' ,formData) 
        if(req.status === 200){
           console.log(req?.data?.message || "register success");
           alert(req?.data?.message || "register success");
           navigate('/login')
        }
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
            if (status === 400) {
              setErr(data.message  || "Unauthorized Invalid username or Password.");
            } else if (status === 500) {
              setErr(data.message || "Internal Server Error. Please try again later.");
            }
          } else if (err.request) {
            setErr("No response from server. Please try again later.");
          } else {
            setErr(err.message || "An unexpected error occurred.");
          }
      }finally{
         setLoading(false)
      }
  }

   if(err && err.length > 0){
     setTimeout(()=>{
       setErr('')
     },3000)
   }

  return (<>
    {loading && <Loading/>}
    <div className='min-h-screen flex justify-center items-center flex-col p-4'>
             <h2 className='text-center  md:text-3xl text-2xl text-sky-700 mb-4'>Register Please</h2>
        <div className="shadow-lg p-4 md:h-auto h-[50vh] w-full max-w-xl bg-gray-200 rounded-md ">
            <h3 className='text-center mb-6 text-sky-700 md:text-2xl'>Welcome to Food Management System</h3>
           <br />
           <form action="" className='relative w-full flex flex-col gap-6 '>
               <div className='h-full w-full flex flex-col gap-6  py-1 relative mb-4'>
               <input type="text" placeholder='Name' name="username" value={formData.username} onChange={handleChange} className='py-3 px-3 rounded-md'/>
               <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} className='py-3 px-3 rounded-md'/>
               {err &&  <p className='absolute bottom-[-28px] text-sm text-red-500'>{err}</p> }

               </div>

              <button onClick={handleRegister} className='bg-sky-600 py-2 text-white rounded-md md:mt-4 mt-10'>Register</button>
           
           </form>
           <p className='text-lg md:mt-4 mt-16 text-center '>Already have an Account?<NavLink to={'/login'} className={'text-blue-500 underline'}> Login</NavLink></p>
        </div>
    </div>
  </>)
}

export default Register