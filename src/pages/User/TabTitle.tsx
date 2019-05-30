import * as React from 'react'
import { Text } from 'src/theme'
import classes from './User.module.scss'

interface ITabTitleProps {
  title: string
  count?: number
}

const TabTitle: React.FunctionComponent<ITabTitleProps> = ({
  title, count,
}) => {
  const formatted = count
    ? count > 1000 ?  `${+(count / 1000).toFixed(1)}k` : count
    : null
  return (
    <Text>
      {title}
      {count && <span className={classes.tabTitleCount}>{formatted}</span>}
    </Text>
  )
}

export default TabTitle