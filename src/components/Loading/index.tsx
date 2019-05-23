import * as React from 'react'
import { Spinner } from 'react-bootstrap'
import { Text } from 'src/theme'
import classNames from 'classnames'
import classes from './Loading.module.scss'

interface ILoadingProps {
  loading?: boolean
  children?: React.ReactNode
}

const Loading: React.FunctionComponent<ILoadingProps> = ({
  loading = true, children,
}) => {
  const loadingCls = classNames(
    classes.loading,
    !loading && classes.hidden,
  )
  return (
    <div className={classes.container}>
      <div className={loadingCls}>
        <Spinner 
          className={classes.spinner}
          animation='border' 
          variant='primary' 
        />
        <Text className={classes.text}>Loading...</Text>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Loading