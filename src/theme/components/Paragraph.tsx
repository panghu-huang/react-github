import * as React from 'react'
import { ThemeContext } from '../ThemeContext'

interface IParagraphProps {
  children: React.ReactNode,
}

const Paragraph: React.FunctionComponent<IParagraphProps> = ({ children }) => {
  const { colors } = React.useContext(ThemeContext)
  return (
    <p style={{ color: colors.textColor, margin: 0 }}>
      {children}
    </p>
  )
}

export default Paragraph