import * as React from 'react'
import { Theme, lightThemeColors, darkThemeColors } from 'src/config'
import { ThemeContext } from '../ThemeContext'
import Container from './Container'

interface IThemeProviderProps {
  theme?: Theme,
  children: React.ReactNode
}

const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = ({
  theme = Theme.Light, children,
}) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme)
  const colors = currentTheme === Theme.Light ? lightThemeColors : darkThemeColors
  const changeTheme = () => {
    setCurrentTheme(currentTheme === Theme.Dark ? Theme.Light : Theme.Dark)
  }
  return (
    <ThemeContext.Provider value={{ theme: currentTheme, changeTheme, colors }}>
      <Container>
        {children}
      </Container>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider