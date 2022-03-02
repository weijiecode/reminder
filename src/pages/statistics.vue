<template>
  <div class="statisticsbox">
    <div class="statistics">
      <p class="stap">分类</p>
      <div class="stabox">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.statisticsbox {
  margin-left: 280px;
  height: 100%;
}
.statistics {
  height: calc(100% - 75px);
  margin-top: 75px;
  width: calc(100% - 350px);
  float: left;
}
.stap {
  font-size: 20px;
  font-weight: 600;
}
.stabox {
  min-height: 300px;
  height: calc(100% - 96px);
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
}
</style>