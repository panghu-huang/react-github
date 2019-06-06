import * as React from 'react'
import { Select } from 'zent'
import { SearchTargetType } from './SearchTarget'

export interface ISortOptionsProps {
  searchTarget: SearchTargetType
  onChange: (sort: string) => void
}

const sortOptions = {
  repositories: [
    {
      text: 'Best match', value: '',
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
      text: 'Best match', value: '',
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
  const options = sortOptions[props.searchTarget]
  const handleChange = (evt: any) => {
    props.onChange(evt.target.value)
  }
  return (
    <Select
      data={options}
      onChange={handleChange}
    />
  )
}

export default SortOptions

