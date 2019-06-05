import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Location } from 'history'
import { Page, Tabs } from 'src/components'
import { ApiService } from 'src/services'
import { IRepositoryContent, IRepository } from 'src/types'
import isEqual from 'lodash/isEqual'
import RepositoryHead from './Head'
import RepositoryCode from './Code'
import RepositoryIssues from './Issues'

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

  private owner: string
  private name: string
  private branch: string
  private path: string

  constructor(props: IRepositoryProps) {
    super(props)
    this.initialize(props)
    this.state = {
      contents: [],
      repository: null,
    }
  }

  public componentDidMount() {
    this.fetchRepository()
  }

  public render() {
    const { repository } = this.state
    return (
      <Page title={`${this.owner}/${this.name}`}>
        <RepositoryHead 
          name={this.name}
          owner={this.owner}
          repository={repository}
        />
        <Tabs>
          <Tabs.TabPane
            tabKey='code'
            title='Code'>
            <RepositoryCode
              name={this.name}
              owner={this.owner}
              branch={this.branch}
              path={this.path}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tabKey='issues'
            title='Issues'>
            <RepositoryIssues
              owner={this.owner}
              name={this.name}
            />
          </Tabs.TabPane>
        </Tabs>
      </Page>
    )
  }

  public componentDidUpdate(prevProps: IRepositoryProps) {
    const equal = isEqual(this.props.match.params, prevProps.match.params)
    const { path: prevPath } = this.getBranchAndFullPath(
      prevProps.location, prevProps.match.params
    )
    const { path } = this.getBranchAndFullPath(
      this.props.location, this.props.match.params
    )
    if (!equal || prevPath !== path) {
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
    const { branch, path } = this.getBranchAndFullPath(
      props.location, props.match.params,
    )
    this.owner = props.match.params.owner
    this.name = props.match.params.name
    this.branch = branch
    this.path = path
  }

  private getBranchAndFullPath(location: Location, { owner, name }: {owner: string, name: string}) {
    const search = new URLSearchParams(location.search)
    const path = location.pathname
      .replace(
        `/repositories/${owner}/${name}`, ''
      )
    return {
      branch: search.get('branch') || 'master',
      path: path ? path.replace('/', '') : '',
    }
  }

}

export default Repository