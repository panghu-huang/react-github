import * as React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Page } from 'src/components'
import ReceivedEvents from './ReceivedEvents'
import Events from './Events'

const Activity: React.FunctionComponent = () => {
  const [activeKey, setActiveKey] = React.useState('received_events')
  const handleSelect = (key: string) => {
    setActiveKey(key)
  }
  return (
    <Page title={activeKey}>
      <Tabs
        id='event-tabs'
        activeKey={activeKey}
        onSelect={handleSelect}>
        <Tab
          eventKey='received_events'
          title='Received Events'
          className='tab-item'>
          <ReceivedEvents />
        </Tab>
        <Tab
          eventKey='events'
          title='Events'
          className='tab-item'>
          <Events activeKey={activeKey} />
        </Tab>
      </Tabs>
    </Page>
  )
}

export default Activity