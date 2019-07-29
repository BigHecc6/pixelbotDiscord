module.exports = {
  name: "ping",
  guildOnly: false,
  execute(client, message) {
    message.channel.send('Pong!');
  },
};
