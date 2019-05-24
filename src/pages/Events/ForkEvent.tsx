import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ItemWrapper } from 'src/components'
import { Text, Title } from 'src/theme'
import { IEvent, IForkEventPayload } from 'src/types'
import Avatar from './Avatar'
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
    <ItemWrapper>
      <Card.Header className={classes.header}>
        <Avatar user={actor} />
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
    </ItemWrapper>
  )
}

export default ForkEvent