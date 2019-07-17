import * as React from 'react'
import classNames from 'classnames'
import classes from './Container.module.scss'

interface IContainerProps extends React.AllHTMLAttributes<HTMLElement> {
  children: React.ReactNode,
}

const Container: React.FunctionComponent<IContainerProps> = ({
  children, className, ...otherProps
}) => {
  const cls = React.useMemo(() => classNames(className, classes.container), [className])
  return (
    <section className={cls} {...otherProps}>
      {children}
    </section>
  )
}

export default Container
