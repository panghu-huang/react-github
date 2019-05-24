import * as React from 'react'
import { Text } from 'src/theme'
import { TimeUtils } from 'src/utils'
import classes from './Events.module.scss'

interface ITimeProps {
  time: string
}

const Time: React.FunctionComponent<ITimeProps> = ({ time }) => {
  return (
    <Text className={classes.time}>{TimeUtils.fromNow(time)}</Text>
  )
}

export default Time