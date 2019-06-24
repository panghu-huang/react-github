import * as React from 'react'
import classNames from 'classnames'
import classes from './Input.module.scss'

export interface IInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode
}

const Input: React.FunctionComponent<IInputProps> = ({
  className, suffix, ...otherProps
}) => {
  return (
    <div className={classNames(classes.container, className)}>
      <input {...otherProps}/>
      {suffix}
    </div>
  )
}

export default Input

