import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ItemWrapper } from 'src/components'
import { IEvent } from 'src/types'
import Avatar from './Avatar'
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
    <ItemWrapper>
      <Card.Header className={classes.header}>
        <Avatar user={actor} />
        <div>
          <Strong>{actor.login}</Strong>
          <Key>made</Key>
          <Strong>{repo.name}</Strong>
          <Key>public</Key>
        </div>
        <Time time={created_at} />
      </Card.Header>
    </ItemWrapper>
  )
}

export default PublicEvent