import Client from "~/utils/Client";

export interface Event {
    name: string;
    run: (client: Client, ...args: any[]) => Promise<unknown>;
}

export default Event;
