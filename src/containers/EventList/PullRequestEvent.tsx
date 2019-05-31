import * as React from 'react'
import { IEvent, IPullRequestEventPayload } from 'src/types/index'
import EventContainer from './EventContainer'
import Avatar from '../../components/Avatar/index'
import Wrapper from './Wrapper'
import classes from './Events.module.scss'

interface IPullRequestEventProps {
  event: IEvent
}

const PullRequestEvent: React.FunctionComponent<IPullRequestEventProps> = ({ event }) => {
  const { actor, repo, created_at, payload } = event
  const { action, pull_request } = payload as IPullRequestEventPayload
  return (
    <EventContainer
      type='pull-request'
      description={`${action} a pull request`}
      actor={actor}
      time={created_at}>
      <Wrapper fullName={repo.name}/>
      <div className={classes.wrapper}>
        <Avatar repoFullName={actor.login}/>
        <strong>{pull_request.body || pull_request.title}</strong>
      </div>
    </EventContainer>
  )
}

export default PullRequestEvent