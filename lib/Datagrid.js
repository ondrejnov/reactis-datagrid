'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _HeaderFilter = require('./HeaderFilter');

var _HeaderFilter2 = _interopRequireDefault(_HeaderFilter);

var _MultiactionButton = require('./MultiactionButton');

var _MultiactionButton2 = _interopRequireDefault(_MultiactionButton);

var _Paginator = require('./Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _RowDetail = require('./RowDetail');

var _RowDetail2 = _interopRequireDefault(_RowDetail);

var _Summary = require('./Summary');

var _Summary2 = _interopRequireDefault(_Summary);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _components = {
	_$Datagrid: {
		displayName: 'Datagrid'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Datagrid = (function (_React$Component) {
	_inherits(Datagrid, _React$Component);

	_createClass(Datagrid, null, [{
		key: 'propTypes',
		value: {
			// Column definitions
			columnModel: _react2['default'].PropTypes.array.isRequired,
			// Data rows
			rows: _react2['default'].PropTypes.object,
			// Actual page
			page: _react2['default'].PropTypes.number,
			// Rows per page
			limit: _react2['default'].PropTypes.number,
			// Total rows
			totalCount: _react2['default'].PropTypes.number,
			// Summery row
			summary: _react2['default'].PropTypes.instanceOf(_immutable2['default'].Map),
			// Actual sort
			sort: _react2['default'].PropTypes.object,
			// Selected rows
			selected: _react2['default'].PropTypes.instanceOf(_immutable2['default'].List),
			// Expanded rows
			expanded: _react2['default'].PropTypes.instanceOf(_immutable2['default'].List),
			// String for empty datagrid
			emptyText: _react2['default'].PropTypes.string,
			// Multi action list
			multiActions: _react2['default'].PropTypes.array,
			// Primary key
			primaryKey: _react2['default'].PropTypes.string,
			// compact mode
			compact: _react2['default'].PropTypes.bool,
			// show progress indicator
			pending: _react2['default'].PropTypes.bool,
			// Row className
			getRowClassName: _react2['default'].PropTypes.func,
			// Class of expandable component
			expandableComponent: _react2['default'].PropTypes.func,
			// CSS table class
			className: _react2['default'].PropTypes.string,
			// Page select event
			onPage: _react2['default'].PropTypes.func,
			// Sort event
			onSort: _react2['default'].PropTypes.func,
			// Select row(s) event
			onSelect: _react2['default'].PropTypes.func,
			// Unselect row(s) event
			onUnSelect: _react2['default'].PropTypes.func,
			// Expand row(s) event
			onExpand: _react2['default'].PropTypes.func,
			// Collapse row(s) event
			onCollapse: _react2['default'].PropTypes.func
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			primaryKey: 'id',
			limit: 25,
			compact: false,
			pending: false,
			multiActions: [],
			selected: _immutable2['default'].List(),
			expanded: _immutable2['default'].List(),
			emptyText: 'Žádné záznamy k zobrazení',
			loadingText: 'Načítám data...'
		},
		enumerable: true
	}]);

	function Datagrid(props) {
		_classCallCheck(this, _Datagrid);

		_React$Component.call(this, props);
	}

	Datagrid.prototype.handleSort = function handleSort(nextSort) {
		if (this.props.onSort) {
			this.props.onSort(nextSort);
		}
	};

	Datagrid.prototype.handleSelect = function handleSelect(row, checked) {
		var id = row.get(this.props.primaryKey);
		if (checked) {
			if (this.props.onSelect) {
				this.props.onSelect([id]);
			}
		} else {
			if (this.props.onUnSelect) {
				this.props.onUnSelect([id]);
			}
		}
	};

	Datagrid.prototype.handleExpand = function handleExpand(row, checked) {
		var id = row.get(this.props.primaryKey);
		if (checked) {
			if (this.props.onExpand) {
				this.props.onExpand([id]);
			}
		} else {
			if (this.props.onCollapse) {
				this.props.onCollapse([id]);
			}
		}
	};

	Datagrid.prototype.handleSelectAll = function handleSelectAll(checked) {
		var _this = this;

		var ids = this.props.rows.map(function (item) {
			return item.get(_this.props.primaryKey);
		});
		if (checked) {
			if (this.props.onSelect) {
				this.props.onSelect(ids);
			}
		} else {
			if (this.props.onUnSelect) {
				this.props.onUnSelect(ids);
			}
		}
	};

	Datagrid.prototype.handlePage = function handlePage(page) {
		this.props.onPage(page);
	};

	Datagrid.prototype.handleActionSelect = function handleActionSelect(multiAction) {
		var selected = {
			selected: this.props.selected.toJS(),
			queryObject: {
				sort: this.props.sort,
				filter: this.props.filter.getValues().toJS()
			}
		};
		if (multiAction.onClick) {
			multiAction.onClick(selected);
		}
	};

	Datagrid.prototype.render = function render() {
		var _this2 = this;

		var expandable = !!this.props.expandableComponent;

		var multiAction = this.props.multiActions && this.props.multiActions.length > 0;
		var paginatorLength = 5;
		var paginatorSurround = 3;

		if (this.props.compact) {
			paginatorLength = 3;
			paginatorSurround = 1;
			multiAction = false;
		}

		var rows = [];
		if (this.props.rows) {
			rows = this.props.rows.map(function (row, index) {
				var isSelected = _this2.props.selected.indexOf(row.get(_this2.props.primaryKey)) != -1;
				var expanded = _this2.props.expanded.indexOf(row.get(_this2.props.primaryKey)) != -1;
				var cn = _this2.props.getRowClassName ? _this2.props.getRowClassName(row.toJS(), index) : null;
				var rows = [];
				rows.push(_react2['default'].createElement(_Row2['default'], {
					columnModel: _this2.props.columnModel,
					className: cn,
					data: row,
					id: row.get(_this2.props.primaryKey),
					key: row.get(_this2.props.primaryKey),
					selected: isSelected,
					multiAction: !!multiAction,
					expandable: expandable,
					expanded: expanded,
					onExpand: function (row, checked) {
						return _this2.handleExpand(row, checked);
					},
					onSelect: function (row, checked) {
						return _this2.handleSelect(row, checked);
					}
				}));
				if (expandable) {
					rows.push(_react2['default'].createElement(_RowDetail2['default'], {
						columnModel: _this2.props.columnModel,
						visible: expanded,
						className: cn,
						data: row,
						id: row.get(_this2.props.primaryKey),
						key: 'detail_' + row.get(_this2.props.primaryKey),
						expandableComponent: _this2.props.expandableComponent,
						selected: isSelected,
						multiAction: !!multiAction
					}));
				}
				return rows;
			});
		}

		if (this.props.rows.count() == 0) {
			if (this.props.pending) {
				rows = _react2['default'].createElement(
					'tr',
					null,
					_react2['default'].createElement(
						'td',
						{ colSpan: '99', style: { color: '#666' } },
						' ',
						this.props.loadingText
					)
				);
			} else {
				rows = _react2['default'].createElement(
					'tr',
					null,
					_react2['default'].createElement(
						'td',
						{ colSpan: '99', style: { color: '#BBB' } },
						' ',
						this.props.emptyText
					)
				);
			}
		}

		var className = 'table datatable-basic table-bordered table-hover dataTable no-footer';
		if (!expandable) {
			className += ' table-striped';
		}
		if (this.props.className) {
			className += ' ' + this.props.className;
		}

		return _react2['default'].createElement(
			'div',
			{ className: 'datagrid' },
			_react2['default'].createElement(
				'div',
				{ style: { position: 'relative' } },
				_react2['default'].createElement(_Loader2['default'], { visible: !!this.props.pending }),
				_react2['default'].createElement(
					'table',
					{ className: className },
					_react2['default'].createElement(
						'thead',
						null,
						_react2['default'].createElement(_Header2['default'], {
							columnModel: this.props.columnModel,
							multiAction: !!multiAction,
							expandable: expandable,
							sortBy: this.props.sort ? this.props.sort.toJS() : null,
							onSort: function (sort) {
								return _this2.handleSort(sort);
							},
							onSelectAll: function (checked) {
								return _this2.handleSelectAll(checked);
							}
						}),
						this.props.filter && _react2['default'].createElement(_HeaderFilter2['default'], {
							filter: this.props.filter,
							expandable: expandable,
							values: this.props.filter.getValues(),
							columnModel: this.props.columnModel,
							onSelectAll: function (checked) {
								return _this2.handleSelectAll(checked);
							},
							multiAction: !!multiAction
						})
					),
					_react2['default'].createElement(
						'tbody',
						null,
						rows
					),
					_react2['default'].createElement(_Summary2['default'], { columnModel: this.props.columnModel,
						data: this.props.summary,
						expandable: expandable,
						multiAction: !!multiAction })
				)
			),
			multiAction && _react2['default'].createElement(_MultiactionButton2['default'], {
				actions: this.props.multiActions,
				selected: this.props.selected,
				totalCount: this.props.totalCount,
				onActionSelect: function (multiActionItem) {
					return _this2.handleActionSelect(multiActionItem);
				}
			}),
			!!this.props.page && _react2['default'].createElement(_Paginator2['default'], {
				count: this.props.totalCount,
				steps: paginatorLength,
				limit: this.props.limit,
				page: this.props.page,
				surround: paginatorSurround,
				onPage: function (page) {
					return _this2.handlePage(page);
				}
			}),
			_react2['default'].createElement('div', { style: { clear: 'both' } })
		);
	};

	var _Datagrid = Datagrid;
	Datagrid = _wrapComponent('_$Datagrid')(Datagrid) || Datagrid;
	return Datagrid;
})(_react2['default'].Component);

exports['default'] = Datagrid;
module.exports = exports['default'];