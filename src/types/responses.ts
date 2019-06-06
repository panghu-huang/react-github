import { IRepository } from './models'

export interface ISearchResults<T> {
  total_count: number
  items: T[]
  incomplete_results: boolean
}

export type ISearchRepositories = ISearchResults<IRepository>