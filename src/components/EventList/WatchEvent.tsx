import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ItemWrapper } from 'src/components'
import { IEvent, IWatchEventPayload } from 'src/types'
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
  const { payload, actor, repo, created_at } = event
  const { action } = payload as IWatchEventPayload
  return (
    <ItemWrapper>
      <Card.Body className={classes.header}>
        <Avatar user={actor} />
        <div>
          <LoginLink login={actor.login}/>
          <Key>{action}</Key>
          <RepositoryLink fullName={repo.name}/>
        </div>
        <Time time={created_at} />
      </Card.Body>
    </ItemWrapper>
  )
}

export default WatchEvent