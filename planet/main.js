const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 1920 / 1080, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 1920, 1080 );
document.body.appendChild( renderer.domElement );

const fontURL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json";

const planetRadius = 6.5;
const distanceToPlanet = 10;

var tick = 270;

function init() {

    // emotes
    emotesGroup = new THREE.Group();
    scene.add( emotesGroup );

    // world

    //renderer.setClearColor( 0x07020c, 1 ); // 0x021A28
    renderer.setClearColor( 0x021A28, 1 ); // 0x021A28

    camera.position.z = 5;
    camera.position.y = 9

    if (style == 'epico'){

        var geometry = new THREE.SphereGeometry( planetRadius/2, 128, 128 );
        
        
        var material = new THREE.MeshBasicMaterial(  { map: new THREE.TextureLoader().load( "epico.png" )} );
        //const material = new THREE.MeshBasicMaterial( { color: 0x020102 } );
        planet = new THREE.Mesh( geometry, material );

        planet.position.y = 6;
        planet.position.z = 0;
        planet.rotation.x = 50;
        
    }else{
        var geometry = new THREE.CircleGeometry( planetRadius, 128 );
        var material = new THREE.MeshBasicMaterial(  { map: new THREE.TextureLoader().load( "planet.png" )} );
        
        planet = new THREE.Mesh( geometry, material );

        planet.position.y = 2;

    }
    scene.add( planet );    


    var asteroids = 0


    var asteroidsInterval = setInterval(function(){
        if(asteroids < 40){
            createAsteroid();
        }else{
            clearInterval(asteroidsInterval);
        }
        asteroids++;
    }, 500);

    if (debug){
        // camera from the side
        camera.position.x = -20;
        camera.rotation.y = -Math.PI / 2; 

        // test emotes
        for(var i = 0; i < 17; i++){
            createEmote('https://cdn.frankerfacez.com/emote/210748/2')
        }
    }


}


function animate() {
    requestAnimationFrame( animate );

    tick++;

    // for every emote
    for (var i = 0; i < emotesGroup.children.length; i++) {
        // move emote
        emotesGroup.children[i].position.y = -Math.sin( tick/400 + i/10 ) * distanceToPlanet * (Math.sqrt(1-emotesGroup.children[i].position.x**2/distanceToPlanet**2));
        emotesGroup.children[i].position.z = Math.cos( tick/400 + i/10 )  * distanceToPlanet * (Math.sqrt(1-emotesGroup.children[i].position.x**2/distanceToPlanet**2));
    }

    if (style == 'epico'){
        planet.rotation.y += 0.05;
    }

    if(debug){
        const points = [];

        points.push( new THREE.Vector3(  emotesGroup.position.x, emotesGroup.position.y, emotesGroup.position.z ) );
        points.push( new THREE.Vector3(  planet.position.x, planet.position.y, planet.position.z ) );

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );


        const line = new THREE.Line( geometry, material );
        scene.add( line );
    }

    renderer.render( scene, camera );
};

function createAsteroid(){
    // small white asteroid
    const geometry = new THREE.SphereGeometry(0.005, 0.005)
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

    const asteroid = new THREE.Mesh( geometry, material );

    const x = Math.random() * 25 - 12.5
    const y = Math.random() * 2 - 2

    asteroid.position.x = x;
    asteroid.position.y = y;
    asteroid.position.z = 0;

    emotesGroup.add(asteroid)

}
var emoteCount = 0;

function createEmote(url) {
    const extraSize = Math.random()/2
    // create a plane to hold the image texture of the emote
    const geometry = new THREE.PlaneGeometry( (emoteSize/10) + extraSize, (emoteSize/10) + extraSize);
    const material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( url ) } );
    const emote = new THREE.Mesh( geometry, material );

    emote.material.transparent = true;

    const x = Math.random() * 15 - 7.5
    const y = Math.random() * 20 - 20

    emote.position.x = x;
    emote.position.y = y;
    emote.position.z = 0;
    
    console.log("Emote created: " + x, y)

    emotesGroup.add( emote );


    setTimeout(function(){
        emotesGroup.children[emoteCount].visible = false
        emoteCount++;
    }, 15000);

    /*if (emotesGroup.children.length > 40) {
        //group.remove( group.children[0] );
        // hide it
        emotesGroup.children[emoteCount].visible = false;
        emoteCount++
    }*/
    

}

init();
animate();