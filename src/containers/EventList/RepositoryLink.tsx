import * as React from 'react'
import { Link } from 'react-router-dom'
import classes from './Events.module.scss'

export interface IRepositoryLinkProps {
  fullName: string
}

const RepositoryLink: React.FunctionComponent<IRepositoryLinkProps> = ({ fullName }) => {
  const [owner, name] = fullName.split('/')
  return (
    <strong>
      <Link to={`/users/${owner}`}>{owner}</Link>
      <span className={classes.repoLinkDivider}>/</span>
      <Link to={`/repositories/${fullName}`}>{name}</Link>
    </strong>
  )
}

export default RepositoryLink

