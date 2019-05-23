import * as React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { ThemeContext, Text, Title } from 'src/theme'
import { TimeUtils } from 'src/utils'
import { IRepository } from 'src/types'
import List from '../List'
import classes from './RepositoryList.module.scss'

interface IRepositoryListProps {
  loading: boolean
  repositories: IRepository[]
}

const RepositoryList: React.FunctionComponent<IRepositoryListProps> = ({ 
  repositories, loading,
}) => {
  const { theme } = React.useContext(ThemeContext)
  const formatStars = (stars: number) => {
    return stars > 1000 ? `${+(stars / 1000).toFixed(1)}k` : stars
  }
  const itemRenderer = (repository: IRepository) => (
    <ListGroup.Item
      key={repository.id}
      variant={theme}>
      <Card bg={theme}>
        <Card.Body>
          <Card.Title className={classes.titleWrapper}>
            <Title className={classes.title}>
              {repository.full_name}
            </Title>
            <Text className={classes.stars}>
              {formatStars(repository.stargazers_count)}
            </Text>
          </Card.Title>
          <Card.Text>
            <Text>{repository.description}</Text>
          </Card.Text>
        </Card.Body>
        <Card.Footer className={classes.other}>
          <Text>{repository.language}</Text>
          <Text>{TimeUtils.fromNow(repository.updated_at)}</Text>
        </Card.Footer>
      </Card>
    </ListGroup.Item>
  )
  return (
    <List
      list={repositories}
      loading={loading}
      renderItem={itemRenderer}
    />
  )
}

export default RepositoryList