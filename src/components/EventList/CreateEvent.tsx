import * as React from 'react'
import { IEvent, ICreateEventPayload } from 'src/types'
import EventContainer from './EventContainer'
import RepositoryLink from './RepositoryLink'
import Wrapper from './Wrapper'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface ICreateEventProps {
  event: IEvent
}

const CreateEvent: React.FunctionComponent<ICreateEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { ref_type, ref } = payload as ICreateEventPayload
  if (ref_type === 'repository') {
    return (
      <EventContainer
        type='create-repo'
        description='create a repository'
        actor={actor}
        time={created_at}>
        <Wrapper fullName={repo.name}/>
      </EventContainer>
    )
  } else if (ref_type === 'branch') {
    return (
      <div className={classes.header}>
          <Avatar user={actor} />
          <div>
            <Key>创建了</Key>
            <RepositoryLink fullName={repo.name}/>
            <Key>的</Key>
            <strong>{ref}</strong>
            <Key>分支</Key>
          </div>
          <Time time={created_at} />
        </div>
    )
  }
  return null
}

export default CreateEvent