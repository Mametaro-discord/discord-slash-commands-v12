const obj = {
	MessageFlags: {}
};
const { MessageFlags } = obj;

Object.assign(MessageFlags, {
	string: 'test'
});

console.log(obj.MessageFlags);