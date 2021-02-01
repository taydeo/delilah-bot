const commando = require('discord.js-commando');
const path = require('path');
const token = process.env.CommieBotToken;

const client = new commando.Client({
    owner: '696794177421181079',
    commandPrefix: '$'
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['general', 'General commands.'],
        ['stats', 'Get stats from POWER.'],
        ['funstuff', 'Experiments and Fun Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'))

client
    .on('error', console.error)
    .on('ready', () => {
        console.log('CommieBot is live!');
        client.user.setActivity('Eating the Rich');
    })

    .on('disconnect', () => { console.warn('Disconnected!'); })
    .on('reconnecting', () => { console.warn('Reconnecting...'); })
    .on('commandError', (cmd, err) => {
        if(err instanceof commando.FriendlyError) return;
        console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    })

client.login(token);