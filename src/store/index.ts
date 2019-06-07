import { genStorer } from 'react-storer'
import { createBrowserHistory } from 'history'
import { DEFAULT_LOGIN_NAME } from 'src/config'
import { IStore } from 'src/types'

const initialState: IStore = {
  login: DEFAULT_LOGIN_NAME,
}

const otherActions = {
  history: createBrowserHistory({
    basename: process.env.REACT_APP_BASENAME,
  }),
}

export const storer = genStorer<IStore, typeof otherActions>(initialState, otherActions)

export const actions = storer.genActions()

export const StoreContext = storer.genContext()