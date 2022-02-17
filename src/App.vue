<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/test">Test</router-link>
      <router-link to="/login">login</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style scoped>
/* 把我们所有标签的内外边距清零 */
* {
    margin: 0;
    padding: 0;
    /* CSS3 盒子模型 */
    box-sizing: border-box;
  }

</style>
