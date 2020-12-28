import Vue from "vue";
import Vuex from "vuex";

import game from './modules/game';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    game
  },
  strict: debug
});