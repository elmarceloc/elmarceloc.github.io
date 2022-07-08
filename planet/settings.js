const urlParams = new URLSearchParams(window.location.search);
const channel = urlParams.get('channel') || 'exodoplays';
const emoteSize = urlParams.get('emotes') || 2;
var debug = urlParams.get('debug') || false;
