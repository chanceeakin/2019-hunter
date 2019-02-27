import React from 'react'
// import PropTypes from 'prop-types'
import TransitionLink from 'gatsby-plugin-transition-link'
import styled from 'react-emotion'
import { useTransition, animated } from 'react-spring'
import { colors } from '../../tailwind'
import { PATHS } from '../constants'
import { NavBarContext } from './NavBarWrapper'

const NavContainer = styled.div`
  position: fixed;
  z-index: 1500;
  width: 100%;
  height: 64px;
`

const Nav = styled(animated.nav)`
  ${tw`flex items-center bg-white`};
  width: 100%;
  height: 100%;
`
const BoldItem = styled(TransitionLink)`
  ${tw`mb-0 pl-2 pr-2 text-black font-mono align-middle hover:text-grey`};
  color: ${props => (props.selected ? colors['grey-darker'] : null)};
  list-style-type: none;
  font-weight: 600;
  text-decoration: none;
`

const Item = styled(TransitionLink)`
  ${tw`mb-0 pl-2 pr-2 text-black font-mono align-middle hover:text-grey`};
  color: ${props => (props.selected ? colors['grey-darker'] : null)};
  list-style-type: none;
  text-decoration: none;
`

const NavBar = React.memo(({ location }) => {
  const [isNavShown, setNavShown] = React.useContext(NavBarContext)

  const transition = useTransition(isNavShown, null, {
    from: {
      position: 'absolute',
      opacity: 0,
      transform: `translateY(-64px)`,
    },
    enter: {
      opacity: 1,
      transform: `translateY(0px)`,
    },
    leave: {
      opacity: 0,
      transform: `translateY(-64px)`,
    },
  })
  return (
    <NavContainer
      onFocus={() => setNavShown(true)}
      onBlur={() => setNavShown(false)}
      onMouseEnter={() => setNavShown(true)}
      onMouseLeave={() => setNavShown(false)}
    >
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <Nav key={key} style={props}>
              <BoldItem
                to={PATHS.HOME}
                selected={location.pathname === PATHS.HOME}
                exit={{
                  length: 1.5,
                }}
                entry={{
                  length: 1.5,
                }}
              >
                Hunter Enoch
              </BoldItem>
              <Item
                to={PATHS.ABOUT}
                selected={location.pathname === PATHS.ABOUT}
                exit={{
                  length: 1.5,
                }}
                entry={{
                  length: 1.5,
                }}
              >
                About
              </Item>
              <Item
                to={PATHS.CALENDAR}
                selected={location.pathname === PATHS.CALENDAR}
                exit={{
                  length: 1.5,
                }}
                entry={{
                  length: 1.5,
                }}
              >
                Calendar
              </Item>
              <Item
                to={PATHS.ACCLAIM}
                selected={location.pathname === PATHS.ACCLAIM}
                exit={{
                  length: 1.5,
                }}
                entry={{
                  length: 1.5,
                }}
              >
                Acclaim
              </Item>
              <Item
                to={PATHS.MEDIA}
                selected={location.pathname === PATHS.MEDIA}
                exit={{
                  length: 1.5,
                }}
                entry={{
                  length: 1.5,
                }}
              >
                Media
              </Item>
            </Nav>
          )
      )}
    </NavContainer>
  )
})

NavBar.propTypes = {}

export default NavBar
