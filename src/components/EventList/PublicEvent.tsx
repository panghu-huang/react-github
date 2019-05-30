import * as React from 'react'
import { IEvent } from 'src/types'
import RepositoryLink from './RepositoryLink'
import LoginLink from './LoginLink'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface IPublicEventProps {
  event: IEvent
}

const PublicEvent: React.FunctionComponent<IPublicEventProps> = ({ event }) => {
  const { actor, repo, created_at } = event
  return (
    <div className={classes.header}>
      <Avatar user={actor} />
      <div>
        <LoginLink login={actor.login} />
        <Key>made</Key>
        <RepositoryLink fullName={repo.name} />
        <Key>public</Key>
      </div>
      <Time time={created_at} />
    </div>
  )
}

export default PublicEvent