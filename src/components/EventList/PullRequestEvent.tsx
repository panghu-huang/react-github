import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ItemWrapper } from 'src/components'
import { Paragraph } from 'src/theme'
import { IEvent, IPullRequestEventPayload } from 'src/types'
import RepositoryLink from './RepositoryLink'
import LoginLink from './LoginLink'
import Avatar from '../Avatar'
import Time from './Time'
import Strong from './Strong'
import Key from './Key'
import classes from './Events.module.scss'

interface IPullRequestEventProps {
  event: IEvent
}

const PullRequestEvent: React.FunctionComponent<IPullRequestEventProps> = ({ event }) => {
  const { actor, repo, created_at, payload } = event
  const { action, pull_request } = payload as IPullRequestEventPayload
  const getAction = () => {
    switch (action) {
      case 'opened':
        return '打开了'
      case 'closed':
        return '关闭了'
      default: 
        return null
    }
  }
  return (
    <ItemWrapper>
      <Card.Header className={classes.header}>
        <Avatar user={actor} />
        <div>
          <LoginLink login={actor.login}/>
          <Key>{getAction()}</Key>
          <RepositoryLink fullName={repo.name}/>
          <Key>的</Key>
          <Strong>{pull_request.title}</Strong>
        </div>
        <Time time={created_at} />
      </Card.Header>
      {pull_request.body && (
        <Card.Body>
          <Paragraph>{pull_request.body}</Paragraph>
        </Card.Body>
      )}
    </ItemWrapper>
  )
}

export default PullRequestEvent