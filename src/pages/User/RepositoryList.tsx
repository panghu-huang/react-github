import * as React from 'react'
import { useFetch } from 'src/hooks'
import { RepositoryList } from 'src/containers'

interface IUserRepositoryListProps {
  name: string
}

const UserRepositoryList: React.FunctionComponent<IUserRepositoryListProps> = ({
  name,
}) => {
  const { data, loading, hasLoadAll, fetchData } = useFetch({
    routeName: 'users',
    path: `${name}/repos`,
  })
  return (
    <RepositoryList
      loading={loading}
      repositories={data || []}
      loadMore={fetchData}
      hasLoadAll={hasLoadAll}
    />
  )
}

export default UserRepositoryList
