import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { unregister } from './service-worker'
import App from './App'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_NAME: string
      REACT_APP_CLIENT_ID: string
      REACT_APP_CLIENT_SECRET: string
    }
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.app-container') as HTMLElement
)

unregister()
