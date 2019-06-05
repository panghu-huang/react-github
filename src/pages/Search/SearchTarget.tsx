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
  initialTarget: SearchTargetType
  onChange: (target: SearchTargetType) => void
}

const SearchTarget: React.FunctionComponent<ITargetProps> = props => {
  const [target, setTarget] = React.useState(props.initialTarget)
  const generateHandler = (target: SearchTargetType) => {
    return () => {
      setTarget(target)
      props.onChange(target)
    }
  }
  const menu = Object.values(SearchTargetType).map(target => {
    return (
      <p
        key={target}
        className={classes.target}
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
      <Button>{target}</Button>
    </Pop>
  )
}

export default SearchTarget

