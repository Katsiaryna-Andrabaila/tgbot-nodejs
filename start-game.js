import { gameOptions } from "./game-options.js";
import { chats } from "./chats.js";
import { bot } from "./index.js";

export const startGame = async (id) => {
  await bot.sendMessage(
    id,
    "Now I will make a number from 0 to 9 in my mind, and you try to guess it!"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[id] = randomNumber;
  await bot.sendMessage(id, "Guess!", gameOptions);
};
