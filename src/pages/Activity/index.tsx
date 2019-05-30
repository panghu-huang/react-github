import * as React from 'react'
import { Page, Tabs } from 'src/components'
import ReceivedEvents from './ReceivedEvents'
import Events from './Events'

const Activity: React.FunctionComponent = () => {
  return (
    <Page title='activities'>
      <Tabs>
        <Tabs.TabPane
          tabKey='received_events'
          title='Received Events'>
          <ReceivedEvents/>
        </Tabs.TabPane>
        <Tabs.TabPane
          tabKey='events'
          title='Events'>
          <Events/>
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

export default Activity