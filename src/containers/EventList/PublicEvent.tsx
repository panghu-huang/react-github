import * as React from 'react'
import { IEvent } from 'src/types'
import EventContainer from './EventContainer'
import Wrapper from './Wrapper'

interface IPublicEventProps {
  event: IEvent
}

const PublicEvent: React.FunctionComponent<IPublicEventProps> = ({ event }) => {
  const { actor, repo, created_at } = event
  return (
    <EventContainer
      type='unlock'
      description='make repository public'
      actor={actor}
      time={created_at}>
      <Wrapper fullName={repo.name}/>
    </EventContainer>
  )
}

export default PublicEvent