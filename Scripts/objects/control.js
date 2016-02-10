var objects;
(function (objects) {
    var Control = (function () {
        //variables
        function Control() {
            //init variable values
        }
        Control.prototype.SunView = function () {
            camera.position.set(50, 50, 50);
            camera.lookAt(earth.position);
        };
        Control.prototype.TopView = function () {
            camera.position.y = 500;
            camera.position.x = 0;
            camera.position.z = 0;
            camera.lookAt(sun.position);
        };
        Control.prototype.zoomIn = function () {
            camera.position.set(-200, 200, 200);
            camera.lookAt(scene.position);
        };
        Control.prototype.zoomOut = function () {
            camera.position.set(-800, 800, 800);
            camera.lookAt(scene.position);
        };
        Control.prototype.zoomCenter = function () {
            camera.position.set(-500, 500, 500);
            camera.lookAt(scene.position);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map