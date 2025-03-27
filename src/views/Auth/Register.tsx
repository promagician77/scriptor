'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useAuth } from '@core/contexts/AuthContext'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AuthIllustrationWrapper from '../AuthIllustrationWrapper'

const Register = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  })

  // Hooks
  const { lang: locale } = useParams()
  const { signUp } = useAuth()
  const router = useRouter()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateUsername = (username: string) => {
    // Username should be 3-20 characters, alphanumeric with underscores allowed
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
  }

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: ''
    }

    if (!username) {
      newErrors.username = 'Username is required'
    } else if (!validateUsername(username)) {
      newErrors.username = 'Username must be 3-20 characters and can only contain letters, numbers, and underscores'
    }

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleClickRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await signUp(email, password)
      router.push('/login?message=Check your email to confirm your account')
    } catch (error) {
      console.error('Error signing up:', error)
      setErrors(prev => ({
        ...prev,
        email: 'This email is already registered'
      }))
    }
  }

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setErrors(prev => ({ ...prev, username: '' }))
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setErrors(prev => ({ ...prev, email: '' }))
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setErrors(prev => ({ ...prev, password: '', confirmPassword: '' }))
  }

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    setErrors(prev => ({ ...prev, confirmPassword: '' }))
  }

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked)
    setErrors(prev => ({ ...prev, terms: '' }))
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12' >
          <div className='flex justify-center mbe-6'>
            <Logo />
          </div>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>Adventure starts here 🚀</Typography>
            <Typography>Make your app management easy and fun!</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={e => handleClickRegister(e)} className='flex flex-col gap-6' >
            <CustomTextField 
              autoFocus 
              fullWidth 
              label='Username' 
              placeholder='Enter your username'
              value={username}
              onChange={handleChangeUsername}
              error={!!errors.username}
              helperText={errors.username}
            />
            <CustomTextField 
              fullWidth 
              label='Email' 
              placeholder='Enter your email'
              value={email}
              onChange={handleChangeEmail}
              error={!!errors.email}
              helperText={errors.email}
            />
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={handleChangePassword}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'bx-hide' : 'bx-show'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <CustomTextField
              fullWidth
              label='Confirm Password'
              placeholder='············'
              type={isConfirmPasswordShown ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowConfirmPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isConfirmPasswordShown ? 'bx-hide' : 'bx-show'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                  color={errors.terms ? 'error' : 'primary'}
                />
              }
              label={
                <>
                  <span>I agree to </span>
                  <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </Link>
                </>
              }
            />
            {errors.terms && (
              <Typography color="error" variant="caption" className="mbs-[-1rem]">
                {errors.terms}
              </Typography>
            )}
            <Button 
              fullWidth 
              variant='contained' 
              type='submit'
              disabled={!!Object.values(errors).some(error => error !== '')}
            >
              Sign Up
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Already have an account?</Typography>
              <Typography
                component={Link}
                href={'/login'}
                color='primary'
              >
                Sign in instead
              </Typography>
            </div>
            <Divider className='gap-2 text-textPrimary'>or</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-facebook' size='small'>
                <i className='bx-bxl-facebook-circle' />
              </IconButton>
              <IconButton className='text-twitter' size='small'>
                <i className='bx-bxl-twitter' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small'>
                <i className='bx-bxl-github' />
              </IconButton>
              <IconButton className='text-error' size='small'>
                <i className='bx-bxl-google' />
              </IconButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default Register
