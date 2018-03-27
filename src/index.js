import {createStore, applyMiddleware} from './redux'

let counter = (state={number: 0}, action) => {
  if (action) {
    switch (action.type) {
      case "ADD":
        return {number: ++state.number}
      case "DEC":
        return {number: --state.number}
      default:
        return state
    }
  } else {
    return state
  }
}
// 日志中间件
let logger = store => next => action => {
  console.log("beforeDispatch_"+action.type+":", store.getState())
  next(action)
  console.log("afterDispatch_"+action.type+":", store.getState())
}
// 
let thunk = store => next => action => {
  if (typeof action === "function") return action(next)
  return next(action)
}

let store = applyMiddleware(thunk)(createStore)(counter)
store.subscribe(() => console.log(store.getState()))
store.dispatch(function (dispatch) {
  setTimeout(function () {
    dispatch({type: "ADD"})
  }, 3000)
})

store.dispatch({type: 'ADD'})
store.dispatch({type: 'DEC'})
