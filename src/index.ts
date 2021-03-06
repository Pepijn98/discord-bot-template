import "./utils/Extensions";

import path from "path";
import settings from "./settings";
import Client from "./utils/Client";
import CommandHandler from "./utils/CommandHandler";
import CommandLoader from "./utils/CommandLoader";
import EventLoader from "./utils/EventLoader";
import Logger from "./utils/Logger";
import { isGuildChannel, isPrivateChannel, intents } from "./utils/Utils";

const logger = new Logger();

const client = new Client(logger, settings.token, {
    autoreconnect: true,
    compress: true,
    getAllUsers: true,
    restMode: true,
    defaultImageFormat: "webp",
    defaultImageSize: 2048,
    intents: intents
});

const commandLoader = new CommandLoader(client);
const commandHandler = new CommandHandler(client);
const eventLoader = new EventLoader(client);

client.on("ready", async () => {
    if (!client.ready) {
        client.commands = await commandLoader.load(path.join(__dirname, "commands"));

        logger.ready(`Logged in as ${client.user.tag}`);
        logger.ready(`Loaded [${client.commands.size}] commands`);

        client.ready = true;
    }
});

client.on("disconnect", () => {
    logger.warn("DISCONNECT", "Client disconnected");
});

client.on("messageCreate", async (msg) => {
    if (!client.ready) return; // Bot not ready yet
    if (!msg.author) return; // Probably system message
    if (msg.author.discriminator === "0000") return; // Probably a webhook
    if (msg.author.id === client.user.id) return;

    client.stats.messagesSeen++;

    // If message starts with our prefix check if it's a valid command, then execute the command if valid
    if (msg.content.startsWith(settings.prefix)) {
        if (isGuildChannel(msg.channel)) {
            await commandHandler.handleCommand(msg, false);
        } else if (isPrivateChannel(msg.channel)) {
            await commandHandler.handleCommand(msg, true);
        }
    }
});

client.on("disconnect", () => {
    logger.warn("DISCONNECT", "Client disconnected");
});

client.on("error", (e: any) => {
    logger.error("DISCORD_ERROR", e);
});

process.on("unhandledRejection", (reason: any) => {
    logger.error("UNHANDLED_REJECTION", reason);
});

process.on("uncaughtException", (e: any) => {
    logger.error("UNCAUGHT_EXCEPTION", e);
});

process.on("SIGINT", () => {
    client.disconnect({ reconnect: false });
    process.exit(0);
});

async function main(): Promise<void> {
    await eventLoader.load(path.join(__dirname, "events"));
    client.connect().catch((e) => logger.error("CONNECT", e.stack));
}

main().catch((e) => logger.error("MAIN", e));
