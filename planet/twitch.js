let regex = new RegExp(/\${}\s/gm);

const client = new tmi.Client({
	channels: [ channel ],
    identity: {
		username: 'the_marceloc',
		password: 'oauth:n72spoirviez1nkxnwhkghd9jvsduq'
	}
});

client.connect();

client.on('message', async (channel, tags, message, self) => {
    
    // parse all Twitch emotes

    // iterate tags.emotes keys
    // for each key, add to emotes
    console.log(tags)
    for( let key in tags.emotes ){
        console.log(key)
       /* let emote = {
            emoteName: "",
            emoteURL: `https://static-cdn.jtvnw.net/emoticons/v2/${key}/default/dark/4.0`,
        };
        emotes.push(emote);*/
        //addEmote("", `https://static-cdn.jtvnw.net/emoticons/v2/${key}/default/dark/4.0`)
        
        // for every key of keys
        // add to emotes

        for( let key2 in tags.emotes[key] ){
            console.log(key2)
            // add to emotes
            createEmote('', `https://static-cdn.jtvnw.net/emoticons/v2/${key}/default/dark/4.0`)

        }

       
    }


    /// parse all BTTV, FFZ and 7TV emotes
    
    message.split(" ").forEach(word => {
        // if word match with a emote
        if (emotes[word]){
            for(let i = 0; i < 5; i++){
                createEmote(emotes[word]);
            }
        }
    })

})
