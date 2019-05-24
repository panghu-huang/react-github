import * as React from 'react'
import { ThemeContext } from 'src/theme'
import { IUser } from 'src/types'
import { Theme } from 'src/config'
import classNames from 'classnames'
import classes from './Events.module.scss'

interface IAvatarProps {
  user: IUser
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({ user }) => {
  const { theme } = React.useContext(ThemeContext)
  const cls = classNames(
    classes.avatar, 
    theme === Theme.Dark && classes.darkAvatar
  )
  return (
    <img 
      className={cls}
      src={`${user.avatar_url}?s=64&v=4`} 
      alt={user.login} 
    />
  )
}

export default Avatar