var React = require('react');

class MenuList extends React.Component{
	constuctor(props) {
		super(props);
	}
	render() {
		return (
			<menu>
				<ul className="menu-list">
					<li className="menu-item">前端</li>
					<li className="menu-item">后端</li>
					<li className="menu-item">运维</li>
					<li className="menu-item">Linux</li>
				</ul>
			</menu>
		)
	}
}
module.exports = MenuList;