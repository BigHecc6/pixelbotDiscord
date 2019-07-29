module.exports = {
  name: 'kick',
  guildOnly: true,
  perms: "KICK_MEMBERS",
  execute(client, message, args) {
    if (!message.mentions.users.size) {
      return message.reply("no one was mentioned.");
    } else if (message.mentions.users.bot) {
      return message.reply("I cannot kick bots. Please try to do it yourself.");
    } else if (!message.mentions.members.kickable) {
      return message.reply("this member can not be kicked.");
    }
    const userToKick = message.mentions.users.first();
    const kickReason = args.slice(1).join(' ');

    const member = message.guild.member(userToKick);
    if (kickReason) {
      member.kick(`${kickReason}`)
      message.channel.send(`${member} has been kicked. Reason: ${kickReason}`)
        .then(message => {
          message.delete(5000);
        })
      message.delete(5000);
    } else {
      member.kick();
      message.channel.send(`${member} has been kicked.`)
        .then(message => {
          message.delete(5000);
        })
        message.delete(5000);
    }
  },
};
