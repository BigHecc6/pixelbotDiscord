module.exports = {
  name: 'mute',
  description: 'Unmutes a specified member. Context: !unmute (@member)',
  guildOnly: true,
  execute(message, args) {
    if (!message.member.permissions.has('MUTE_MEMBERS')) {
      return message.reply("you don't have the required permission.");
    } else if (!message.mentions.users.size) {
      return message.reply("no one was mentioned.");
    } else if (message.mentions.users.bot) {
      return message.reply("I cannot mute bots. You can do it yourself locally.");
    }
    const toMute = message.mentions.users.first();
    const member = message.guild.member(toMute);

    member.removerole('603715750288556043');
    message.channel.send(`${member} has been unmuted.`)
      .catch(error) {
        message.channel.send('An error occured while trying to unmute. Is this person unmuted already?');
      }
  },
};
