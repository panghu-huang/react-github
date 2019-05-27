import * as React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'src/components'
import { ApiService } from 'src/services'
import { IRepositoryContent } from 'src/types'
import { ContentType } from 'src/config'
import classNames from 'classnames'
import classes from './Content.module.scss'

interface IRepositoryContentProps {
  owner: string
  name: string
  path: string
  branch: string
}

interface IRepositoryContentState {
  loading: boolean
  contents: IRepositoryContent[]
}

class RepositoryContents extends React.Component<IRepositoryContentProps, IRepositoryContentState> {

  constructor(props: IRepositoryContentProps) {
    super(props)
    this.state = {
      loading: false,
      contents: [],
    }
  }

  public componentDidMount() {
    this.fetchContents()
  }

  public render() {
    const { contents, loading } = this.state
    return (
      <List
        loading={loading}
        list={contents}
        renderItem={this.renderFileContent}
      />
    )
  }

  public componentDidUpdate(prevProps: IRepositoryContentProps) {
    if (prevProps !== this.props) {
      this.fetchContents()
    }
  }

  private fetchContents = async () => {
    try {
      this.setState({ loading: true, contents: [] })
      const { branch, owner, name, path } = this.props
      const service = new ApiService<IRepositoryContent[]>('repos')
      const data = branch ? { ref: branch } : undefined
      const contents = await service.get({
        path: `${owner}/${name}/contents/${path}`,
        data,
      })
      this.setState({
        contents: contents.sort((prev, next) => {
          if (prev.type === next.type) {
            if (prev.name.startsWith('.')) {
              return 1
            }
            return -1
          }
          if (prev.type === ContentType.File) {
            return 1
          }
          return -1
        }),
        loading: false,
      })
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  private renderFileContent = (content: IRepositoryContent) => {
    const cls = classNames(
      'iconfont',
      content.type === ContentType.Dir ? 'icon-folder' : 'icon-file'
    )
    const { owner, name, branch, path } = this.props
    const updatedPath = path ? `${path}/${content.name}` : content.name
    return (
      <div 
        key={content.name}
        className={classes.item}>
        <span className={cls}>
          <Link to={`/repositories/${owner}/${name}/${branch}/${updatedPath}`}>
            {content.name}
          </Link>
        </span>
      </div>
    )
  }

}

export default RepositoryContents