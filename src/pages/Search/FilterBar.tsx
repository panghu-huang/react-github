import * as React from 'react'
import { actions } from 'src/store'
import SearchType, { ISearchType } from './SearchType'
import SortOptions from './SortOptions'
import SortOrder from './SortOrder'
import classes from './Search.module.scss'

export interface IFilterParams {
  type: ISearchType
  sort: string
  order: string
}

interface IFilterBarProps {
  keyword: string
  total: number
  onFilterChange: (params: IFilterParams) => void
}

type IFilterBarState = IFilterParams

class FilterBar extends React.PureComponent<IFilterBarProps, IFilterBarState> {

  constructor(props: IFilterBarProps) {
    super(props)
    this.state = this.getInitialFilterParams()
  }

  public componentDidMount() {
    this.invokeListLoader()
  }

  public render() {
    const { total } = this.props
    const { type, sort, order } = this.state
    return (
      <div className={classes.filterBar}>
        <SearchType
          value={type}
          onChange={this.handleTypeChange}
        />
        <p><strong>{total}</strong>条相关记录</p>
        <span style={{ flex: 1 }}/>
        <SortOptions
          type={type}
          value={sort}
          onChange={this.handleSortChange}
        />
        <SortOrder
          value={order}
          onChange={this.handleOrderChange}
        />
      </div>
    )
  }

  public componentDidUpdate(prevProps: IFilterBarProps) {
    if (prevProps.keyword !== this.props.keyword) {
      console.log('invoke')
      this.setState({
        type: ISearchType.Repositories,
        sort: '',
      }, this.invokeListLoader)
    }
  }

  private invokeListLoader = (partialState: Partial<IFilterBarState> = {}) => {
    const { type, sort, order } = this.state
    this.props.onFilterChange({
      type: partialState.type || type,
      sort: partialState.sort || sort,
      order: partialState.order || order,
    })
  }

  private handleTypeChange = (type: ISearchType) => {
    actions.history.push(
      `/search?keyword=${this.props.keyword}&type=${type}`
    )
    this.setState({ type, sort: '' }, this.invokeListLoader)
  }

  private handleSortChange = (sort: string) => {
    const { type, order } = this.state
    actions.history.push(
      `/search?keyword=${this.props.keyword}&type=${type}&sort=${sort}&order=${order}`
    )
    this.setState({ sort }, this.invokeListLoader)
  }

  private handleOrderChange = (order: string) => {
    const { type, sort } = this.state
    actions.history.push(
      `/search?keyword=${this.props.keyword}&type=${type}&sort=${sort}&order=${order}`
    )
    this.setState({ order }, this.invokeListLoader)
  }

  private getInitialFilterParams(): IFilterParams {
    const search = new URLSearchParams(location.search)
    return {
      type: (search.get('type') as any) || ISearchType.Repositories,
      sort: search.get('sort') || '',
      order: search.get('order') || '',
    }
  }
}

export default FilterBar