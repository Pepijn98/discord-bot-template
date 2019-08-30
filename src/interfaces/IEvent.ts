import Client from "../structures/Client";
import { ISettings } from "../interfaces/ISettings";

export interface IEvent {
    name: string;
    run: (client: Client, settings: ISettings, ...args: any[]) => Promise<void>;
}
