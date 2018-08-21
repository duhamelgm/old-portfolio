/*
    3D SHOWCASE
*/

var scene = new THREE.Scene();
var camera, renderer, light, mesh, clock;
var mixer, animationClip;

var loader = new THREE.GLTFLoader();
loader.load(
    'js/models/002.gltf',

    function(gltf){

        mesh = gltf.scene;

        mesh.traverse(function(child) {
            if(child instanceof THREE.PerspectiveCamera)
            {
                camera = child;
                console.log(child);

                console.log(gltf.animations)

                mixer = new THREE.AnimationMixer( mesh);
                mixer.clipAction( gltf.animations[0]).play();

            }
        });

        scene.add(mesh);
        console.log(mesh);

        modelLoaded();
    }
)

function modelLoaded() {
    init();
    animate();    
}

function init() {
    renderer = new THREE.WebGLRenderer({ alpha: true});
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("title-background").appendChild( renderer.domElement );


    light = new THREE.DirectionalLight( 0xFFFFFF );
    scene.add( light );
    light.target = mesh;
    light.position.x = 1;
    light.position.z = 1;

    //var helper = new THREE.DirectionalLightHelper( light, 5 );
    //scene.add( helper );

    clock = new THREE.Clock();

    window.addEventListener( 'resize', onWindowResize, false );

    onWindowResize();
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    
    mixer.update( clock.getDelta() );
    renderer.render( scene, camera );
}

/*
    UI SCRIPTS
*/

//Title-Background
var waypointTitleBackgroundTransition = new Waypoint({
    element: document.getElementById("about-content"),
    handler: function(){
        var titleBackground = document.getElementById("title-background");
        if(titleBackground.className === "transition") {
            titleBackground.className = "activated";
          
        } else {
            titleBackground.className = "transition";
            
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
