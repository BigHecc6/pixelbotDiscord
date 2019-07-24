module.exports = {
  name: 'clear',
  description: 'Deletes a specified number of messages. Context: !clear (1-99)',
  usage: '!clear (1-99)',
  guildOnly: true,
  execute(message, args) {
    const amount = parseInt(args[0]) + 1;
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply("you don't have the required permission.")
    }
    if (isNaN(amount)) {
        return message.reply('please enter a number.')
          .then(message => {
            message.delete(4000);
          })
    } else if (amount <= 1 || amount > 100) {
        return message.reply('please input a number between 1 and 99.')
          .then(message => {
            message.delete(4000);
          })
    }
    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send('Messages are older than 2 weeks. Due to limitations in Discord.js, I can only delete messages younger than 2 weeks.')
        .then(message => {
          message.delete(7000);
      })
    })
    message.channel.send('Deleted messages.')
      .then(message => {
        message.delete(4000);
      })
  },
};
