import * as React from 'react'
import { ThemeContext } from 'src/theme'
import { IUser } from 'src/types'
import { Theme } from 'src/config'
import classNames from 'classnames'
import classes from './Avatar.module.scss'

interface IAvatarProps {
  user: IUser
  className?: string
  size?: number
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({ 
  size = 32, user, className,
}) => {
  const { theme } = React.useContext(ThemeContext)
  const cls = classNames(
    className,
    classes.avatar, 
    theme === Theme.Dark && classes.darkAvatar
  )
  return (
    <img 
      className={cls}
      src={`${user.avatar_url}?s=${size * 2}&v=4`} 
      style={{ width: size, height: size, minWidth: size }}
      alt={user.login} 
    />
  )
}

export default Avatar