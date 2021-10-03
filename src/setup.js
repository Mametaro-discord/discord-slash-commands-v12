'use strict';

module.exports = function(client) {
	client.ws.on('INTERACTION_CREATE', ia => {
		const applicationCommandPattern = [2, 'APPLICATION_COMMAND'];
		if (applicationCommandPattern.includes(ia.type)) {
		};
	});
};