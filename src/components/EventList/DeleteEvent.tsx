import * as React from 'react'
import { IEvent, IDeleteEventPayload } from 'src/types'
import RepositoryLink from './RepositoryLink'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface IDeleteEventProps {
  event: IEvent
}

const DeleteEvent: React.FunctionComponent<IDeleteEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { ref_type, ref } = payload as IDeleteEventPayload
  const getDescription = () => {
    switch (ref_type) {
      case 'branch': 
        return (
          <>
            <Key>删除了</Key>
            <RepositoryLink fullName={repo.name}/>
            <Key>的</Key>
            <strong>{ref}</strong>
            <Key>分支</Key>
          </>
        )
      case 'repository':
        return (
          <>
            <Key>删除了</Key>
            <strong>{repo.name} 仓库</strong>
          </>
        )
      default:
        return null
    }
  }
  return (
    <div className={classes.header}>
      <Avatar user={actor} />
      <div>{getDescription()}</div>
      <Time time={created_at} />
    </div>
  )
}

export default DeleteEvent