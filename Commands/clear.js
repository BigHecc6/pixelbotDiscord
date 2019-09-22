module.exports = {
  name: "clear",
  guildOnly: true,
  perms: "MANAGE_MESSAGES",
  execute(client, message, args) {
    const amount = parseInt(args[0]) + 1;
    if (isNaN(amount)) {
        return message.channel.send('ERROR 411: Please enter a number.')
          .then(message => {
            message.delete(4000);
          })
    } else if (amount <= 1 || amount > 100) {
        return message.channel.send('ERROR 416: Please input a number between 1 and 99.')
          .then(message => {
            message.delete(4000);
          })
    }
    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send('ERROR 404: Couldn\'t find messages younger than 2 weeks.')
        .then(message => {
          message.delete(7000);
      })
    })
    message.delete();
    message.channel.send('Good riddance! Deleted messages.')
      .then(message => {
        message.delete(4000);
      })
  },
};
