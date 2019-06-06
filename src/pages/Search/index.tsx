import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Location } from 'history'
import { Notify } from 'zent'
import { RepositoryList, UserList } from 'src/containers'
import { Page } from 'src/components'
import { ApiService } from 'src/services'
import { actions } from 'src/store'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IRepository, ISearchResults, IUser } from 'src/types'
import SearchType, { SearchTargetType } from './SearchTarget'
import SortOptions from './SortOptions'
import Empty from './Empty'
import classes from './Search.module.scss'

interface ISearchState {
  keyword: string | null
  loading: boolean
  hasLoadAll: boolean
  results: ISearchResults<IRepository | IUser>
  searchTarget: SearchTargetType
}

const initialResults = {
  total_count: 0,
  incomplete_results: false,
  items: [],
}

class Search extends React.Component<RouteComponentProps, ISearchState> {

  private page: number = 0

  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      keyword: this.getKeywordFromUrl(props.location),
      loading: false,
      hasLoadAll: false,
      searchTarget: this.getInitialSearchTarget(),
      results: initialResults,
    }
  }

  public componentDidMount() {
    this.search()
  }

  public render() {
    const { keyword, results, searchTarget } = this.state
    if (!keyword) {
      return <Empty onSearch={this.handleKeywordChange}/>
    }
    return (
      <Page title={`Search "${keyword}"`}>
        <div className={classes.searchTargetContainer}>
          <SearchType
            target={searchTarget}
            onChange={this.handleSearchTargetChange}
          />
          <p><strong>{results.total_count}</strong> 条相关记录</p>
          <span style={{ flex: 1 }}/>
          <SortOptions
            searchTarget={searchTarget}
            onChange={this.handleSortChange}
          />
        </div>
        {this.renderMainContent()}
      </Page>
    )
  }

  public componentDidUpdate(prevProps: RouteComponentProps) {
    const keyword = this.getKeywordFromUrl(this.props.location)
    if (this.state.keyword !== keyword) {
      this.page = 0
      this.reset({
        searchTarget: SearchTargetType.Repositories,
        keyword,
      })
    }
  }

  private renderMainContent = () => {
    const { loading, results, hasLoadAll, searchTarget } = this.state
    switch (searchTarget) {
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
      const { keyword, hasLoadAll, searchTarget } = this.state
      if (!keyword || hasLoadAll) {
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
    this.reset({ searchTarget: SearchTargetType.Repositories })
  }

  private handleKeywordChange = (keyword: string) => {
    actions.history.push(
      `/search?keyword=${keyword}&target=${this.state.searchTarget}`
    )
    this.page = 0
    this.reset({ keyword })
  }

  private reset(partialState: Partial<ISearchState>) {
    this.setState(({ keyword, searchTarget }) => {
      return {
        keyword: partialState.keyword || keyword,
        searchTarget: partialState.searchTarget || searchTarget,
        results: initialResults,
        hasLoadAll: false,
      }
    }, this.search)
  }

  private handleSortChange() {
    // empty
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