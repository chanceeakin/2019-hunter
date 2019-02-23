import React from 'react'
import PropTypes from 'prop-types'

export const DimensionsContext = React.createContext({ width: 0, height: 0 })

const ResponsiveWrapper = React.memo(({ children }) => {
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  const checkDimensions = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  React.useEffect(() => {
    checkDimensions()
    window.addEventListener('resize', checkDimensions)
    return () => {
      window.removeEventListener('resize', checkDimensions)
    }
  }, [width, height])

  return (
    <DimensionsContext.Provider
      value={{
        width,
        height,
      }}
    >
      {children}
    </DimensionsContext.Provider>
  )
})

ResponsiveWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ResponsiveWrapper
