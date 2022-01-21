const Main = require('./e.test');

module.exports = function() {
	class Collection {
		constructor() {
			this.set = new Set();
		};
	};

	const wm = new WeakMap();

	Object.defineProperty(Main.prototype, 'data', {
		get() {
			let collection = wm.get(this);
			if (collection) return collection;
			collection = new Collection();
			wm.set(this, collection);
			return collection;
		}
	});
};