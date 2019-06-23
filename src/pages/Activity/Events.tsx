import * as React from 'react'
import { EventList } from 'src/containers'
import { useFetch } from 'src/hooks'
import { StoreContext } from 'src/store'
import { IEvent } from 'src/types'

const Events: React.FunctionComponent = () => {
  const context = React.useContext(StoreContext)
  const { data, fetchData, loading, hasLoadAll } = useFetch<IEvent[]>({
    routeName: 'users',
    path: `${context.login}/events`,
  })
  return (
    <EventList
      loading={loading}
      events={data || []}
      loadMore={fetchData}
      hasLoadAll={hasLoadAll}
    />
  )
}

export default Events
