import * as React from 'react'
import Container from '../Container'
import classes from './Page.module.scss'

interface IPageProps {
  title: string
}

const appName = process.env.REACT_APP_NAME

const Page: React.FunctionComponent<IPageProps> = ({
  title, children,
}) => {
  React.useEffect(() => {
    document.title = `${title} - ${appName}`
    return () => {
      document.title = ''
    }
  }, [title])
  return (
    <Container className={classes.container}>
      {children}
    </Container>
  )
}

export default Page