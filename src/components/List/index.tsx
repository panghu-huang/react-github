import * as React from 'react'
import Container from '../Container'
import Loading from '../Loading'

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
      {!loading && !hasLoadAll && (
        <p onClick={loadMore} style={{padding: '20px 0', textAlign: 'center', margin: 0}}>
          <span>load more</span>
        </p>
      )}
      {hasLoadAll && (
        <p style={{ padding: '20px 0', textAlign: 'center', margin: 0 }}>
          <span>已加载全部数据</span>
        </p>
      )}
    </Container>
  )
}

export default List