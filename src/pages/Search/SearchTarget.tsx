import * as React from 'react'
import { Button, Pop } from 'zent'
import classes from './Search.module.scss'

export enum SearchTargetType {
  Repositories = 'repositories',
  Users = 'users',
  Code = 'code',
  Commits = 'commits',
}

export interface ITargetProps {
  target: SearchTargetType
  onChange: (target: SearchTargetType) => void
}

const SearchTarget: React.FunctionComponent<ITargetProps> = props => {
  const generateHandler = (target: SearchTargetType) => {
    return () => {
      props.onChange(target)
    }
  }
  const menu = Object.values(SearchTargetType).map(target => {
    return (
      <p
        key={target}
        className={classes.select}
        onClick={generateHandler(target)}>
        {target}
      </p>
    )
  })
  return (
    <Pop
      trigger='hover'
      position='bottom-left'
      content={menu}>
      <Button>{props.target}</Button>
    </Pop>
  )
}

export default SearchTarget

