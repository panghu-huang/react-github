import * as React from 'react'
import { Container } from 'src/theme'
import classes from './Page.module.scss'

interface IPageProps {
  title: string
}

const Page: React.FunctionComponent<IPageProps> = ({
  title, children,
}) => {
  React.useEffect(() => {
    document.title = title
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