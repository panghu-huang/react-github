import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ApiService } from 'src/services'
import { Page, Loading, Tabs } from 'src/components'
import { IUser } from 'src/types'
import UserFollowers, { FollowType } from './Followers'
import UserRepositoryList from './RepositoryList'
import TabTitle from './TabTitle'
import InfoBar from './InfoBar'

interface IParams {
  name: string
}

type IUserProps = RouteComponentProps<IParams>

const User: React.FunctionComponent<IUserProps> = ({
  match,
}) => {
  const { name } = match.params
  const [user, setUser] = React.useState<IUser | null>(null)
  const fetchUser = async () => {
    try {
      const service = new ApiService<IUser>('users')
      const user = await service.get({
        path: name,
      })
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    fetchUser()
  }, [name])
  if (!user) {
    return <Loading loading={true}/>
  }
  return (
    <Page title={name}>
      <InfoBar user={user}/>
      <Tabs>
        <Tabs.TabPane
          tabKey='repositories' 
          title={
            <TabTitle title='Repositories' count={user.public_repos}/>
          }>
          <UserRepositoryList name={name} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tabKey={FollowType.Followers}
          title={
            <TabTitle title='Followers' count={user.followers}/>
          }>
          <UserFollowers
            name={name}
            type={FollowType.Followers}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tabKey={FollowType.Following}
          title={
            <TabTitle title='Following' count={user.following}/>
          }>
          <UserFollowers
            name={name}
            type={FollowType.Following}
          />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

export default User