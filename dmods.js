//const mongoose = require('mongoose');

const bot = require('./client/bot-app');
const App = require('./modules/web-app');
const { PORT, DISCORD_TOKEN, MONGO_DB_URL } = process.env;

(async () => {

    /*await mongoose.connect(MONGO_DB_URL, { 
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });*/

    //console.log(colors.yellow(`Connected to the database on `) + colors.underline.green(MONGO_DB_URL));

    //await new App(client).listen(PORT || 8080);

    //console.log(colors.yellow(`Running on port `) + colors.underline.green(PORT || 8080));
    
    await bot.login(client.config.token)
})()
