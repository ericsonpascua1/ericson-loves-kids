module.exports.config = {
    name: "greet",
    author: "ericson終.",
    version: "1.0.0",
    hasPermission: 0,
    credits: "ericson終.",
    description: "Bot automatic greetings",
    usePrefix: true,
    commandCategory: "No Prefix",
    cooldowns: 0,
};
const axios = require("axios");

module.exports.handleEvent = async function({
    api,
    event,
    client,
    __GLOBAL
}) {
    function getFirstName(fullName) {
        let names = fullName.split(' ');
        return names[0] || fullName;
    }
    if (!event.body) {
        return; // Return early if event body is undefined or empty
    }

    const userChat = event.body.toLowerCase();

    async function greet(userChat, api) {
        const greetings = [
            "@ericson終."
        ];

        if (greetings.includes(userChat)) {
            try {
                const userInfo = await api.getUserInfo(event.senderID);
                const userName = userInfo[event.senderID]?.name || "there";

                api.sendMessage({
                        body: `ano? ${userName} problema mo sa owner ko`,
                        mentions: [{ tag: userName, id: event.senderID }],
                    },
                    event.threadID,
                    (err) => {
                        if (err) {
                            console.error(err);
                            api.sendMessage(`ano? ${userName} problema mo sa owner ko`, event.threadID, event.messageID);
                        }
                    }
                );
            } catch (err) {
                console.error(err);
            }
        } else if (userChat == '') {
            try {
                const userInfo = await api.getUserInfo(event.senderID);
                const userName = userInfo[event.senderID]?.name;

                api.sendMessage({
                        body: `${userName}, : ${global.config.PREFIX}`,
                        mentions: [{ tag: userName, id: event.senderID }],
                    },
                    event.threadID,
                    (err) => {
                        if (err) {
                            console.error(err);
                            api.sendMessage(`${userName}, : ${global.config.PREFIX}`, event.threadID, event.messageID);
                        }
                    }
                );
            } catch (err) {
                console.error(err);
            }
        } else if (userChat == 'bot') {
            try {
                const userInfo = await api.getUserInfo(event.senderID);
                const userName1 = userInfo[event.senderID]?.name;
                let userName = getFirstName(userName1);

                api.sendMessage({
                        body: `ano putangina mo ${userName}`,
                        mentions: [{ tag: userName, id: event.senderID }],
                    },
                    event.threadID,
                    (err) => {
                        if (err) {
                            console.error(err);
                            api.sendMessage(`ano putangina mo ${userName}`, event.threadID, event.messageID);
                        }
                    }
                );
            } catch (err) {
                console.error(err);
            }
        }
    }
    await greet(userChat, api);
};

module.exports.run = function({
    api,
    event,
    client,
    __GLOBAL
}) {}
