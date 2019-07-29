//Call main modules
const fs = require('fs');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const active = new Map();


//Command handling
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//Start listening
client.once('ready', () => {
	console.log('Established connection to server!')
});


//Message Listener
client.on('message', message => {
	console.log(`${message.author}: ` + message.content);

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const ops = {
		active: active
	}

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type !== 'text') return message.channel.send('You can only use this command in the server.');
	if (command.perms && !message.member.permissions.has(command.perms)) return message.reply("You don't have the required permissions to use this command.");
	const quecha = message.guild.channels.find(quecha => quecha.id === '598979377006641153');
	if (command.musicCMD && message.channel !== quecha) return message.channel.send(`Please put music-related commands in the ${quecha} channel.`);

	try {
		command.execute(client, message, args, ops);
	} catch (error) {
			console.log(error);
			message.reply('an error occured.');
	}
});


//Login to bot
client.login(token);
