import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const Text = styled.p`
  ${tw`m-8 mb-0 pl-2 pr-2 text-black font-mono align-middle bg-white`};
  position: absolute;
  top: 65%;
  max-height: 12rem;
  overflow-y: scroll;
`

const AboutInfo = React.memo(({ dimensions }) => (
  <Text dimensions={dimensions}>
    Hunter Enoch, bass-baritone, is originally from Paris, Tennessee. He is
    currently a member of the Domingo-Cafritz Young Artist Program at Washington
    National Opera. This season he will be seen as Il Conte Almaviva in the
    Young Artist performance of Le Nozze di Figaro, a Corporal in The Daughter
    of the Regiment, ADC in The Dictator’s Wife, Motorcycle Cop and First Guard
    in Dead Man Walking, and Sharpless in the Young Artist performance of Madame
    Butterfly at WNO. Hunter has worked with the Glimmerglass Festival, Virginia
    Opera, Opera Santa Barbara, Cincinnati Opera, Seattle Opera, Chautauqua
    Opera and Wolf Trap Opera.
  </Text>
))

AboutInfo.propTypes = {
  dimensions: PropTypes.object.isRequired,
}

export default AboutInfo
