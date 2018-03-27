
let createStore = reducer => {
  let state,
      listeners = []
  let getState = () => state
  let dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(l => l())
  }
  let subscribe = listener => {
    listeners.push(listener)
    return () => listeners = listeners.filter(l => l !== listener)
  }
  dispatch()
  return {
    getState,
    dispatch,
    subscribe
  }
}
// 应用中间件
let applyMiddleware = middleware => createStore => reducer => {
  let store = createStore(reducer)
  let dispatch = middleware(store)(store.dispatch)
  return {
    ...store, dispatch
  }
}

export {createStore, applyMiddleware}