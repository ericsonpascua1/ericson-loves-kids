import axios from "axios";

export const metadata = {
  name: `chesca1`,
  version: "1.0",
  author: `ericson @ericsonpascua6`,
  category: "Ai-Chat",
  description: `Meet Chesca AI! Chesca is an energetic filipina AI that loves to chat to just enjoy her life, she also share her knowledge with you!`,
  usage: `{prefix}{name}chesca1 <message>`,
  hasPrefix: true,
};

export async function onRun({ event, box, args, userInfos, api }) {
  try {
    const query = args.join(" ") || "hello";
    const { name } = await userInfos.get(event.senderID);

    if (query) {
      box.react("⏳");
      const processingMessage = await box.reply(
        `Asking 💗 Chesca V1. Please wait a moment...`,
      );

      const apiUrl = `https://liaspark.chatbotcommunity.ltd/@LianeAPI_Reworks/api/chesca1?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        const trimmedMessage = response.data.message.trim();
        box.react("✅");
        await box.reply(trimmedMessage);

        console.log(`Sent 💗 Chesca V1's response to the user`);
      } else {
        throw new Error(`Invalid or missing response from 💗 Chesca V1 API`);
      }

      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get 💗 Chesca V1's response: ${error.message}`);
    const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
    box.reply(errorMessage);
  }
}
