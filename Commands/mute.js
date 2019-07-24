module.exports = {
  name: 'mute',
  description: 'Mutes a specified member. Context: !mute (@member)',
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

    member.addrole('603715750288556043');
    message.channel.send(`${member} HAS BEEN MUTED. If you are unsure why, please consult a staff member via DM.`);
  },
};
