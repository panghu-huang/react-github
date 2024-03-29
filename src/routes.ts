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
    // full path -> /repositories/:owner/:name/:path?branch=:branch
    path: '/repositories/:owner/:name',
    exact: false,
    component: pages.Repository,
  },
  {
    path: '/users/:name',
    component: pages.User,
  },
  {
    path: '/orgs/:name',
    component: pages.Organization,
  },
  {
    path: '/search',
    component: pages.Search,
  },
  {
    path: '/issues/:owner/:name/:number',
    component: pages.Issues,
  },
]

export default routes