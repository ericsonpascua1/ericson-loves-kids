module.exports = function({ api }) {
	const Users = require("./database/users")({ api });
	const Threads = require("./database/threads")({ api });
	const Currencies = require("./database/currencies")({ api, Users });
	const logger = require("../utils/log.js");
	const cons = require('./../config.json');
	const theme = cons.DESIGN.Theme.toLowerCase();
	let cra;
	let co;
	let cb;
	if (theme === 'blue') {
		cra = 'yellow';
		co = '#243aff';
		cb = '';
	} else if (theme === 'fiery') {
		cra = 'orange';
		co = '#fc2803';
		cb = '';
	} else if (theme === 'red') {
		cra = 'yellow';
		co = 'red';
		cb = '';
	} else if (theme === 'aqua') {
		cra = '#6883f7';
		co = '#0030ff';
		cb = '';
	} else if (theme === 'pink') {
		cra = 'purple';
		co = '#d94fff';
		cb = '';
	} else if (theme.toLowerCase() === 'retro') {
		cra = 'orange';
		co = '';
		cb = '';
	} else if (theme.toLowerCase() === 'sunlight') {
		cra = '#f5bd31';
		co = '#ffff00';
		cb = '';
	} else if (theme.toLowerCase() === 'teen') {
		cra = '#81fcf8';
		co = '';
		cb = '';
	} else if (theme.toLowerCase() === 'summer') {
		cra = '#fcff4d';
		co = '';
		cb = '';
	} else if (theme.toLowerCase() === 'flower') {
		cra = 'yellow';
		co = '';
		cb = '';
	} else if (theme.toLowerCase() === 'ghost') {
		cra = '#0a658a';
		co = '';
		cb = '';
		cv = '';
	} else if (theme === 'hacker') {
		cra = '#4be813';
		co = '';
		cb = '';
	} else {
		cra = 'yellow';
		co = '#243aff';
		cb = '';
	}
	
	(async function () {
		try {
			const [threads, users] = await Promise.all([Threads.getAll(), Users.getAll(['userID', 'name', 'data'])]);
			threads.forEach(data => {
				const idThread = String(data.threadID);
				global.data.allThreadID.push(idThread);
				global.data.threadData.set(idThread, data.data || {});
				global.data.threadInfo.set(idThread, data.threadInfo || {});
				if (data.data && data.data.banned) {
					global.data.threadBanned.set(idThread, {
						'reason': data.data.reason || '',
						'dateAdded': data.data.dateAdded || ''
					});
				}
				if (data.data && data.data.commandBanned && data.data.commandBanned.length !== 0) {
					global.data.commandBanned.set(idThread, data.data.commandBanned);
				}
				if (data.data && data.data.NSFW) {
					global.data.threadAllowNSFW.push(idThread);
				}
			});
			users.forEach(dataU => {
				const idUsers = String(dataU.userID);
				global.data.allUserID.push(idUsers);
				if (dataU.name && dataU.name.length !== 0) {
					global.data.userName.set(idUsers, dataU.name);
				}
				if (dataU.data && dataU.data.banned) {
					global.data.userBanned.set(idUsers, {
						'reason': dataU.data.reason || '',
						'dateAdded': dataU.data.dateAdded || ''
					});
				}
				if (dataU.data && dataU.data.commandBanned && dataU.data.commandBanned.length !== 0) {
					global.data.commandBanned.set(idUsers, dataU.data.commandBanned);
				}
			});
			logger.loader(`Successfully loaded ${global.data.allThreadID.length} threads and ${global.data.allUserID.length} users`);
		} catch (error) {
			logger.loader(`Can't load environment variable, error: ${error}`, 'error');
		}
	})();	
	
	global.loading(`[ BOT_INFO ] success!\n[ NAME ]: ${(!global.config.BOTNAME) ? "Bot Messenger" : global.config.BOTNAME} \n[ FBID ]: ${api.getCurrentUserID()} \n[ PRFX ]: ${global.config.PREFIX}`, "LOADED");
  
	const fs = require('fs');
	fs.readFile('main.js', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		if (!data.includes("const login = require('./includes/login');")) {
			const logout = require('./../includes/login/src/logout.js');
			logout();
		}
	});
	
	const handleCommand = require("./handle/handleCommand")({ api,  Users, Threads, Currencies });
	const handleCommandEvent = require("./handle/handleCommandEvent")({ api,  Users, Threads, Currencies });
	const handleReply = require("./handle/handleReply")({ api,  Users, Threads, Currencies });
	const handleReaction = require("./handle/handleReaction")({ api,  Users, Threads, Currencies });
	const handleEvent = require("./handle/handleEvent")({ api,  Users, Threads, Currencies });
	const handleRefresh = require("./handle/handleRefresh")({ api,  Users, Threads, Currencies });
	const handleCreateDatabase = require("./handle/handleCreateDatabase")({  api, Threads, Users, Currencies });
	
	return (event) => {
		switch (event.type) {
			case "message":
			case "message_reply":
			case "message_unsend":
				handleCreateDatabase({ event });
				handleCommand({ event });
				handleReply({ event });
				handleCommandEvent({ event });
				break;
			case "change_thread_image": 
				break;
			case "event":
				handleEvent({ event });
				handleRefresh({ event });
				break;
			case "message_reaction":
				handleReaction({ event });
				break;
			default:
				break;
		}
	};
};