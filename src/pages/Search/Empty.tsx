import * as React from 'react'
import { Input, Button } from 'zent'
import { Page } from 'src/components'
import classes from './Search.module.scss'

export interface IEmptyProps {
  onSearch: (k: string) => void
}

const Empty: React.FunctionComponent<IEmptyProps> = (props) => {
  const [value, setValue] = React.useState('')
  const handleChange = (evt: React.ChangeEvent) => {
    setValue((evt.target as HTMLInputElement).value)
  }
  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.keyCode === 13) {
      props.onSearch(value)
    }
  }
  const search = () => props.onSearch(value)
  return (
    <Page title='Code Search'>
      <div className={classes.empty}>
        <h2 className={classes.empty__title}>Code Search</h2>
        <div className={classes.empty__content}>
          <Input
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            addonBefore={(
              <span className='iconfont icon-search'/>
            )}
          />
          <Button onClick={search}>搜索</Button>
        </div>
      </div>
    </Page>
  )
}

export default Empty

