import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ApiService } from 'src/services'
import { UserInfoBar } from 'src/containers'
import { Page, Loading, Tabs, TabTitle } from 'src/components'
import { IUser } from 'src/types'
import OrgRepositoryList from './RepositoryList'
import OrgMembers from './Members'

interface IParams {
  name: string
}

type IOrganizationProps = RouteComponentProps<IParams>

const Organization: React.FunctionComponent<IOrganizationProps> = ({
  match,
}) => {
  const { name } = match.params
  const [user, setUser] = React.useState<IUser | null>(null)
  const fetchUser = async () => {
    try {
      const service = new ApiService<IUser>('orgs')
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
      <UserInfoBar user={user}/>
      <Tabs>
        <Tabs.TabPane
          tabKey='repositories'
          title={
            <TabTitle title='Repositories' count={user.public_repos}/>
          }>
          <OrgRepositoryList name={name}/>
        </Tabs.TabPane>
        <Tabs.TabPane
          tabKey='members'
          title={
            <TabTitle title='Members'/>
          }>
          <OrgMembers name={name}/>
        </Tabs.TabPane>
      </Tabs>
    </Page>
  )
}

export default Organization