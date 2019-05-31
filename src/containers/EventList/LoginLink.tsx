import * as React from 'react'
import { Link } from 'react-router-dom'

export interface ILoginLinkProps {
  login: string
}

const LoginLink: React.FunctionComponent<ILoginLinkProps> = ({ login }) => (
  <strong>
    <Link to={`/users/${login}`}>{login}</Link>
  </strong>
)

export default LoginLink

