import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input } from 'src/components'
import classNames from 'classnames'
import classes from './Header.module.scss'

const Header: React.FunctionComponent = () => {
  const iconCls = classNames(
    'iconfont', 'icon-search', classes.iconSearch,
  )
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <h3 className={classes.title}>
          <Link to='/'>Github</Link>
        </h3>
        <ul>
          <li>
            <NavLink to='/activities' activeClassName={classes.activeLink}>
              Activities
            </NavLink>
          </li>
        </ul>
      </nav>
      <Input
        suffix={(
          <span className={iconCls}/>
        )}
      />
    </header>
  )
}

export default Header