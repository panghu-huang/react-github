import * as React from 'react'
import { List, Avatar } from 'src/components'
import { IUser } from 'src/types'
import classes from './UserList.module.scss'

interface IUserListProps {
  loading: boolean
  users: IUser[]
  loadMore: () => void
  hasLoadAll?: boolean
}

const UserList: React.FunctionComponent<IUserListProps> = ({
  users, loading, loadMore, hasLoadAll,
}) => {
  const itemRenderer = (user: IUser) => (
    <div key={user.id} className={classes.user}>
      <Avatar user={user}/>
      <span>
        <a href={`/users/${user.login}`}>{user.login}</a>
      </span>
    </div>
  )
  return (
    <List
      list={users}
      loading={loading}
      hasLoadAll={hasLoadAll}
      loadMore={loadMore}
      renderItem={itemRenderer}
    />
  )
}

export default UserList