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
		 * Compact mod
		 */
		compact: React.PropTypes.bool,
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

		let prev = false;
		if (this.props.page != 1) {
			prev = <li  onClick={this.handlePage.bind(this, this.props.page-1)}><a href="#"><i className="fa fa-angle-left"></i></a></li>;
		}
		let next = false;
		if (this.props.page != Math.ceil(this.props.count / this.props.limit)) {
			next = <li onClick={this.handlePage.bind(this, this.props.page+1)}><a href="#"><i className="fa fa-angle-right"></i></a></li>;
		}

		const info = (this.props.limit * (this.props.page - 1) + 1) + ' — ' + (this.props.limit * this.props.page < this.props.count ? this.props.limit * this.props.page : this.props.count) + ' z ' + this.props.count;
		return (
				<ul style={{float:'right'}} className="pagination pagination-separated">
						{prev} {items} {next}
					{items.length > 0 && !this.props.compact &&
						<li className="info hidden-xs"><span style={{border: 0, color: '#555', marginLeft:20}}>
							<i className="fa fa-location-arrow position-left"></i>{info}</span>
						</li>
					}
				</ul>
		);
	}
}