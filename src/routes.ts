import * as pages from 'src/pages'
import { RouteProps } from 'react-router-dom'

const routes: RouteProps[] = [
  {
    path: '/',
    component: pages.Popular,
  },
  {
    path: '/events',
    component: pages.Events,
  },
  {
    path: '/activities',
    component: pages.Activity,
  }
]

export default routes