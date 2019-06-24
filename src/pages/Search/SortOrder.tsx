import * as React from 'react'
import { Select } from 'zent'
import classes from './Search.module.scss'

export interface ISortOrderProps {
  value: string
  onChange: (order: string) => void
}

const options = [
  { text: '升序', value: 'asc' },
  { text: '降序', value: 'desc' },
]

const SortOrder: React.FunctionComponent<ISortOrderProps> = props => {
  const handleChange = React.useCallback((evt: any) => {
    props.onChange(evt.target.value)
  }, [])
  return (
    <Select
      className={classes.sortOrder}
      data={options}
      value={props.value}
      onChange={handleChange}
    />
  )
}

export default React.memo(SortOrder)

