// import { fetchGames }

export default {
  '/': {
    dispatch: (router) => {}
  },
  '/f(/:sid)': {
    dispatch: ({params}) => { console.log(params.sid) }
  }
}
