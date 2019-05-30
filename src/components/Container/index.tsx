import * as React from 'react'
import classNames from 'classnames'
import classes from './Container.module.scss'

interface IContainerProps extends React.AllHTMLAttributes<HTMLElement> {
  children: React.ReactNode,
}

const Container: React.FunctionComponent<IContainerProps> = ({
  children, className, ...otherProps
}) => {
  return (
    <section className={classNames(className, classes.container)} {...otherProps}>
      {children}
    </section>
  )
}

export default Container