module.exports = {
  name: 'unmute',
  guildOnly: true,
  perms: "MUTE_MEMBERS",
  execute(client, message, args) {
    const muteROLE = message.guild.roles.find(muteROLE => muteROLE.name === "MUTED" );
    if (!message.mentions.users.size) {
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
