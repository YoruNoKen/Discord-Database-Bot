import { Database } from "bun:sqlite";
import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { serverDatabaseName } from "../constants";
import { MyClient } from "..";
const token = process.env.TOKEN;
if (!token) {
  throw new Error("WARNING! Token not set in: .env.local");
}
const rest = new REST({ version: "10" }).setToken(token);

export const db = new Database(`./src/${serverDatabaseName}.db`);
db.run(`CREATE TABLE IF NOT EXISTS users (
  UserId TEXT PRIMARY KEY,
  MessageCount TEXT,
  Content TEXT
);`);
console.log("Database up and running!");

export const name = "ready";
export const execute = async (_: any, client: MyClient) => {
  if (!client.user) return;

  const slashCommands: any = [];
  const commands = fs.readdirSync("./src/commands");
  for (const cmd of commands) {
    const commandFilePath = `../commands/${cmd}`;
    const commandFileName = path.parse(commandFilePath).name;

    const command = require(`../commands/${commandFileName}`);
    slashCommands.push(command.data.toJSON());

    client.slashCommands.set(command.data.name, command);
  }

  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: slashCommands });
    console.log(`Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error(error);
  }
};
