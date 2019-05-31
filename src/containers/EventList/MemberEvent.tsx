import * as React from 'react'
import { Avatar } from 'src/components'
import { IEvent, IMemberEventPayload } from 'src/types'
import EventContainer from './EventContainer'
import Wrapper from './Wrapper'
import LoginLink from './LoginLink'
import classes from './Events.module.scss'

interface IMemberEventProps {
  event: IEvent
}

const MemberEvent: React.FunctionComponent<IMemberEventProps> = ({ event }) => {
  const { actor, repo, created_at, payload } = event
  const { action, member } = payload as IMemberEventPayload
  const description = action === 'added'
    ? 'added an user to a repository'
    : 'none'
  return (
    <EventContainer
      type='member'
      description={description}
      actor={actor}
      time={created_at}>
      <Wrapper fullName={repo.name}/>
      <div className={classes.wrapper}>
        <Avatar user={member} size={24}/>
        <LoginLink login={member.login}/>
      </div>
    </EventContainer>
  )
}

export default MemberEvent