import { ChatInputCommandInteraction, Client, EmbedBuilder } from "discord.js";
import { MyClient } from "..";
import { Database } from "bun:sqlite";
import { userData } from "../types/userData";
import { serverName } from "../constants";

export async function run({ interaction, db, client }: { interaction: ChatInputCommandInteraction; db: Database; client: MyClient }) {
  await interaction.deferReply();

  const unsortedUserData = db.query("SELECT * from users").all() as userData[];
  const userData = unsortedUserData.sort((b, a) => parseFloat(a.MessageCount) - parseFloat(b.MessageCount));

  const top5 = userData.slice(0, 5);

  let top5String = `Top 5 users ${serverName} message count:\n\n`;

  for (let i = 0; i < top5.length; i++) {
    const userInfo = userData[i];
    const user = client.users.cache.get(userInfo.UserId);
    top5String += `#${i + 1}: ${user?.username} - Message count: ${userInfo.MessageCount}\n`;
  }

  const embed = new EmbedBuilder()
    .setTitle(`Message Leaderboard of ${serverName}`)
    .setDescription("```" + top5String + "```")
    .setColor("DarkPurple");

  interaction.editReply({ embeds: [embed] });
}
export { data } from "../data/statusData";
