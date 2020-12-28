
import Vue from 'vue';
import store from '@/store'

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function randomIntegerFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function defaultMineCount(dimensions) {
    return parseInt(dimensions[0] * dimensions[1] * 0.17)
}

function flag(val, x, y) {
    if (store.getters['game/lost']) return

    let grid = { ...store.getters['game/getGrid'] };
    let _cell = grid[x][y]

    if (_cell.open) return;

    let cell = {
        open: _cell.open,
        flag: val,
        adjacentMines: _cell.adjacentMines,
        hasMine: _cell.hasMine,
        x: _cell.x,
        y: _cell.y,
        exploded: _cell.exploded
    }

    store.commit("game/UPDATE_CELL", {
        cell
    })
}

function endGame(x, y) {
    let grid = store.getters['game/getGrid'];
    let _cell = grid[x][y]
    let bomb = {
        open: true,
        flag: false,
        adjacentMines: _cell.adjacentMines,
        hasMine: true,
        x: _cell.x,
        y: _cell.y,
        exploded: true
    }

    store.commit("game/END_GAME", {
        bomb: bomb
    })

}

function clearArea(x, y) {
    if (store.getters['game/lost']) return

    let gridDimensions = store.getters['game/getGridDimensions'];
    let grid = { ...store.getters['game/getGrid'] };
    let clearedCells = []
    let __cell = grid[x][y]
    if (__cell.open) return;

    if (__cell.hasMine) return endGame(x, y);

    function recursiveClear(x, y) {
        for (let nx = x - 1; nx <= x + 1; nx++) {
            for (let ny = y - 1; ny <= y + 1; ny++) {

                let id = nx + '' + ny;

                if (clearedCells.indexOf(id) !== -1) {
                    continue
                }

                if (ny < 0 || nx < 0) {
                    continue
                }
                if (nx >= gridDimensions[0] || ny >= gridDimensions[1]) {
                    continue
                }

                let _cell = grid[nx][ny]

                if (_cell.hasMine) {
                    continue
                }

                let cell = {
                    open: true,
                    flag: false,
                    adjacentMines: _cell.adjacentMines,
                    hasMine: _cell.hasMine,
                    x: _cell.x,
                    y: _cell.y,
                    exploded: _cell.exploded
                }

                clearedCells.push(id)

                if (_cell.adjacentMines === 0) recursiveClear(nx, ny);

                store.commit("game/UPDATE_CELL", {
                    cell
                })

            }
        }
    }

    recursiveClear(x, y)

}

function calculateAdjacentMines(grid, w, h, x, y) {
    let mines = 0;
    for (let nx = x - 1; nx <= x + 1; nx++) {
        for (let ny = y - 1; ny <= y + 1; ny++) {

            if (ny < 0 || nx < 0) {
                continue
            }
            if (nx >= w || ny >= h) {
                continue
            }
            if (nx === x && ny === y) {
                continue
            }

            let cell = grid[nx][ny]
            if (cell.hasMine) mines++;
        }
    }
    return mines
}

const newGame = (options = {}) => {

    let gridDimensions = options.gridDimensions || [9, 9];
    let mineCount = options.mineCount || defaultMineCount(gridDimensions)

    let grid = createArray(gridDimensions[0], gridDimensions[1]);
    for (let x = 0; x < gridDimensions[0]; x++) {
        for (let y = 0; y < gridDimensions[1]; y++) {
            grid[x][y] = {
                open: false,
                flag: false,
                adjacentMines: null,
                hasMine: false,
                x: x,
                y: y,
                exploded: false
            }
        }
    }

    for (let i = 0; i < mineCount; i++) {
        let cell;
        do {
            let _x = randomIntegerFromRange(0, gridDimensions[0] - 1)
            let _y = randomIntegerFromRange(0, gridDimensions[1] - 1)
            cell = grid[_x][_y]
        } while (cell.hasMine)
        cell.hasMine = true
    }

    grid.forEach((column, x) => {
        column.forEach((cell, y) => {
            cell.adjacentMines = calculateAdjacentMines(grid, gridDimensions[0], gridDimensions[1], x, y)
        })
    })

    store.commit("game/START_NEW_GAME", {
        grid,
        gridDimensions,
        mineCount
    })
}

export default {
    newGame,
    clearArea,
    flag
}