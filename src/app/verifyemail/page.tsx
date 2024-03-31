'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function VerifyEmilPage() {

  const router = useRouter()

  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post('/api/users/verifyEmail', { token })
      setVerified(true)
      setError(false)
      console.log('email verified', response.data)
    } catch (error: any) {
      setError(true)
      console.log('email verification failed', error.response.data)
    }
  }

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')

    // const { query } = router
    // const urlTokenTwo = query.token 
  }, [])

  useEffect(() => {
    setError(false)
    if(token.length > 0) {
      verifyUserEmail()
    }
  }, [])
  


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='p-2 bg-orange-500'>
        {token ? `${token}` : 'no token'}
      </h2>
      {
        verified && (
          <div>
            <h2>email verified</h2>
            <Link href={'/login'}>Login</Link>
          </div>
        )
      }
      {
        error && (
          <div>
            <h2>Error</h2>
          </div>
        )
      }
    </div>
  )
}
