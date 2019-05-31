import * as React from 'react'
import { ApiService } from 'src/services'
import { RepositoryList } from 'src/containers'
import { Page } from 'src/components'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IRepository, ISearchRepositories } from 'src/types'

let page = 0

const Popular: React.FunctionComponent = () => {
  const [loading, setLoading] = React.useState(true)
  const [repositories, setRepositories] = React.useState<IRepository[]>([])
  const fetchRepositories = async () => {
    try {
      setLoading(true)
      const service = new ApiService<ISearchRepositories>('search')
      const { items } = await service.get({
        path: 'repositories',
        data: {
          q: 'JavaScript',
          sort: 'stars',
          page: ++page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      setRepositories(repositories.concat(items))
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    page = 0
    fetchRepositories()
  }, [])
  return (
    <Page title='popular JavaScript repositories'>
      <RepositoryList
        loading={loading}
        repositories={repositories}
        loadMore={fetchRepositories}
        hasLoadAll={false}
      />
    </Page>
  )
}

export default Popular