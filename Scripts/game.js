/*
Author:             Jason Gunter
Last Modified By:   Jason Gunter @ Feb 3rd, 2016
Description:        Make a solar system
Revision History:   https://github.com/jgunter7/COMP392-Assignment2/commits/master
*/
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var scene;
var renderer;
var camera;
var axes;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
var sun;
var earth;
var earthPivot;
var moon;
var moonPivot;
var mars;
var marsPivot;
var jgp; //jg planet
var jgpPivot;
var saturn;
var saturnPivot;
var stars;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(100);
    scene.add(axes);
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 0, 0);
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
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'zoomIn');
    gui.add(controlObject, 'zoomCenter');
    gui.add(controlObject, 'zoomOut');
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
function gameLoop() {
    stats.update();
    earthPivot.rotation.y += 0.009;
    earth.rotation.x += 0.009;
    moonPivot.rotation.x += 0.05;
    marsPivot.rotation.x += 0.05;
    jgpPivot.rotation.y += 0.03;
    saturnPivot.rotation.y += 0.005;
    saturn.rotation.y += 0.3;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.x = -500;
    camera.position.y = 500;
    camera.position.z = 500;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
function AddMyPlanets() {
    sun = new THREE.Mesh(new THREE.SphereGeometry(40, 100, 100), new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/sun.jpg'),
    }));
    sun.position.set(0, 0, 0);
    scene.add(sun);
    earth = new THREE.Mesh(new THREE.SphereGeometry(20, 40, 40), new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/earth.jpg')
    }));
    earth.castShadow = true;
    earth.receiveShadow = true;
    earth.position.set(0, 0, 250);
    earthPivot = new THREE.Object3D();
    sun.add(earthPivot);
    earthPivot.add(earth);
    moon = new THREE.Mesh(new THREE.SphereGeometry(7, 40, 40), new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/moon.jpg')
    }));
    moon.castShadow = true;
    moon.receiveShadow = true;
    moon.position.set(0, 0, 45);
    moonPivot = new THREE.Object3D();
    moonPivot.position = moon.position; //orbit around the earth..jgunter
    earth.add(moonPivot);
    moonPivot.add(moon);
    mars = new THREE.Mesh(new THREE.SphereGeometry(4, 40, 40), new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/mars.jpg')
    }));
    mars.castShadow = true;
    mars.receiveShadow = true;
    mars.position.set(0, 0, 75);
    marsPivot = new THREE.Object3D();
    marsPivot.position = sun.position;
    sun.add(marsPivot);
    marsPivot.add(mars);
    jgp = new THREE.Mesh(new THREE.SphereGeometry(12, 40, 40), new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/neptune.jpg')
    }));
    jgp.castShadow = true;
    jgp.receiveShadow = true;
    jgp.position.set(0, 0, 150);
    jgpPivot = new THREE.Object3D();
    jgpPivot.position = sun.position;
    jgpPivot.rotation.x = 125;
    sun.add(jgpPivot);
    jgpPivot.add(jgp);
    saturn = new THREE.Mesh(new THREE.SphereGeometry(22, 40, 40), new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Content/Images/saturn.jpg')
    }));
    saturn.castShadow = true;
    saturn.receiveShadow = true;
    saturn.position.set(0, 0, 450);
    saturn.rotation.z = 3.16;
    saturnPivot = new THREE.Object3D();
    saturnPivot.position = sun.position;
    saturnPivot.rotation.x = 50;
    sun.add(saturnPivot);
    saturnPivot.add(saturn);
    //add several stars here;
    stars = new Array(400);
    for (var i = 0; i < stars.length; i++) {
        stars[i] = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), new LambertMaterial({ color: 0xffffff }));
        var rnX = (-1) * Math.floor((Math.random() * 800) + 1);
        var rnY = Math.floor((Math.random() * 800) + 1);
        var rnZ = Math.floor((Math.random() * 800) + 1);
        stars[i].position.set(rnX, rnY, rnZ);
        scene.add(stars[i]);
    }
}
//# sourceMappingURL=game.js.map