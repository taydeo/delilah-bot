const { Command } = require('discord.js-commando');
const playerUtils = require('../../functions/game/playerUtils');
const scraperUtils = require('../../functions/game/scraperUtils');

module.exports = class findElectedPlayer extends Command {
    constructor(client) {
        super(client, {
            name: 'find',
            group: 'stats',
            memberName: 'find',
            description: 'Find a player.',
            examples: ['$find player [player name]' , '$find senator [player name]'],
            args: [
                    {
                        key: 'type',
                        label: 'Search type',
                        prompt: 'Specific search type.',
                        type: 'string',
                        oneOf: ['player', 'representative', 'rep', 'senator', 'sen']
                    },
                    {
                        key: 'playername',
                        label: 'Player name',
                        prompt: 'Type the player name you want to search for.',
                        type: 'string'
                    }
                ]
        });
    }

    async run(message, args) {
        const { type, playername } = args;
        switch (type) {
            case 'player':
                var player = await playerUtils.findPlayer(playername);

                console.log(player)

                if(player.length == null) {
                    return message.say(`There was no player found. Either you entered the wrong name, or the player doesn't exist. \n
                    NAME - ${ playername }`);
                }

                if(player.length < 0) {
                    var namesToShow = player.map(v => v.name);
                    
                    return message.say('There were multiple results. Re-Enter the command with the one you want to search.', {
                        embed: {
                            color: 0x0099ff,
                            title: 'List of Found Politicians',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL()
                            },
                            fields: [{
                                name: `List`,
                                value: namesToShow
                            }, ],
                            timestamp: new Date(),
                            footer: {
                                text: 'Si se puede!',
                            },
                        }
                    });
                } else {
                    var discordEmbedMsg = await scraperUtils.scrapePlayerInfo('https://oppressive.games/power/' + player[0].link, message.author.name, message.author.avatarURL());

                    message.say({ embed: discordEmbedMsg });
                }
            break;

            case 'representative':
            case 'rep':

            break;
            default:
                break;
        }
    }
}