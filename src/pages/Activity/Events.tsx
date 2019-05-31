import * as React from 'react'
import { EventList } from 'src/containers'
import { StoreContext } from 'src/store'
import { ApiService } from 'src/services'
import { IEvent } from 'src/types'
import { DEFAULT_PAGE_SIZE } from 'src/config'

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
        path: `${context.login}/events`,
        data: {
          page: ++page,
        },
      })
      if (evts.length < DEFAULT_PAGE_SIZE) {
        setHasLoadAll(true)
      }
      setEvents(events.concat(evts))
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