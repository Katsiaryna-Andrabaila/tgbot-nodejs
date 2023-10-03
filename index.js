import Bot from "node-telegram-bot-api";
import { againOptions } from "./scripts/game-options.js";
import { startGame } from "./scripts/start-game.js";
import pkg from "dotenv";
import { chats } from "./scripts/chats.js";
const { config } = pkg;
config();

const token = process.env.TOKEN;

export const bot = new Bot(token, { polling: true });

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Start command" },
    { command: "/info", description: "Command to get user's full name" },
    { command: "/game", description: "Game to guess a number" },
  ]);

  bot.on("message", async (message) => {
    const { text } = message;
    const chatId = message.chat.id;

    switch (text) {
      case "/start":
        await bot.sendSticker(
          chatId,
          "https://cdn.tlgrm.app/stickers/85b/9a3/85b9a330-80ac-4e5d-a7b7-d63f5fab2e6b/96/1.webp"
        );
        return bot.sendMessage(chatId, "Welcome to AntiSemeika bot!");

      case "/info":
        return bot.sendMessage(
          chatId,
          `Your name is ${message.from.first_name} ${
            message.from.last_name || " "
          }`
        );

      case "/game":
        return startGame(chatId);

      default:
        return bot.sendMessage(
          chatId,
          "I don't understand you, try one more time!"
        );
    }
  });

  bot.on("callback_query", async (message) => {
    const { data } = message;
    const chatId = message.message.chat.id;

    if (data === "/again") {
      return startGame(chatId);
    }

    if (Number(data) === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Congratulations! You guessed right number ${data}!`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Unfortunately, you didn't guess, it was ${chats[chatId]}...`,
        againOptions
      );
    }
  });
};

start();
