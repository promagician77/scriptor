import type { Metadata } from 'next'

import Register from '@/views/Auth/Register'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your account'
}

const RegisterPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <Register />
    </div>
  )
}

export default RegisterPage
