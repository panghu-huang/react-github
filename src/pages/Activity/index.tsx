import * as React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ReceivedEvents from './ReceivedEvents'
import Events from './Events'
import classes from './Activity.module.scss'

const Activity: React.FunctionComponent = () => {
  const [activeKey, setActiveKey] = React.useState('received_events')
  const handleSelect = (key: string) => {
    setActiveKey(key)
  }
  return (
    <Tabs 
      id='event-tabs' 
      className={classes.container}
      activeKey={activeKey}
      onSelect={handleSelect}>
      <Tab 
        eventKey='received_events' 
        title='Received Events'
        className={classes.tab}>
        <ReceivedEvents />
      </Tab>
      <Tab 
        eventKey='events'
        title='Events'
        className={classes.tab}>
        <Events activeKey={activeKey} />
      </Tab>
    </Tabs>
  )
}

export default Activity