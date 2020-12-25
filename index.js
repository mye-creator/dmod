const App = require('./src/structures/app');

(async () => {
    await new App().listen(7000);
    console.log(`Running on port ` + `\x1b[34m\x1b[4m${70}\x1b[0m`);
   })();