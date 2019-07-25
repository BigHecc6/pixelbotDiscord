module.exports = {
  name: 'unmute',
  description: 'Unmutes a specified member. Context: !unmute (@member)',
  guildOnly: true,
  execute(message, args) {
    if (!message.member.permissions.has('MUTE_MEMBERS')) {
      return message.reply("you don't have the required permission.");
    } else if (!message.mentions.users.size) {
      return message.reply("no one was mentioned.");
    } else if (message.mentions.users.bot) {
      return message.reply("I cannot mute bots. You can do it yourself locally.");
    } else if (message.mentions.members.roles.has('603715750288556043')) {
      return message.channel.send('This member is not muted.');
    }
    const toMute = message.mentions.users.first();
    const member = message.guild.member(toMute);

    member.removeRole('603715750288556043');
    message.channel.send(`${member} has been unmuted.`);
  },
};
