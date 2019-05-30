import * as React from 'react'
import { Link } from 'react-router-dom'

export interface IRepositoryLinkProps {
  fullName: string
}

const RepositoryLink: React.FunctionComponent<IRepositoryLinkProps> = ({ fullName }) => (
  <strong>
    <Link to={`/repositories/${fullName}`}>{fullName}</Link>
  </strong>
)

export default RepositoryLink

