import * as React from 'react'
import { Link } from 'react-router-dom'
import Strong from './Strong'

export interface IRepositoryLinkProps {
  fullName: string
}

const RepositoryLink: React.FunctionComponent<IRepositoryLinkProps> = ({ fullName }) => (
  <Strong>
    <Link to={`/repositories/${fullName}`}>{fullName}</Link>
  </Strong>
)

export default RepositoryLink

