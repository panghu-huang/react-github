import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Location } from 'history'
import { Notify } from 'zent'
import { ApiService } from 'src/services'
import { actions } from 'src/store'
import { RepositoryList, UserList } from 'src/containers'
import { Page } from 'src/components'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IRepository, ISearchResults, IUser } from 'src/types'
import SearchType, { SearchTargetType } from './SearchTarget'
import Empty from './Empty'
import classes from './Search.module.scss'

interface ISearchState {
  keyword: string | null
  loading: boolean
  hasLoadAll: boolean
  results: ISearchResults<IRepository | IUser>
}

const initialResults = {
  total_count: 0,
  incomplete_results: false,
  items: [],
}

class Search extends React.Component<RouteComponentProps, ISearchState> {

  private page: number = 0
  private searchTarget: SearchTargetType

  constructor(props: RouteComponentProps) {
    super(props)
    this.searchTarget = this.getInitialSearchTarget()
    this.state = {
      keyword: this.getKeywordFromUrl(props.location),
      loading: false,
      hasLoadAll: false,
      results: initialResults,
    }
  }

  public componentDidMount() {
    this.search()
  }

  public render() {
    const { keyword, results } = this.state
    if (!keyword) {
      return <Empty onSearch={this.handleKeywordChange}/>
    }
    return (
      <Page title={`Search "${keyword}"`}>
        <div className={classes.searchTargetContainer}>
          <SearchType
            initialTarget={this.searchTarget}
            onChange={this.handleSearchTargetChange}
          />
          <p><strong>{results.total_count}</strong> 条相关记录</p>
        </div>
        {this.renderMainContent()}
      </Page>
    )
  }

  public componentDidUpdate(prevProps: RouteComponentProps) {
    const keyword = this.getKeywordFromUrl(this.props.location)
    if (this.state.keyword !== keyword) {
      this.page = 0
      this.setState({
        keyword,
        hasLoadAll: false,
        results: initialResults,
      }, this.search)
    }
  }

  private renderMainContent = () => {
    const { loading, results, hasLoadAll } = this.state
    switch (this.searchTarget) {
      case SearchTargetType.Repositories:
        return (
          <RepositoryList
            loading={loading}
            repositories={results.items as IRepository[]}
            hasLoadAll={hasLoadAll}
            loadMore={this.search}
          />
        )
      case SearchTargetType.Users:
        return (
          <UserList
            loading={loading}
            users={results.items as IUser[]}
            hasLoadAll={hasLoadAll}
            loadMore={this.search}
          />
        )
      default:
        return null
    }
  }

  private search = async () => {
    try {
      const { keyword, hasLoadAll } = this.state
      if (!keyword || hasLoadAll) {
        return
      }
      this.setState({ loading: true })
      const service = new ApiService('search')
      const results = await service.get({
        path: this.searchTarget,
        data: {
          q: keyword,
          page: ++this.page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      this.setState(prevState => {
        const hasLoadAll = results.items.length < DEFAULT_PAGE_SIZE
        if (this.page !== 1) {
          return {
            results: {
              items: prevState.results.items.concat(results.items),
              total: results.total,
              incomplete_results: results.incomplete_results,
            },
            loading: false,
            hasLoadAll,
          }
        }
        return {
          loading: false,
          results,
          hasLoadAll,
        }
      })
    } catch (error) {
      this.setState({ loading: false })
      Notify.error(error.message)
    }
  }

  private handleSearchTargetChange = (target: SearchTargetType) => {
    actions.history.push(
      `/search?keyword=${this.state.keyword}&target=${target}`
    )
    this.page = 0
    this.searchTarget = target
    this.setState({
      results: initialResults,
      hasLoadAll: false
    }, this.search)
  }

  private handleKeywordChange = (keyword: string) => {
    actions.history.push(
      `/search?keyword=${keyword}&target=${this.searchTarget}`
    )
    this.page = 0
    this.setState({
      keyword,
      results: initialResults,
      hasLoadAll: false
    }, this.search)
  }

  private getKeywordFromUrl(location: Location) {
    return new URLSearchParams(location.search).get('keyword')
  }

  private getInitialSearchTarget(): SearchTargetType {
    // @ts-ignore
    return new URLSearchParams(location.search).get('target')
     || SearchTargetType.Repositories
  }
}

export default Search