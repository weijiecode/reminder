<template>
  <div class="classificationbox">
    <div class="classification">
      <p class="classp">分类</p>
      <div class="classbox">123</div>
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
.classificationbox {
  margin-left: 280px;
  height: 100%;
}
.classification {
  height: calc(100% - 75px);
  margin-top: 75px;
  width: calc(100% - 350px);
  float: left;
}
.classp {
  font-size: 20px;
  font-weight: 600;
}
.classbox {
  min-height: 300px;
  height: calc(100% - 96px);
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
}
</style>