# discord bot template
A starter template for easily creating discord bots

# Requirements
- An enviroment with nodejs(v14+) and yarn
- A discord bot application
- Understanding of typescript

# Setup & Development
1. `git clone git@github.com:Pepijn98/discord-bot.git`
2. change the settings in `settings.ts.example` and remove the `.example`
3. Run `yarn` to install the dependencies
4. Run the bot
    - `yarn test` to run the development version (this uses nodemon to hot-reload new changes)
    - `yarn start` to run the production version
    - `yarn deploy` to start it using pm2 (usefull for keeping your bot running on a vps)
        - if you don't have pm2 install it using `npm i -g pm2`
