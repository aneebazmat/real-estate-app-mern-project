import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'

function SignIn() {
  const [formData, setFormData] = React.useState({})
  const navigate = useNavigate()
  const userDispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.user)



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      userDispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        userDispatch(signInFailure(data.message))
        return
      }
      userDispatch(signInSuccess(data.user))
      navigate('/')
    } catch (err) {
      userDispatch(signInFailure(err.message))
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-100 px-4 py-10'>
      <div className='mx-auto flex max-w-md flex-col rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200 backdrop-blur'>
        <div className='mb-6 text-center'>
          <h1 className='text-3xl font-semibold text-slate-800'>Welcome back</h1>
          <p className='mt-2 text-sm text-slate-500'>Sign in to pick up where you left off.</p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            id='email'
            placeholder='Email'
            className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-500 focus:bg-white'
            onChange={handleChange}
            required
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-500 focus:bg-white'
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            className='rounded-2xl bg-slate-800 px-4 py-3 font-medium uppercase cursor:pointer text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-80'
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className='mt-5 flex items-center justify-center gap-2 text-sm'>
          <p className='text-slate-600'>Don&apos;t have an account?</p>
          <Link to='/signup' className='font-medium text-blue-700 transition hover:text-blue-800'>
            Sign Up
          </Link>
        </div>

        {error && <p className='mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600'>{error}</p>}
      </div>
    </div>
  )
}

export default SignIn