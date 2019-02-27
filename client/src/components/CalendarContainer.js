import React from 'react'
import styled from 'react-emotion'

import { getCalendar } from '../api'

import CalendarCard from './CalendarCard'

const DivGrid = styled.div`
  position: absolute;
  top: 25%;
  left: 25%;
  z-index: 50;
  width: 50%;
  height: 50%;
  display: grid;
  grid-gap: 30px;
`

const CalendarContainer = React.memo(() => {
  const [data, setData] = React.useState({})
  const [apiState, setApiState] = React.useState({
    hasApiCalled: false,
    hasApiError: false,
  })
  React.useEffect(() => {
    if (!apiState.hasApiCalled) {
      getCalendar()
        .then(res => {
          setApiState({
            ...apiState,
            hasApiCalled: true,
          })
          setData(res)
        })
        .catch(() => {
          setApiState({
            hasApiCalled: true,
            hasApiError: true,
          })
        })
    }
  })
  console.log(data, apiState)
  if (!apiState.hasApiCalled || apiState.hasApiError) return null
  return (
    <DivGrid>
      <CalendarCard />
    </DivGrid>
  )
})

export default CalendarContainer
