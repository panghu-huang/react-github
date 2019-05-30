import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input } from 'src/components'
import ThemeDialog from './ThemeDialog'
import classNames from 'classnames'
import classes from './Header.module.scss'

const Header: React.FunctionComponent = () => {
  const [dialogVisible, setDialogVisible] = React.useState(false)
  const iconSearchCls = classNames(
    'iconfont', 'icon-search', classes.iconSearch,
  )
  const iconThemeCls = classNames(
    'iconfont', 'icon-theme', classes.iconTheme,
  )
  const toggleThemeDialogVisible = () => {
    setDialogVisible(!dialogVisible)
  }
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
      <div className={classes.operateBar}>
        <Input
          suffix={(
            <span className={iconSearchCls}/>
          )}
        />
        <span
          className={iconThemeCls}
          onClick={toggleThemeDialogVisible}
        />
      </div>
      <ThemeDialog
        visible={dialogVisible}
        onClose={toggleThemeDialogVisible}
      />
    </header>
  )
}

export default Header