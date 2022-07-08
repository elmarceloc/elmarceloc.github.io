const client = new tmi.Client({
	channels: [ channel ],
    identity: {
		username: 'the_marceloc',
		password: 'oauth:n72spoirviez1nkxnwhkghd9jvsduq'
	}
});

client.connect();

let regex = new RegExp(/\${}\s/gm);

client.on('message', async (channel, tags, message, self) => {

    /// for every emote using foreach
     for (var i = 0; i < emotes.length; i++) {
        var emote = emotes[i];

        let regex = new RegExp(`(^|\s)${emote.emoteName}($| )`, "gm");
        let match = message.match(regex);
        // if there are emotes in the message
        if (match) {
            //for(var i=0; i < 10; i++){
                createEmote(emote.emoteURL);
            //}
        }

        //console.log(emoteName)
    }
})
