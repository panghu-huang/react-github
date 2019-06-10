import * as React from 'react'
import { Notify } from 'zent'
import { Link } from 'react-router-dom'
import { ApiService } from 'src/services'
import { List } from 'src/components'
import { TimeUtils } from 'src/utils'
import { DEFAULT_PAGE_SIZE } from 'src/config'
import { IIssue } from 'src/types'
import classes from './Issues.module.scss'

export interface IRepositoryIssuesProps {
  owner: string
  name: string
}

let page = 0

const RepositoryIssues: React.FunctionComponent<IRepositoryIssuesProps> = ({
  owner, name,
}) => {
  const [loading, setLoading] = React.useState(false)
  const [hasLoadAll, setHasLoadAll] = React.useState(false)
  const [issues, setIssues] = React.useState<IIssue[]>([])
  const fetchIssues = async () => {
    try {
      setLoading(true)
      const service = new ApiService('repos')
      const list = await service.get({
        path: `${owner}/${name}/issues`,
        data: {
          page: ++page,
          per_page: DEFAULT_PAGE_SIZE,
        },
      })
      setIssues(issues.concat(list))
      if (list.length < DEFAULT_PAGE_SIZE) {
        setHasLoadAll(true)
      }
    } catch (e) {
      Notify.error(e.message)
    } finally {
      setLoading(false)
    }
  }
  const renderer = (issue: IIssue) => {
    return (
      <div className={classes.issue} key={issue.id}>
        <div className={classes.main}>
          <div className={classes.head}>
            <h4 className={classes.title}>
              <Link to={`/issues/${owner}/${name}/${issue.number}`}>{issue.title}</Link>
            </h4>
            {issue.labels.map(issueLabel => (
              <span
                key={issueLabel.id}
                className={classes.label}
                style={{
                  backgroundColor: `#${issueLabel.color}`,
                }}>
                {issueLabel.name}
              </span>
            ))}
          </div>
          <p className={classes.body}>
            #{issue.number} opened {TimeUtils.fromNow(issue.created_at)} by {issue.user.login}
          </p>
        </div>
        {issue.comments && (
          <span className={classes.comments}>{issue.comments}</span>
        )}
      </div>
    )
  }
  React.useEffect(() => {
    fetchIssues()
  }, [])
  return (
    <List
      loadMore={fetchIssues}
      loading={loading}
      hasLoadAll={hasLoadAll}
      list={issues}
      renderItem={renderer}
    />
  )
}

export default RepositoryIssues

