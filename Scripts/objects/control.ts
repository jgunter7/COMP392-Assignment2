module objects {
	export class Control {
        //variables
		constructor() {
            //init variable values
		}
        
        public zoomIn() : void {
            camera.position.set(-200,200,200);
            camera.lookAt(scene.position);
        }
        
        public zoomOut() : void {
            camera.position.set(-800,800,800);
            camera.lookAt(scene.position);
        }
        
        public zoomCenter() : void {
            camera.position.set(-500,500,500);
            camera.lookAt(scene.position);
        }
	}
}
