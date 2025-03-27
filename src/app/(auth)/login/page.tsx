import type { Metadata } from 'next'

import Login from '@/views/Auth/Login'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <Login />
    </div>
  )
}

export default LoginPage
