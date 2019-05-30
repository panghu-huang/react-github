import * as React from 'react'
import { IEvent, IPushEventPayload } from 'src/types'
import EventContainer from './EventContainer'
import Wrapper from './Wrapper'

interface IPushEventProps {
  event: IEvent
}

const PushEvent: React.FunctionComponent<IPushEventProps> = ({ event }) => {
  const { actor, repo, created_at, payload } = event
  const { ref, commits } = payload as IPushEventPayload
  return (
    <EventContainer
      type='pull-request'
      description={`往 ${ref.replace('refs/heads/', '')} 分支推送了`}
      actor={actor}
      time={created_at}>
      <Wrapper fullName={repo.name}/>
      <div>
        {commits.map(commit => {
          return (
            <div key={commit.sha}>
              <strong>{commit.author.name}</strong>: <span>{commit.message}</span>
            </div>
          )
        })}
      </div>
    </EventContainer>
  )
}

export default PushEvent