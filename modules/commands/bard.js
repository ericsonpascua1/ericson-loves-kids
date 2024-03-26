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
      api.sendMessage(`${formattedCaption}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("Failed to recognize image.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error while recoginizing image:", error);
    api.sendMessage("An error occured while recognizing the image.", event.threadID, event.messageID);
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  // if (!(event.body.toLowerCase().startsWith("bard"))) return;

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
    return api.sendMessage("Hello, I'm Gemini Pro Vision by Ronnel. How may I help you?", event.threadID, event.messageID);
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

  // api.sendMessage("Gemini P-Vision AI is Thinking...", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://hazee-gemini-pro-vision-12174af6c652.herokuapp.com/gemini-vision?text=${encodeURIComponent(inputText)}`);
    if (response.status === 200 && response.data.response) {
    const formattedResponse = formatFont(response.data.response);
      api.sendMessage(`${formattedResponse}`, event.threadID, event.messageID);
    } else {
      console.error("Error generating response from API");
    }
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occured while processing Gemini API", event.threadID, event.messageID);
  }
};

function formatFont(text) {
  return text;
}

module.exports.run = async function ({ api, event }) {};