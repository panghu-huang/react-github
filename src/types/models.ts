import { EventType } from 'src/config'

export interface IUser {
  id: number
  login: string
  name: string
  location: string
  repos_url: string
  avatar_url: string
  followers: number
  following: number
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
  owner: IUser
}

export interface IEvent {
  id: string
  type: EventType
  actor: IUser
  repo: IRepository
  public: boolean
  payload: IWatchEventPayload | IForkEventPayload | ICreateEventPayload | IDeleteEventPayload | IPullRequestEventPayload | IPushEventPayload
  created_at: string
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