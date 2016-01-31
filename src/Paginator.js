import React from 'react';
import paginatorMath from './paginatorMath';

export default class Paginator extends React.Component {

	static propTypes = {
		/**
		 * Actual page
		 */
		page: React.PropTypes.number,
		/**
		 * Rows per page
		 */
		limit: React.PropTypes.number,
		/**
		 * Total rows
		 */
		count: React.PropTypes.number,
		/**
		 * Number of buttons
		 */
		steps: React.PropTypes.number,
		/**
		 * Page select event
		 */
		onPage: React.PropTypes.func
	};

	handlePage(page, ev) {
		ev.preventDefault();
		if (this.props.onPage) {
			this.props.onPage(page);
		}
	}

	render() {
		if (!this.props.count || !this.props.limit || !this.props.page) {
			return false;
		}

		var paginator = new paginatorMath(this.props.page, this.props.limit, this.props.count, this.props.steps, this.props.surround);
		var steps = paginator.getSteps();
		var items = [];
		var prevStep = null;
		for (var i = 0; i < steps.length; i++) {
			var j = steps[i];
			if (prevStep && j - prevStep > 1) {
				items.push(<li key={-i} className="dots">...</li>);
			}
			var cn = '';
			if (this.props.page == j) {
				cn = 'active';
			}
			items.push(<li key={j} onClick={this.handlePage.bind(this, j)} className={cn} ><a href="#">{j}</a></li>);
			prevStep = j;
		}

		var prev = '';//<li className={cn} onClick={this.handlePage.bind(this, info.previous_page)}><a href="#"><i className="icon-double-angle-left"></i> </a></li>;
		var next = ''; //<li className={cn} onClick={this.handlePage.bind(this, info.next_page)}><a href="#"> <i className="icon-double-angle-right"></i></a></li>;

		return <ul className="pagination">
				{prev} {items} {next}
			   </ul>;
	}
}