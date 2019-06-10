import { Utils } from 'src/utils'

export const Home = Utils.lazyload(
  () => import(/* webpackChunkName: "home" */'./Home')
)

export const Repository = Utils.lazyload(
  () => import(/* webpackChunkName: "repositories" */'./Repository')
)

export const Activity = Utils.lazyload(
  () => import(/* webpackChunkName: "activities" */'./Activity')
)

export const User = Utils.lazyload(
  () => import(/* webpackChunkName: "users" */'./User')
)

export const Organization = Utils.lazyload(
  () => import(/* webpackChunkName: "organizations" */'./Organization')
)

export const Search = Utils.lazyload(
  () => import(/* webpackChunkName: "search" */'./Search')
)

export const Issues = Utils.lazyload(
  () => import(/* webpackChunkName: "issues" */'./Issues')
)

// export { default as Home } from './Home'
// export { default as Repository } from './Repository'
// export { default as Activity } from './Activity'
// export { default as User } from './User'
// export { default as Organization } from './Organization'
// export { default as Search } from './Search'
// export { default as Issues } from './Issues'
