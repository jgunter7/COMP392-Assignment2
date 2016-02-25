var objects;
(function (objects) {
    var Control = (function () {
        function Control() {
            this.fEarth = false;
            //init variable values
        }
        Control.prototype.SunView = function () {
            this.fEarth = false;
            camera.position.set(50, 50, 50);
            camera.lookAt(earth.position);
        };
        Control.prototype.TopView = function () {
            this.fEarth = false;
            camera.position.y = 500;
            camera.position.x = 0;
            camera.position.z = 0;
            camera.lookAt(sun.position);
        };
        Control.prototype.zoomIn = function () {
            this.fEarth = false;
            camera.position.set(-200, 200, 200);
            camera.lookAt(scene.position);
        };
        Control.prototype.zoomOut = function () {
            this.fEarth = false;
            camera.position.set(-800, 800, 800);
            camera.lookAt(scene.position);
        };
        Control.prototype.zoomCenter = function () {
            this.fEarth = false;
            camera.position.set(-500, 500, 500);
            camera.lookAt(scene.position);
        };
        Control.prototype.followEarth = function () {
            this.fEarth = true;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map