import * as pages from 'src/pages'
import { RouteProps } from 'react-router-dom'

const routes: RouteProps[] = [
  {
    path: '/',
    component: pages.Popular,
  },
  {
    path: '/activities',
    component: pages.Activity,
  },
  {
    path: '/repositories/:owner/:name',
    exact: false,
    component: pages.Repository,
  },
]

export default routes