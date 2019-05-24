import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from 'src/components'
import { ApiService } from 'src/services'
import { IRepositoryContent, IRepository } from 'src/types'

interface IParams {
  owner: string
  name: string
}

type IRepositoryProps = RouteComponentProps<IParams>

interface IRepositoryState {
  repository: IRepository | null
  contents: IRepositoryContent[]
}

class Repository extends React.Component<IRepositoryProps, IRepositoryState> {

  private readonly owner: string
  private readonly name: string
  private branch: string
  private path: string

  constructor(props: IRepositoryProps) {
    super(props)
    const { owner, name  } = props.match.params
    const { branch, path } = this.getBranchAndFullPath(
      owner, name,
    )
    this.owner = owner
    this.name = name
    this.branch = branch
    this.path = path
    this.state = {
      contents: [],
      repository: null,
    }
    console.log(this.branch, this.path || 'empty path')
  }

  public componentDidMount() {
    this.fetchRepository()
    this.fetchContents()
  }

  public render() {
    return (
      <Page title={`${this.owner}/${this.name}`}>repository</Page>
    )
  }

  private fetchRepository = async () => {
    try {
      const service = new ApiService('repos')
      const repository = await service.get({
        path: `${this.owner}/${this.name}`,
      })
      this.setState({ repository })
    } catch (error) {
      console.log(error)
    }
  }

  private fetchContents = async () => {
    try {
      const service = new ApiService('repos')
      const data = this.branch ? { ref: this.branch } : undefined
      const contents = await service.get({
        path: `${this.owner}/${this.name}/contents/${this.path}`,
        data,
      })
      this.setState({ contents })
    } catch (error) {
      console.log(error)
    }
  }

  private getBranchAndFullPath(owner: string, name: string) {
    const { location } = this.props
    const [branch] = location.pathname
      .replace(
        `/repositories/${owner}/${name}/`, ''
      )
      .split('/')
    if (!branch) {
      return {
        branch: '',
        path: '',
      }
    }
    const path = location.pathname
      .replace(
        `/repositories/${owner}/${name}/${branch}`, ''
      )
    return {
      branch,
      path: path ? path.replace('/', '') : '',
    }
  }

}

export default Repository