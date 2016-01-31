import Component from './Component';
import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {List} from 'immutable';

export default class MultiActionButton extends Component {

	static propTypes = {
		/**
		 * Selected rows
		 */
		selected: React.PropTypes.instanceOf(List),
		/*
		 * Total count
		 */
		totalCount: React.PropTypes.number,
		/**
		 * Multi action list
		 */
		actions: React.PropTypes.array,
		/**
		 * Select event
		 */
		onActionSelect: React.PropTypes.func
	};

	getCountSelected() {
		if (this.props.selected.count()) {
			return this.props.selected.count();
		}
		else {
			return this.props.totalCount;
		}
	}

	handleMultiActionClick(multiActionItem) {
		this.props.onActionSelect(multiActionItem);
		/*var action = {
			count: this.getCountSelected(),
			ids: this.props.selected.count() ? this.props.selected : null,
			queryObject: this.props.queryObject
		};
		handler(action);*/
	}

	render() {
		var selTitle;
		if (this.props.selected.count()) {
			selTitle = 'Akce s vybranými';
		}
		else {
			selTitle = 'Akce s vyfiltrovanými';
		}
		selTitle += ' (' + this.getCountSelected() + ')';
		const items = this.props.actions.map((item, index) => {
			var el;
			if (item.divider) {
				el = <MenuItem key={index} divider />
			}
			else {
				el = <MenuItem key={item.title} onSelect={() => this.handleMultiActionClick(item)}>
					{item.title}
				</MenuItem>;
			}
			return el;
		});

		return (
			<div className="multiaction">
				<DropdownButton id="multiaction" dropup={true} title={selTitle}>
					{items}
				</DropdownButton>
			</div>
		);
	}
}