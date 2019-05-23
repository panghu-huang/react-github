import * as React from 'react'
import classes from './Events.module.scss'

const Key: React.FunctionComponent = ({ children }) => {
  return (
    <span className={classes.key}>{children}</span>
  )
}

export default Key