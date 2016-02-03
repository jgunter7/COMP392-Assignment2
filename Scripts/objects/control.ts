module objects {
	export class Control {
        colourChangeMgr = 0;
		rotationSpeed: number;
		rotationToggle: boolean;
		constructor(rotationSpeed: number, rotationToggle: boolean) {
			this.rotationSpeed = rotationSpeed;
			this.rotationToggle = rotationToggle;
		}
	}
}
