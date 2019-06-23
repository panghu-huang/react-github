import * as React from 'react'
import { useFetch } from 'src/hooks'
import { UserList } from 'src/containers'

export const enum FollowType {
  Followers = 'followers',
  Following = 'following'
}

interface IUserFollowersProps {
  name: string
  type?: FollowType
}

const UserFollowers: React.FunctionComponent<IUserFollowersProps> = ({
  type = FollowType.Followers, name,
}) => {
  const { data, loading, hasLoadAll, fetchData } = useFetch({
    routeName: 'users',
    path: `${name}/${type}`,
  })
  return (
    <UserList
      users={data || []}
      loading={loading}
      hasLoadAll={hasLoadAll}
      loadMore={fetchData}
    />
  )
}

export default UserFollowers
