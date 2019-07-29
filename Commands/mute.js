module.exports = {
  name: 'mute',
  guildOnly: true,
  perms: "MUTE_MEMBERS",
  execute(client, message, args) {
    if (!message.mentions.users.size) {
      return message.reply("no one was mentioned.");
    } else if (message.mentions.users.bot) {
      return message.reply("I cannot mute bots. You can do it yourself locally.");
    }
    const toMute = message.mentions.users.first();
    const member = message.guild.member(toMute);

    member.addRole('603715750288556043');
    message.channel.send(`${member} HAS BEEN MUTED. If you are unsure why, please consult a staff member via DM.`);
  },
};
