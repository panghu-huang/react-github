import * as React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { Header } from 'src/containers'
import { actions, storer } from 'src/store'
import { ThemeProvider } from 'src/theme'
import { Theme, SAVED_THEME_KEY } from 'src/config'
import routes from './routes'
import './global.scss'

class App extends React.Component {
  private readonly theme: Theme;

  constructor(props: any) {
    super(props);
    storer.bindSetStore(this.setState)
    this.theme = this.getThemeConfigFromStorage()
  }

  public render() {
    return (
      <ThemeProvider theme={this.theme}>
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
