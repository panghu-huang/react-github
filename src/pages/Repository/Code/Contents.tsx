import * as React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'src/components'
import { IRepositoryContent } from 'src/types'
import { ContentType } from 'src/config'
import classNames from 'classnames'
import classes from './RepositoryCode.module.scss'

interface IRepositoryContentsProps {
  loading: boolean
  contents: IRepositoryContent[]
  owner: string
  name: string
  branch: string
  path: string
}

const RepositoryContents: React.FunctionComponent<IRepositoryContentsProps> = ({
  loading, contents, owner, name, branch, path,
}) => {
  const renderFileContent = (content: IRepositoryContent) => {
    const cls = classNames(
      'iconfont',
      content.type === ContentType.Dir ? 'icon-folder' : 'icon-file'
    )
    const updatedPath = path ? `${path}/${content.name}` : content.name
    return (
      <div 
        key={content.name}
        className={classes.content}>
        <span className={cls}>
          <Link to={`/repositories/${owner}/${name}/${updatedPath}?branch=${branch}`}>
            {content.name}
          </Link>
        </span>
      </div>
    )
  }
  return (
    <List
      loading={loading}
      list={contents}
      renderItem={renderFileContent}
    />
  )
}

export default RepositoryContents