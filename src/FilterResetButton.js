import Component from './Component';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class FilterResetButton extends Component {

	static defaultProps = {
		alt: 'Vynulovat filtr',
		text: 'filtr'
	};

	handleClick(e) {
		e.preventDefault();
		this.props.onClick(e);
	}

	render() {
		return (
			<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={300}  transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				<a href="" title={this.props.alt} onClick={(e) => this.handleClick(e)} style={{textAlign:'center', color: '#888'}}>
					<i style={{fontSize: 10, color: '#AAA'}} className="icon-cross"></i> {this.props.text}
				</a>
			</ReactCSSTransitionGroup>
		);
	}
}
