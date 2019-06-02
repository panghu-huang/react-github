import * as React from 'react'
import classes from './TabTitle.module.scss'

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
    <span>
      {title}
      {formatted && <span className={classes.title}>{formatted}</span>}
    </span>
  )
}

export default TabTitle