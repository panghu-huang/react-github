import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ItemWrapper } from 'src/components'
import { Title, Text } from 'src/theme'
import { IEvent, ICreateEventPayload } from 'src/types'
import Avatar from './Avatar'
import Time from './Time'
import Strong from './Strong'
import Key from './Key'
import classes from './Events.module.scss'

interface ICreateEventProps {
  event: IEvent
}

const CreateEvent: React.FunctionComponent<ICreateEventProps> = ({ event }) => {
  const { payload, actor, repo, created_at } = event
  const { ref_type, ref, description } = payload as ICreateEventPayload
  if (ref_type === 'repository') {
    return (
      <ItemWrapper>
        <Card.Header className={classes.header}>
          <Avatar user={actor} />
          <div>
            <Key>创建了</Key>
            <Strong>{repo.name}</Strong>
            <Key>仓库</Key>
          </div>
          <Time time={created_at} />
        </Card.Header>
        <Card.Body>
          <Title>{repo.name}</Title>
          <Text>{description}</Text>
        </Card.Body>
      </ItemWrapper>
    )
  } else if (ref_type === 'branch') {
    return (
      <ItemWrapper>
        <Card.Body className={classes.header}>
          <Avatar user={actor} />
          <div>
            <Key>创建了</Key>
            <Strong>{repo.name}</Strong>
            <Key>的</Key>
            <Strong>{ref}</Strong>
            <Key>分支</Key>
          </div>
          <Time time={created_at} />
        </Card.Body>
      </ItemWrapper>
    )
  }
  return null
}

export default CreateEvent