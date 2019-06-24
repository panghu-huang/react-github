import * as React from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'src/components'
import { TimeUtils } from 'src/utils'
import { IRepository } from 'src/types'
import classNames from 'classnames'
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

const renderRepository = ({
  full_name, id, stargazers_count, description, language, updated_at, default_branch,
}: IRepository) => {
  const starsCls = classNames(
    'iconfont icon-star',
    classes.stars,
    !stargazers_count && classes.hidden,
  )
  return (
    <div key={id} className={classes.repository}>
      <h3 className={classes.title}>
        <Avatar repoFullName={full_name}/>
        <Link to={`/repositories/${full_name}?branch=${default_branch}`}>
          {full_name}
        </Link>
      </h3>
      <p className={classes.description}>{description}</p>
      <div className={classes.other}>
        <Language language={language} />
        <span className={starsCls}>
            {formatStars(stargazers_count)}
          </span>
        <span>{TimeUtils.fromNow(updated_at)}</span>
      </div>
    </div>
  )
}

const RepositoryList: React.FunctionComponent<IRepositoryListProps> = ({
  repositories, loading, loadMore, hasLoadAll,
}) => (
  <List
    list={repositories}
    loading={loading}
    renderItem={renderRepository}
    loadMore={loadMore}
    hasLoadAll={hasLoadAll}
  />
)

export default RepositoryList
