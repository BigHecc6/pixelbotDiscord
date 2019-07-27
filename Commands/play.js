//Call required modules for music
const ytdl = require('ytdl-core');

module.exports = {
  name: "play",
  description: "Plays or adds a song to queue.",
  guildOnly: true,
    async execute(message, args) {
      const queueChan = message.guild.channels.find(queueChan => queueChan.id === '598979377006641153');
      const musicChan = message.guild.channels.find(musicChan => musicChan.id === '598979052661112834');
      if (message.channel !== queueChan) return message.channel.send(`Please put music in the ${queueChan} channel.`);
      if (message.guild.me.voiceChannel) return message.channel.send('Im already connected, sry.');
      if (!args[0]) return message.channel.send('Input a URL please.');
      const validate = await ytdl.validateURL(args[0]);
      if (!validate) return message.channel.send('Input a **valid** url, please.');
      const info = await ytdl.getInfo(args[0]);
      let connection = await musicChan.join();
      let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly'}));
      message.channel.send(`Now playing: ${info.title}`);
  },
};
