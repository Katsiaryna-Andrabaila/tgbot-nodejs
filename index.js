import pkg from "dotenv";
const { config } = pkg;
import Bot from "node-telegram-bot-api";
config();

const token = process.env.TOKEN;

const bot = new Bot(token, { polling: true });

bot.on("message", async (message) => {
  const text = message.text;
  const chatId = message.chat.id;
  if (text === "/start") {
    await bot.sendSticker(
      chatId,
      "https://cdn.tlgrm.app/stickers/85b/9a3/85b9a330-80ac-4e5d-a7b7-d63f5fab2e6b/96/1.webp"
    );
    await bot.sendMessage(chatId, "Welcome to AntiSemeika bot!");
  } else if (text === "/info") {
    await bot.sendMessage(
      chatId,
      `Your name is ${message.from.first_name} ${message.from.last_name | " "}`
    );
  } else {
    await bot.sendMessage(chatId, `You wrote ${text}`);
  }
});
