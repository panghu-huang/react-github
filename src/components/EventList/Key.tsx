import * as React from 'react'
import { Text } from 'src/theme'
import classes from './Events.module.scss'

const Key: React.FunctionComponent = ({ children }) => {
  return (
    <Text className={classes.key}>{children}</Text>
  )
}

export default Key