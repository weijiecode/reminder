<template>
  <div class="menutop">
    <!-- 搜索 -->
    <el-input
      class="inputsearch"
      v-model="inputsearch"
      placeholder="请输入内容"
    ></el-input>
  </div>
</template>

<script>
export default {
    data() {
        return {
            inputsearch: ''
        }
    }
}
</script>

<style scoped>
.menutop {
  margin-top: 30px;
  margin-right: 30px;
  width: 300px;
  border-radius: 10px;
  /* background-color: white; */
  position: fixed;
  right: 0;
}
@media (max-width:750px) {
  .menutop {
    display: none;
  }
}
.menutop ::v-deep .el-input__inner {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  margin-left: -140px;
  width: 130%;
  border: white;
  border-radius: 20px;
}
</style>