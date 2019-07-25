module.exports = {
  name: 'ban',
  description: 'Bans a member from the server. Context: !ban (member) (hours OR "indef") [reason]',
  usage: '!ban (member) (hours OR "indef") [reason]',
  guildOnly: true,
  execute(message, args) {
    //Checks if syntax is correct
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("you don't have the required permission.");
    } else if (!message.mentions.users.size) {
      return message.reply("no one was mentioned.");
    }
    const userToBan = message.mentions.users.first();
    const banReason = args.slice(2).join(' ');
    const length = args[1];
    const member = message.guild.member(userToBan);

    if (userToBan.bot) {
      return message.reply("I cannot ban bots. Please try to do it yourself.");
    } else if (member.bannable === false) {
      return message.reply("this member can not be banned.");
}
    if (length !== 'indef') {
      if (banReason) {
        //member.ban(`${banReason}`)
        message.channel.send(`${member} has been banned for ${length} hours. Reason: ${banReason}`)
          .then(message => {
            message.delete(5000);
          })
          message.delete(5000);
      } else {
          member.ban();
          message.channel.send(`${member} has been banned for ${length} hours.`)
          .then(message => {
            message.delete(5000);
          })
          message.delete(5000);
      }
    } else if (length === 'indef') {
      if (banReason) {
        member.ban(`${banReason}`)
        message.channel.send(`${member} has been banned. Reason: ${banReason}`)
          .then(message => {
            message.delete(5000);
          })
          message.delete(5000);
      } else {
          //  member.ban();
          message.channel.send(`${member} has been banned.`)
          .then(message => {
            message.delete(5000);
          })
          message.delete(5000);
      }
    } else if (!length) return message.channel.send(`You need to set the length of the ban. ${usage}`)
  },
};
