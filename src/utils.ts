import { db } from "./handlers/ready";
import { userData } from "./types/userData";
import { Message } from "discord.js";

export async function insertMessage(message: Message): Promise<void> {
  const MessageAttachments = JSON.stringify(message.attachments.map((attachment) => attachment.url));
  const MessageContent = message.content;
  const MessageId = message.id;
  const UserId = message.author.id;
  const TimeStamp = message.createdTimestamp;
  const ChannelId = message.channelId;

  const stmt = db.query("SELECT * FROM users WHERE UserId = ?");
  const userData = stmt.get(UserId) as userData;

  const userJson = { MessageId, MessageContent, TimeStamp, ChannelId, MessageAttachments };
  if (userData) {
    // User exists, update the data
    const content = JSON.parse(userData.Content);

    const messageIds = content.map((msg: any) => msg.MessageId);

    if (!messageIds.includes(MessageId)) {
      const updatedContent = JSON.stringify([...content, userJson]);
      const updatedMessageCount = (parseFloat(userData.MessageCount) + 1).toString();

      db.prepare("UPDATE users SET Content = ?, MessageCount = ? WHERE UserId = ?").run(updatedContent, updatedMessageCount, UserId);
    }
    return;
  }

  // User doesn't exist, insert new data
  db.prepare("INSERT INTO users (UserId, MessageCount, Content) VALUES (?, ?, ?)").run(UserId, "1", JSON.stringify([userJson]));
}
