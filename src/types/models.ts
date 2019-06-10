import { EventType, UserType } from 'src/config'

export interface IUser {
  id: number
  login: string
  bio: string
  name: string
  location: string
  repos_url: string
  avatar_url: string
  blog: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  type: UserType
}

export interface IRepository {
  id: number
  name: string
  full_name: string
  description: string
  url: string
  language: string
  created_at: string
  updated_at: string
  stargazers_count: number
  watchers_count: number
  subscribers_count: number
  forks_count: number
  owner: IUser
  default_branch: string
}

export interface IRepositoryContent {
  type: 'file' | 'dir'
  name: string
  path: string
  content: string
  url: string
  download_url: string
}

export interface IEvent {
  id: string
  type: EventType
  actor: IUser
  repo: IRepository
  org?: IUser
  public: boolean
  payload: IWatchEventPayload | IForkEventPayload | ICreateEventPayload | IDeleteEventPayload | IPullRequestEventPayload | IPushEventPayload | IMemberEventPayload
  created_at: string
}

export interface IMemberEventPayload {
  action: 'added'
  member: IUser
}

export interface IWatchEventPayload {
  action: 'started'
}

export interface IForkEventPayload {
  forkee: IRepository
}

export type IPusherType = string

export interface ICreateEventPayload {
  ref: string
  ref_type: 'repository' | 'branch' | 'tag'
  master_branch: string
  description: string
  pusher_type: IPusherType
}

export interface IDeleteEventPayload {
  ref: string
  ref_type: 'branch' | 'tag' | 'repository'
  pusher_type: IPusherType
}

export interface IPullRequestEventPayload {
  action: 'closed' | 'opened',
  number: number,
  pull_request: IPullRequest
}

export interface IPullRequest {
  url: string
  id: number
  state: 'closed' | 'open',
  title: string
  user: IUser
  body: string
  created_at: string
  updated_at: string
  repo: IRepository
  merged_by: IUser
}

export interface IPushEventPayload {
  push_id: number
  size: number
  ref: string
  commits: ICommit[]
}

export interface ICommit {
  sha: string
  author: IUser
  message: string
  url: string
}

export interface IBranch {
  name: string
}

export interface IIssueLabel {
  color: string
  default: boolean
  name: string
  id: number
}

export interface IIssue {
  id: number
  title: string
  body: string
  user: IUser
  created_at: string
  updated_at: string
  closed_at: string | null
  state: 'open' | 'closed'
  labels: IIssueLabel[]
  number: number
  comments: number
  comments_url: string
}

export interface IComment {
  id: number
  body: string
  user: IUser
  created_at: string
  updated_at: string
}