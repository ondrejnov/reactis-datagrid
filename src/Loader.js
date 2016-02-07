import Component from './Component';
import React from 'react';

export default class Loader extends Component {

	static propTypes = {
		visible: React.PropTypes.bool
	};

	static defaultProps = {
		visible: false
	};

	constructor(props) {
		super(props);
		this.state = {visible: props.visible};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible && !this.props.visible) {
			this.timeout = setTimeout(() => {
				this.setState({visible: true});
			}, 400);
		}
		else {
			if (nextProps.visible == false) {
				if (this.timeout) {
					clearTimeout(this.timeout);
				}
				this.state.visible = nextProps.visible;
			}
		}
	}

	render() {
		if (!this.state.visible) {
			return false;
		}

		return (
			<span>
				<div style={{background:'#E5E5E5', zIndex:99, opacity:0.25, position:'absolute', top: 60, width: '100%', bottom: 0}}>
				</div>
				<div style={{position:'absolute', zIndex:101, top: '50%', left: '50%', width: 32, height:32, bottom: 0}}>
					<img src="/img/ajax-loader.gif" />
				</div>
			</span>
		)
	}
}