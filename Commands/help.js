
module.exports = {
  name: "help",
  guildOnly: false,
  execute(client, message, args) {
    message.author.send(`Here are the commands:
**ADMINISTRATIVE**

__!ban__:
Bans a specified member.
Context: "!ban (member) (number of hours OR indef) [reason]"

__!kick__:
Kicks a specified member.
Context: "!kick (member) [reason]"

__![un]mute__:
[Un]Mutes a specified member.
Context: "![un]mute (member)"

__!clear__:
Clears a specified number of messages.
Context: "!clear (number from 1 to 99)"

**MUSIC**
__!play__
Plays or adds a specified song to queue.
Context: "!play (Song)"

__!leave__
Clears queue and leaves voice channel.
Context: "!leave"

__!skip__
Skips a song in the queue if enough people skip it at once.
Context: "!skip"

__!pause__
Pauses the song currently playing.
Context: "!pause"

__!resume__
Resumes a song that was previously paused.
Context: "!resume"

__!volume__
Changes the volume of the song currently playing
Context: "!volume (0-100)"

__!queue__
Displays what is currently playing and what is in the queue.
Context: "!queue"

**MISCELLANEOUS**

__!ping__:
Depicts the ping of your your connection.
Contect: "!ping"`);
  },
};
