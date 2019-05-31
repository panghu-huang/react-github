import * as React from 'react'
import { IEvent, ICreateEventPayload } from 'src/types'
import EventContainer from './EventContainer'
import Wrapper from './Wrapper'

interface ICreateEventProps {
  event: IEvent
}

const CreateEvent: React.FunctionComponent<ICreateEventProps> = ({event}) => {
  const {payload, actor, repo, created_at} = event
  const {ref_type, ref} = payload as ICreateEventPayload
  const description = ref_type === 'repository'
    ? 'create a repository'
    : `create ${ref} branch`
  return (
    <EventContainer
      type='create-repo'
      description={description}
      actor={actor}
      time={created_at}>
      <Wrapper fullName={repo.name}/>
    </EventContainer>
  )
}

export default CreateEvent