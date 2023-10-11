import { ChatInputCommandInteraction, InteractionType } from "discord.js";
import { MyClient } from "..";
import { db } from "./ready";
import { serverName, serverId } from "../constants";

export const name = "interactionCreate";
export const execute = async (interaction: ChatInputCommandInteraction, client: MyClient) => {
  // if (interaction.guildId !== serverId) {
  //   return console.error(`Erm.. I think the bot is being used somewhere that's not ${serverName}.`);
  // }

  if (interaction.type !== InteractionType.ApplicationCommand) {
    return;
  }

  try {
    const command = client.slashCommands.get(interaction.commandName);
    command.run({ client, interaction, db });
  } catch (e) {
    console.error(e);
    interaction.reply({ content: "There was an error with this interaction. Please try again.", ephemeral: true });
  }
};
