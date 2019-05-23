import * as React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { IEvent, IWatchEventPayload } from 'src/types'
import Avatar from './Avatar'
import Time from './Time'
import Strong from './Strong'
import Key from './Key'
import classes from './Events.module.scss'

interface IWatchEventProps {
  event: IEvent
}

const WatchEvent: React.FunctionComponent<IWatchEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const watchEventPayload = payload as IWatchEventPayload
  return (
    <ListGroup.Item>
      <Card>
        <Card.Body className={classes.header}>
          <Avatar user={actor}/>
          <div>
            <Strong>{actor.login}</Strong>
            <Key>{watchEventPayload.action}</Key>
            <Strong>{repo.name}</Strong>
          </div>
          <Time time={created_at} />
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}

export default WatchEvent