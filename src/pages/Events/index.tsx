import * as React from 'react'
import { List } from 'src/components'
import { StoreContext } from 'src/store'
import { ApiService } from 'src/services'
import { IEvent } from 'src/types'
import { EventType } from 'src/config'
import ForkEvent from './ForkEvent'
import WatchEvent from './WatchEvent'
import PublicEvent from './PublicEvent'

const Events: React.FunctionComponent = () => {
  const context = React.useContext(StoreContext)
  const [loading, setLoading] = React.useState(true)
  const [events, setEvents] = React.useState<IEvent[]>([])
  const fetchEvents = async () => {
    try {
      setLoading(true)
      const service = new ApiService<IEvent[]>('users')
      const evts = await service.get({
        path: `${context.login}/received_events`
      })
      setEvents(evts)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  const renderEvent = (event: IEvent) => {
    switch(event.type) {
      case EventType.ForkEvent:
        return (
          <ForkEvent key={event.id} event={event}/>
        )
      case EventType.WatchEvent:
        return (
          <WatchEvent key={event.id} event={event}/>
        )
      case EventType.PublicEvent:
        return (
          <PublicEvent key={event.id} event={event}/>
        )
      default:
        return null
    }
  }
  React.useEffect(() => {
    fetchEvents()
  } ,[])
  return (
    <List 
      loading={loading}
      list={events}
      renderItem={renderEvent}
    />
  )
}

export default Events 