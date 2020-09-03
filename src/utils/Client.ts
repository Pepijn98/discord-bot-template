import Collection from "@kurozero/collection";
import Command from "./Command";
import Logger from "./Logger";
import { Client, ClientOptions } from "eris";
import { CommandStats } from "~/types/Options";

export class BotClient extends Client {
    logger: Logger;
    commands: Collection<Command>;
    stats: CommandStats;
    ready = false;

    public constructor(logger: Logger, token: string, options: ClientOptions) {
        super(token, options);

        this.logger = logger;
        this.commands = new Collection(Command);
        this.stats = {
            commandsExecuted: 0,
            messagesSeen: 0,
            commandUsage: {}
        };
    }
}

export default BotClient;
