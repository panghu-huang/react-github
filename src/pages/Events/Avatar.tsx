import * as React from 'react'
import { IUser } from 'src/types'
import classes from './Events.module.scss'

interface IAvatarProps {
  user: IUser
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({ user }) => {
  return (
    <img 
      className={classes.avatar}
      src={`${user.avatar_url}?s=64&v=4`} 
      alt={user.login} 
    />
  )
}

export default Avatar