import * as React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { StoreContext, actions, storer } from 'src/store'
import { Header } from 'src/containers'
import { ThemeProvider } from 'src/theme'
import { 
  Theme, 
  SAVED_THEME_KEY, 
  DEFAULT_LOGIN_NAME 
} from 'src/config'
import { IStore } from 'src/types'
import routes from './routes'
import './global.scss'

class App extends React.Component<any, IStore> {
  private readonly theme: Theme;

  constructor(props: any) {
    super(props);
    this.state = {
      login: DEFAULT_LOGIN_NAME,
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
