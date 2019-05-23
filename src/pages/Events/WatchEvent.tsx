import * as React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { Text, Title } from 'src/theme'
import { IEvent, IWatchEventPayload } from 'src/types'
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
        <Card.Header className={classes.header}>
          <img 
            className={classes.avatar}
            src={actor.avatar_url} 
            alt={actor.login} 
          />
          <div>
            <Strong>{actor.login}</Strong>
            <Key>{watchEventPayload.action}</Key>
            <Strong>{repo.name}</Strong>
          </div>
          <Time time={created_at} />
        </Card.Header>
        <Card.Body>
          <Title>{repo.name}</Title>
          <p>
            <Text>description</Text>
          </p>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}

export default WatchEvent