/*
    3D SHOWCASE
*/

//ESCENA TITULO


var scene = new THREE.Scene();
var camera, renderer, light, mesh, clock;
var mixer, animationClip;
var mouse, raycaster, camera;
var objects = [];
var bookshelfDown, pcDown, programDown, contactDown;

var loader = new THREE.GLTFLoader();
loader.load(
    'js/models/002.gltf',

    function(gltf){

        mesh = gltf.scene;

        mesh.traverse(function(child) {
            if(child instanceof THREE.PerspectiveCamera)
            {
                camera = child;
                //var objectCamera = child.parent
                //objectCamera.parent = null;
            }
        });

        mesh.traverse(function(child) {
            if(child.isMesh){
                objects.push(child);
            }
        });
        mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction( gltf.animations[0]).play();

        scene.add(mesh);
        console.log(objects);

        modelLoaded();
    }
)

function modelLoaded() {
    init();
    animate();    
}

function init() {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("title-background").appendChild( renderer.domElement );

    console.log(scene.children);

    var pointlight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointlight.position.set( 0, 8, 0 );
    pointlight.target = mesh;
    scene.add( pointlight );

    
    var pointlight = new THREE.PointLight( 0xffffff, 0.5, 100 );
    pointlight.position.set( 0, 8, 0 );
    pointlight.target = mesh;
    pointlight.castShadow = true;
    scene.add( pointlight );
    
    
    pointlight.shadow.mapSize.width = 1024;  // default
    pointlight.shadow.mapSize.height = 1024;
    pointlight.shadow.radius = 2; // default
    pointlight.shadow.camera.near = 0.5;       // default
    pointlight.shadow.camera.far = 500      // default
    

    var sphereSize = 0.5;
    var pointLightHelper = new THREE.PointLightHelper( pointlight, sphereSize );
    scene.add( pointLightHelper );

    for(var i = 0; i<objects.length; i++){
        console.log(objects);
        objects[i].castShadow = true;
        objects[i].receiveShadow = true;
    }

    /*
    var light = new THREE.AmbientLight( 0x404040, 0.3 ); // soft white light
    scene.add( light );
    */
    /*
    light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    scene.add( light );
    light.target = mesh;
    light.position.x = 10;
    light.position.z = 1;
    */

    clock = new THREE.Clock();

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mousedown', onMouseDown, false );
    window.addEventListener( 'resize', onWindowResize, false );

    onWindowResize();

    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove( e ) {
    
    e.preventDefault();

    //mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    //mouse.y = - (e.clientX / window.innerHeight) * 2 - 1;

    mouse.x = ( ( e.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( ( e.clientY - renderer.domElement.offsetTop ) / renderer.domElement.clientHeight ) * 2 + 1

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects(objects);

    if ( intersects.length > 0 ) {
    
        console.log( intersects[ 0 ].object ); // print first object

        var parentName = intersects[0].object.parent.name;

        //Pointer

        if( parentName === "Bookshelf" || parentName === "PC" || parentName === "Program" || parentName === "Contact"){
            var back = document.getElementById("principal");
            back.className = "hover";
        } else {
            var back = document.getElementById("principal");
            back.className = "not-hover";
        }

        //About Me

        if( parentName === "Bookshelf") 
        {
            console.log("Es PC");
            bookshelfDown = true;
        } else {
            bookshelfDown = false;
        }

        //Design

        if( parentName === "PC")
        {
            pcdown = true;
        } else {
            pcdown = false;
        }
    
        //Programing

        if( parentName === "Program")
        {
            programDown = true;
        } else {
            programDown = false;
        }

        //Contact

        if( parentName === "Contact")
        {
            contactDown = true;
        } else {
            contactDown = false;
        }
    }
}

function onMouseDown(e) {
    e.preventDefault();

    if(bookshelfDown){
        activeAboutZone();
    }
}

function animate() {
    requestAnimationFrame( animate );
    
    render();
}

function render() {
    mixer.update( clock.getDelta() );

    renderer.render( scene, camera );
}

/*
    UI SCRIPTS
*/

function activeAboutZone(){
    var aboutZone = document.getElementById("about-me");
    if (aboutZone.className === "deactive") {
        aboutZone.className = "active";
    } 
    else if (aboutZone.className === "active" && bookshelfDown === false) {
        aboutZone.className = "deactive"
    }
}
