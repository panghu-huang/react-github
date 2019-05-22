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