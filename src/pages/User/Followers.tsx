import * as React from 'react'
import { Notify } from 'zent'
import { ApiService } from 'src/services'
import { UserList } from 'src/containers'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IUser } from 'src/types'

export const enum FollowType {
  Followers = 'followers',
  Following = 'following'
}

interface IUserFollowersProps {
  name: string
  type?: FollowType
}

let page = 0

const UserFollowers: React.FunctionComponent<IUserFollowersProps> = ({
  type = FollowType.Followers, name,
}) => {
  const [loading, setLoading] = React.useState(false)
  const [followers, setFollowers] = React.useState<IUser[]>([])
  const [hasLoadAll, setHasLoadAll] = React.useState(false)
  const fetchFollowers = async () => {
    try {
      setLoading(true)
      const service = new ApiService<IUser[]>('users')
      const list = await service.get({
        path: `${name}/${type}`,
        data: {
          page: ++page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      setFollowers(followers.concat(list))
      if (list.length < DEFAULT_PAGE_SIZE) {
        setHasLoadAll(true)
      }
    } catch (error) {
      Notify.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    page = 0
    fetchFollowers()
  }, [])
  return (
    <UserList
      users={followers}
      loading={loading}
      hasLoadAll={hasLoadAll}
      loadMore={fetchFollowers}
    />
  )
}

export default UserFollowers