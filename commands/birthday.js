//adding mongoose package (www.mongodb.com)
const mongoose = require('mongoose');

//connect to database
mongoose.connect(process.env.MONGO_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//models
const Data = require('../models/data.js');


module.exports = {
    name: 'birthday',
    description: 'sets a birthday reminder',
    execute(message, args) {
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