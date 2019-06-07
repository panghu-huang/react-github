import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { unregister } from './service-worker'
import App from './App'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_NAME: string
      REACT_APP_BASENAME: string
    }
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.app-container') as HTMLElement
)

unregister()
