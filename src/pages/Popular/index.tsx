import * as React from 'react'
import { ApiService } from 'src/services'
import { RepositoryList } from 'src/components'
import { IRepository, ISearchRepositories } from 'src/types'

interface IPopularState {
  loading: boolean
  repositories: IRepository[]
}

class Popular extends React.Component<any, IPopularState> {

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
        },
      })
      this.setState({ repositories: items, })
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({ loading: false })
    }
  }

  private handleScroll(ev: UIEvent) {
    console.log(ev)
    const { scrollHeight, scrollTop, clientHeight } = ev.target as HTMLBodyElement
    console.log(scrollHeight, scrollTop, clientHeight)
    if (scrollHeight - scrollTop - clientHeight <= 100) {
      console.log('load more...')
    }
  }

}

export default Popular