import * as React from 'react'
import { ListGroup } from 'react-bootstrap'
import Loading from '../Loading'

interface IListProps {
  list: any[]
  loading: boolean
  renderItem: (value: any, index: number) => React.ReactNode
}

const List: React.FunctionComponent<IListProps> = ({
list, loading, renderItem
}) => {
  return (
    <ListGroup>
      {list.map(renderItem)}
      <Loading loading={loading}/>
    </ListGroup>
  )
}

export default List