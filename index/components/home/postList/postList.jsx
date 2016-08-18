import './postList.less';
import iScroll from 'iscroll/build/iscroll-lite';

class PostList extends React.Component{
	componentDidMount() {
		const mainScroll = new iScroll('.main', {
			mouseWheel: true,
            click: true
        });
        let pn = 1;
        const me = this;
        mainScroll.on('scrollEnd', function () {
        	if(this.y < 0) {
        		if(!me.props.isLastPage) {
        			me.props.getPosts(++pn);
        		}
        	}
        });
	}
	render() {
		return (
			<div className="main">
				<ul className="post-list">
					{
						this.props.posts.map(function(post, index) {
							return (
								<div className="post-item" key={index}>
									<a href={post.url} target="_blank">
										<span className="post-item-title">{post.title}</span>
									</a>
									<i className="iconfont icon-zan"></i>
									<b className="like-num">0</b>
								</div>
							)
						}) 
					}
					{(()=>{
						if(this.props.getNextPage) {
							return (
								<div className="load-nextpage">加载中...</div>
							)
						}
						if(this.props.isLastPage) {
							return (
								<div className="last-page">没有更多啦~</div>
							)
						}
					})()}
				</ul>
			</div>
		)
	}
}
module.exports = PostList;