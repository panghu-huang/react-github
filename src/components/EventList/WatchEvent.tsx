import * as React from 'react'
import { IEvent } from 'src/types'
import LoginLink from './LoginLink'
import RepositoryLink from './RepositoryLink'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface IWatchEventProps {
  event: IEvent
}

const WatchEvent: React.FunctionComponent<IWatchEventProps> = ({ event }) => {
  const { actor, repo, created_at } = event
  return (
    <div className={classes.header}>
      <Avatar user={actor} />
      <div>
        <LoginLink login={actor.login} />
        <Key>starred</Key>
        <RepositoryLink fullName={repo.name} />
      </div>
      <Time time={created_at} />
    </div>
  )
}

export default WatchEvent