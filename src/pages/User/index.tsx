import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import { ApiService } from 'src/services'
import { Page, Loading } from 'src/components'
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
  const [activeKey, setActiveKey] = React.useState('repositories')
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
  const handleTabSelect = (key: string) => {
    setActiveKey(key)
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
      <Tabs 
        id='user-tabs' 
        activeKey={activeKey}
        onSelect={handleTabSelect}>
        <Tab 
          className='tab-item'
          eventKey='repositories' 
          title={
            <TabTitle title='Repositories' count={user.public_repos}/>
          }>
          <UserRepositoryList name={name} />
        </Tab>
        <Tab
          className='tab-item'
          eventKey='followers'
          title={
            <TabTitle title='Followers' count={user.followers}/>
          }>
          <UserFollowers
            name={name}
            type={FollowType.Followers}
          />
        </Tab>
        <Tab
          className='tab-item'
          eventKey='following'
          title={
            <TabTitle title='Following' count={user.following}/>
          }>
          <UserFollowers
            name={name}
            type={FollowType.Following}
          />
        </Tab>
      </Tabs>
    </Page>
  )
}

export default User