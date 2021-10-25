const fn = a => console.log(a);

const obj = {
	test: 'TestScript'
};

const newobj = Object.assign(fn, obj);

console.log(newobj.toString());