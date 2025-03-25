// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

const NotFoundPage = () => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>
        <NotFound />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
