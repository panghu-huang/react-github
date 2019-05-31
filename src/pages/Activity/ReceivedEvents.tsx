import * as React from 'react'
import { EventList } from 'src/containers'
import { StoreContext } from 'src/store'
import { ApiService } from 'src/services'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IEvent } from 'src/types'

let page = 0

const Events: React.FunctionComponent = () => {
  const context = React.useContext(StoreContext)
  const [loading, setLoading] = React.useState(true)
  const [events, setEvents] = React.useState<IEvent[]>([])
  const [hasLoadAll, setHasLoadAll] = React.useState(false)
  const fetchEvents = async () => {
    try {
      setLoading(true)
      const service = new ApiService<IEvent[]>('users')
      const evts = await service.get({
        path: `${context.login}/received_events`,
        data: {
          page: ++page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      setEvents(events.concat(evts))
      if (evts.length < DEFAULT_PAGE_SIZE) {
        setHasLoadAll(true)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    page = 0
    fetchEvents()
  } ,[])
  return (
    <EventList 
      loading={loading}
      events={events}
      loadMore={fetchEvents}
      hasLoadAll={hasLoadAll}
    />
  )
}

export default Events 