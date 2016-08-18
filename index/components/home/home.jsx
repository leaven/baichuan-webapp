import PostList from './postList/postList.jsx';
import Header from './header/header.jsx';
import './home.less';

class Home extends React.Component{
	constructor(props) {
		super(props);
		props.actions.getPosts();
	}
	render() {
		const posts = this.props.data.home.posts;

		if(posts && posts.length) {
			return (
				<div className="home">
					<Header></Header>
					<PostList getPosts={this.props.actions.getPosts} posts={posts} getNextPage={this.props.data.home.getNextPage} isLastPage={this.props.data.home.isLastPage}/>
				</div>
			)
		}
		return null;
	}
}
module.exports = Home;