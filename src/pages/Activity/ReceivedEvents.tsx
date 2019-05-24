import * as React from 'react'
import { EventList } from 'src/components'
import { StoreContext } from 'src/store'
import { ApiService } from 'src/services'
import { IEvent } from 'src/types'

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
  React.useEffect(() => {
    fetchEvents()
  } ,[])
  return (
    <EventList 
      loading={loading}
      events={events}
    />
  )
}

export default Events 