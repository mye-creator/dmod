const Bots = require("../public/models/Bot");

module.exports = async () => {
    const bots = await Bots.find({}, { _id: false, auth: false })
    return bots.filter(bot => bot.state != "deleted")
};