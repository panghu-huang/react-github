import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import { Page } from 'src/components'
import { ApiService } from 'src/services'
import { IRepositoryContent, IRepository } from 'src/types'
import RepositoryHead from './Head'
import RepositoryCode from './RepositoryCode'
import classes from './Repository.module.scss'

interface IParams {
  owner: string
  name: string
}

type IRepositoryProps = RouteComponentProps<IParams>

interface IRepositoryState {
  activeKey: string
  repository: IRepository | null
  contents: IRepositoryContent[]
}

class Repository extends React.Component<IRepositoryProps, IRepositoryState> {

  private owner: string
  private name: string
  private branch: string
  private path: string

  constructor(props: IRepositoryProps) {
    super(props)
    this.initialize(props)
    this.state = {
      activeKey: 'code',
      contents: [],
      repository: null,
    }
  }

  public componentDidMount() {
    this.fetchRepository()
  }

  public render() {
    const { repository, activeKey } = this.state
    return (
      <Page title={`${this.owner}/${this.name}`}>
        <RepositoryHead 
          name={this.name}
          owner={this.owner}
          repository={repository}
        />
        <Tabs 
          id='repository-tab' 
          activeKey={activeKey}
          className={classes.tabs}
          onSelect={this.handleTabChange}>
          <Tab 
            className='tab-item'
            eventKey='code'
            title='Code'>
            <RepositoryCode
              name={this.name}
              owner={this.owner}
              branch={this.branch}
              path={this.path}
            />
          </Tab>
          <Tab 
            className='tab-item'
            eventKey='issues'
            title='Issues'>
            Issues
          </Tab>
        </Tabs>
      </Page>
    )
  }

  public componentDidUpdate(prevProps: IRepositoryProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.initialize(this.props)
      this.fetchRepository()
    }
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

  private initialize(props: IRepositoryProps) {
    const { owner, name  } = props.match.params
    const { branch, path } = this.getBranchAndFullPath(
      owner, name,
    )
    this.owner = owner
    this.name = name
    this.branch = branch
    this.path = path
  }

  private getBranchAndFullPath(owner: string, name: string) {
    const { location } = this.props
    const [branch] = location.pathname
      .replace(
        `/repositories/${owner}/${name}/`, ''
      )
      .split('/')
    if (branch) {
      const path = location.pathname
        .replace(
          `/repositories/${owner}/${name}/${branch}`, ''
        )
      return {
        branch,
        path: path ? path.replace('/', '') : '',
      }
    }
    return {
      branch: 'master',
      path: '',
    }
  }

  private handleTabChange = (key: string) => {
    this.setState({ activeKey: key })
  }

}

export default Repository