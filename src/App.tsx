import * as React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { StoreContext, actions, storer } from 'src/store'
import { Header } from 'src/containers'
import { DEFAULT_LOGIN_NAME, THEME_COLORS } from 'src/config'
import { IStore } from 'src/types'
import routes from './routes'
import './global.scss'

class GithubApp extends React.Component<any, IStore> {

  constructor(props: any) {
    super(props)
    this.state = {
      login: DEFAULT_LOGIN_NAME,
    }
    storer.bindSetStore(this.setState as any)
  }

  public componentDidMount() {
    this.getThemeColors()
  }

  public render() {
    return (
      <Router history={actions.history}>
        <StoreContext.Provider value={this.state}>
          <Header />
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

}

export default GithubApp
