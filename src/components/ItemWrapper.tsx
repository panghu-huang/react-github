import * as React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { ThemeContext } from 'src/theme'

const ItemWrapper: React.FunctionComponent = ({ children }) => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <ListGroup.Item variant={theme}>
      <Card bg={theme}>
        {children}
      </Card>
    </ListGroup.Item>
  )
}

export default ItemWrapper