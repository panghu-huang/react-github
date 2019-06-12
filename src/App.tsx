import * as React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { StoreContext, actions, storer } from 'src/store'
import { Header } from 'src/containers'
import { DEFAULT_LOGIN_NAME, THEME_COLORS, SAVED_LOGIN_KEY } from 'src/config'
import { IStore } from 'src/types'
import routes from './routes'
import './global.scss'

interface IGithubAppState {
  store: IStore
}

class GithubApp extends React.Component<any, IGithubAppState> {

  constructor(props: any) {
    super(props)
    this.state = {
      store: {
        login: this.getLoginName(),
      },
    }
    storer.bindSetStore(this.setState.bind(this))
  }

  public componentDidMount() {
    this.getThemeColors()
  }

  public render() {
    return (
      <Router history={actions.history}>
        <StoreContext.Provider value={this.state.store}>
          <Header/>
          <Switch>
            {routes.map(route => {
              return (
                <Route
                  exact={true}
                  key={route.path as string}
                  {...route}
                />
              )
            })}
          </Switch>
        </StoreContext.Provider>
      </Router>
    )
  }

  private getThemeColors() {
    THEME_COLORS.forEach(({ value }) => {
      const color = localStorage.getItem(value)
      if (color) {
        document.body.style.setProperty(value, color)
      }
    })
  }

  private getLoginName() {
    return localStorage.getItem(SAVED_LOGIN_KEY)
      || DEFAULT_LOGIN_NAME
  }

}

export default GithubApp
