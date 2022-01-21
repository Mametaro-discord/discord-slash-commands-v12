'use strict';

module.exports = class ExtendedWeakMap extends WeakMap {
	set(key, value) {
		super.set(key, value);
		return value;
	};
};