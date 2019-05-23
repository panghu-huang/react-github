import * as React from 'react'
import { Text } from 'src/theme'

const Strong: React.FunctionComponent = ({ children }) => {
  return (
    <strong><Text>{children}</Text></strong>
  )
}

export default Strong