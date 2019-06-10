import * as React from 'react'
import { Link } from 'react-router-dom'
import { NumberUtils } from 'src/utils'
import { IRepository } from 'src/types'
import { UserType } from 'src/config'
import classes from './RepositoryHead.module.scss'

interface IRepositoryHeadProps {
  owner: string
  name: string
  repository: IRepository | null
}

const RepositoryHead: React.FunctionComponent<IRepositoryHeadProps> = ({
  owner, name, repository,
}) => {
  const type = repository ? repository.owner.type : UserType.User
  const homePage = `/${type === UserType.User ? 'users' : 'orgs'}/${owner}`
  return (
    <div className={classes.head}>
      <div className={classes.container}>
        <Link className={classes.main} to={homePage}>{owner}</Link>
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
              {NumberUtils.formatBigNumber(repository.subscribers_count)}
            </span>
          </span>
          <span className={classes.action}>
            <span className={classes.actionLabel}>Star</span>
            <span className={classes.actionValue}>
              {NumberUtils.formatBigNumber(repository.stargazers_count)}
            </span>
          </span>
          <span className={classes.action}>
            <span className={classes.actionLabel}>Fork</span>
            <span className={classes.actionValue}>
              {NumberUtils.formatBigNumber(repository.forks_count)}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

export default RepositoryHead