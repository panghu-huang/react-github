import * as React from 'react'
import Container from '../Container'
import Loading from '../Loading'
import classNames from 'classnames'
import classes from './List.module.scss'

interface IListProps {
  list: any[]
  loading: boolean
  renderItem: (value: any, index: number) => React.ReactNode
  hasLoadAll?: boolean
  loadMore?: () => any
}

const List: React.FunctionComponent<IListProps> = ({
list, loading, renderItem, loadMore, hasLoadAll,
}) => {
  return (
    <Container>
      {list.map(renderItem)}
      <Loading loading={loading}/>
      {false === loading && false === hasLoadAll && (
        <p onClick={loadMore} className={classes.foot}>
          <span>load more</span>
        </p>
      )}
      {hasLoadAll && (
        <p className={classNames(classes.foot, classes.loadAll)}>
          <span>已加载全部数据</span>
        </p>
      )}
    </Container>
  )
}

export default List