import * as React from 'react'
import { ThemeContext } from '../ThemeContext'

interface ITitleProps extends React.AllHTMLAttributes<HTMLElement> {
  children: React.ReactNode,
}

const Title: React.FunctionComponent<ITitleProps> = ({ children, style, ...restProps }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <h3 style={{ color: colors.titleColor, margin: 0, ...style }} {...restProps}>
      {children}
    </h3>
  )
}

export default Title