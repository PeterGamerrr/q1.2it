class cell{
    private x : number;
    private y : number;
    private bomb : boolean;
    private claimedBy : number;

    constructor(x : number, y : number, bomb : boolean) {
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }

    
    public get getX() : number {
        return this.x;
    }
    
}