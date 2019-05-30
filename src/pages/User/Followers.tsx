import * as React from 'react'
import { Card } from 'react-bootstrap'
import { ApiService } from 'src/services'
import { Text } from 'src/theme'
import { List, Avatar } from 'src/components'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IUser } from 'src/types'
import classes from './User.module.scss'

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
      const followers = await service.get({
        path: `${name}/${type}`,
        data: {
          page: ++page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      setFollowers(followers)
      if (followers.length < DEFAULT_PAGE_SIZE) {
        setHasLoadAll(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const renderFollower = (follower: IUser) => (
    <Card key={follower.id} className={classes.follower}>
      <Avatar user={follower}/>
      <Text>
        <a href={`/users/${follower.login}`}>{follower.login}</a>
      </Text>
    </Card>
  )
  React.useEffect(() => {
    page = 0
    fetchFollowers()
  }, [])
  return (
    <List
      list={followers}
      loading={loading}
      hasLoadAll={hasLoadAll}
      loadMore={fetchFollowers}
      renderItem={renderFollower}
    />
  )
}

export default UserFollowers