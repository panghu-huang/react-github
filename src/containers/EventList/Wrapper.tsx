import * as React from 'react'
import { Avatar } from 'src/components'
import RepositoryLink from './RepositoryLink'
import classes from './Events.module.scss'

interface IWrapperProps {
  fullName: string
}

const Wrapper: React.FunctionComponent<IWrapperProps> = ({
  fullName,
}) => {
  return (
    <div className={classes.wrapper}>
      <Avatar repoFullName={fullName} size={24}/>
      <RepositoryLink fullName={fullName}/>
    </div>
  )
}

export default Wrapper

