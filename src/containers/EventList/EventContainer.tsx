import * as React from 'react'
import { TimeUtils } from 'src/utils/index'
import { IUser } from 'src/types/index'
import Avatar from '../../components/Avatar/index'
import LoginLink from './LoginLink'
import classNames from 'classnames'
import classes from './Events.module.scss'

export interface IEventContainerProps {
  type: 'star' | 'fork' | 'merge' | 'pull-request' | 'unlock' | 'create-repo' | 'member' | 'delete'
  description?: string
  actor: IUser
  time: string
}

const EventContainer: React.FunctionComponent<IEventContainerProps> = ({
  type, actor, time, description, children,
}) => {
  const iconCls = classNames(
    'iconfont', `icon-${type}`, classes.icon,
  )
  return (
    <div className={classes.container}>
      <span className={iconCls}/>
      <div className={classes.mainContent}>
        <div className={classes.head}>
          <p className={classes.actor}>
            <Avatar user={actor}/>
            <LoginLink login={actor.login}/>
          </p>
          <span className={classes.time}>
            {TimeUtils.fromNow(time)}
          </span>
        </div>
        {description && <p className={classes.description}>{description}</p>}
        <div className={classes.inner}>{children}</div>
      </div>
    </div>
  )
}

export default EventContainer

