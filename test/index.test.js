		const commandId = 'aaa';

		const endpoints = {
			get: `commands/${commandId}`,
			getAll: `commands`,
			create: `commands`,
			edit: `commands/${commandId}`,
			delete: `commands/${commandId}`,
			blukOverwrite: `commands`
		};
		for (let k in endpoints) {
			endpoints[k] = `https://discord.com/api/v8/applications//` + endpoints[k];
		};
		console.log(endpoints)