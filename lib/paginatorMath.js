'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var paginatorMath = function paginatorMath(page, itemsPerPage, count, steps, surround) {
	this.page = parseInt(page);
	this.itemsPerPage = parseInt(itemsPerPage);
	this.count = parseInt(count);
	this.surround = parseInt(surround);
	this.steps = parseInt(steps);
};

paginatorMath.prototype.isFirst = function () {
	return this.page == 1;
};

paginatorMath.prototype.isLast = function () {
	return this.page == this.getPageCount();
};

paginatorMath.prototype.isFirst = function () {
	return Math.ceil(this.count / this.itemsPerPage);
};

paginatorMath.prototype.getPageCount = function () {
	return Math.ceil(this.count / this.itemsPerPage);
};

paginatorMath.prototype.getSteps = function () {
	var lastPage = this.getPageCount() - 1;
	var page = this.page - 1;
	if (lastPage < 1) {
		return [];
	}

	var arr = [];
	var f = Math.max(0, page - this.surround) + 1;
	var t = Math.min(lastPage, page + this.surround) + 1;
	for (var i = f; i <= t; i++) {
		arr.push(i);
	}
	var steps = Math.max(1, this.steps - 1);
	for (var i = 0; i <= steps; i++) {
		var v = Math.round(lastPage / steps * i) + 1;
		arr.push(v);
	}
	var arr = _underscore2['default'].uniq(arr);
	arr.sort(function (a, b) {
		return a - b;
	});
	return arr;
};

module.exports = paginatorMath;