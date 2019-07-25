module.exports = {
  name: 'unmute',
  description: 'Unmutes a specified member. Context: !unmute (@member)',
  guildOnly: true,
  execute(message, args) {
    const muteROLE = message.guild.roles.find(muteROLE => muteROLE.name === "MUTED" );
    if (!message.member.permissions.has('MUTE_MEMBERS')) {
      return message.reply("you don't have the required permission.");
    } else if (!message.mentions.users.size) {
      return message.reply("no one was mentioned.");
    } else if (message.mentions.users.bot) {
      return message.reply("I cannot mute bots. You can do it yourself locally.");
    }
    const toUnmute = message.mentions.users.first();
    const member = message.guild.member(toUnmute);

    if (!member.roles.has(muteROLE.id)) {
     return message.channel.send('This member is not muted.');
   }

    member.removeRole(muteROLE.id);
    message.channel.send(`${member} has been unmuted.`);
  },
};
