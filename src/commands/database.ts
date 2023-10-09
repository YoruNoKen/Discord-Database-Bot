import { ChatInputCommandInteraction, EmbedBuilder, MessagePayloadOption } from "discord.js";
import { MyClient } from "..";
import { Database } from "bun:sqlite";
import { userData } from "../types/userData";
import { serverName } from "../constants";

export async function run({ interaction, db, client }: { interaction: ChatInputCommandInteraction; db: Database; client: MyClient }) {
  await interaction.deferReply();

  const unsortedUserData = db.query("SELECT * from users").all() as userData[];
  const userData = unsortedUserData
    .map((user) => ({
      ...user,
      Content: JSON.parse(user.Content),
    }))
    .sort((a, b) => parseFloat(b.MessageCount) - parseFloat(a.MessageCount));
  const userDataJson = JSON.stringify(userData, null, 2);
  const buffer = Buffer.from(userDataJson, "utf-8");

  const options: MessagePayloadOption = {
    content: "Here is the user data:",
    files: [
      {
        attachment: buffer,
        name: "userdata.json",
      },
    ],
  };

  await interaction.editReply(options);
}
export { data } from "../data/databaseData";
