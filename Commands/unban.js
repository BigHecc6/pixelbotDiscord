module.exports = {
  name: 'unban',
  description: 'Unbans a banned person. Context: !unban (banned member)',
  usage: '!ban (banned member)',
  guildOnly: true,
  execute(message, args) {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("you don't have the required permission.");
    } else if (!message.mentions.users.size) {
      return message.reply("no one was mentioned.");
    } else if (message.mentions.users.bot) {
      return message.reply("an error occured.");
    } else if (!message.mentions.members.bannable) {
      return message.reply("this person either isn't a member, or is not banned.");
    }
    const userToUnban = message.mentions.users.first();

    const member = message.guild.member(userToUnban);
    guild.unban(member);
    message.channel.send(`${member} has been unbanned.`)
        .then(message => {
          message.delete(5000);
        })
        message.delete(5000);
  },
};
