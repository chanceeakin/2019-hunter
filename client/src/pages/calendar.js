import React from 'react'
import { graphql } from 'gatsby'

import TransitionWrapper from '../components/TransitionWrapper'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import CalendarContainer from '../components/CalendarContainer'

const Calendar = ({ data, location }) => (
  <Layout location={location}>
    <TransitionWrapper>
      <Hero imageBig={data.coverImage} imageSmall={data.mobileImage} />
      <CalendarContainer />
    </TransitionWrapper>
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
    mobileImage: file(relativePath: { regex: "/97edit/" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Calendar
