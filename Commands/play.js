//Call required modules for music
const ytdl = require('ytdl-core');
const FFMPEG = require('ffmpeg');


//Plays or adds a requested song to the queue.
module.exports = {
  name: "play",
  guildOnly: true,
  musicCMD: true,
    async execute(client, message, args, ops) {
      //Declare the queue and music channel.
      const queueChan = message.guild.channels.find(queueChan => queueChan.id === '598979377006641153');
      const musicChan = message.guild.channels.find(musicChan => musicChan.id === '598979052661112834');
      //Check if author typed in anything as an argument.
      if (!args[0]) return message.channel.send('Input a song please.');
      //Validate the URL. If it isn't a URL, use the search command.
      const validate = await ytdl.validateURL(args[0]);
      if (!validate) {
        let commandFile = require('./search.js');
        return commandFile.execute(client, message, args, ops);
      }
      //Declare info and data vars.
      let info = await ytdl.getInfo(args[0]);
      let data = ops.active.get(message.guild.id) || {};
      //If not connected to music channel, connect to it.
      if (!data.connection) data.connection = await musicChan.join();
      //If the queue is not defined, declare it.
      if (!data.queue) data.queue = [];
      data.guildID = message.guild.id;
      //Push a new song into the queue.
      data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0]
      //If there isn't a song playing, play the requested song. If there is, add it to queue.
      });
      if (!data.dispatcher) play(client, ops, data);
      else {
        message.channel.send(`${info.title} Added To Queue. | Requested By: ${message.author.tag}`);
      }
      ops.active.set(message.guild.id, data);


  //Plays the song at queue[0].
  async function play(client, ops, data) {
  message.channel.send(`Now Playing: ${data.queue[0].songTitle} | Requested By: ${data.queue[0].requester}`);
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.once('end', () => {
      end(client, ops, data);
    });
  }
  //Happens at the end of a song; If there aren't any songs in queue, disconnect. If there are, play the next one.
  function end(client, ops, dispatcher) {
    let fetched = ops.active.get(dispatcher.guildID);
    fetched.queue.shift();
    if (fetched.queue.length > 0) {
      ops.active.set(dispatcher.guildID, fetched);
      if (client.guilds.get(dispatcher.guildID).me.voiceChannel) { play(client,ops,fetched); }
    } else {
      ops.active.delete(dispatcher.guildID);
      let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
      if (vc) vc.leave();
  }
}
},
};
