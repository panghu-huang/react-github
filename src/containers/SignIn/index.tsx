import * as React from 'react'
import { ApiService } from 'src/services'
import { Notify } from 'zent'
import { Container } from 'src/components'
import classes from './SignIn.module.scss'

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET

const SignIn: React.FunctionComponent = () => {
  const redirectUrl = location.origin + location.pathname
  const [fetching, setFetching] = React.useState(false)
  const fetchAccessToken = async (code: string) => {
    try {
      const service = new ApiService('login', 'https://github.com')
      const result = await service.post({
        mode: 'no-cors',
        path: `oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
        // data: {
        //   client_id: clientId,
        //   client_secret: clientSecret,
        //   code,
        // },
        headers: {
          accept: 'application/json',
        }
      })
      console.log(result)
    } catch (error) {
      Notify.error(error.message)
    }
  }
  React.useEffect(() => {
    const search = new URLSearchParams(window.location.search)
    const code = search.get('code')
    if (code) {
      setFetching(true)
      fetchAccessToken(code)
    }
  }, [])
  let content
  if (fetching) {
    content = (
      <span>loading</span>
    )
  } else {
    content = (
      <a
        className={classes.signIn}
        href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`}>
        <span className='iconfont icon-github'>Sign in with Github</span>
      </a>
    )
  }
  return (
    <Container className={classes.container}>
      <img src="https://devhubapp.com/static/media/logo_circle.0d6ae750.png" alt=""/>
      {content}
    </Container>
  )
}

export default SignIn

