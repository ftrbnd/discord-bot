/*
TODO:
- will probably need to change format of the date to make searching easier (e.g. to dd/mm)
- figure out how to search and access the data, Data.find({date: ... })
- handle timezones
- take in the user as an argument?
- 
*/

require('dotenv').config();

//importing the class Client from discord.js
const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "$";

//adding mongoose package (www.mongodb.com)
const mongoose = require('mongoose');



//connect to database
mongoose.connect(process.env.MONGO_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//models
const Data = require('../models/data.js');


client.on('message', (message) => {
    if (message.author.bot) return; //doesn't listen to bots

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content //array destructuring, first element in CMD_NAME and the rest in array
            .trim() //trims all white space before and after
            .substring(PREFIX.length)
            .split(/\s+/); //handles extra white spaces between arguments

        if (CMD_NAME === 'birthday') {
            if (args.length !== 3) { // DD MM TIMEZONE
                return message.channel.send("invalid amount of arguments");
            }

            const user = message.author.id; //id of the author of the message

            //use member and the array args (dd, mm, timezone) to save data in an appropriate database
            Data.findOne({
                userID: user // =data below
            }, (err, data) => {
                if (err) console.log(err);
                if (!data) { //if data doesn't exist we need to create it
                    const newData = new Data({
                        userID: user,
                        day: args[0],
                        month: args[1],
                        timezone: args[2],
                    });
                    newData.save().catch(err => console.log(err));
                    return message.channel.send(`registered birthday for <@${user}>`);
                }
            });
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);