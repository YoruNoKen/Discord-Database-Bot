import { MyClient } from ".";

export const serverJoinMessage = (client: MyClient) =>
  `Hello, I'm ${client.user?.username}! I'm a Discord bot developed by @yorunoken that scrapes the messages of this Discord server and saved them to a database.\nHere are my commands:\n\`\`\`UNDEFINED\`\`\`\n If you come across any issues or bugs, contact my owner at @yorunoken on Discord or @ken_yoru on Twiter.`;

export const serverName = "Beri Beri Horsam";
export const serverId = "1014040811672973342";
export const serverDatabaseName = "beri";
