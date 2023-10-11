import { SlashCommandBuilder } from "discord.js";
export const data = new SlashCommandBuilder()
  .setName("refresh")
  .setDescription("Refreshes the database of a channel, or the whole guild")
  .addChannelOption((o) => o.setName("channel").setDescription("Choose a channel"));
