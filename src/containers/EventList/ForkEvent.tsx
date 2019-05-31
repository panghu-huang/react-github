import * as React from 'react'
import { IEvent, IForkEventPayload } from 'src/types'
import EventContainer from './EventContainer'
import Wrapper from './Wrapper'

interface IForkEventProps {
  event: IEvent
}

const ForkEvent: React.FunctionComponent<IForkEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { forkee } = payload as IForkEventPayload
  return (
    <EventContainer
      type='fork'
      description='forked a repository'
      actor={actor}
      time={created_at}>
      <Wrapper fullName={forkee.full_name}/>
      <Wrapper fullName={repo.name}/>
    </EventContainer>
  )
}

export default ForkEvent