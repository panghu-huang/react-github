import * as React from 'react'
import { IEvent } from 'src/types/index'
import EventContainer from './EventContainer'
import Wrapper from './Wrapper'

interface IWatchEventProps {
  event: IEvent
}

const WatchEvent: React.FunctionComponent<IWatchEventProps> = ({ event }) => {
  const { actor, repo, created_at } = event
  return (
    <EventContainer
      type='star'
      description='starred a repository'
      actor={actor}
      time={created_at}>
      <Wrapper fullName={repo.name}/>
    </EventContainer>
  )
}

export default WatchEvent