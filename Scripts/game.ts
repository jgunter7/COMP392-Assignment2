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
var earth:Mesh;
var earthPivot:THREE.Object3D;

function init() {
    // Instantiate a new Scene object
	scene = new Scene();
	
	setupRenderer(); // setup the default renderer
	
	setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
	
    // add ambient light to the scene
    var aLight = new THREE.AmbientLight(0xffffff); 
    scene.add(aLight);
    
    //add my solar system
    AddHumanCubes();
    
    // add controls
	gui = new GUI();
	control = new Control(0.02,  false);
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
    //gui.add(controlObject, 'zoomIn');
	//gui.add(controlObject, 'roomOut');
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
    
    earth.rotation.x += 0.01;
    earth.rotation.y += 0.0001;
    earthPivot.rotation.y += 0.02;
	// render using requestAnimationFrame
	requestAnimationFrame(gameLoop);
	
    // render the scene
	renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer():void {
	renderer = new Renderer();
	renderer.setClearColor(0xEEEEEE, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera():void {
	camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.x =-30;
	camera.position.y = 60;
	camera.position.z = 45;
	camera.lookAt(scene.position);
	console.log("Finished setting up Camera...");
}

function AddHumanCubes() {
    earth = new THREE.Mesh(
    new THREE.SphereGeometry(5, 40, 40),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/earth.jpg')
    }));
    earth.position.set(0,0,15);
    earthPivot = new THREE.Object3D();
    earthPivot.position.set(0,0,0);
    scene.add(earthPivot);
    earthPivot.add(earth);
}
