import * as React from 'react'
import { ApiService } from 'src/services'
import { RepositoryList } from 'src/components'
import { IRepository, ISearchRepositories } from 'src/types'

interface IPopularState {
  loading: boolean
  repositories: IRepository[]
}

class Popular extends React.Component<any, IPopularState> {

  private page = 0;

  constructor(props: any) {
    super(props)
    this.state = {
      loading: false,
      repositories: [],
    }
  }

  public componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
    this.fetchRepositories()
  }

  public render() {
    const { loading, repositories } = this.state
    return (
      <RepositoryList
        loading={loading}
        repositories={repositories}
      />
    )
  }

  public componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  private fetchRepositories = async () => {
    try {
      this.setState({ loading: true })
      const service = new ApiService<ISearchRepositories>('search')
      const { items } = await service.get({
        path: 'repositories',
        data: {
          q: 'JavaScript',
          sort: 'stars',
          page: ++this.page,
          per_page: 30,
        },
      })
      this.setState(({ repositories }) => {
        return {
          repositories: repositories.concat(items),
          loading: false,
        }
      })
    } catch (e) {
      console.log(e)
      this.setState({ loading: false })
    }
  }

  private handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollHeight - scrollTop - clientHeight <= 100) {
      if (!this.state.loading) {
        this.fetchRepositories()
      }
    }
  }

}

export default Popular