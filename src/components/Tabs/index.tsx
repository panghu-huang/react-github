import * as React from 'react'
import TabContext, { ITabsOptions, ITabOptions } from './TabContext'
import TabTitle from './TabTitle'
import TabPane from './TabPane'
import classes from './Tabs.module.scss'

export interface ITabsProps {
  onTabChange?: (key: string) => void
}

export interface ITabsState {
  tabs: ITabOptions[]
  data: ITabsOptions
}

class Tabs extends React.Component<ITabsProps, ITabsState> {

  public static TabPane = TabPane

  constructor(props: ITabsProps) {
    super(props)
    this.state = {
      tabs: [],
      data: {
        currentTabKey: null,
        addTab: this.addTab,
        changeTab: this.changeTab,
      },
    }
  }

  public render() {
    const { children } = this.props
    const { data, tabs } = this.state
    const titles = this.renderTabTitles(tabs)
    return (
      <TabContext.Provider value={data}>
        <div className={classes.container}>
          <div className={classes.title}>{titles}</div>
          <div className={classes.content}>{children}</div>
        </div>
      </TabContext.Provider>
    )
  }

  /**
   * 渲染选项卡标题信息
   * @param tabs 选项卡配置
   */
  private renderTabTitles(tabs: ITabOptions[]) {
    return tabs.map(({ title, tabKey }) => (
      <TabTitle 
        key={tabKey}
        tabKey={tabKey}
        title={title} 
      />
    ))
  }

  /**
   * 增加一个选项卡
   * @param tab 选项卡配置
   */
  private addTab = (tab: ITabOptions) => {
    this.setState(({ tabs, data }) => {
      if (tabs.length === 0) {
        data.currentTabKey = tab.tabKey
      }
      return {
        tabs: tabs.concat(tab),
        data: { ...data },
      }
    })
  }

  /**
   * 切换当前选项卡
   * @param key 选中的选项卡 key
   */
  private changeTab = (key: string) => {
    this.setState(({ data }) => {
      return {
        data: {
          ...data,
          currentTabKey: key,
        },
      }
    }, () => {
      const { onTabChange } = this.props
      if (onTabChange) {
        onTabChange(key)
      }
    })
  }

}

export default Tabs
