import * as React from 'react'
import { Link } from 'react-router-dom'
import Strong from './Strong'

export interface ILoginLinkProps {
  login: string
}

const LoginLink: React.FunctionComponent<ILoginLinkProps> = ({ login }) => (
  <Strong>
    <Link to={`/users/${login}`}>{login}</Link>
  </Strong>
)

export default LoginLink

