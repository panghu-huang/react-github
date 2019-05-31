import * as React from 'react'
import { IUser } from 'src/types'
import classNames from 'classnames'
import classes from './Avatar.module.scss'

interface IAvatarProps {
  repoFullName?: string
  user?: IUser
  className?: string
  size?: number
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({ 
  size = 24, repoFullName, user, className,
}) => {
  const cls = classNames(
    className,
    classes.avatar,
  )
  const name = repoFullName ? repoFullName.split('/')[0] : ''
  const source = user ? user.avatar_url : `https://github.com/${name}.png`
  const alt = user ? user.login : name
  return (
    <img 
      className={cls}
      src={`${source}?s=${size * 2}&v=4`}
      style={{ width: size, height: size, minWidth: size }}
      alt={alt}
    />
  )
}

export default Avatar