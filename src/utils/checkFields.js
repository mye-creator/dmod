const is = require('is-html');

const { getBot } = require('./discordApi');

module.exports = async (req, b=null) => {
    let data = req.body;
    
    let memberCheck = await req.app.get('client').guilds.cache.get('750358080193298534').members.fetch(req.user.id);

    let [bot] = await getBot(data.client_id);
    if (memberCheck == null) {
        return {success: false, message: "You aren't in the server", button: {text: "Join", url: "/join"}}
    }
    if (bot.user_id && bot.user_id[0].endsWith("is not snowflake."))
        return {success: false, message: "Invalid bot id"}
    if (bot.message == "Unknown User" || bot.bot !== true)
        return {success: false, message: "Invalid bot id"}
    if (is(data.long_desc))
        return {success: false, message: "HTML is not supported in your bot summary"}
    if (!data.long_desc.length || !data.short_desc.length || !data.prefix.length)
        return {success: false, message: "Invalid submission. Check you filled all the fields."}

    if (b && !data.owner.includes(req.user.id))
        return {success: false, message: "Invalid request. Please sign in again.", button: {text: "Logout", url: "/logout"}}

    if (b && data.owner.replace(',', '').split(' ').remove('').join() !== b.owner.slice(1).join() && b.owners[0] !== req.user.id)
        return {success: false, message: "Only the primary owner can edit additional owners"};

    try {
        return {success: true, bot}
    } catch(e) {
        return {success: false, message: "Invalid Owner IDs"};
    }
}