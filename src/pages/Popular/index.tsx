import * as React from 'react'
import { ApiService } from 'src/services'
import { Page, RepositoryList } from 'src/components'
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
          per_page: 30,
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
      />
    </Page>
  )
}

export default Popular