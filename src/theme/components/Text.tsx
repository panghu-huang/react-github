import * as React from 'react'
import { ThemeContext } from '../ThemeContext'

interface ITextProps extends React.AllHTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode,
}

const Text: React.FunctionComponent<ITextProps> = ({ children, ...restProps }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <span style={{ color: colors.textColor }} {...restProps}>
      {children}
    </span>
  )
}

export default Text