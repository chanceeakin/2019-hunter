import React from 'react'
import { graphql } from 'gatsby'

import Hero from '../components/Hero'
import Layout from '../components/layout'

const IndexPage = React.memo(({ data, location }) => (
  <Layout location={location}>
    <Hero
      title="Hunter Enoch, bass-baritone"
      imageBig={data.coverImage}
      imageSmall={data.mobileImage}
    />
  </Layout>
))

export const query = graphql`
  query {
    coverImage: file(relativePath: { regex: "/167full/" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    mobileImage: file(relativePath: { regex: "/97edit/" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
