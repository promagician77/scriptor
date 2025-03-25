// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'


// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import { AuthProvider } from '@/utils/AuthContext'

export const metadata = {
  title: 'Scriptor',
  description:
    'Scriptor is a platform for creating and managing your scripts.'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>  
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
