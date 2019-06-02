import * as React from 'react'
import { Avatar } from 'src/components'
import { IUser } from 'src/types'
import classNames from 'classnames'
import classes from './UserInfoBar.module.scss'

interface IInfoBar {
  user: IUser
}

const InfoBar: React.FunctionComponent<IInfoBar> = ({
  user,
}) => {
  const getCls = (value: string | undefined, iconCls: string) => {
    return classNames('iconfont', iconCls, !value && classes.hidden)
  }
  return (
    <div className={classes.infoBar}>
      <Avatar user={user} size={64}/>
      <div className={classes.content}>
        <p>
          <strong>
            <span>{user.name}</span>
          </strong>
          <span>({user.login})</span>
        </p>
        <div className={classes.detail}>
          <span className={getCls(user.location, 'icon-location')}>
            {user.location}
          </span>
          <span className={getCls(user.bio, 'icon-pen')}>
            {user.bio}
          </span>
          <span className={getCls(user.blog, 'icon-link')}>
            <a href={user.blog} target='_blank'>{user.blog}</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default InfoBar