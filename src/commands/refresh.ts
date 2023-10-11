import { ChatInputCommandInteraction, TextChannel, DMChannel, Message, Collection, ChannelType } from "discord.js";
import { MyClient } from "..";
import { insertMessage } from "../utils";

async function fetchChannelMessages(client: MyClient, channelId: string) {
  const channel = await client.channels.fetch(channelId);

  if (!channel || channel.type !== ChannelType.GuildText) {
    return false;
  }

  let messages: Message[] = [];

  // Create the message pointer
  let message = await channel.messages.fetch({ limit: 1 }).then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));

  let index = 1;
  while (message) {
    await channel.messages.fetch({ limit: 100, before: message.id }).then((messagePage) => {
      messagePage.forEach((msg) => messages.push(msg));

      // Update the message pointer to be the last message on the page of messages
      message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
    });
  }

  for (const msg of messages) {
    await insertMessage(msg);
    console.log(`#${index} (${channel.name})`);
    index++;
    await new Promise((resolve) => setTimeout(resolve, 2));
  }
}

export async function run({ interaction, client }: { interaction: ChatInputCommandInteraction; client: MyClient }) {
  await interaction.deferReply();

  const channelId = interaction.options.getChannel("channel")?.id;
  if (channelId) {
    await interaction.editReply("Refreshing... This might take a while.");
    await fetchChannelMessages(client, channelId);
    return await interaction.editReply("Refreshed database!");
  }

  const channels = interaction.guild?.channels.cache;
  if (!channels || channels.size === 0) {
    return await interaction.editReply("No channels found... How did you even do this?");
  }

  await interaction.editReply("Refreshing... This might take a while.");
  for (const channel of channels.values()) {
    const channelId = channel.id;
    if (channel.type !== ChannelType.GuildText) continue;
    console.log("#" + channel.name + ": started.");
    await fetchChannelMessages(client, channelId);
    console.log("#" + channel.name + ": done.");
  }
  return await interaction.editReply("Refreshed database!");
}
export { data } from "../data/refreshData";
