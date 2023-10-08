import { Message } from "discord.js";
import { MyClient } from "..";
import { db } from "./ready";
import { userData, messageJson } from "../types/userData";
import { serverId, serverName } from "../constants";

export const name = "messageCreate";
export const execute = async (message: Message, client: MyClient) => {
  const ServerId = message.guildId;
  const ChannelId = message.channelId;
  if (ServerId !== serverId) return console.error(`Erm.. I think the bot is being used somewhere that's not ${serverName}.`);

  const MessageContent = message.content;
  const MessageId = message.id;
  const UserId = message.author.id;
  const TimeStamp = message.createdTimestamp;

  const stmt = db.query("SELECT * FROM users WHERE UserId = ?");
  const userData = stmt.get(UserId) as userData;

  const userJson = { MessageId, MessageContent, TimeStamp, ChannelId };
  if (userData) {
    // User exists, update the data
    const content = JSON.parse(userData.Content);
    const updatedContent = JSON.stringify([...content, userJson]);
    const updatedMessageCount = (parseFloat(userData.MessageCount) + 1).toString();

    db.prepare("UPDATE users SET Content = ?, MessageCount = ? WHERE UserId = ?").run(updatedContent, updatedMessageCount, UserId);
    return;
  }
  // User doesn't exist, insert new data
  db.prepare("INSERT INTO users (UserId, MessageCount, Content) VALUES (?, ?, ?)").run(UserId, "1", JSON.stringify([userJson]));
};
