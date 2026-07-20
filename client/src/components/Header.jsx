import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const {currentUser} = useSelector((state) => state.user)
    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Estate</span>
                        <span className='text-slate-700'>Hub</span>
                    </h1>
                </Link>

                <form className='bg-slate-100 p-3 rounded-full flex items-center ' >
                    <input
                        type="text"
                        placeholder='Search here.............'
                        className='bg-transparent outline-none placeholder:italic w-24 sm:w-64'
                    />
                    <FaSearch className='text-slate-600' />
                </form>

                <ul className='flex gap-4'>
                    <Link to="/">
                        <li className='text-slate-700 hover:underline'>Home</li>
                    </Link>

                    <Link to="/about">
                        <li className='text-slate-700 hover:underline'>About</li>
                    </Link>

                    {currentUser ? (
                        <Link to="/profile">
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
                        </Link>
                    ) : (
                        <Link to="/signin">
                            <li className='text-slate-700 hover:underline'>Sign In</li>
                        </Link>
                    )}



                </ul>
            </div>
        </header>
    )
}

export default Header