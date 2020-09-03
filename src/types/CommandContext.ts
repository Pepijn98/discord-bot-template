import BotClient from "~/utils/Client";
import Logger from "~/utils/Logger";

export interface CommandContext {
    logger: Logger;
    client: BotClient;
}

export default CommandContext;
