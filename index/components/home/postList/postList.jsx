import './postList.less';
import iScroll from 'iscroll/build/iscroll-lite';

class PostList extends React.Component{
	componentDidMount() {
		this.mainScroll = new iScroll('.main', {
			mouseWheel: true,
            click: true
        });
        let pn = 1;
        const me = this;
        this.mainScroll.on('scrollEnd', function () {
        	if(this.y < 0) {
        		if(!me.props.isLastPage) {
        			me.props.getPosts(++pn);
        		}
        	}
        });
	}
	render() {
		const me = this;
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
									<p className="post-detail">
										<span className="post-site">{post.site}</span>
										<i className="iconfont icon-zan"></i>
										<b className="like-num">0</b>
									</p>
								</div>
							)
						}) 
					}
					{(()=>{
						if(me.props.getNextPage) {
							return (
								<div className="load-nextpage">加载中...</div>
							)
						}
						if(me.props.isLastPage) {
							return (
								<div className="last-page">没有更多啦~</div>
							)
						}

					})()}

				</ul>
				{(()=>{
					if(this.mainScroll) {
						this.mainScroll.refresh();
					}
				})()}
			</div>
		)
	}
}
module.exports = PostList;