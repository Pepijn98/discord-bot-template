import Collection from "@kurozero/collection";
import Command from "../Command";
import { Client, ClientOptions } from "eris";
import { ICommandStats } from "../interfaces/Options";

export default class BotClient extends Client {
    public commands: Collection<Command>;
    public ready = false;
    public stats: ICommandStats;

    public token?: string;
    public expiresIn?: number;
    public lastRequest?: number;

    public constructor(token: string, options: ClientOptions) {
        super(token, options);

        this.commands = new Collection(Command);
        this.stats = {
            commandsExecuted: 0,
            messagesSeen: 0,
            commandUsage: {}
        };
    }
}
