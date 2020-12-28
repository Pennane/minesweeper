import Vue from 'vue';

const state = {
    grid: null,
    gridDimensions: [null, null],
    mines: null,
    lost: false
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
    lost(state) {
        return state.lost
    }
};

const mutations = {
    START_NEW_GAME(state, payload) {
        Vue.set(state, "grid", payload.grid)
        Vue.set(state, "gridDimensions", payload.gridDimensions)
        Vue.set(state, "mines", payload.mineCount)
        Vue.set(state, "lost", false)
    },
    END_GAME(state, payload) {
        Vue.set(state.grid[payload.bomb.x], payload.bomb.y, payload.bomb)
        Vue.set(state, "lost", true)
    },
    UPDATE_GRID(state, payload) {
        Vue.set(state, "grid", payload.grid)
    },
    UPDATE_CELL(state, payload) {
        Vue.set(state.grid[payload.cell.x], payload.cell.y, payload.cell)

    }
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations
};

export default module;