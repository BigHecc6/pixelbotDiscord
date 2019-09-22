module.exports = {
  name: "volume",
  guildOnly: true,
  musicCMD: true,
  async execute(client, message, args, ops) {
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send("There currently isn't any music playing.");
    if (isNaN(args[0]) || args[0] > 100 || args[0] < 0) return message.channel.send("Enter a number between 0 and 100.");
    let volumeSet = args[0] * 2;
    fetched.dispatcher.setVolume(volumeSet/100);
    message.channel.send(`Set the volume to ${args[0]}.`);
  }
}
