import * as React from 'react'
import { useFetch } from 'src/hooks'
import { RepositoryList } from 'src/containers'

interface IOrgRepositoryListProps {
  name: string
}

const OrgRepositoryList: React.FunctionComponent<IOrgRepositoryListProps> = ({
  name,
}) => {
  const { data, loading, hasLoadAll, fetchData } = useFetch({
    routeName: 'orgs',
    path: `${name}/repos`,
  })
  return (
    <RepositoryList
      repositories={data || []}
      loading={loading}
      loadMore={fetchData}
      hasLoadAll={hasLoadAll}
    />
  )
}

export default OrgRepositoryList
