import * as React from 'react'
import { Page, Tabs } from 'src/components'
import ReceivedEvents from './ReceivedEvents'
import Events from './Events'

const Activity: React.FunctionComponent = () => {
  const [activeKey, setActiveKey] = React.useState('received_events')
  return (
    <Page title='activities'>
      <Tabs onTabChange={setActiveKey}>
        <Tabs.TabPane
          tabKey='received_events'
          title='Received Events'>
          <ReceivedEvents activeKey={activeKey}/>
        </Tabs.TabPane>
        <Tabs.TabPane
          tabKey='events'
          title='Events'>
          <Events activeKey={activeKey}/>
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

export default Activity