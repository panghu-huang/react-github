import * as React from 'react'
import { IEvent } from 'src/types'
import { EventType } from 'src/config'
import List from '../List'
import ForkEvent from './ForkEvent'
import PushEvent from './PushEvent'
import DeleteEvent from './DeleteEvent'
import WatchEvent from './WatchEvent'
import PublicEvent from './PublicEvent'
import CreateEvent from './CreateEvent'
import PullRequestEvent from './PullRequestEvent'

interface IEventListProps {
  loading: boolean
  events: IEvent[]
  loadMore?: () => void
  hasLoadAll?: boolean
}

const EventList: React.FunctionComponent<IEventListProps> = ({
  loading, events, loadMore, hasLoadAll,
}) => {
  const renderEvent = (event: IEvent) => {
    switch (event.type) {
      case EventType.ForkEvent:
        return (
          <ForkEvent key={event.id} event={event} />
        )
      case EventType.WatchEvent:
        return (
          <WatchEvent key={event.id} event={event} />
        )
      case EventType.PublicEvent:
        return (
          <PublicEvent key={event.id} event={event} />
        )
      case EventType.DeleteEvent:
        return (
          <DeleteEvent key={event.id} event={event} />
        )
      case EventType.PushEvent:
        return (
          <PushEvent key={event.id} event={event} />
        )
      case EventType.PullRequestEvent:
        return (
          <PullRequestEvent key={event.id} event={event} />
        )
      case EventType.CreateEvent:
        return (
          <CreateEvent key={event.id} event={event} />
        )
      default:
        return null
    }
  }
  return (
    <List 
      loading={loading}
      list={events}
      renderItem={renderEvent}
      loadMore={loadMore}
      hasLoadAll={hasLoadAll}
    />
  )
}

export default EventList 