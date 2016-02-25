module objects {
	export class Control {
        //variables
        fEarth:Boolean;
		constructor() {
            this.fEarth = false;
            //init variable values
            
		}
        
        public SunView() : void {
            this.fEarth = false;
            camera.position.set(50,50,50);
            camera.lookAt(earth.position);
        }
        
        public TopView() : void {
            this.fEarth = false;
            camera.position.y = 500;
            camera.position.x = 0;
            camera.position.z = 0;
            camera.lookAt(sun.position);
        }
        
        public zoomIn() : void {
            this.fEarth = false;
            camera.position.set(-200,200,200);
            camera.lookAt(scene.position);
        }
        
        public zoomOut() : void {
            this.fEarth = false;
            camera.position.set(-800,800,800);
            camera.lookAt(scene.position);
        }
        
        public zoomCenter() : void {
            this.fEarth = false;
            camera.position.set(-500,500,500);
            camera.lookAt(scene.position);
        }
        
        public followEarth() : void {
            this.fEarth = true;
        }
	}
}
