import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { unregister } from './service-worker'
import App from './App'
import 'moment/locale/zh-cn'

ReactDOM.render(
  <App />,
  document.querySelector('.app-container') as HTMLElement
)

unregister()
