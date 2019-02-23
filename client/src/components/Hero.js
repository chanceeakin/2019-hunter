import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled from 'react-emotion'
import { useTransition, animated, config } from 'react-spring'
import { DimensionsContext } from './ResponsiveWrapper'
import { NavBarContext } from './NavBarWrapper'
import { screens } from '../../tailwind'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${tw`relative`};
`

const Image = styled(Img)`
  width: 100%;
  height: 100%;
`

const Title = styled(animated.h1)`
  ${tw`p-1 font-mono absolute bg-white`};
  left: 50%;
  top: 50%;
  margin-right: ${props => (props.width > screens.sm ? '1rem' : '2rem')};
  &:hover {
    cursor: pointer;
  }
`
const Hero = React.memo(({ title, imageBig, imageSmall }) => {
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

  const fullImage = imageBig.childImageSharp.fluid
  const mobileImage = imageSmall.childImageSharp.fluid

  return (
    <Container>
      <Image
        fadeIn={false}
        fluid={dimensions.width > 800 ? fullImage : mobileImage}
      />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Title
              key={key}
              style={props}
              width={dimensions.width}
              onClick={() => setNavShown(!isNavShown)}
            >
              {title}
            </Title>
          )
      )}
    </Container>
  )
})

Hero.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Hero
