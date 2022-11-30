import React from 'react'
import { AuthenticationForm } from '../components/AuthenticationForm'

function Auth() {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100' 
        style={{background:'url(https://images.pexels.com/photos/2275290/pexels-photo-2275290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}
    >
        <AuthenticationForm /> 
    </div>
  )
}

export default Auth