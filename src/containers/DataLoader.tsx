import * as React from 'react'
import { useFetch, IUseFetchOptions, IUseFetchResults } from 'src/hooks'

export interface IDataLoaderProps extends IUseFetchOptions<any> {
  children: (results: IUseFetchResults<any>) => React.ReactElement
}

const DataLoader: React.FunctionComponent<IDataLoaderProps> = ({
  children, ...opts
}) => {
  return children(useFetch(opts))
}

export default DataLoader

