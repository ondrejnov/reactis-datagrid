import Component from './Component';
import React from 'react';
import HeaderCell from './HeaderCell';

export default class HeaderFilter extends Component {

	static propTypes = {
		/**
		 * Columns definition
		 */
		columnModel: React.PropTypes.array.isRequired,
		/**
		 * Sorted column
		 */
		sortBy: React.PropTypes.object,
		/*
		* Has multiaction checkbox
		*/
		multiAction: React.PropTypes.bool,
		/**
		 * is datagrid expandable
		 */
		expandable: React.PropTypes.bool.isRequired,
		/**
		 * Sort event
		 */
		onSort: React.PropTypes.func,
		/**
		 * SelectAll event
		 */
		onSelectAll: React.PropTypes.func
	};

	handleSort(column) {
		let sort;
		// change
		if (this.props.sortBy && this.props.sortBy.column == column.name) {
			sort = this.props.sortBy;
			if (sort.direction == 'desc') {
				sort.direction = 'asc';
			}
			else {
				sort.direction = 'desc';
			}
		}
		// new
		else {
			sort = {
				column: column.name,
				direction: 'asc'
			}
		}
		this.props.onSort(sort);
	}

	handleToggleSelectAll(e) {
		const checked = e.target.checked;
		this.props.onSelectAll(checked);
	}

	render () {
		let i = 0;
		const cells = this.props.columnModel.filter(column => column.visible !== false).map(column => {
			let input = this.props.filter.getControl(column.name);
			if (input && input.props.visible) {
				if (!input.props.visible()) {
					input = false;
				}
			}
			let className = '';
			if (column.viewport) {
				className = ' vp-' + column.viewport;
			}
			if (input) {
				i++;
			}
			return <td key={column.name} className={className}>{input}</td>;
		});
		let className = 'headerfilter';
		if (i == 0) {
			className += ' hide';
		}

		let expandable = false;
		if (this.props.expandable) {
			expandable = <th></th>;
		}

		return (
			<tr className={className}>
				{this.props.multiAction &&
					<td style={{width: '24px', textAlign:'center'}}>
						<input type="checkbox" checked={this.props.selectedAll} onChange={(e) => this.handleToggleSelectAll(e)} />
					</td>
				}{expandable}{cells}
			</tr>
		);
	}
}
