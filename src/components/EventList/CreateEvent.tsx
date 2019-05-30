import * as React from 'react'
import { IEvent, ICreateEventPayload } from 'src/types'
import RepositoryLink from './RepositoryLink'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface ICreateEventProps {
  event: IEvent
}

const CreateEvent: React.FunctionComponent<ICreateEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { ref_type, ref, description } = payload as ICreateEventPayload
  if (ref_type === 'repository') {
    return (
      <div>
        <div className={classes.header}>
          <Avatar user={actor} />
          <p>
            <Key>创建了</Key>
            <RepositoryLink fullName={repo.name}/>
          </p>
          <Time time={created_at} />
        </div>
        <div>
          <p>
            <RepositoryLink fullName={repo.name}/>
          </p>
          <p>{description}</p>
        </div>
      </div>
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