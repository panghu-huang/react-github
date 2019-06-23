import * as React from 'react'
import { Notify } from 'zent'
import { ApiService } from 'src/services'
import { DEFAULT_PAGE_SIZE } from 'src/config'

export interface IUseFetchOptions<T> {
  routeName: string
  path?: string
  params?: object
  formatter?: (oldData: T | null, newData: T) => T
}

export interface IUseFetchResults<T> {
  data: T
  loading: boolean
  hasLoadAll: boolean
  fetchData: () => Promise<void>
}

const pages: { [path: string]: number } = Object.create(null)

export function useFetch<T = any>(opts: IUseFetchOptions<T>): IUseFetchResults<T> {
  const { routeName, path, params, formatter } = opts
  const key = `${routeName}/${path}`
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [hasLoadAll, setHasLoadAll] = React.useState(false)
  const fetchData = async () => {
    try {
      setLoading(true)
      const service = new ApiService(routeName)
      const results = await service.get({
        path,
        data: {
          page: ++pages[key],
          per_page: DEFAULT_PAGE_SIZE,
          ...params,
        },
      })
      if (Array.isArray(results)) {
        setData((data || []).concat(results))
        if (results.length < DEFAULT_PAGE_SIZE) {
          setHasLoadAll(true)
        }
      } else {
        setData(formatter ? formatter(data, results) : results)
      }
    } catch (error) {
      Notify.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    pages[key] = 0
    fetchData()
    return () => {
      delete pages[key]
    }
  }, [routeName, path])
  return {
    data,
    loading,
    hasLoadAll,
    fetchData,
  }
}
