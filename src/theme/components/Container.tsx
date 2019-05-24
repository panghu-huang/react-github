import * as React from 'react'
import { ThemeContext } from '../ThemeContext'

interface IContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
}

const Container: React.FunctionComponent<IContainerProps> = ({ children, style, ...otherProps }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <section 
      {...otherProps}
      style={{ ...style, backgroundColor: colors.backgroundColor }}>
      {children}
    </section>
  )
}

export default Container