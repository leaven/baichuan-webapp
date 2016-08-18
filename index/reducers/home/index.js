const initState = {
	posts: [],
	getNextPage: false,
	isLastPage: false
}
export default function getIndexReducer(state=initState, action) {
	switch(action.type) {
		case 'GET_POSTS': 
			return Object.assign({}, state, {
				getNextPage: false,
				posts: state.posts.concat(action.posts)
			});
		case 'GET_NEXT_POSTS': 
			return Object.assign({}, state, {
				getNextPage: true
			})
		case 'LAST_PAGE': 	
			return Object.assign({}, state, {
				isLastPage: true,
				getNextPage: false
			});
		default:
			return state;
	}
}