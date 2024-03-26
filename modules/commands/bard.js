const axios = require("axios");
let fontEnabled = false;

module.exports.config = {
  name: "bard",
  version: "1",
  usePrefix: true,
  hasPermission: 0,
  credits: "Aki Hayakawa",
  description: "Search using Bard",
  commandCategory: "ai",
  usages: "<ask>",
  cooldowns: 5,
};

async function convertImageToCaption(imageURL, api, event, inputText) {
  try {
    api.sendMessage("✅ Recognizing image. Please wait", event.threadID, event.messageID);

    const response = await axios.get(`https://hazee-gemini-pro-vision-12174af6c652.herokuapp.com/gemini-vision?text=${encodeURIComponent(inputText)}&image_url=${encodeURIComponent(imageURL)}`);
    const caption = response.data.response;

    if (caption) {
      const formattedCaption = formatFont(caption);
      api.sendMessage(`Query: '${inputText}'\n\n${formattedCaption}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("Failed to recognize image.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error while recoginizing image:", error);
    api.sendMessage("An error occured while recognizing the image.", event.threadID, event.messageID);
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.toLowerCase().startsWith("gemini"))) return;

  const args = event.body.split(/\s+/);
  args.shift();

  if (event.type === "message_reply") {
    if (event.messageReply.attachments[0]) {
      const attachment = event.messageReply.attachments[0];

       if (attachment.type === "photo") {
        const imageURL = attachment.url;
        convertImageToCaption(imageURL, api, event, args.join(' '));
        return;
      }
    }
  }

  const inputText = args.join(' ');

  if (!inputText) {
    return api.sendMessage("Hello, I'm Gemini Pro Vision. How may I help you?", event.threadID, event.messageID);
  }

  if (args[0] === "on") {
    fontEnabled = true;
    api.sendMessage({ body: "Gemini P-Vision AI Font Formatting Enabled" }, event.threadID, event.messageID);
    return;
  }

  if (args[0] === "off") {
    fontEnabled = false;
    api.sendMessage({ body: "Gemini P-Vision AI Font Formatting Disabled" }, event.threadID, event.messageID);
    return;
  }

  api.sendMessage("Gemini P-Vision AI is Thinking...", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://hazee-gemini-pro-vision-12174af6c652.herokuapp.com/gemini-vision?text=${encodeURIComponent(inputText)}`);
    if (response.status === 200 && response.data.response) {
    const formattedResponse = formatFont(response.data.response);
      api.sendMessage(`Query: '${inputText}'\n\n${formattedResponse}`, event.threadID, event.messageID);
    } else {
      console.error("Error generating response from API");
    }
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occured while processing Gemini API", event.threadID, event.messageID);
  }
};

function formatFont(text) {
  const fontMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

  let formattedText = "";
  for (const char of text) {
    if (char === ' ') {
      formattedText += ' '; 
    } else if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports.run = async function ({ api, event }) {};