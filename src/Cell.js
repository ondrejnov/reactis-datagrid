import React from 'react';
import {Map} from 'immutable';

export default class Cell extends React.Component {

	static propTypes = {
		/**
		 * Column definition
		 */
		column: React.PropTypes.object.isRequired,
		/**
		 * Cell value
		 */
		value: React.PropTypes.any,
		/**
		 * Row data. Use for renderer.
		 */
		row: React.PropTypes.instanceOf(Map)
	};

	shouldComponentUpdate(nextProps, nextState) {

		const shouldUpdate = this.props.value != nextProps.value ||
			((this.props.row != nextProps.row) && this.props.column.renderer);

		return !!shouldUpdate;
	}

	render() {

		let value = this.props.value;
		if (this.props.column.renderer && this.props.column.renderer instanceof Function) {
			value = this.props.column.renderer(value && value.toJS ? value.toJS() : value, this.props.row.toJS(), this.props.column);
		}
		if (value && this.props.column.suffix && value.toString().length > 0) {
			value = <span>{value}{this.props.column.suffix}</span>;
		}

		let style = {};
		if (this.props.column.style) {
			style = this.props.column.style;
		}
		if (this.props.column.align) {
			style.textAlign = this.props.column.align;
		}

		let className = this.props.column.className;
		if (this.props.column.viewport) {
			className += ' vp-' + this.props.column.viewport;
		}
		return <td style={style} className={className}>{value}</td>
	}
}