module.exports = {
  name: "resume",
  guildOnly: true,
  musicCMD: true,
  async execute(client, message, args, ops) {
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send("There currently isn't any music playing.");
    if (!fetched.dispatcher.paused) return message.channel.send("Music hasn't been paused.");
    fetched.dispatcher.resume();
    message.channel.send("Resumed the music.");
  }
}
