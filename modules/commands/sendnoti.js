const axios = require("axios");
const { createReadStream, unlinkSync } = require("fs");
const { resolve } = require("path");

module.exports.config = {
  name: "sendnoti",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "ericson終.",
  description: "Sends a message to all groups and can only be done by the admin.",
  usePrefix: true,
  commandCategory: "message",
  usages: "[Text]",
  cooldowns: 0,
};


module.exports.run = async function ({ api, event, args }) {
  
  if ((this.config.credits) != "ericson終.") { return api.sendMessage(`[ 𝗔𝗡𝗧𝗜 𝗖𝗛𝗔𝗡𝗚𝗘 𝗖𝗥𝗘𝗗𝗜𝗧𝗦 ]
𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗦𝗦𝗔𝗚𝗘: 
ᴄʜᴀɴɢᴇ ᴄʀᴇᴅɪᴛs ᴘᴀ ᴀᴋᴏ sᴀʏᴏ ᴍᴀɢ ᴘʀᴀᴄᴛɪᴄᴇ ᴋᴀ😝 
𝗠𝗘𝗠𝗕𝗘𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
𝚃𝚑𝚒𝚜 𝚋𝚘𝚝 𝚌𝚛𝚎𝚊𝚝𝚘𝚛 𝚒𝚜 𝚊 𝚌𝚑𝚊𝚗𝚐𝚎 𝚌𝚛𝚎𝚍𝚒𝚝𝚘𝚛 𝚔𝚊𝚢𝚊 𝚋𝚎 𝚊𝚠𝚊𝚛𝚎 𝚗𝚎𝚡𝚝 𝚝𝚒𝚖𝚎.

𝗢𝗪𝗡𝗘𝗥 𝗢𝗙 𝗧𝗛𝗜𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗: 
https://www.facebook.com/ericsonpascua6

`, event.threadID, event.messageID)}
  
  const threadList = await api.getThreadList(25, null, ["INBOX"]);
  let sentCount = 0;
  const custom = args.join(" ");

  async function sendMessage(thread) {
    try {
      await api.sendMessage(
        `𝙉𝙊𝙏𝙄𝘾𝙀 𝙁𝙍𝙊𝙈 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 
 ---------------- 
『𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘳 𝘕𝘢𝘮𝘦』:ericson終.
 --------------- 
 『𝗡𝗼𝘁𝗶𝗰𝗲』${custom}`,
        thread.threadID
      );
      sentCount++;

      const content =`${custom}`;
      const languageToSay = "tl"; 
      const pathFemale = resolve(__dirname, "cache", `${thread.threadID}_female.mp3`);

      
      await global.utils.downloadFile(
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
