import { getGames, resetFilter } from './filter/actions'

export default {
  '/': {
    dispatch: () => getGames(0)
  },
  '/f': {
    dispatch: () => getGames(0)
  },
  '/f/:sid': {
    dispatch: ({params}) => getGames(0)
  }
}
