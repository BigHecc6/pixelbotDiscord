module.exports = {
  name: "ban",
  guildOnly: true,
  perms: 'BAN_MEMBERS',
  execute(client, message, args) {
    //Checks if syntax is correct
    if (!message.mentions.users.size) {
      return message.channel.send("ERROR 417: No one was mentioned.");
    }
    const userToBan = message.mentions.users.first();
    const banReason = args.slice(2).join(' ');
    const length = args[1];
    const member = message.guild.member(userToBan);

    if (userToBan.bot) {
      return message.channel.send("ERROR 401: I cannot ban bots. Please try to do it yourself.");
    } else if (member.bannable === false) {
      return message.channel.send("ERROR 401: This member can not be banned.");
}
    if (length !== 'indef') {
      if (banReason) {
        member.ban(`${banReason}`)
        message.channel.send(`STOP RIGHT THERE CRIMINAL SCUM! ${member} has been banned for ${length} hours. Reason: ${banReason}`)
          .then(message => {
            message.delete(5000);
          })
          message.delete(5000);
      } else {
          member.ban();
          message.channel.send(`STOP RIGHT THERE CRIMINAL SCUM! ${member} has been banned for ${length} hours.`)
          .then(message => {
            message.delete(5000);
          })
          message.delete(5000);
      }
    } else if (length === 'indef') {
      if (banReason) {
        member.ban(`${banReason}`)
        message.channel.send(`STOP RIGHT THERE CRIMINAL SCUM! ${member} has been banned. Reason: ${banReason}`)
          .then(message => {
            message.delete(5000);
          })
          message.delete(5000);
      } else {
            member.ban();
          message.channel.send(`STOP RIGHT THERE CRIMINAL SCUM! ${member} has been banned.`)
          .then(message => {
            message.delete(5000);
          })
          message.delete(5000);
      }
    } else if (!length) return message.channel.send(`ERROR 417: You need to set the length of the ban.`)
  },
};
