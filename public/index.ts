class cell{
    private x: number;
    private y: number;
    private bomb: boolean;
    private claimedBy = 0;

    constructor(x: number, y: number, bomb: boolean) {
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }

    
    public get getX(): number {
        return this.x;
    }

    public get getY(): number {
        return this.y;
    }

    public move(player: number, x: number , y: number):void {
        
    }

    private explode(x: number, y: number) {
        //TODO: make explosion
    }
    
}