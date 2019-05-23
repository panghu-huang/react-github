import * as React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { Text, Title } from 'src/theme'
import { IEvent } from 'src/types'
import Time from './Time'
import Strong from './Strong'
import Key from './Key'
import classes from './Events.module.scss'

interface IPublicEventProps {
  event: IEvent
}

const PublicEvent: React.FunctionComponent<IPublicEventProps> = ({ event }) => {
  const { actor, repo, created_at } = event
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
            <Key>made</Key>
            <Strong>{repo.name}</Strong>
            <Key>public</Key>
          </div>
          <Time time={created_at} />
        </Card.Header>
        <Card.Body>
          <Title>{repo.name}</Title>
          <p>
            <Text>dddd</Text>
          </p>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}

export default PublicEvent