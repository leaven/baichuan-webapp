import promise from 'es6-promise';
promise.polyfill();

export  function getPosts(page_number) {
	const  pn = page_number || 1;
	return dispatch => {
		if(pn != 1) {
			//下一页
			dispatch({
				type: 'GET_NEXT_POSTS'
			})
		}
		fetch('http://localhost:3000/api/getposts/?page='+pn+'&size=20&json=true')
		 .then(response => response.json())
		 .then(json => {
		 	if(json.content && json.content.length) {
			 	dispatch({
			 		type: 'GET_POSTS',
			 		posts: json.content,
			 		pn: pn
			 	})
			 }else if(json.content.length === 0){
			 	dispatch({
			 		type: 'LAST_PAGE'
			 	})
			 }
		 })
	}
}