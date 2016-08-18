/**
 * @des store 标识一个状态仓库，一个app所有的状态都在这里维护
 */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers';

//创建一个中间件以便执行异步action
/*const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)*/

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
export default (function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  //热替换选项
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }
  // 暴露store,方便调试(开发环境用)
  process.env.NODE_ENV !== 'production' ? window.store = store : undefined;
  return store;
}());