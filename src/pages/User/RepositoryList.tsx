import * as React from 'react'
import { ApiService } from 'src/services'
import { Page, RepositoryList } from 'src/components'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IRepository } from 'src/types'

interface IUserRepositoryListProps {
  name: string
}

let page = 0

const UserRepositoryList: React.FunctionComponent<IUserRepositoryListProps> = ({
  name,
}) => {
  const [loading, setLoading] = React.useState(true)
  const [repositories, setRepositories] = React.useState<IRepository[]>([])
  const [hasLoadAll, setHasLoadAll] = React.useState(false)
  const fetchRepositories = async () => {
    try {
      setLoading(true)
      const service = new ApiService<IRepository[]>('users')
      const results = await service.get({
        path: `${name}/repos`,
        data: {
          page: ++page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      setRepositories(repositories.concat(results))
      if (results.length < DEFAULT_PAGE_SIZE) {
        setHasLoadAll(true)
      }
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
    <Page title='Repositories'>
      <RepositoryList
        loading={loading}
        repositories={repositories}
        loadMore={fetchRepositories}
        hasLoadAll={hasLoadAll}
      />
    </Page>
  )
}

export default UserRepositoryList