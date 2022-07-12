// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

// get url params
var urlParams = new URLSearchParams(window.location.search);

var channel = urlParams.get('channel') || 'EXODOPLAYS';
var useCategory = urlParams.get('category') || false;

var font;
var font2;

var points2;

var vehicles = [];
var vehicles2 = []
var x 
var y 

var category = ''

function preload() {
    font = loadFont('font.ttf');
    font2 = loadFont('font2.ttf');
}

function setup() {
    createCanvas(1920, 1080);
    background(51);
        
    x = width / 2;
    y = height / 2
    

    var points = font.textToPoints(  channel.toUpperCase(), x - 75 * channel.length , y, 160, {
        sampleFactor: 0.4
    });


    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }

 
}

function draw() {
  background(20);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }

  for (var i = 0; i < vehicles2.length; i++) {
    var v = vehicles2[i];
    v.behaviors();
    v.update();
    v.show();
  }

}


var twitchID
// autocall async
(async function(){
    // get channel twitch ID
    let res = await fetch("https://api.ivr.fi/twitch/resolve/" + channel, {
        method: "GET",
        headers: { "User-Agent": "api.roaringiron.com/emoteoverlay" },
    }).then(res => res.json());
    if (!res.error || res.status == 200) {
        twitchID = res.id;
    } else {
        totalErrors.push("Error getting twitch ID");
    }

    fetchLive()

}())


function fetchLive(){
    if (!useCategory) return

    fetch('https://api.twitch.tv/helix/streams?user_id=' + twitchID, {
        headers: {
            'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5',
            'Authorization': 'Bearer '+'mwzdhwmjt4ofrdhjnf560u4f3ar9ps'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)

        if(data.data[0] != undefined) {
            console.log(data.data[0])
            console.log(data.data[0].game_name)
            
            if (category != data.data[0].game_name) {
                    
                vehicles2 = []
                
                // center the text on the screen                

                points2 = font2.textToPoints(data.data[0].game_name, x - 100 , y + 80, 70, {
                    sampleFactor: 0.3
                });

                for (var i = 0; i < points2.length; i++) {
                    var pt = points2[i];
                    var vehicle = new Vehicle(pt.x, pt.y);
                    vehicles2.push(vehicle);
                }
                category = data.data[0].game_name
            }
        }
        
    });

}

setInterval(fetchLive, 30000);