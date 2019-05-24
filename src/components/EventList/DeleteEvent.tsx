import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ItemWrapper } from 'src/components'
import { IEvent, IDeleteEventPayload } from 'src/types'
import Avatar from './Avatar'
import Time from './Time'
import Strong from './Strong'
import Key from './Key'
import classes from './Events.module.scss'

interface IDeleteEventProps {
  event: IEvent
}

const DeleteEvent: React.FunctionComponent<IDeleteEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { ref_type, ref } = payload as IDeleteEventPayload
  const getDescription = () => {
    switch (ref_type) {
      case 'branch': 
        return (
          <>
            <Key>删除了</Key>
            <Strong>{repo.name}</Strong>
            <Key>的</Key>
            <Strong>{ref}</Strong>
            <Key>分支</Key>
          </>
        )
      case 'repository':
        return (
          <>
            <Key>删除了</Key>
            <Strong>{repo.name} 仓库</Strong>
          </>
        )
      default:
        return null
    }
  }
  return (
    <ItemWrapper>
      <Card.Body className={classes.header}>
        <Avatar user={actor} />
        <div>{getDescription()}</div>
        <Time time={created_at} />
      </Card.Body>
    </ItemWrapper>
  )
}

export default DeleteEvent