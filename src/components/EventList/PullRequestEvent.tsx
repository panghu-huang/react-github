import * as React from 'react'
import { IEvent, IPullRequestEventPayload } from 'src/types'
import RepositoryLink from './RepositoryLink'
import LoginLink from './LoginLink'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface IPullRequestEventProps {
  event: IEvent
}

const PullRequestEvent: React.FunctionComponent<IPullRequestEventProps> = ({ event }) => {
  const { actor, repo, created_at, payload } = event
  const { action, pull_request } = payload as IPullRequestEventPayload
  const actionCn = action === 'opened' ? '打开了' : '关闭了'
  return (
    <div>
      <div className={classes.header}>
        <Avatar user={actor} />
        <div>
          <LoginLink login={actor.login}/>
          <Key>{actionCn}</Key>
          <RepositoryLink fullName={repo.name}/>
          <Key>的</Key>
          <strong>{pull_request.title}</strong>
        </div>
        <Time time={created_at} />
      </div>
      {pull_request.body && (
        <p>{pull_request.body}</p>
      )}
    </div>
  )
}

export default PullRequestEvent