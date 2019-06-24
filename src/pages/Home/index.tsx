import * as React from 'react'
import { useFetch } from 'src/hooks'
import { RepositoryList } from 'src/containers'
import { Page } from 'src/components'
import { ISearchRepositories } from 'src/types'

type T = ISearchRepositories

function formatData(oldData: T | null, newData: T) {
  if (oldData === null) {
    return newData
  }
  return {
    ...newData,
    items: oldData.items.concat(newData.items),
  }
}

const Popular: React.FunctionComponent = () => {
  const { data, hasLoadAll, loading, fetchData } = useFetch<T>({
    routeName: 'search',
    path: 'repositories',
    params: {
      q: 'JavaScript',
      sort: 'stars',
    },
    formatter: formatData,
  })
  return (
    <Page title='Popular JavaScript Repositories'>
      <RepositoryList
        loading={loading}
        repositories={data ? data.items : []}
        loadMore={fetchData}
        hasLoadAll={hasLoadAll}
      />
    </Page>
  )
}

export default Popular
