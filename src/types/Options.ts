import Client from "~/utils/Client";
import Logger from "~/utils/Logger";
import Collection from "@kurozero/collection";
import { Permission } from "~/utils/Utils";
import { User } from "eris";

export interface CommandHandlerOptions {
    client: Client;
    logger: Logger;
}

export interface CommandOptions {
    name: string;
    description: string;
    usage: string;
    example: string;
    subCommands?: string[] | null;
    category?: string | null;
    aliases?: string[] | null;
    hidden?: boolean | null;
    guildOnly?: boolean | null;
    ownerOnly?: boolean | null;
    requiredArgs?: number | null;
    userPermissions?: Permission[] | null;
    botPermissions?: Permission[] | null;
}

export interface CommandStats {
    commandsExecuted: number;
    messagesSeen: number;
    commandUsage: {
        [x: string]: {
            size: number;
            users: Collection<User>;
        };
    };
}
