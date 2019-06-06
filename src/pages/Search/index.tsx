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
import { ISearchType } from './SearchType'
import FilterBar, { IFilterParams } from './FilterBar'
import Empty from './Empty'

type IResults = ISearchResults<IRepository | IUser>

interface ISearchState {
  keyword: string | null
  loading: boolean
  hasLoadAll: boolean
  results: IResults
}

const initialResults: IResults = {
  total_count: 0,
  incomplete_results: false,
  items: [],
}

class Search extends React.Component<RouteComponentProps, ISearchState> {

  private page: number = 0
  // @ts-ignore
  private filterParams: IFilterParams = {}

  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      keyword: this.getKeywordFromUrl(props.location),
      loading: false,
      hasLoadAll: false,
      results: initialResults,
    }
  }

  public render() {
    const { keyword, results } = this.state
    if (!keyword) {
      return <Empty onSearch={this.handleKeywordChange}/>
    }
    return (
      <Page title={`Search "${keyword}"`}>
        <FilterBar
          keyword={keyword}
          total={results.total_count}
          onFilterChange={this.handleFilterChange}
        />
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
        results: initialResults
      })
    }
  }

  private renderMainContent = () => {
    const { loading, results, hasLoadAll } = this.state
    switch (this.filterParams.type) {
      case ISearchType.Repositories:
        return (
          <RepositoryList
            loading={loading}
            repositories={results.items as IRepository[]}
            hasLoadAll={hasLoadAll}
            loadMore={this.search}
          />
        )
      case ISearchType.Users:
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

  private handleFilterChange = (params: IFilterParams) => {
    this.filterParams = params
    this.page = 0
    this.search(true)
  }

  private search = async (resetResults?: boolean) => {
    try {
      const { keyword, hasLoadAll, results } = this.state
      if (!keyword || hasLoadAll) {
        return
      }
      this.setState({
        loading: true,
        results: resetResults ? initialResults: results,
      })
      const service = new ApiService<IResults>('search')
      const { type, ...others } = this.filterParams
      const data = await service.get({
        path: type,
        data: {
          q: keyword,
          page: ++this.page,
          per_page: DEFAULT_PAGE_SIZE,
          ...others,
        },
      })
      this.setState(prevState => {
        const hasLoadAll = data.items.length < DEFAULT_PAGE_SIZE
        if (this.page !== 1) {
          return {
            results: {
              items: prevState.results.items.concat(data.items),
              total_count: data.total_count,
              incomplete_results: data.incomplete_results,
            },
            loading: false,
            hasLoadAll,
          }
        }
        return {
          loading: false,
          results: data,
          hasLoadAll,
        }
      })
    } catch (error) {
      this.setState({ loading: false })
      Notify.error(error.message)
    }
  }

  private handleKeywordChange = (keyword: string) => {
    actions.history.push(
      `/search?keyword=${keyword}&target=${this.filterParams.type}`
    )
    this.page = 0
    this.setState({ keyword })
  }

  private getKeywordFromUrl(location: Location) {
    return new URLSearchParams(location.search).get('keyword')
  }
}

export default Search