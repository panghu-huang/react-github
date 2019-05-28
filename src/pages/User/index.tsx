import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import { ApiService } from 'src/services'
import { Page, Loading } from 'src/components'
import { IUser } from 'src/types'
import InfoBar from './InfoBar'
import UserRepositoryList from './RepositoryList'

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
  }, [])
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
          title='Repositories'>
          <UserRepositoryList name={name} />
        </Tab>
      </Tabs>
    </Page>
  )
}

export default User