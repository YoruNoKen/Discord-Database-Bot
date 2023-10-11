import { Message } from "discord.js";
import { MyClient } from "..";
import { serverId, serverName } from "../constants";
import { insertMessage } from "../utils";

export const name = "messageCreate";
export const execute = async (message: Message, client: MyClient) => {
  const ServerId = message.guildId;
  // if (ServerId !== serverId) return console.error(`Erm.. I think the bot is being used somewhere that's not ${serverName}.`);

  // Insert messages into db
  // await insertMessage(message);
};
