import * as React from 'react'
import { Link } from 'react-router-dom'
import { Pop, Menu, Button } from 'zent'
import { ApiService } from 'src/services'
import { IBranch } from 'src/types'
import classes from './RepositoryCode.module.scss'

interface IRepositoryCodeHeadProps {
  branch: string
  owner: string
  name: string
  path: string
  onBranchChange: (branch: string) => void
}

interface IRepositoryCodeHeadState {
  branch: string
  branches: IBranch[]
}

class RepositoryCodeHead extends React.PureComponent<IRepositoryCodeHeadProps, IRepositoryCodeHeadState> {

  constructor(props: IRepositoryCodeHeadProps) {
    super(props)
    this.state = {
      branch: props.branch,
      branches: [],
    }
  }

  public componentDidMount() {
    this.fetchBranches()
  }

  public render() {
    const { branches, branch } = this.state
    const path = this.renderPath()
    const branchesMenu = (
      <Menu>
        {branches.map(branch => (
          <Menu.MenuItem
            key={branch.name}>
            {branch.name}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
    return (
      <div className={classes.head}>
        <Pop trigger='hover' content={branchesMenu}>
          <Button>{branch}</Button>
        </Pop>
        <div className={classes.path}>
          {path}
        </div>
      </div>
    )
  }

  private renderPath() {
    const { path, owner, name } = this.props
    if (path) {
      const pathComponent = []
      const { branch } = this.state
      const basePath = `/repositories/${owner}/${name}/${branch}`
      pathComponent.push(
        <Link key={name} to={basePath}>{name}</Link>
      )
      const pathArray = path.split('/')
      pathArray.forEach((item, index) => {
        const suffix = pathArray.slice(0, index + 1).join('/')
        pathComponent.push(
          <span key={`divider-${index}`}>/</span>
        )
        pathComponent.push(
          <Link key={`${item}-${index}`} to={`${basePath}/${suffix}`}>{item}</Link>
        )
      })
      return pathComponent
    }
    return null
  }

  private fetchBranches = async () => {
    try {
      const { owner, name } = this.props
      const service = new ApiService<IBranch[]>('repos')
      const branches = await service.get({
        path: `${owner}/${name}/branches`,
      })
      this.setState({ branches })
    } catch (error) {
      console.log(error)
    }
  }

  // private changeBranch = (key: string) => {
  //   this.setState({ branch: key })
  //   this.props.onBranchChange(key)
  // }

}

export default RepositoryCodeHead