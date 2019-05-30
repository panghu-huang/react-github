import * as React from 'react'
import TabContext, { ITabOptions } from '../TabContext'

interface ITabPaneProps extends ITabOptions {
  children: React.ReactNode
}

const TabPane: React.FunctionComponent<ITabPaneProps> = ({
  title, tabKey, children,
}) => {
  const context = React.useContext(TabContext)
  const [isMounted, setIsMounted] = React.useState(
    tabKey === context.currentTabKey
  )
  React.useEffect(() => {
    context.addTab({ tabKey, title })
    return () => setIsMounted(false)
  }, [])
  if (!isMounted) {
    if (tabKey === context.currentTabKey) {
      setIsMounted(true)
    }
    return null
  }
  return (
    <div hidden={tabKey !== context.currentTabKey}>
      {children}
    </div>
  )
}

export default TabPane