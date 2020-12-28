<template>
  <div
    :class="{
      cell: true,
      opened: opened,
      flagged: showFlag,
      exploded: exploded,
      lost: lost && hasMine,
    }"
    @click.prevent="open()"
    @click.right.prevent="flag()"
  >
    <div class="cell-content" v-if="opened || (lost && hasMine)">
      <div v-if="hasMine" class="mine"></div>
      <div v-else :class="'adjacent-' + adjacentMines">
        {{ adjacentMines }}
      </div>
    </div>
  </div>
</template>

<script>
import logic from "@/gamelogic";

export default {
  name: "Cell",
  data: function() {
    return {};
  },
  props: {
    adjacentMines: {
      type: Number,
    },
    hasMine: {
      type: Boolean,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  methods: {
    open() {
      if (this.flagged || this.opened) return;

      logic.clearArea(this.x, this.y);
    },
    flag() {
      if (this.opened) return;
      logic.flag(!this.flagged, this.x, this.y);
    },
  },
  computed: {
    opened() {
      let _grid = this.$store.getters["game/getGrid"];
      let _cell = _grid[this.x][this.y];
      return _cell.open;
    },
    flagged() {
      let _grid = this.$store.getters["game/getGrid"];
      let _cell = _grid[this.x][this.y];
      return _cell.flag;
    },
    exploded() {
      let _grid = this.$store.getters["game/getGrid"];
      let _cell = _grid[this.x][this.y];
      return _cell.exploded;
    },
    lost() {
      return this.$store.getters["game/getLost"];
    },
    lost() {
      return this.$store.getters["game/getWon"];
    },
    showFlag() {
      let mineAndLost = this.hasMine && this.lost;
      return this.flagged && !mineAndLost;
    },
  },
};
</script>

<style scoped>
.cell {
  font-size: 1.2em;
  font-weight: 700;
  color: #767676;
  width: 39px;
  height: 39px;
  background: #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 6px outset #e9e9e9;
  box-sizing: border-box;
}

.cell-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
}

.opened,
.lost {
  border: none;
  background: #c1bfc0;
  border-bottom: 2px solid #8b898a;
  border-right: 2px solid #8b898a;
}

.mine {
  background-image: url("~@/assets/bomb.png");
  background-repeat: no-repeat;
  background-size: 75%;
  background-position: center;
  width: 100%;
  height: 100%;
}

.flagged {
  background-image: url("~@/assets/flag.png");
  background-repeat: no-repeat;
  background-size: 75%;
  background-position: center;
}

.exploded {
  background: red;
}

.lost .cell {
}

.adjacent-0 {
  display: none;
}

.adjacent-1 {
  color: #1101fe;
}

.adjacent-2 {
  color: #057f04;
}

.adjacent-3 {
  color: #fe0202;
}

.adjacent-4 {
  color: #040080;
}

.adjacent-5 {
  color: #820104;
}

.adjacent-6 {
  color: #038081;
}

.adjacent-7 {
  color: #000000;
}

.adjacent-8 {
  color: #808080;
}

@media screen and (max-width: 600px) {
  .cell {
    width: 28px;
    height: 28px;
    font-size: 0.9em;
  }
}
</style>
