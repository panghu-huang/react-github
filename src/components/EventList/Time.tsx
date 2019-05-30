import * as React from 'react'
import { TimeUtils } from 'src/utils'
import classes from './Events.module.scss'

interface ITimeProps {
  time: string
}

const Time: React.FunctionComponent<ITimeProps> = ({ time }) => {
  return (
    <span className={classes.time}>{TimeUtils.fromNow(time)}</span>
  )
}

export default Time