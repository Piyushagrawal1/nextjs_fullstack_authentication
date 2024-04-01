'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfilePage() {

  const router = useRouter()
  const [data, setData] = useState('nothing')

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data.data._id);
    setData(res.data.data._id)
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      // localStorage.removeItem("token")
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{data === 'nothing' ? 'Nothing...' : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
      <hr />
      <button
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        onClick={getUserDetails}>Get User</button>
      <button 
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={logout}>
          Logout
      </button>
    </div>
  )
}

