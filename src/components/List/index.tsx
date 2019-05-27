import * as React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Container, Text } from 'src/theme'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
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
  React.useEffect(() => {
    if (!loadMore || hasLoadAll) {
      return 
    }
    // @ts-ignore
    const loader = debounce(loadMore, 500)
    const handleScroll = throttle(() => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      if (scrollHeight - scrollTop - clientHeight <= 10) {
        if (!loading) {
          loader()
        }
      }
    }, 500)
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  })
  return (
    <ListGroup>
      {list.map(renderItem)}
      <Loading loading={loading}/>
      {hasLoadAll && (
        <Container style={{ padding: '20px 0', textAlign: 'center' }}>
          <Text>已加载全部数据</Text>
        </Container>
      )}
    </ListGroup>
  )
}

export default List