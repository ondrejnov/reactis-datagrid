import Cell from './Cell';
import React from 'react';
import {Map} from 'immutable';

export default class RowDetail extends React.Component {

	static propTypes = {
		/**
		 * Columns definition
		 */
		columnModel: React.PropTypes.array.isRequired,
		/**
		 * Columns definition
		 */
		id: React.PropTypes.any,
		/**
		 * Row data
		 */
		data: React.PropTypes.instanceOf(Map),
		/**
		 * Row className
		 */
		className: React.PropTypes.string,
		/**
		 * Is selected row
		 */
		selected: React.PropTypes.bool,
		/**
		 * Is expanded and visible
		 */
		visible: React.PropTypes.bool.isRequired,
		/**
		 * Class of expandable component
		 */
		expandableComponent: React.PropTypes.func.isRequired,
		/**
		 * Expandable component Props
		 */
		expandableComponentProps: React.PropTypes.object,
		/*
		 * Multiactions
		 */
		multiAction: React.PropTypes.any
	};

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.data != nextProps.data ||
			this.props.multiAction != nextProps.multiAction ||
			this.props.selected != nextProps.selected ||
			this.props.visible != nextProps.visible;
	}

	render() {
		let cn = this.props.className;
		if (this.props.selected) {
			cn += ' selected';
		}
		let component = false;
		if (this.props.visible) {
			const factory = new React.createFactory(this.props.expandableComponent);
			component = new factory({...this.props.expandableComponentProps, data: this.props.data});
		}
		else {
			cn += ' hide';
		}
		let checkCell = false;
		if (this.props.multiAction) {
			checkCell = <td className="ch"></td>;
		}
		return (
			<tr className={cn}><td>&nbsp;</td><td colSpan={this.props.columnModel.length}>{component}</td></tr>
		)
	}
}