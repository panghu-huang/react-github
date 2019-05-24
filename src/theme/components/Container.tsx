import * as React from 'react'
import { ThemeContext } from '../ThemeContext'

interface IContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
}

const Container: React.FunctionComponent<IContainerProps> = ({ children, style }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <div style={{ ...style, backgroundColor: colors.backgroundColor }}>
      {children}
    </div>
  )
}

export default Container