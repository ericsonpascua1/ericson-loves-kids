 module.exports.config = {
  name: "help",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "ericson",//modify by ericson
  description: "Beginner's Guide",
  usePrefix: true,
  commandCategory: "system",
  usages: "[Tên module]",
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.languages = {
  //"vi": {
  //	"moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
  //	"helpList": '[ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: "%2help nameCommand" để xem chi tiết cách sử dụng! ]"',
  //	"user": "Người dùng",
  //      "adminGroup": "Quản trị viên nhóm",
  //      "adminBot": "Quản trị viên bot"
//	},
  "en": {
    "moduleInfo": "『 %1 』\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\nModule code by %7",
    "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    "user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  if (args.join().indexOf('all')== 0) {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `『 ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} 』\n${commandGroup.cmds.join(', ')}\n\n`);

    const moduleName = this.config.name;
    return api.sendMessage(msg + ``, event.threadID, (err, info) => {
      setTimeout(() => {api.unsendMessage(info.messageID)}, 120000)
    }, event.messageID);
  }

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[1]) || 1;
    const numberOfOnePage = 8;
    //*số thứ tự 1 2 3.....cú pháp ${++i}*//
    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

    for (let item of returnArray) msg += `\n╭┈❏ 【 ${i++} 】• ${item}\n│            𝗨𝘀𝗲𝗽𝗿𝗲𝗳𝗶𝘅: 『${commands.get(item).config.usePrefix}』 \n╰┈➤ 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${commands.get(item).config.description}\n──────────────`;


    const siu = `𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧`;

 const text = `\n𝗣𝗮𝗴𝗲 『${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}』\nCurrently available『${arrayInfo.length}』 command on ${global.config.BOTNAME} Bot\n──────────────\n𝗰𝗿𝗲𝗮𝘁𝗼𝗿: ${global.config.CREATORLINK}`;

    return api.sendMessage(siu + "\n\n" + msg  + text, threadID, async (error, info) => {
      if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
    }, event.messageID);
  }

  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};
