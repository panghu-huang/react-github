import * as React from 'react'
import { useFetch } from 'src/hooks'
import { Link } from 'react-router-dom'
import { List } from 'src/components'
import { TimeUtils } from 'src/utils'
import { IIssue } from 'src/types'
import classes from './Issues.module.scss'

export interface IRepositoryIssuesProps {
  owner: string
  name: string
}

const RepositoryIssues: React.FunctionComponent<IRepositoryIssuesProps> = ({
  owner, name,
}) => {
  const { data, loading, hasLoadAll, fetchData } = useFetch({
    routeName: 'repos',
    path: `${owner}/${name}/issues`,
  })
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
          <span className={`iconfont icon-comment ${classes.comments}`}>
            {issue.comments}
          </span>
        )}
      </div>
    )
  }
  return (
    <List
      list={data || []}
      loadMore={fetchData}
      loading={loading}
      hasLoadAll={hasLoadAll}
      renderItem={renderer}
    />
  )
}

export default RepositoryIssues

