import * as React from 'react'
import { Avatar } from 'src/components'
import { IEvent, IPushEventPayload } from 'src/types'
import EventContainer from './EventContainer'
import classes from './Events.module.scss'

interface IPushEventProps {
  event: IEvent
}

const PushEvent: React.FunctionComponent<IPushEventProps> = ({ event }) => {
  const { actor, created_at, payload } = event
  const { ref, commits } = payload as IPushEventPayload
  const description = `往 ${ref.replace('refs/heads/', '')} 分支推送了`
  return (
    <EventContainer
      type='pull-request'
      description={description}
      actor={actor}
      time={created_at}>
      {commits.map(commit => (
        <div key={commit.sha} className={classes.wrapper}>
          <Avatar repoFullName={actor.login}/>
          <strong>{commit.message}</strong>
        </div>
      ))}
    </EventContainer>
  )
}

export default PushEvent