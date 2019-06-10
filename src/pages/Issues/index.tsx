import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Notify } from 'zent'
import { ApiService } from 'src/services'
import { RepositoryHead } from 'src/containers'
import { Page } from 'src/components'
import { IComment, IIssue, IRepository } from 'src/types'
import Comments from './Comments'
import classes from './Issues.module.scss'

export interface IParams {
  owner: string
  name: string
  number: string
}

export type IIssuesProps = RouteComponentProps<IParams>

export interface IIssuesState {
  issue: IIssue | null
  repository: IRepository | null
  comments: IComment[]
}

class Issues extends React.Component<IIssuesProps, IIssuesState> {

  private readonly matchedParams: IParams

  constructor(props: IIssuesProps) {
    super(props)
    this.matchedParams = props.match.params
    this.state = {
      issue: null,
      repository: null,
      comments: [],
    }
  }

  public componentDidMount() {
    this.fetchRepository()
    this.fetchIssue()
    this.fetchComments()
  }

  public render() {
    const { repository, comments, issue } = this.state
    return (
      <Page title={this.title}>
        <RepositoryHead
          owner={this.matchedParams.owner}
          name={this.matchedParams.name}
          repository={repository}
        />
        <div className={classes.divider}/>
        <h1 className={classes.title}>
          {issue && issue.title}
        </h1>
        <Comments comments={comments}/>
      </Page>
    )
  }

  private get title() {
    const { issue } = this.state
    const { owner, name, number } = this.matchedParams
    const base = `issue #${number} - ${owner}/${name}`
    if (issue) {
      return `${issue.title} - ${base}`
    }
    return base
  }

  private fetchIssue = async () => {
    try {
      const { owner, name, number } = this.matchedParams
      const service = new ApiService<IIssue>('repos')
      const issue = await service.get({
        path: `${owner}/${name}/issues/${number}`,
      })
      this.setState(({ comments }) => {
        const comment: IComment = {
          id: issue.id,
          user: issue.user,
          body: issue.body,
          created_at: issue.created_at,
          updated_at: issue.updated_at,
        }
        return {
          issue,
          comments: [comment].concat(comments),
        }
      })
    } catch (error) {
      Notify.error(error.message)
    }
  }

  private fetchComments = async () => {
    try {
      const { owner, name, number } = this.matchedParams
      const service = new ApiService<IComment[]>('repos')
      const cmts = await service.get({
        path: `${owner}/${name}/issues/${number}/comments`,
      })
      this.setState(({ comments }) => {
        return {
          comments: comments.concat(cmts),
        }
      })
    } catch (error) {
      Notify.error(error.message)
    }
  }

  private fetchRepository = async () => {
    try {
      const { owner, name } = this.matchedParams
      const service = new ApiService('repos')
      const repository = await service.get({
        path: `${owner}/${name}`,
      })
      this.setState({ repository })
    } catch (error) {
      Notify.error(error.message)
    }
  }

}

export default Issues

