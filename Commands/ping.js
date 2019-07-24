module.exports = {
  name: 'ping',
  description: 'Tests the lag.',
  execute(message) {
    message.channel.send('Pong!');
  },
};
