/*
TODO:
- will probably need to change format of the date to make searching easier (e.g. to dd/mm)
- figure out how to search and access the data, Data.find({date: ... })
- handle timezones
- take in the user as an argument?
- 
*/

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "$";

const fs = require('fs');

client.commands = new Discord.Collection();

//make sure all read files are javaScript files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`../commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('the bot is ready');
})

client.on('message', (message) => {
    if (message.author.bot) return; //doesn't listen to bots
    if (!message.content.startsWith(PREFIX)) return; //only listens to messages starting with prefix


    const [CMD_NAME, ...args] = message.content //array destructuring, first element in CMD_NAME and the rest in array
        .trim() //trims all white space before and after
        .substring(PREFIX.length)
        .split(/\s+/); //handles extra white spaces between arguments

    if (CMD_NAME === 'birthday') {
        client.commands.get('birthday').execute(message, args);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);