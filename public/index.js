var cell = /** @class */ (function () {
    function cell(x, y, bomb) {
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }
    Object.defineProperty(cell.prototype, "getX", {
        get: function () {
            return this.x;
        },
        enumerable: true,
        configurable: true
    });
    return cell;
}());
