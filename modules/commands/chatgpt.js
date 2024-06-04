module.exports.config = {
  name: `${global.config.BOTNAME}`,
  names: ["ericson"],
  version: "1.1.0",
  permission: 0,
  credits: "ericson",
  description: "",
  prefix: false,
  premium: true,
  category: "without prefix",
  usage: `${global.config.BOTNAME} (question)`,
  cooldowns: 3,
  dependency: {
    "axios": ""
  }
};

module.exports.run = async function ({api, event, args}) {
  try{
  const axios = require('axios');
  const {sensui} = global.apiryuko
  let ask = args.join(' ');
  if (!ask) {
    return api.sendMessage('please provide a question.', event.threadID, event.messageID)
  }
      var IDs = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      var randomIDs = Math.floor(Math.random() * IDs.length);

  const res = await axios.get(`https://ai-tools.replit.app/gpt?prompt=${ask}&uid=9`);
  const reply = res.data.gpt4;
  if (res.error) {
    return api.sendMessage('having some unexpected error while fetching api.', event.threadID, event.messageID)
  } else {
    return api.sendMessage(`${reply}\n\ncreator : billy dulay\npowered by : chatgpt`, event.threadID, event.messageID)
  }
  } catch (error) {
    return api.sendMessage('having some unexpected error', event.threadID, event.messageID)
  }
}
