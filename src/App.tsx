import * as React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { Header } from 'src/containers'
import { StoreContext, actions, storer } from 'src/store'
import { ThemeProvider } from 'src/theme'
import { IStore } from 'src/types'
import { Theme, SAVED_THEME_KEY } from 'src/config'
import routes from './routes'
import './global.scss'

class App extends React.Component<any, IStore> {
  private readonly theme: Theme;

  constructor(props: any) {
    super(props);
    this.state = {
      login: 'wokeyi',
      history: actions.history,
    }
    storer.bindSetStore(this.setState as any)
    this.theme = this.getThemeConfigFromStorage()
  }

  public render() {
    return (
      <ThemeProvider theme={this.theme}>
        <StoreContext.Provider value={this.state}>
          <Header />
          <Router history={actions.history}>
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
          </Router>
        </StoreContext.Provider>
      </ThemeProvider>
    )
  }

  private getThemeConfigFromStorage() {
    const theme = localStorage.getItem(SAVED_THEME_KEY)
    if (theme) {
      return theme === Theme.Light ? Theme.Light : Theme.Dark
    }
    return Theme.Light
  }
}

export default App
