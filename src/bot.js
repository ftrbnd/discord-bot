require('dotenv').config();

//importing the class Client from discord.js (?)
const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "$";

client.on('message', (message) => {
    if (message.author.bo) return; //doesn't listen to bots

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content //array destructuring, first element in CMD_NAME and the rest in array
            .trim() //trims all white space before and after
            .substring(PREFIX.length)
            .split(/\s+/); //handles extra white spaces between arguments

        if (CMD_NAME === 'birthday') {
            if (args.length !== 4) { // DD MM YEAR TIMEZONE
                message.channel.send("invalid amount of arguments");
            }

            //const member = message.author. //@ of the author of the message

            //use member and the array args (dd, mm, year, timezone) to save data in an appropriate database
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);