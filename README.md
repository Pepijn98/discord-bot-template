# discord bot template
A starter template for easily creating discord bots

# Requirements
- An enviroment with nodejs(v14+)
- Yarn, I reccommend version >= 1.22.0 && < 2.0.0
    - Install yarn using these instructions https://classic.yarnpkg.com/en/docs/install/
- A discord bot application
    - You can create an application here https://discord.com/developers/applications
    - Once create on the left click on `bot`
    - On the right there should be a button with `Add Bot` click on that and confirm
    - Once that is done, you can get your token from this page next to the icon and underneath the username
- Understanding of typescript

# Setup & Development
1. Click on the big green button or [here](https://github.com/Pepijn98/discord-bot-template/generate)
    - Create your new repo using this template
    - Clone the repo locally using `git clone https://github.com/USERNAME/REPO.git`
        - If you're using ssh you can also use `git clone git@github.com:USERNAME/REPO.git` instead
2. change the settings in `settings.example.ts` and remove the `.example`
3. Run `yarn` to install the dependencies
4. Run the bot
    - `yarn dev` to run the development version (this uses nodemon to hot-reload new changes)
    - `yarn start` to run the production version
    - `yarn deploy` to start it using pm2 (usefull for keeping your bot running on a vps)
        - if you don't have pm2 install it using `npm i -g pm2`

**Before using `yarn deploy` you have to run `yarn build` first to generate the javascript files.**

## Adding a new category
1. Go into the commands directory `./src/commands`
2. In here create a new folder with the name of the new category you want
3. That's it!

## Adding new commands
As you can see there already are several commands but of course you want your own commands. \
That's the whole reason you're probably creating a bot.

To do this you **HAVE** to follow a certain pattern. \
Create a new typescript file inside a category directory `./src/commands/<category>` (typescript file extension is `.ts`)

A basic command will look like this:
```ts
// This is the base command, it's an abstract class that all commands need to extend
import Command from "~/utils/Command";
// The command context type, this includes the logger and the client
import CommandContext from "~/types/CommandContext";
// Discord message type
import { Message } from "eris";

// `export default` is very important here, this makes it so we can load the command
export default class Example extends Command {
    constructor(category: string) {
        // `super` accepts all the command options
        super({
            name: "example",
            description: "This is an example",
            usage: "example <subcommand>",
            example: "example test",
            // Everything below is optional
            subCommands: ["test"],                              // default: []
            category: category,                                 // default: "general"
            aliases: ["eg"],                                    // default: []
            hidden: false,                                      // default: false
            guildOnly: false,                                   // default: false
            ownerOnly: false,                                   // default: false
            requiredArgs: 1,                                    // default: 0
            userPermissions: ["readMessages", "sendMessages"],  // default: ["sendMessages"]
            botPermissions: ["readMessages", "sendMessages"]    // default: ["readMessages", "sendMessages"]
        });
    }

    async run(msg: Message, args: string[], context: CommandContext): Promise<void> {
        // This function will be executed whenever the user uses this command
    }
}
```

## Adding new events
So similar to commands but a little different. \
First create a new typescript file inside the `./src/events` directory

Lets say we create `GuildMemberAdd.ts` obviously for the `guildMemberAdd` event
```ts
// We import settings to get the welcome channel id (this is not actually in the code, this is just an example)
import settings from "~/settings";
// Import the Event type for proper type definitions
import Event from "~/types/Event";
// Import eris types also for proper type definitions to avoid using `any`
import { Guild, Member } from "eris";

const event: Event = {
    // Name of the event we want to listen to
    name: "guildMemberAdd",
    // The function that will be called whenever this event fires
    run: async (client, guild: Guild, member: Member) => {
        // Whenever someone joins a server this bot is in it will send a welcome message to the channel "defined" in settings
        // The message will look like "Welcome @Username to MyAwesomeServer, please read #rules"
        await client.createMessage(settings.welcomeChannel, `Welcome ${member.mention} to **${guild.name}**, please read <#12345678901234>`);
    }
};

// Just like the command very important to use `export default`
export default event;
```
