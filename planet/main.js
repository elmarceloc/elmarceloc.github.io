const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 1920 / 1080, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 1920, 1080 );
document.body.appendChild( renderer.domElement );

const fontURL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json";

const planetRadius = 6.5;
const distanceToPlanet = 10;


function init() {

    // world

    //renderer.setClearColor( 0x07020c, 1 ); // 0x021A28
    renderer.setClearColor( 0x021A28, 1 ); // 0x021A28

    camera.position.z = 5;
    camera.position.y = 9

    // planet
    const geometry = new THREE.CircleGeometry( planetRadius, 128 );


    // transparent background
    const material = new THREE.MeshBasicMaterial(  { map: new THREE.TextureLoader().load( "planet.png" )} );
    //const material = new THREE.MeshBasicMaterial( { color: 0x020102 } );

    planet = new THREE.Mesh( geometry, material );
    
    planet.position.y = 2;
    scene.add( planet );    

    // emotes
    group = new THREE.Group();
    scene.add( group );


    // create up to 40 asteorids, 1 every 3 secounds
    var asteroids = 0


    var asteroidsInterval = setInterval(function(){
        if(asteroids < 40){
            createAsteroid();
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

var tick = 270;

function animate() {
    requestAnimationFrame( animate );

    tick++;

    // for every emote
    for (var i = 0; i < group.children.length; i++) {
        // move emote
        group.children[i].position.y = -Math.sin( tick/200 + i/10 ) * distanceToPlanet * (Math.sqrt(1-group.children[i].position.x**2/distanceToPlanet**2));
        group.children[i].position.z = Math.cos( tick/200 + i/10 )  * distanceToPlanet * (Math.sqrt(1-group.children[i].position.x**2/distanceToPlanet**2));
    }

    if(debug){
        const points = [];

        points.push( new THREE.Vector3(  group.position.x, group.position.y, group.position.z ) );
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

    group.add(asteroid)

}

function createEmote(url) {

    // create a plane to hold the image texture of the emote
    const geometry = new THREE.PlaneGeometry( emoteSize/10, emoteSize/10 );
    const material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( url ) } );
    const plane = new THREE.Mesh( geometry, material );

    plane.material.transparent = true;

    const x = Math.random() * 25 - 12.5
    const y = Math.random() * 2 - 2

    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = 0;


    // limit the amount up to 20 and delete the first one if reachs the limit
    
    if (group.children.length > 20) {
        //group.remove( group.children[0] );
        // hide it
        group.children[0].visible = false;
    }
    
    group.add( plane );

}

init();
animate();