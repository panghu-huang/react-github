import * as React from 'react'
import { ListGroup } from 'react-bootstrap'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import Loading from '../Loading'

interface IListProps {
  list: any[]
  loading: boolean
  renderItem: (value: any, index: number) => React.ReactNode
  loadMore?: () => any
}

const List: React.FunctionComponent<IListProps> = ({
list, loading, renderItem, loadMore
}) => {
  React.useEffect(() => {
    if (!loadMore) {
      return 
    }
    // @ts-ignore
    const loader = debounce(loadMore, 500)
    const handleScroll = throttle(() => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      if (scrollHeight - scrollTop - clientHeight <= 10) {
        if (!loading) {
          loadMore()
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
    </ListGroup>
  )
}

export default List