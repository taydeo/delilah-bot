const { Command } = require('discord.js-commando');

module.exports = class help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'general',
            memberName: 'help',
            description: 'Help command for all commands.'
        });
    }

    run(message, args, string, boolean) {
        return message.say('All available commands. \n' +
            '*search [party - politician - bill] [name] \n' +
            'You do not have to specify anything right off the bat, you can just do *search');
    }
}