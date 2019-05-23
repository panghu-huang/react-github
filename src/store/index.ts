import { genStorer } from 'react-storer'
import { createBrowserHistory } from 'history'
import { IStore } from 'src/types'

const initialState: IStore = {
  login: 'wokeyi',
  history: createBrowserHistory(),
}

const otherActions = {
  history: initialState.history,
}

export const storer = genStorer<IStore, typeof otherActions>(initialState, otherActions)

export const actions = storer.genActions()

export const StoreContext = storer.genContext()