import React from 'react';

export default class HeaderCell extends React.Component {

	static propTypes = {
		/**
		 * Column definition
		 */
		column: React.PropTypes.object.isRequired,
		/**
		 * Sort direction
		 */
		sort: React.PropTypes.oneOf(['asc', 'desc']),
		/**
		 * Sort event
		 */
		onSort: React.PropTypes.func
	};

	handleClick(e) {
		if (this.isSortable()) {
			this.props.onSort();
		}
	}

	isSortable() {
		return this.props.onSort && (this.props.column.sortable || typeof this.props.column.sortable == 'undefined');
	}

	render() {
		var style = {};
		if (this.isSortable()) {
			style.cursor = 'pointer';
		}
		if (this.props.column.width) {
			style.width = this.props.column.width;
		}
		var className = '';
		if (this.isSortable()) {
			if (this.props.sort) {
				className = 'sorting_' + this.props.sort;
			}
			else {
				className = 'sorting';
			}
		}
		if (this.props.column.viewport) {
			className += ' vp-' + this.props.column.viewport;
		}
		return (
			<th style={style} className={className} onClick={(e) => this.handleClick(e)}>
				{this.props.column.title}
			</th>
		)
	}
}
