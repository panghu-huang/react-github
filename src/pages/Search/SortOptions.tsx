import * as React from 'react'
import { Select } from 'zent'
import { ISearchType } from './SearchType'
import classes from './Search.module.scss'

export interface ISortOptionsProps {
  type: ISearchType
  value: string
  onChange: (sort: string) => void
}

const sortOptions = {
  repositories: [
    {
      text: 'Best match', value: 'match',
    },
    {
      text: 'Stars', value: 'stars',
    },
    {
      text: 'Forks', value: 'forks',
    },
    {
      text: 'Updated', value: 'updated',
    },
  ],
  users: [
    {
      text: 'Best match', value: 'match',
    },
    {
      text: 'Followers', value: 'followers',
    },
    {
      text: 'Repositories', value: 'repositories',
    },
    {
      text: 'Joined', value: 'joined',
    }
  ]
}

const SortOptions: React.FunctionComponent<ISortOptionsProps> = props => {
  const options = sortOptions[props.type]
  const handleChange = (evt: any) => {
    const value = evt.target.value
    props.onChange(value === 'match' ? '' : value)
  }
  return (
    <Select
      className={classes.sortOptions}
      data={options}
      value={props.value || 'match'}
      onChange={handleChange}
    />
  )
}

export default React.memo(SortOptions)

