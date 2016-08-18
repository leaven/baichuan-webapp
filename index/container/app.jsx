/**
 * @des app入口，最上层组件
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from '../store/configureStore.js';
import home from '../components/home/home.jsx';

//将state转化为props传给主入口组件
function mapStateToProps(state) {
	return {
		data: state
	}
}
//将actions转化为props传给主入口组件
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}
// const history = syncHistoryWithStore(browserHistory, store);
let connectComponent = connect(mapStateToProps, mapDispatchToProps);
let Home = connectComponent(home);

// 暴露history,方便调试(开发环境用)

const routes = [
	{
		path: '/',
	 	component: Home
	}
];

export default class App extends React.Component {
	render() {
		const {actions, data} = this.props;

		return (
			<Home />
		);
	}
}

