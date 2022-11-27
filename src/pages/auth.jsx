import React from 'react'
import { AuthenticationForm } from '../components/AuthenticationForm'

function Auth() {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
        <AuthenticationForm /> 
    </div>
  )
}

export default Auth