import * as React from 'react'

export interface ITabOptions {
  tabKey: string
  title: React.ReactNode
}

export interface ITabsOptions {
  currentTabKey: string | null
  addTab: (tab: ITabOptions) => void
  changeTab: (tabKey: string) => void
}

const defaultValues: ITabsOptions = {
  currentTabKey: null,
  addTab: (tab: ITabOptions) => {/* default function */},
  changeTab: (tabKey: string) => {/* default function */},
}

export default React.createContext(defaultValues)