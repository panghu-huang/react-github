import * as React from 'react'
import classNames from 'classnames'
import classes from './Loading.module.scss'

interface ILoadingProps {
  loading?: boolean
  children?: React.ReactNode
}

const Loading: React.FunctionComponent<ILoadingProps> = ({
  loading = true, children,
}) => {
  const containerCls = classNames(
    classes.container,
    loading && classes.withMinHeight,
  )
  const loadingCls = classNames(
    classes.loading,
    !loading && classes.hidden,
  )
  return (
    <div className={containerCls}>
      <div className={loadingCls}>
        <span className={classes.text}>Loading...</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Loading