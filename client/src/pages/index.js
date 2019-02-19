import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Hero from '../components/Hero'

const IndexPage = ({ data }) => (
  <Layout>
    <Hero title="Hunter Enoch, bass-baritone" image={data.coverImage} />
    <p>Welcome to your new Gatsby + Tailwind CSS + Emotion js site</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export const query = graphql`
  query {
    coverImage: file(relativePath: { regex: "/167full/" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
