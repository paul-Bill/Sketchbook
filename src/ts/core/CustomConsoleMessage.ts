import { CustomConsole } from './CustomConsole';

export class CustomConsoleMessage
{
	public domElement: HTMLElement;

	private customConsole: CustomConsole;
	private elapsedTime: number = 0;
	private removalTriggered: boolean = false;

	constructor(console: CustomConsole, domElement: HTMLElement)
	{
		this.customConsole = console;
		this.domElement = domElement;
	}

	public update(timeStep: number): void
	{
		this.elapsedTime += timeStep;

		if (this.elapsedTime > this.customConsole.messageDuration && !this.removalTriggered)
		{
			this.triggerRemoval();
		}
	}

	private triggerRemoval(): void
	{
		this.removalTriggered = true;
		this.domElement.classList.remove(this.customConsole.entranceAnimation);
		this.domElement.classList.add(this.customConsole.exitAnimation);
		this.domElement.style.setProperty('--animate-duration', '1s');

		this.domElement.addEventListener('animationend', () => {
			this.domElement.parentNode.removeChild(this.domElement);
		});
	}
}