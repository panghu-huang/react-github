import * as React from 'react'
import TabContext, { ITabOptions } from '../TabContext'
import classNames from 'classnames'
import classes from './TabTitle.module.scss'

const TabTitle: React.FunctionComponent<ITabOptions> = ({
  tabKey, title,
}) => {
  const { currentTabKey, changeTab } = React.useContext(TabContext)
  const titleCls = classNames(
    classes.title,
    tabKey === currentTabKey && classes.currentTitle
  )
  const handleChangeTab = () => changeTab(tabKey)
  return (
    <h4 className={titleCls} onClick={handleChangeTab}>{title}</h4>
  )
}

export default TabTitle