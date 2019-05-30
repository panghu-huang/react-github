import * as React from 'react'
import { Link } from 'react-router-dom'
import { IRepository } from 'src/types'
import classes from './Head.module.scss'

interface IRepositoryHeadProps {
  owner: string
  name: string
  repository: IRepository | null
}

const RepositoryHead: React.FunctionComponent<IRepositoryHeadProps> = ({
  owner, name, repository,
}) => {
  return (
    <div className={classes.head}>
      <div className={classes.container}>
        <Link className={classes.main} to={`/users/${owner}`}>{owner}</Link>
        <span className={classes.divider}>/</span>
        <Link className={classes.main} to={`/repositories/${owner}/${name}`}>
          {name}
        </Link>
      </div>
      {repository && (
        <div>
          <span className={classes.action}>
            <span className={classes.actionLabel}>Watch</span>
            <span className={classes.actionValue}>
              {repository.subscribers_count}
            </span>
          </span>
          <span className={classes.action}>
            <span className={classes.actionLabel}>Star</span>
            <span className={classes.actionValue}>
              {repository.stargazers_count}
            </span>
          </span>
          <span className={classes.action}>
            <span className={classes.actionLabel}>Fork</span>
            <span className={classes.actionValue}>
              {repository.forks_count}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

export default RepositoryHead