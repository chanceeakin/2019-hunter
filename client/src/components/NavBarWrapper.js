import React from 'react'

export const NavBarContext = React.createContext([false, () => {}])

const NavWrapper = ({ children }) => {
  const [isNavShown, setNavShown] = React.useState(false)

  return (
    <NavBarContext.Provider value={[isNavShown, setNavShown]}>
      {children}
    </NavBarContext.Provider>
  )
}

export default NavWrapper
