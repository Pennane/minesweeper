<template>
  <div class="home">
    <h1>Minesweeper og style</h1>
    <Minesweeper />
  </div>
</template>

<script>
// @ is an alias to /src
import Minesweeper from "@/components/Minesweeper.vue";

export default {
  name: "home",
  components: {
    Minesweeper,
  },
};
</script>
