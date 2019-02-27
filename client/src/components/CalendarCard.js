import React from 'react'
import styled from 'react-emotion'

const Container = styled.div`
  ${tw`max-w-sm rounded overflow-hidden shadow-lg bg-white`};
`

const Image = styled.img`
  ${tw`w-full bg-white`};
`

const Contents = styled.div`
  ${tw`px-6 py-4 bg-white`};
`

const CardTitle = styled.h3`
  ${tw`font-bold font-mono text-xl mb-2`};
`

const Text = styled.p`
  ${tw`font-sans text-grey-darker text-base`};
`

const CalendarCard = React.memo(() => (
  <Container>
    <Image
      src="https://tailwindcss.com/img/card-top.jpg"
      alt="Sunset in the mountains"
    />
    <Contents>
      <CardTitle>The Coldest Sunset</CardTitle>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
        nihil.
      </Text>
    </Contents>
  </Container>
))

export default CalendarCard
