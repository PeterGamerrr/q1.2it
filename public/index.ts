//menu + init
//players
let playerCount = 2;
function setMenuPlayerCount(num:number):void {
    playerCount = num;
}

//size
let menuBoardSize = 0;
function setMenuBoardSize(num:number):void {
    menuBoardSize = num;
}

//difficulty
// 0: easy
// 1: hard
// 2: insane
let menuDifficulty = 0;
function setDifficulty(num:number):void {
    menuDifficulty = num;
}


//actual numbers
let boardSize:number, bombs:number;
boardSize = 2 * playerCount + 3;
bombs = boardSize * boardSize * (menuDifficulty * 0.05 + 0.1);

//board init



//game

//board



//board game cell
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