var objects;
(function (objects) {
    var Control = (function () {
        function Control(rotationSpeed, rotationToggle) {
            this.colourChangeMgr = 0;
            this.rotationSpeed = rotationSpeed;
            this.rotationToggle = rotationToggle;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map