import { ChatInputCommandInteraction, TextChannel, DMChannel, Message, Collection, ChannelType } from "discord.js";
import { MyClient } from "..";
import { insertMessage } from "../utils";

async function fetchChannelMessages(client: MyClient, channelId: string) {
  const channel = await client.channels.fetch(channelId);

  if (!channel || channel.type !== ChannelType.GuildText) {
    return false;
  }

  let messages: any[] = [];
  let lastMessageId = null;

  while (true) {
    var fetchedMessages: any = await channel.messages.fetch({ limit: 100, before: lastMessageId });

    if (fetchedMessages.size === 0) {
      // No more messages to fetch
      break;
    }

    messages = messages.concat(Array.from(fetchedMessages.values()));
    lastMessageId = fetchedMessages.last().id;

    await new Promise((resolve) => setTimeout(resolve, 5));
  }

  messages.forEach(async (msg) => await insertMessage(msg));
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
  channels.forEach(async (channel) => {
    const channelId = channel.id;
    await fetchChannelMessages(client, channelId);
  });
  return await interaction.editReply("Refreshed database!");
}
export { data } from "../data/refreshData";
