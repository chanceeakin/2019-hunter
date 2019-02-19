import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import styled from 'react-emotion'
import { useTransition, animated, config } from 'react-spring'

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
`
const Hero = ({ title, image }) => {
  const [show, set] = useState(false)
  useEffect(() => {
    set(true)
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
  return (
    <Container>
      <Image fadeIn={false} fluid={image.childImageSharp.fluid} />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Title key={key} style={props}>
              {title}
            </Title>
          )
      )}
    </Container>
  )
}

export default Hero
