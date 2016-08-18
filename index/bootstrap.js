
//base css
import './layout.less';

import 'common/static/js/rem.js';
import { Provider } from 'react-redux';
import App from './container/app.jsx';
import store from './store/configureStore.js';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('main')
);