import * as React from 'react'
import { List } from 'src/components'
import { StoreContext } from 'src/store'
import { ApiService } from 'src/services'
import { IEvent } from 'src/types'
import { EventType } from 'src/config'
import ForkEvent from './ForkEvent'
import WatchEvent from './WatchEvent'
import PublicEvent from './PublicEvent'

export interface IEventsState {
  loading: boolean
  events: IEvent[]
}

class Events extends React.Component<any, IEventsState> {

  public static contextType = StoreContext
  public readonly context: React.ContextType<typeof StoreContext>

  private page = 0

  constructor(props: any) {
    super(props)
    this.state = {
      loading: false,
      events: [],
    }
  }

  public componentDidMount() {
    this.fetchEvents()
  }

  public render() {
    const { loading, events } = this.state
    return (
      <List 
        loading={loading}
        list={events}
        renderItem={this.renderEvent}
      />
    )
  }

  private renderEvent(event: IEvent) {
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

  private fetchEvents = async () => {
    try {
      this.setState({ loading: true })
      const service = new ApiService<IEvent[]>('users')
      const evts = await service.get({
        path: `${this.context.login}/received_events`,
        data: {
          per_page: 30,
          page: ++this.page,
        }
      })
      console.log(evts)
      this.setState(({ events }) => {
        return {
          events: events.concat(evts),
          loading: false,
        }
      })
    } catch (e) {
      console.log(e)
      this.setState({ loading: false })
    }
  }
}

export default Events 