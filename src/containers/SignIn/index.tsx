import * as React from 'react'
import { Container } from 'src/components'
import classes from './SignIn.module.scss'

const SignIn: React.FunctionComponent = () => {
  return (
    <Container className={classes.container}>
      <img src="https://devhubapp.com/static/media/logo_circle.0d6ae750.png" alt=""/>
      <p>
        <span className='iconfont icon-github'>Sign in with Github</span>
      </p>
    </Container>
  )
}

export default SignIn

