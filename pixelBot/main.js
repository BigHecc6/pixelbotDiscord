const fs = require('fs');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//Tell ready
client.once('ready', () => {
	console.log('Established connection to server!')
});


//Message Listener
client.on('message', message => {
	console.log(`${message.author}: ` + message.content);

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (command.guildOnly &&

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName)l

	try {
		command.execute(message, args);
	} catch (error) {
			console.error(error);
			message.reply('an error occured when you tried to execute the command. Please Ensure you typed it correctly. If you have typed it correctly, ask @ChaseBTVG to diagnose.');
	}
});

client.login(token);
