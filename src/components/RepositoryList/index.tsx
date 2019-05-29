import * as React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Text, Title } from 'src/theme'
import { TimeUtils } from 'src/utils'
import { IRepository } from 'src/types'
import classNames from 'classnames'
import List from '../List'
import ItemWrapper from '../ItemWrapper'
import Language from './Language'
import classes from './RepositoryList.module.scss'

interface IRepositoryListProps {
  loading: boolean
  repositories: IRepository[]
  loadMore: () => void
  hasLoadAll?: boolean
}

const formatStars = (stars: number) => {
  return stars > 1000 ? `${+(stars / 1000).toFixed(1)}k` : stars
}

const RepositoryList: React.FunctionComponent<IRepositoryListProps> = ({ 
  repositories, loading, loadMore, hasLoadAll,
}) => {
  const itemRenderer = ({
    full_name, id, stargazers_count, description, language, updated_at,
  }: IRepository) => {
    const starsCls = classNames(
      'iconfont icon-star',
      classes.stars,
      !stargazers_count && classes.hidden,
    )
    return (
      <ItemWrapper key={id}>
        <Card.Body>
          <Card.Title className={classes.titleWrapper}>
            <Title className={classes.title}>
              <Link to={`/repositories/${full_name}`}>
                {full_name}
              </Link>
            </Title>
            <Text className={starsCls}>
              {formatStars(stargazers_count)}
            </Text>
          </Card.Title>
          <Card.Text>
            <Text>{description}</Text>
          </Card.Text>
        </Card.Body>
        <Card.Footer className={classes.other}>
          <Language language={language} />
          <Text>{TimeUtils.fromNow(updated_at)}</Text>
        </Card.Footer>
      </ItemWrapper>
    )
  }
  return (
    <List
      list={repositories}
      loading={loading}
      renderItem={itemRenderer}
      loadMore={loadMore}
      hasLoadAll={hasLoadAll}
    />
  )
}

export default RepositoryList