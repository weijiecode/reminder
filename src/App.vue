<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    //解决刷新页面vux中state数据失效
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("dataStore", JSON.stringify(this.$store.state));
    });
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("dataStore") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(localStorage.getItem("dataStore"))
        )
      );
  },
};
</script>


<style scoped>
/* 把我们所有标签的内外边距清零 */
* {
  margin: 0;
  padding: 0;
  /* CSS3 盒子模型 */
  box-sizing: border-box;
}
</style>
