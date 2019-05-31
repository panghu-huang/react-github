import * as pages from 'src/pages'
import { RouteProps } from 'react-router-dom'

const routes: RouteProps[] = [
  {
    path: '/',
    component: pages.Home,
  },
  {
    path: '/activities',
    component: pages.Activity,
  },
  {
    // full path -> /repositories/:owner/:name/:branch/:path
    path: '/repositories/:owner/:name',
    exact: false,
    component: pages.Repository,
  },
  {
    path: '/users/:name',
    component: pages.User,
  },
  {
    path: '/oauth',
    component: pages.OAuth,
  },
]

export default routes