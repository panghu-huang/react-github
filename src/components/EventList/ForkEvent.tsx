import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ItemWrapper } from 'src/components'
import { Text, Title } from 'src/theme'
import { IEvent, IForkEventPayload } from 'src/types'
import RepositoryLink from './RepositoryLink'
import LoginLink from './LoginLink'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface IForkEventProps {
  event: IEvent
}

const ForkEvent: React.FunctionComponent<IForkEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { forkee } = payload as IForkEventPayload
  return (
    <ItemWrapper>
      <Card.Header className={classes.header}>
        <Avatar user={actor} />
        <div>
          <LoginLink login={actor.login}/>
          <Key>forked</Key>
          <RepositoryLink fullName={forkee.full_name}/>
          <Key>from</Key>
          <RepositoryLink fullName={repo.name}/>
        </div>
        <Time time={created_at} />
      </Card.Header>
      <Card.Body>
        <Title>
          <RepositoryLink fullName={repo.name}/>
        </Title>
        <p>
          <Text>{forkee.description}</Text>
        </p>
      </Card.Body>
    </ItemWrapper>
  )
}

export default ForkEvent