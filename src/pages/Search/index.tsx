import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Location } from 'history'
import { Notify } from 'zent'
import { ApiService } from 'src/services'
import { actions } from 'src/store'
import { RepositoryList } from 'src/containers'
import { Page } from 'src/components'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { ISearchResults, IRepository, IUser } from 'src/types'
import Empty from './Empty'
// import classes from './Search.module.scss'

type SearchTarget = 'repositories' | 'users' | 'code' | 'commits'

interface ISearchState {
  keyword: string | null
  searchTarget: SearchTarget
  loading: boolean
  results: ISearchResults<IRepository | IUser>
}

const initialResults = {
  total: 0,
  incomplete_results: false,
  items: [],
}

class Search extends React.Component<RouteComponentProps, ISearchState> {

  private page: number = 0

  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      keyword: this.getKeywordFromUrl(props.location),
      searchTarget: 'repositories',
      loading: false,
      results: initialResults,
    }
  }

  public componentDidMount() {
    this.search()
  }

  public render() {
    const { keyword } = this.state
    if (!keyword) {
      return <Empty onSearch={this.handleKeywordChange}/>
    }
    return (
      <Page title={`Search "${keyword}"`}>
        {this.renderMainContent()}
      </Page>
    )
  }

  public componentDidUpdate(prevProps: RouteComponentProps) {
    const keyword = this.getKeywordFromUrl(this.props.location)
    if (this.getKeywordFromUrl(prevProps.location) !== keyword) {
      this.page = 0
      this.setState({
        keyword,
        searchTarget: 'repositories',
        results: initialResults,
      }, this.search)
    }
  }

  private renderMainContent = () => {
    const { searchTarget, loading, results } = this.state
    switch (searchTarget) {
      case 'repositories':
        return (
          <RepositoryList
            loading={loading}
            repositories={results.items as IRepository[]}
            hasLoadAll={results.incomplete_results}
            loadMore={this.search}
          />
        )
      default:
        return null
    }
  }

  private search = async () => {
    try {
      const { keyword, searchTarget } = this.state
      if (!keyword) {
        return
      }
      this.setState({ loading: true })
      const service = new ApiService('search')
      const results = await service.get({
        path: searchTarget,
        data: {
          q: keyword,
          page: ++this.page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      this.setState(prevState => {
        if (this.page !== 1) {
          return {
            results: {
              items: prevState.results.items.concat(results.items),
              total: results.total,
              incomplete_results: results.incomplete_results,
            },
            loading: false,
          }
        }
        return {
          loading: false,
          results,
        }
      })
    } catch (error) {
      this.setState({ loading: false })
      Notify.error(error.message)
    }
  }

  private handleKeywordChange = (keyword: string) => {
    actions.history.push(`/search?keyword=${keyword}`)
    this.page = 0
    this.setState({
      keyword,
      searchTarget: 'repositories',
      results: initialResults,
    }, this.search)
  }

  private getKeywordFromUrl(location: Location) {
    return new URLSearchParams(location.search).get('keyword')
  }
}

export default Search