import React from 'react'
import styled from 'react-emotion'
import { TransitionState } from 'gatsby-plugin-transition-link'
import { animated, Transition } from 'react-spring/renderprops'

const Container = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  ${tw`relative`};
`

const TransitionWrapper = React.memo(({ children }) => (
  <TransitionState>
    {({ transitionStatus }) => {
      const mount = ['entering', 'entered'].includes(transitionStatus)

      return (
        <Transition
          items={mount}
          from={{
            opacity: 0,
            transform: `translateX(-100%)`,
          }}
          enter={{
            opacity: 1,
            transform: `translateX(0)`,
          }}
          leave={{
            opacity: 0,
            transform: `translateX(75%)`,
          }}
        >
          {show =>
            show && (props => <Container style={props}>{children}</Container>)
          }
        </Transition>
      )
    }}
  </TransitionState>
))

export default TransitionWrapper
