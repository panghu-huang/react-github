import * as React from 'react'
import { MarkdownPreview, List, Avatar } from 'src/components'
import { TimeUtils } from 'src/utils'
import { IComment } from 'src/types'
import classes from './Issues.module.scss'

export interface ICommentsProps {
  comments: IComment[]
  loading: boolean
}

const Comments: React.FunctionComponent<ICommentsProps> = ({
  comments, loading,
}) => {
  const renderer = (comment: IComment) => (
    <div key={comment.id} className={classes.comment}>
      <Avatar user={comment.user} className={classes.commentAvatar}/>
      <div className={classes.commentMain}>
        <div className={classes.commentHead}>
          {comment.user.login} commented {TimeUtils.fromNow(comment.updated_at)}
        </div>
        <div className={classes.commentBody}>
          <MarkdownPreview markdown={comment.body}/>
        </div>
      </div>
    </div>
  )
  return (
    <List
      loading={loading}
      list={comments}
      renderItem={renderer}
    />
  )
}

export default Comments

