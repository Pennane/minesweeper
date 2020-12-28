<template>
  <div class="minesweeper">
    <div v-show="lost" class="lostMessage">
      <span>¯\_(ツ)_/¯</span>
      <button @click="start()">play again</button>
    </div>
    <div v-if="loaded" class="wrapper">
      <div v-for="(row, x) in gridDimensions[0]" class="row">
        <div v-for="(colum, y) in gridDimensions[1]" class="column">
          <Cell
            :open="false"
            :flagged="false"
            :adjacentMines="grid[x][y].adjacentMines"
            :hasMine="grid[x][y].hasMine"
            :x="x"
            :y="y"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logic from "@/gamelogic";
import Cell from "@/components/Cell.vue";

export default {
  name: "Minesweeper",
  data: function() {
    return {
      grid: {},
      loaded: false,
    };
  },
  components: {
    Cell,
  },
  computed: {
    gridDimensions() {
      return this.$store.getters["game/getGridDimensions"];
    },
    mines() {
      return this.$store.getters["game/getMines"];
    },
    lost() {
      return this.$store.getters["game/lost"];
    },
  },
  methods: {
    start() {
      logic.newGame({
        gridDimensions: [20, 20],
        mineCount: 50,
      });
    },
  },
  created() {
    this.start();
    this.$store.watch(
      (state, getters) => getters["game/getGrid"],
      (newValue, oldValue) => {
        this.grid = newValue;
      }
    );
    this.grid = this.$store.getters["game/getGrid"];
    this.loaded = true;
  },
};
</script>

<style scoped>
.wrapper,
.row,
.column {
  display: flex;
}

.minesweeper {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.wrapper {
  flex-direction: row;
  border-left: 2px solid #868686;
  border-top: 2px solid #868686;
}

.row {
  flex-direction: column;
}

.column {
  flex-direction: row;
}

.lostMessage {
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.lostMessage span {
  font-size: 17vw;
  max-width: 100%;
  font-weight: 700;
  letter-spacing: -2px;
  mix-blend-mode: exclusion;
  color: #ffea00;
  pointer-events: none;
}

.lostMessage button {
  -webkit-appearance: none;
  text-decoration: none;
  padding: 0.8em 1.5em;
  background: linear-gradient(90deg, #eade2a, #fed748);
  border-radius: 1.3em;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  -webkit-box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.3);
  min-width: 75px;
  text-align: center;
  display: block;
  white-space: nowrap;
  font-size: 1.4rem;
  border: none;
}

.lostMessage button:hover {
  filter: brightness(0.9);
}

.lostMessage button:active {
  transform: translateY(2px);
  filter: saturate(110%) brightness(0.7);
}
</style>
