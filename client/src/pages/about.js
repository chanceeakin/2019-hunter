import React from 'react'
import { graphql } from 'gatsby'

import Hero from '../components/Hero'
import Layout from '../components/layout'
import TransitionWrapper from '../components/TransitionWrapper'
import { PAGES } from '../constants'

const AboutPage = React.memo(({ data, location }) => (
  <Layout location={location}>
    <TransitionWrapper>
      <Hero title="About" imageBig={data.coverImage} page={PAGES.ABOUT_PAGE} />
    </TransitionWrapper>
  </Layout>
))

export const query = graphql`
  query {
    coverImage: file(relativePath: { regex: "/aboutBg/" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default AboutPage
