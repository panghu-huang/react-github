import * as React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { Text, Title } from 'src/theme'
import { IEvent, IForkEventPayload } from 'src/types'
import Time from './Time'
import Strong from './Strong'
import Key from './Key'
import classes from './Events.module.scss'

interface IForkEventProps {
  event: IEvent
}

const ForkEvent: React.FunctionComponent<IForkEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const forkEventPaylaod = payload as IForkEventPayload
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
            <Key>forked</Key>
            <Strong>{forkEventPaylaod.forkee.full_name}</Strong>
            <Key>from</Key>
            <Strong>{repo.name}</Strong>
          </div>
          <Time time={created_at} />
        </Card.Header>
        <Card.Body>
          <Title>{repo.name}</Title>
          <p>
            <Text>{forkEventPaylaod.forkee.description}</Text>
          </p>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}

export default ForkEvent