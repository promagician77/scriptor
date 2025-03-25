'use client'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

const NavToggle = () => {
  // Hooks
  const { toggleVerticalNav, isBreakpointReached } = useVerticalNav()

  const handleClick = () => {
    toggleVerticalNav()
  }

  return (
    <>
      {/* <i className='bx-menu text-[22px] cursor-pointer mis-2' onClick={handleClick} /> */}
      {/* Comment following code and uncomment this code in order to toggle menu on desktop screens as well */}
      {isBreakpointReached && <i className='bx-menu text-[22px] cursor-pointer mis-2' onClick={handleClick} />}
    </>
  )
}

export default NavToggle
