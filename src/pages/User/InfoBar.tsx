import * as React from 'react'
import { Avatar } from 'src/components'
import { Text } from 'src/theme'
import { IUser } from 'src/types'
import classes from './User.module.scss'

interface IInfoBar {
  user: IUser
}

const InfoBar: React.FunctionComponent<IInfoBar> = ({
  user,
}) => {
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
        <div>
          <Text>{user.location}</Text>
          <Text>{user.bio}</Text>
          <Text>{user.blog}</Text>
        </div>
      </div>
    </div>
  )
}

export default InfoBar