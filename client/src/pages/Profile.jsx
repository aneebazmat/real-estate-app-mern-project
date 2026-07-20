import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col max-w-md mx-auto items-center gap-6'>
        <img src={currentUser.avatar} alt="profile" className='w-24 h-24 object-cover rounded-full cursor-pointer self-center mt-2' />
        <input type="text" placeholder='name'id='name' defaultValue={currentUser.name} className='w-full p-3 rounded-lg border border-gray-300' />
        <input type="text" placeholder='email'id='email' defaultValue={currentUser.email} className='w-full p-3 rounded-lg border border-gray-300' />
        <input type="text" placeholder='password'id='password' className='w-full p-3 rounded-lg border border-gray-300' />
        <button type="submit" className='w-full p-3 rounded-lg hover:opacity-90 cursor-pointer uppercase font-semibold transition-opacity disabled:opacity-80  bg-slate-700 text-white font-semibold'>Update</button>
      </form>
      <div className='flex justify-between mt-5 max-w-md mx-auto  '>
        <span className='text-red-700 cursor-pointer text-center mt-5 text-sm font-semibold'>Delete Account</span>
        <span className='text-red-700 cursor-pointer text-center mt-5 text-sm font-semibold'>Delete Account</span>
      </div>  
    </div>
  )
}

export default Profile