import Vue from 'vue';

const state = {
    grid: null,
    gridDimensions: [null, null],
    mines: null,
    won: null,
    lost: null,
    gameEnded: null,
    clearedAmount: null,
    clearedCells: []
};

const getters = {
    getGrid(state) {
        return state.grid
    },
    getGridDimensions(state) {
        return state.gridDimensions
    },
    getMines(state) {
        return state.mines
    },
    getLost(state) {
        return state.lost
    },
    getWon(state) {
        return state.won
    },
    getGameEnded(state) {
        return state.gameEnded
    },
    getCleared(state) {
        return {
            clearedAmount: state.clearedAmount,
            clearedCells: state.clearedCells
        }
    }
};

const mutations = {
    START_NEW_GAME(state, payload) {
        Vue.set(state, "grid", payload.grid)
        Vue.set(state, "gridDimensions", payload.gridDimensions)
        Vue.set(state, "mines", payload.mineCount)
        Vue.set(state, "lost", false)
        Vue.set(state, "won", false)
        Vue.set(state, "gameEnded", false)
        Vue.set(state, "clearedAmount", 0)
        Vue.set(state, "clearedCells", [])
    },
    WON_GAME(state, payload) {
        Vue.set(state, "won", true)
        Vue.set(state, "gameEnded", true)
    },
    LOST_GAME(state, payload) {
        Vue.set(state.grid[payload.bomb.x], payload.bomb.y, payload.bomb)
        Vue.set(state, "lost", true)
        Vue.set(state, "gameEnded", true)
    },
    UPDATE_GRID(state, payload) {
        Vue.set(state, "grid", payload.grid)
    },
    UPDATE_CELL(state, payload) {
        Vue.set(state.grid[payload.cell.x], payload.cell.y, payload.cell)

    },
    UPDATE_CLEARED(state, payload) {
        Vue.set(state, 'clearedAmount', payload.clearedAmount)
        Vue.set(state, 'clearedCells', payload.clearedCells)
        console.log(payload.clearedAmount, 'cleared')
    }
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations
};

export default module;