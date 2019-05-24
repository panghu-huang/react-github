import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import { Page } from 'src/components'
import { ApiService } from 'src/services'
import { IRepositoryContent, IRepository } from 'src/types'
import Head from './Head'
import Contents from './Contents'
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
      activeKey: 'code',
      contents: [],
      repository: null,
    }
    console.log(this.branch, this.path || 'empty path')
  }

  public componentDidMount() {
    this.fetchRepository()
  }

  public render() {
    const { repository, activeKey } = this.state
    return (
      <Page title={`${this.owner}/${this.name}`}>
        <Head 
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
            className={classes.tab}
            eventKey='code'
            title='Code'>
            <Contents 
              name={this.name}
              owner={this.owner}
              branch={this.branch}
              path={this.path}
            />
          </Tab>
          <Tab 
            className={classes.tab}
            eventKey='issues'
            title='Issues'>
            Issues
          </Tab>
        </Tabs>
      </Page>
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
      branch: '',
      path: '',
    }
  }

  private handleTabChange = (key: string) => {
    this.setState({ activeKey: key })
  }

}

export default Repository