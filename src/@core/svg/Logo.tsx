// React Imports
import type { SVGAttributes } from 'react'

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width='1.5em' height='1.5em' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      {/* Outer spiral elements */}
      <path d='M50 5 A45 45 0 1 0 95 50' stroke='#2C7DA0' strokeWidth='1' fill='none' />
      <path d='M50 10 A40 40 0 1 0 90 50' stroke='#2C7DA0' strokeWidth='1' fill='none' />
      <path d='M50 15 A35 35 0 1 0 85 50' stroke='#2C7DA0' strokeWidth='1' fill='none' />
      <path d='M50 20 A30 30 0 1 0 80 50' stroke='#2C7DA0' strokeWidth='1' fill='none' />
      <path d='M50 25 A25 25 0 1 0 75 50' stroke='#2C7DA0' strokeWidth='1' fill='none' />
      <path d='M50 30 A20 20 0 1 0 70 50' stroke='#2C7DA0' strokeWidth='1' fill='none' />
      <path d='M50 35 A15 15 0 1 0 65 50' stroke='#2C7DA0' strokeWidth='1' fill='none' />

      {/* Inner S letter */}
      <path
        d='M40 35 C35 35, 30 40, 35 45 C40 50, 60 55, 60 65 C60 75, 45 75, 40 65'
        stroke='#2C7DA0'
        strokeWidth='6'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default Logo
