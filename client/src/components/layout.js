import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'react-emotion'
import { StaticQuery, graphql } from 'gatsby'

import NavBar from './NavBar'
import ResponsiveWrapper from './ResponsiveWrapper'
import NavBarWrapper from './NavBarWrapper'

// reset.css
import './layout.css'

const Content = styled.div`
  ${tw`container mx-auto `}
`

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ResponsiveWrapper>
        <NavBarWrapper>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <NavBar location={location} />
          <Content>{children}</Content>
        </NavBarWrapper>
      </ResponsiveWrapper>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
