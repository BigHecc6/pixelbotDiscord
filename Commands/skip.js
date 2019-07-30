module.exports = {
  name: "skip",
  guildOnly: true,
  musicCMD: true,
  async execute(client, message, args, ops) {
    const musicChan = message.guild.channels.find(musicChan => musicChan.id === '598979052661112834');
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send("There currently isn't any music playing.");
    let userCount = musicChan.members.size;
    let required = Math.ceil(userCount/2);
    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`You already voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);
    fetched.queue[0].voteSkips.push(message.member.id);
    ops.active.set(message.guild.id, fetched);
    if (fetched.queue[0].voteSkips.length >= required) {
      if (!fetched.queue[1]) {
        message.channel.send(`Ending the song...`);
        return fetched.dispatcher.emit('end');
      }
      message.channel.send(`Skipping ${fetched.queue[0].songTitle}...`);
      return fetched.dispatcher.emit('end');
    }
    message.channel.send(`Voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);
  }
}
