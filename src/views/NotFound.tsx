'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const NotFound = () => {
  return (
    <div className='flex items-center flex-col text-center justify-center min-bs-[100dvh] p-6'>
      <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset] mbe-6'>
        <Typography variant='h1' className='text-8xl'>
          404
        </Typography>
        <Typography variant='h4'>Page Not Found ⚠️</Typography>
        <Typography>we couldn&#39;t find the page you are looking for.</Typography>
      </div>
      <Button href='/' component={Link} variant='contained'>
        Back To Home
      </Button>
      <img
        alt='error-404-illustration'
        src='/images/illustrations/characters-with-objects/13.png'
        className='object-cover bs-[327px] sm:bs-[400px] md:bs-[450px] lg:bs-[500px] mbs-6'
      />
    </div>
  )
}

export default NotFound
