import * as React from 'react'
import { ApiService } from 'src/services'
import { IRepositoryContent } from 'src/types'
import { ContentType } from 'src/config'
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

  constructor(props: IRepositoryCodeProps) {
    super(props)
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

  public componentDidUpdate(prevProps: IRepositoryCodeProps) {
    if (prevProps !== this.props) {
      this.fetchContents()
    }
  }

  private fetchContents = async () => {
    try {
      this.setState({ loading: true, contents: [], content: null })
      const { branch, owner, name, path } = this.props
      const service = new ApiService<IResult>('repos')
      const data = branch ? { ref: branch } : undefined
      const result = await service.get({
        path: `${owner}/${name}/contents/${path}`,
        data,
      })
      if (Array.isArray(result)) {
        this.setState({
          contents: result.sort((prev, next) => {
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

}

export default RepositoryCode