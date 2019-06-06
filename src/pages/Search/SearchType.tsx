import * as React from 'react'
import { Button, Pop } from 'zent'
import classes from './Search.module.scss'

export enum ISearchType {
  Repositories = 'repositories',
  Users = 'users',
  Code = 'code',
  Commits = 'commits',
}

export interface ISearchTypeProps {
  value: ISearchType
  onChange: (type: ISearchType) => void
}

const SearchType: React.FunctionComponent<ISearchTypeProps> = props => {
  const generateHandler = (type: ISearchType) => {
    return () => {
      props.onChange(type)
    }
  }
  const menu = Object.values(ISearchType).map(type => {
    return (
      <p
        key={type}
        className={classes.select}
        onClick={generateHandler(type)}>
        {type}
      </p>
    )
  })
  return (
    <Pop
      trigger='hover'
      position='bottom-left'
      content={menu}>
      <Button>{props.value}</Button>
    </Pop>
  )
}

export default React.memo(SearchType)

