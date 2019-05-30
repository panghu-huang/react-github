import * as React from 'react'
import { IEvent, IPushEventPayload } from 'src/types'
import RepositoryLink from './RepositoryLink'
import LoginLink from './LoginLink'
import Avatar from '../Avatar'
import Time from './Time'
import Key from './Key'
import classes from './Events.module.scss'

interface IPushEventProps {
  event: IEvent
}

const PushEvent: React.FunctionComponent<IPushEventProps> = ({ event }) => {
  const { actor, repo, created_at, payload } = event
  const { ref, commits } = payload as IPushEventPayload
  return (
    <div>
      <div className={classes.header}>
        <Avatar user={actor} />
        <div>
          <LoginLink login={actor.login}/>
          <Key>往</Key>
          <RepositoryLink fullName={repo.name}/>
          <Key>的</Key>
          <strong>{ref}</strong>
          <Key>推送了</Key>
        </div>
        <Time time={created_at} />
      </div>
      <div>
        {commits.map(commit => {
          return (
            <div key={commit.sha}>
              <strong>{commit.author.name}</strong>: <span>{commit.message}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PushEvent