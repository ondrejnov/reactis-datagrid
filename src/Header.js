import Component from './Component';
import React from 'react';
import HeaderCell from './HeaderCell';

class Header extends Component {

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
		 * Sort event
		 */
		onSort: React.PropTypes.func,
		/**
		 * is datagrid expandable
		 */
		expandable: React.PropTypes.bool.isRequired,
		/**
		 * SelectAll event
		 */
		onSelectAll: React.PropTypes.func
	};

	handleSort(column) {
		let sort;
		// change
		if (this.props.sortBy && this.props.sortBy.get('column') == column.name) {
			sort = this.props.sortBy.toJS();
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
		const cells = this.props.columnModel.filter(column => column.visible !== false).map(column => {
			let sort;
			if (this.props.sortBy && this.props.sortBy.get('column') == column.name) {
				sort = this.props.sortBy.toJS().direction;
			}
			return <HeaderCell
						key={column.name}
						column={column}
						onSort={() => this.handleSort(column)}
						sort={sort}
					/>;
		});

		let expandable = false;
		if (this.props.expandable) {
			expandable = <th style={{width: 29}}></th>;
		}
		const checkbox = <input type="checkbox" checked={this.props.selectedAll} onChange={(e) => this.handleToggleSelectAll(e)} />
		return (
			<tr className="header">
				{this.props.multiAction &&
					<th style={{width: 28, textAlign:'center'}}>

					</th>
				}{expandable}{cells}
			</tr>
		);
	}
}

export default Header;