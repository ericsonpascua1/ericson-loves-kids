module.exports.config = {
  name: "pairv2",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Hungcho edit by Hungdz30cm",
  description: "Ghep doi ngau nhien",
  usePrefix: true,
  commandCategory: "random-img", 
  usages: "", 
  cooldowns: 0,
};
module.exports.run = async function({ api, event, args, Users, Threads, Currencies }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        var data = await Currencies.getData(event.senderID);
        var money = data.money
        if(money < 500) api.sendMessage("You need 500 USD for 1 pairing, please use daily to received money or ask for admin bot!\n🤑Theres something new to eat🤑",event.threadID,event.messageID)
        else {
        var tl = ['21%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%"];
        var tle = tl[Math.floor(Math.random() * tl.length)];
        let dataa = await api.getUserInfo(event.senderID);
