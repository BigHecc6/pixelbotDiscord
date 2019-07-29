// THIS COMMAND MIGHT BE TEMPORARY

module.exports = {
  name: "leave",
  guildOnly: true,
  musicCMD: true,
  async execute(client, message) {
    const queueChan = message.guild.channels.find(queueChan => queueChan.id === '598979377006641153');
    const musicChan = message.guild.channels.find(musicChan => musicChan.id === '598979052661112834');
    if (message.channel !== queueChan) return message.channel.send(`Please put music-related commands in the ${queueChan} channel.`);
    if (!message.guild.me.voiceChannel) return message.channel.send("I'm not connected to a voice channel.");
    message.guild.me.voiceChannel.leave();
  }
};
