import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { unregister } from './service-worker'
import App from './App'
import 'moment/locale/zh-cn'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_NAME: string
    }
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.app-container') as HTMLElement
)

unregister()
