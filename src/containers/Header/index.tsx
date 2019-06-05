import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input } from 'zent'
import { actions } from 'src/store'
import ThemeDialog from './ThemeDialog'
import classNames from 'classnames'
import classes from './Header.module.scss'

const Header: React.FunctionComponent = () => {
  const [dialogVisible, setDialogVisible] = React.useState(false)
  const [keyword, setKeyword] = React.useState(
    new URLSearchParams(location.search).get('keyword') || ''
  )
  const iconSearchCls = classNames(
    'iconfont', 'icon-search', classes.iconSearch,
  )
  const iconThemeCls = classNames(
    'iconfont', 'icon-theme', classes.iconTheme,
  )
  const toggleThemeDialogVisible = () => setDialogVisible(!dialogVisible)
  const handleKeywordChange = (evt: React.ChangeEvent) => {
    setKeyword((evt.target as HTMLInputElement).value)
  }
  const goToSearch = () => {
    actions.history.push(`/search?keyword=${keyword}`)
  }
  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.keyCode === 13) {
      goToSearch()
    }
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
          value={keyword}
          onChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          addonAfter={(
            <span
              className={iconSearchCls}
              onClick={goToSearch}
            />
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