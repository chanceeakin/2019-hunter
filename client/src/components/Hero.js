import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled from 'react-emotion'
import get from 'lodash.get'
import { useTransition, animated, config } from 'react-spring'

import { colors, screens } from '../../tailwind'
import { PAGES } from '../constants'
import AboutInfo from './AboutInfo'
import { NavBarContext } from './NavBarWrapper'
import { DimensionsContext } from './ResponsiveWrapper'

const Container = styled.div`
  ${tw`relative`};
  width: 100vw;
  height: 100vh;
  z-index: 10;
`

const Image = styled(Img)`
  width: 100%;
  height: 100%;
`

const Title = styled(animated.h1)`
  ${tw`p-1 font-mono absolute`};
  left: 50%;
  top: 50%;
  background-color: ${props =>
    props.page === PAGES.ABOUT_PAGE ? colors.yellow : colors.white};
  margin-right: ${props => (props.width > screens.sm ? '1rem' : '2rem')};
  &:hover {
    cursor: pointer;
    color: ${colors['grey-darker']};
  }
`
const Hero = React.memo(({ title, imageBig, imageSmall, page }) => {
  const [show, set] = React.useState(false)
  const dimensions = React.useContext(DimensionsContext)
  const [isNavShown, setNavShown] = React.useContext(NavBarContext)

  React.useEffect(() => {
    set(true)
    return () => {
      set(false)
    }
  })
  const transitions = useTransition(show, null, {
    from: {
      position: 'absolute',
      transform: 'perspective(600px) rotateX(90deg)',
    },
    enter: [
      { opacity: 1 },
      { transform: 'perspective(600px) rotateX(90deg)' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: { opacity: 0 },
    config: config.slow,
  })

  const fullImage = get(imageBig, 'childImageSharp.fluid')
  const mobileImage = get(imageSmall, 'childImageSharp.fluid')
  const fluidImage = () => {
    if (page !== PAGES.ABOUT_PAGE) {
      if (dimensions.width > 800) return fullImage
      return mobileImage
    }
    return fullImage
  }
  return (
    <Container>
      <Image fadeIn={false} fluid={fluidImage()} />
      {transitions.map(
        ({ item, key, props }) =>
          item &&
          title && (
            <Title
              key={key}
              style={props}
              width={dimensions.width}
              page={page}
              onClick={() => setNavShown(!isNavShown)}
            >
              {title}
            </Title>
          )
      )}
      {page === PAGES.ABOUT_PAGE ? <AboutInfo dimensions={dimensions} /> : null}
    </Container>
  )
})

Hero.defaultProps = {
  page: PAGES.HOME_PAGE,
  imageSmall: {},
  title: '',
}

Hero.propTypes = {
  imageBig: PropTypes.object.isRequired,
  imageSmall: PropTypes.object,
  page: PropTypes.oneOf(Object.values(PAGES)),
  title: PropTypes.string,
}

export default Hero
