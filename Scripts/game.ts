/*
Author:             Jason Gunter
Last Modified By:   Jason Gunter @ Feb 3rd, 2016
Description:        Make a solar system
Revision History:   https://github.com/jgunter7/COMP392-Assignment2/commits/master
*/

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes:AxisHelper;
var spotLight: SpotLight;
var pointLight: PointLight;
var control: Control;
var gui: GUI;
var stats:Stats;
var sun:Mesh;
var earth:Mesh;
var earthPivot:THREE.Object3D;
var moon:Mesh;
var moonPivot:THREE.Object3D;
var mars:Mesh;
var marsPivot:THREE.Object3D;
var jgp:Mesh; //jg planet
var jgpPivot:THREE.Object3D;
var saturn:Mesh;
var saturnPivot:THREE.Object3D;
var stars:Mesh[];
var pluto:Mesh;
var plutoPivot:THREE.Object3D;
var asteroids:Mesh[];
var asteroidPivot:THREE.Object3D;

function init() {
    // Instantiate a new Scene object
	scene = new Scene();
	
	setupRenderer(); // setup the default renderer
	
	setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(100);
    scene.add(axes);
    
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0,0,0);
    pointLight.castShadow = true;   
    scene.add(pointLight);
	
    //add ambient light to the scene
    var aLight = new THREE.AmbientLight(0xffffff); 
    scene.add(aLight);
    
    //add my solar system
    AddMyPlanets();
    
    // add controls
	gui = new GUI();
	control = new Control();
	addControl(control);
    
    // Add framerate stats
    addStatsObject();
    
	document.body.appendChild(renderer.domElement);
	gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize():void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function addControl(controlObject: Control):void {
    gui.add(controlObject, 'TopView');
    gui.add(controlObject, 'SunView');
    gui.add(controlObject, 'zoomIn');
    gui.add(controlObject, 'zoomCenter');
	gui.add(controlObject, 'zoomOut');
    gui.add(controlObject, "followEarth");
}

function addStatsObject() {
	stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop():void {
	stats.update();
    
    earthPivot.rotation.y += 0.009;
    earth.rotation.x += 0.009;
    
    moonPivot.rotation.x += 0.05;
    
    marsPivot.rotation.x += 0.05;
    
    jgpPivot.rotation.y += 0.03;
    
    saturnPivot.rotation.y += 0.005;
    saturn.rotation.y += 0.3;
    
    plutoPivot.rotation.y += 0.008;
    
    asteroidPivot.rotation.y += 0.0105;
    
    
    
    if (control.fEarth) {
        // if the user has elected to follow the earth & moon
        // we should probably follow that planet with the camera
        // it will probably look pretty cool too :) - jgunter
        var ep:Vector3 = earth.position; //Earth Position (ep)
        camera.position.set(ep.x + 100, ep.y + 100, ep.z + 150);
        camera.lookAt(earth.position);
        earthPivot.add(camera);
    } else {
        earthPivot.remove(camera);
    }
    
	// render using requestAnimationFrame
	requestAnimationFrame(gameLoop);
	
    // render the scene
	renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer():void {
	renderer = new Renderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera():void {
	camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 5000);
	camera.position.x =-500;
	camera.position.y = 500;
	camera.position.z = 500;
	camera.lookAt(scene.position);
	console.log("Finished setting up Camera...");
}

function AddMyPlanets() {
    sun = new THREE.Mesh(
    new THREE.SphereGeometry(40, 100, 100),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/sun.jpg'),
    }));
    sun.position.set(0,0,0);
    scene.add(sun);
    
    
    earth = new THREE.Mesh(
    new THREE.SphereGeometry(20, 40, 40),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/earth.jpg')
    }));
    earth.castShadow = true;
    earth.receiveShadow = true;
    earth.position.set(0,0,250);
    earthPivot = new THREE.Object3D();
    sun.add(earthPivot);
    earthPivot.add(earth);
    
    
    moon = new THREE.Mesh(
    new THREE.SphereGeometry(7, 40, 40),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/moon.jpg')
    }));
    moon.castShadow = true;
    moon.receiveShadow = true;
    moon.position.set(0,0,45);
    moonPivot = new THREE.Object3D();
    moonPivot.position = moon.position; //orbit around the earth..jgunter
    earth.add(moonPivot);
    moonPivot.add(moon);
    
    
    mars = new THREE.Mesh(
    new THREE.SphereGeometry(6, 40, 40),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/mars.jpg')
    }));
    mars.castShadow = true;
    mars.receiveShadow = true;
    mars.position.set(0,0,75);
    marsPivot = new THREE.Object3D();
    marsPivot.position = sun.position;
    sun.add(marsPivot);
    marsPivot.add(mars);
    
    
    jgp = new THREE.Mesh(
    new THREE.SphereGeometry(12, 40, 40),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/neptune.jpg')
    }));
    jgp.castShadow = true;
    jgp.receiveShadow = true;
    jgp.position.set(0,0,150);
    jgpPivot = new THREE.Object3D();
    jgpPivot.position = sun.position;
    jgpPivot.rotation.x = 125;
    sun.add(jgpPivot);
    jgpPivot.add(jgp);
    
    
    saturn = new THREE.Mesh(
    new THREE.SphereGeometry(22, 40, 40),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/saturn.jpg')
    }));
    saturn.castShadow = true;
    saturn.receiveShadow = true;
    saturn.position.set(0,0,450);
    saturn.rotation.z = 3.16;
    saturnPivot = new THREE.Object3D();
    saturnPivot.position = sun.position;
    saturnPivot.rotation.x = 50;
    sun.add(saturnPivot);
    saturnPivot.add(saturn);
    
    
    //add several stars here;
    stars = new Array(700);
    for (var i = 0; i < stars.length; i ++) {
        stars[i] = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 10, 10),
            new LambertMaterial({color:0xffffff})
        );
        var rnX = getRandomInt(-800, 800);
        var rnY = getRandomInt(-800, 800);
        var rnZ = getRandomInt(-800, 800);
        stars[i].position.set(rnX,rnY,rnZ);
        scene.add(stars[i]);
    }
    
    // add orbiting asteroids!!!!
    asteroidPivot = new THREE.Object3D();
    asteroidPivot.position = sun.position;
    asteroids = new Array(80);
    for (var i = 0; i < asteroids.length; i ++) {
        asteroids[i] = new THREE.Mesh(
            new THREE.DodecahedronGeometry(2,0),
            new LambertMaterial({color:0x2f4f4f})
        );
        var rnX = (-1) * getRandomInt(575, 625);
        var rnY = getRandomInt(-50,50);
        var rnZ = getRandomInt(-30,30);
        asteroids[i].position.set(rnX,rnY,rnZ);
        asteroidPivot.add(asteroids[i]);
    }
    sun.add(asteroidPivot);
    
    // That 9th planet is REAL :) 
    pluto = new THREE.Mesh(
    new THREE.SphereGeometry(5, 40, 40),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/pluto.jpg')
    }));
    pluto.castShadow = true;
    pluto.receiveShadow = true;
    pluto.position.set(0,0,405);
    pluto.rotation.z = 3.16;
    plutoPivot = new THREE.Object3D();
    plutoPivot.position = sun.position;
    plutoPivot.rotation.x = 50;
    sun.add(plutoPivot);
    plutoPivot.add(pluto);
}

//this is stolen sir
function getRandomInt(min, max) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}