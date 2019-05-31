import * as React from 'react'
import { IEvent, IDeleteEventPayload } from 'src/types/index'
import EventContainer from './EventContainer'
import Wrapper from './Wrapper'

interface IDeleteEventProps {
  event: IEvent
}

const DeleteEvent: React.FunctionComponent<IDeleteEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { ref_type, ref } = payload as IDeleteEventPayload
  return (
    <EventContainer
      type='delete'
      description={`delete ${ref_type}: ${ref}`}
      actor={actor}
      time={created_at}>
      <Wrapper fullName={repo.name}/>
    </EventContainer>
  )
}

export default DeleteEvent