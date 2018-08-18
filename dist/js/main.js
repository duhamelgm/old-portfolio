/*

    3D SHOWCASES

*/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha:true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("title-background").appendChild( renderer.domElement );
renderer.setClearColor( 0x000000, 0);

var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );


camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight);
}

/*

    UI

*/
//Title-Background

var waypointTitleBackgroundTransition = new Waypoint({
    element: document.getElementById("about-content"),
    handler: function(){
        var titleBackground = document.getElementById("title-background");
        if(titleBackground.className === "transition") {
            titleBackground.className = "activated";
            //titleBackground.style.position = "fixed";

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth , window.innerHeight);
        } else {
            titleBackground.className = "transition";

            camera.aspect = window.innerWidth * 0.5 / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth * 0.5, window.innerHeight);
        }
    },
    offset: "99%"
})

//Title
var waypointTitleTransition = new Waypoint({
    element: document.getElementById("about-content"),
    handler: function(){
        var titleBackground = document.getElementById("title-background");
        var title = document.getElementById("title");
        var height = document.getElementById("about-content").clientHeight;

        if(title.className === "transition"){
            title.className = "activated";
            title.style.marginTop = 0;

            titleBackground.className = "transition";
            titleBackground.style.marginTop = 0;
        } else {
            title.className = "transition";
            title.style.marginTop = height + "px";

            titleBackground.className = "activated";
            titleBackground.style.marginTop = height + "px";
        }
    },
    offset: "bottom-in-view"
})
