/**
 * @des 入口reducer文件
 ******************************************************************************************
 注意：
 1、原则上建议reducer原子化，即一个action对应一个reducer
 2、reducer应该按照模块去归类，比如x模块下的reducer就应该放在./x目录下，命名与目录同名
 3、请不要在本文件中写业务reducer，本文件只作为入口import
 ******************************************************************************************
 */

import { combineReducers } from 'redux';

import getIndexReducer from './home';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    home: getIndexReducer
    // routing: routerReducer
});

export default rootReducer;