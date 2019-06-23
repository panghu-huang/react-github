import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useFetch } from 'src/hooks'
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
  const { data: organization, loading } = useFetch<IUser>({
    routeName: 'users',
    path: name,
  })
  if (loading) {
    return <Loading loading={true}/>
  }
  return (
    <Page title={name}>
      <UserInfoBar user={organization}/>
      <Tabs>
        <Tabs.TabPane
          tabKey='repositories'
          title={
            <TabTitle title='Repositories' count={organization.public_repos}/>
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
