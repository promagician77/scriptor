// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Dashboard from '@/views/Dashboard/Dashboard'

const DashboardPage = () => {
  return (
    <div className='flex flex-col justify-center items-center p-6'>
      <Dashboard />
    </div>
  )
}

export default DashboardPage
