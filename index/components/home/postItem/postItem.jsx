var React = require('react');

class PostItem extends React.Component{
	constuctor(props) {
		super(props);
	}
	render() {
		return (
			<div className="post-item">
				<a href={this.props.data.url} target="_blank">
					<span className="post-item-title">{this.props.data.title}</span>
				</a>
			</div>
		)
	}
}
module.exports = PostItem;