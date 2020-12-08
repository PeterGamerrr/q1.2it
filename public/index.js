class cell {
    constructor(x, y, bomb) {
        this.claimedBy = 0;
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }
    get getX() {
        return this.x;
    }
    get getY() {
        return this.y;
    }
    move(player, x, y) {
    }
    explode(x, y) {
        //TODO: make explosion
    }
}
cell.colors = [
    [255, 255, 255],
    [255, 255, 255],
    [255, 255, 255],
    [255, 255, 255],
    [255, 255, 255]
];
