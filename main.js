//Uncomment this to keep bot offline

//Call main modules
const fs = require('fs');
const Discord = require('discord.js');

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
	console.log('BEEP! Code 200: Successfully connected!')
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

	if (command.guildOnly && message.channel.type !== 'text') return message.channel.send('ERROR 421: You can only use this command in the server.');
	if (command.perms && !message.member.permissions.has(command.perms)) return message.channel.send("ERROR 401: You don't have the required permissions to use this command.");
	const quecha = message.guild.channels.find(quecha => quecha.id === '598979377006641153');
	if (command.musicCMD && message.channel !== quecha) return message.channel.send(`ERROR 421: Please put music-related commands in the ${quecha} channel.`);

	try {
		command.execute(client, message, args, ops);
	} catch (error) {
			console.log(error);
			message.reply('ERROR 400: There was an error executing the command.');
	}
});



//Listens to new member join
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.id === '609164405883666433');
  const firstRole = '598969307866726451';
  if (!channel) return;
  channel.send(`BEEP BOOP. Congrats on finding the Pixel Den, ${member}!`);
  member.addRole(firstRole);
});



//Login to bot
client.login(token);
