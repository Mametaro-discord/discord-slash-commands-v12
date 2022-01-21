class ExtendedWeakMap extends WeakMap {
	set(...args) {
		super.set(...args);
		return args[1];
	};
};

const wm = new ExtendedWeakMap();

function main() {
	return wm.get(this) || wm.set(this, 'value');
};

console.log(main());