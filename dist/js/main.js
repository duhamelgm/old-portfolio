var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var mesh;
var objects = [];
var loader = new THREE.GLTFLoader();
var renderer = new THREE.WebGLRenderer( { alpha: true } );

var material1 = new THREE.MeshBasicMaterial({ color: 0xfac37f})
var material2 = new THREE.MeshBasicMaterial({ color: 0xb8d8d8})

loader.load(
	'/dist/js/models/logo.gltf',
	function ( gltf ) {

        mesh = gltf.scene;

        mesh.traverse(function(child){
            if(child.isMesh){
                objects.push(mesh);

                if(child.material.name === "Dot"){
                    child.material = material1;
                } else {
                    child.material = material2;
                }
            }
        })

        scene.add( gltf.scene );
        modelLoaded();
    }
);

function modelLoaded() {
    init();
    animate();
}

function init(){
    renderer.setClearColor( 0x000000, 0 );
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("title-background").appendChild( renderer.domElement );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    scene.add( directionalLight );
    directionalLight.position.z += 5;
    
    camera.position.z = 7;

    window.addEventListener( 'resize', onWindowResize, false );

    onWindowResize();
}

function onWindowResize() {
    windowX = window.innerWidth;
    windowY = window.innerHeight;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );


}

function animate() {
    requestAnimationFrame( animate );
    
    render();
}

function render() {
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;

    renderer.render( scene, camera );
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);

    if(windowX<=600){
        navDisplay();
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 50 ) {
        $('.scrolltop:hidden').stop(true, true).fadeIn();
    } else {
        $('.scrolltop').stop(true, true).fadeOut();
    }
});
$(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:$("#principal").offset().top},"1000");return false})})

$(window).on('DOMContentLoaded', function() {
    var Body = $('body');
    Body.addClass('preloader-site');
});

$(window).on('load', function() {
    $('.preloader-wrapper').fadeOut();
    $('body').removeClass('preloader-site');
});

function navDisplay(){

    var navbar = document.getElementById("navbar");

    if(navbar.className === "active"){
        navbar.className = "deactive";
        document.body.style.overflow = "unset";
        document.body.style.overflowX = "hidden";
        $('body').unbind('touchmove')
    } else {
        navbar.className = "active";
        document.body.style.overflow = "hidden";
        $('body').bind('touchmove', function(e){e.preventDefault()})
    }

    var x = document.getElementById("navIcon");

    x.classList.toggle("change");
}

var navMenu = document.getElementById('navbar');

window.onclick = function(event) {
    if (event.target == navMenu) {
        navDisplay();
    }
}
