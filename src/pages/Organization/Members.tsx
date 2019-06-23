import * as React from 'react'
import { useFetch } from 'src/hooks'
import { UserList } from 'src/containers'

interface IOrgMembersProps {
  name: string
}

const OrgMembers: React.FunctionComponent<IOrgMembersProps> = ({name}) => {
  const { data, loading, hasLoadAll, fetchData } = useFetch({
    routeName: 'orgs',
    path: `${name}/members`,
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

export default OrgMembers
