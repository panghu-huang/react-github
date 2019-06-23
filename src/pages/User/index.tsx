import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useFetch } from 'src/hooks'
import { UserInfoBar } from 'src/containers'
import { Page, Loading, Tabs, TabTitle } from 'src/components'
import { IUser } from 'src/types'
import UserFollowers, { FollowType } from './Followers'
import UserRepositoryList from './RepositoryList'

interface IParams {
  name: string
}

type IUserProps = RouteComponentProps<IParams>

const User: React.FunctionComponent<IUserProps> = ({
  match,
}) => {
  const { name } = match.params
  const { data: user, loading } = useFetch<IUser>({
    routeName: 'users',
    path: name,
  })
  if (loading) {
    return <Loading loading={true}/>
  }
  return (
    <Page title={name}>
      <UserInfoBar user={user}/>
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
