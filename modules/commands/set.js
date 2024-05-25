module.exports.config = {
  name: "set",
  version: "1",
  hasPermssion: 2,
  credits: "ericson", //remade by ericson
  description: "automatic change bio",
usePrefix: true,
  commandCategory: "system",
  usages: "text/set",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
let zeska = `• Restart every 40 mins \n»${global.config.PREFIX}« is my prefix | messenger bot.\nMade by: facebook.com/ericsonpascus6`;
let zeskaa = args.join(" ");
var test = zeskaa || zeska;
api.changeBio(test);
api.sendMessage(`Bio has been successfully changed to\n"${test}"`, event.threadID, event.messageID);
  }
