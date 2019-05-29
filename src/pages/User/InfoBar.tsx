import * as React from 'react'
import { Avatar } from 'src/components'
import { Text } from 'src/theme'
import { IUser } from 'src/types'
import classNames from 'classnames'
import classes from './User.module.scss'

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
      <Avatar user={user} size={64} />
      <div className={classes.content}>
        <p>
          <strong>
            <Text>{user.name}</Text>
          </strong>
          <Text>({user.login})</Text>
        </p>
        <div className={classes.detail}>
          <Text className={getCls(user.location, 'icon-location')}>
            {user.location}
          </Text>
          <Text className={getCls(user.bio, 'icon-pen')}>
            {user.bio}
          </Text>
          <Text className={getCls(user.blog, 'icon-link')}>
            <a href={user.blog} target='_blank'>{user.blog}</a>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default InfoBar