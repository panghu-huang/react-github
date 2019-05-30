import * as React from 'react'
import { ApiService } from 'src/services'
import { Loading } from 'src/components'
import { IRepositoryContent } from 'src/types'
import { ContentType } from 'src/config'
import RepositoryCodeHead from './Head'
import RepositoryContents from './Contents'
import RepositoryContent from './Content'
import classes from './RepositoryCode.module.scss'

interface IRepositoryCodeProps {
  owner: string
  name: string
  path: string
  branch: string
}

interface IRepositoryCodeState {
  loading: boolean
  contents: IRepositoryContent[]
  content: IRepositoryContent | null
  readmeLoading: boolean
  readme: IRepositoryContent | null
}

type IResult = IRepositoryContent[] | IRepositoryContent

class RepositoryCode extends React.Component<IRepositoryCodeProps, IRepositoryCodeState> {

  private branch: string

  constructor(props: IRepositoryCodeProps) {
    super(props)
    this.branch = props.branch
    this.state = {
      loading: false,
      contents: [],
      content: null,
      readmeLoading: false,
      readme: null,
    }
  }

  public componentDidMount() {
    this.fetchContents()
    this.fetchRepositoryReadme()
  }

  public render() {
    const { owner, name, path } = this.props
    const content = this.renderMainContent()
    const readme = this.renderReadme()
    return (
      <div>
        <RepositoryCodeHead
          branch={this.branch}
          owner={owner}
          name={name}
          path={path}
          onBranchChange={this.handleBranchChange}
        />
        {content}
        {readme}
      </div>
    )
  }

  public componentDidUpdate(prevProps: IRepositoryCodeProps) {
    if (prevProps !== this.props) {
      this.fetchContents()
      this.fetchRepositoryReadme()
    }
  }

  private renderMainContent() {
    const { loading, contents, content } = this.state
    if (content != null) {
      return <RepositoryContent content={content} />
    }
    return (
      <RepositoryContents
        loading={loading}
        contents={contents}
        {...this.props}
      />
    )
  }

  private renderReadme() {
    const { readme, readmeLoading } = this.state
    if (this.props.path) {
      return null
    }
    return (
      <Loading loading={readmeLoading}>
        {readme && (
          <div className={classes.readme}>
            <p className={classes.readmeTitle}>
              {readme.name}
            </p>
            <div className={classes.readmeContent}>
              <RepositoryContent content={readme} />
            </div>
          </div>
        )}
      </Loading>
    )
  }

  private fetchContents = async () => {
    try {
      this.setState({ loading: true, contents: [], content: null })
      const { owner, name, path } = this.props
      const service = new ApiService<IResult>('repos')
      const data = this.branch ? { ref: this.branch } : undefined
      const result = await service.get({
        path: `${owner}/${name}/contents/${path}`,
        data,
      })
      if (Array.isArray(result)) {
        this.setState({
          contents: this.formatContents(result),
          loading: false,
        })
      } else {
        this.setState({
          content: result,
          loading: false,
        })
      }
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  private fetchRepositoryReadme = async () => {
    if (this.props.path) {
      return
    }
    try {
      this.setState({ readmeLoading: true })
      const { owner, name } = this.props
      const service = new ApiService<IRepositoryContent>('repos')
      const readme = await service.get({
        path: `${owner}/${name}/readme`,
      })
      this.setState({
        readmeLoading: false,
        readme,
      })
    } catch (error) {
      console.log(error)
      this.setState({
        readmeLoading: false,
      })
    }
  }

  private handleBranchChange = (branch: string) => {
    this.branch = branch
    this.fetchContents()
  }

  private formatContents(contents: IRepositoryContent[]) {
    return contents.sort((prev, next) => {
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
    })
  }

}

export default RepositoryCode