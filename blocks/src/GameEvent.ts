class GameEvent extends egret.Event {
	public static GAME_OVER: string = 'game_over';
	public static GAME_HIT: string = 'game_hit';
	public static GAME_START: string = 'game_start';
	public constructor(type: string, bubbles: boolean = false, cancelable = false) {
		super(type, bubbles, cancelable);
	}
}