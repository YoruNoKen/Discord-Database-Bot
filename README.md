# Animals Bot

A Discord bot written in TypeScript that uses the bun runtime. Secures your messages so if your Discord server ever gets vaporized, your messages will be safe!

You can try the bot yourself only by building it..

<img src="https://cdn.discordapp.com/attachments/1160634087434895461/1160709272066334750/4HanXRQ.png?ex=6535a5bf&is=652330bf&hm=6e003f88ac723015206058fc2451bf6a5ca648707d5d991c6d3a88ce2b0f7563&" alt="Discord shenanigans." width="400"/>

## 🚀 Building the bot

1. Clone this repository to your local machine.
2. Run `bun install` to install the necessary dependencies.
3. Create a Discord bot and obtain the necessary token. You can find a guide [here](https://discord.com/build/app-developers).
4. Rename the `.env.local.example` file to `.env.local` and add your API credentials in the following format:

```env
TOKEN=DISCORD_TOKEN_HERE
```
5. go into ./src/constants.ts and change these values to whatever you want:

```ts
export const serverName = "Beri Beri Horsam";
export const serverId = "1014040811672973342";
export const serverDatabaseName = "beri";
```

6. Launch the bot by running `bun start`.

## 🖥️ Commands 

```
/status (Returns a leaderboard of users' message counts)
/database (Returns the database in JSON formatting)
/refresh (Refreshes the database)
```

## 🙌 Credits

This project was developed by YoruNoKen under the [MIT](https://choosealicense.com/licenses/mit/) license.