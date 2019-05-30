import * as React from 'react'
import { IEvent, IForkEventPayload } from 'src/types'
import RepositoryLink from './RepositoryLink'
import LoginLink from './LoginLink'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface IForkEventProps {
  event: IEvent
}

const ForkEvent: React.FunctionComponent<IForkEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { forkee } = payload as IForkEventPayload
  return (
    <div>
      <div className={classes.header}>
        <Avatar user={actor} />
        <div>
          <LoginLink login={actor.login}/>
          <Key>forked</Key>
          <RepositoryLink fullName={forkee.full_name}/>
          <Key>from</Key>
          <RepositoryLink fullName={repo.name}/>
        </div>
        <Time time={created_at} />
      </div>
      <div>
        <p>
          <RepositoryLink fullName={repo.name}/>
        </p>
        <p>{forkee.description}</p>
      </div>
    </div>
  )
}

export default ForkEvent