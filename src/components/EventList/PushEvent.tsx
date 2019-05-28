import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ItemWrapper } from 'src/components'
import { Text } from 'src/theme'
import { IEvent, IPushEventPayload } from 'src/types'
import Avatar from '../Avatar'
import Time from './Time'
import Strong from './Strong'
import Key from './Key'
import classes from './Events.module.scss'

interface IPushEventProps {
  event: IEvent
}

const PushEvent: React.FunctionComponent<IPushEventProps> = ({ event }) => {
  const { actor, repo, created_at, payload } = event
  const { ref, commits } = payload as IPushEventPayload
  return (
    <ItemWrapper>
      <Card.Header className={classes.header}>
        <Avatar user={actor} />
        <div>
          <Strong>{actor.login}</Strong>
          <Key>往</Key>
          <Strong>{repo.name}</Strong>
          <Key>的</Key>
          <Strong>{ref}</Strong>
          <Key>推送了</Key>
        </div>
        <Time time={created_at} />
      </Card.Header>
      <Card.Body>
        {commits.map(commit => {
          return (
            <div key={commit.sha}>
              <Strong>{commit.author.name}</Strong>: <Text>{commit.message}</Text>
            </div>
          )
        })}
      </Card.Body>
    </ItemWrapper>
  )
}

export default PushEvent