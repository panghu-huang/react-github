import * as React from 'react'
import { ApiService } from 'src/services'
import { IRepositoryContent } from 'src/types'
import { ContentType } from 'src/config'
import RepositpryCodeHead from './Head'
import RepositoryContents from './Contents'
import RepositoryContent from './Content'

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
    }
  }

  public componentDidMount() {
    this.fetchContents()
  }

  public render() {
    const { owner, name, path } = this.props
    const content = this.renderMainContent()
    return (
      <div>
        <RepositpryCodeHead 
          branch={this.branch}
          owner={owner}
          name={name}
          path={path}
          onBranchChange={this.handleBranchChange}
        />
        {content}
      </div>
    )
  }

  public componentDidUpdate(prevProps: IRepositoryCodeProps) {
    if (prevProps !== this.props) {
      this.fetchContents()
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