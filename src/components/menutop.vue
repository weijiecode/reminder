<template>
  <div class="menutop">
    <!-- 搜索 -->
    <el-autocomplete
    value-key="contents"
      :fetch-suggestions="querySearchAsync"
      @select="handleSelect"
      class="inputsearch"
      v-model="state"
      placeholder="请输入内容"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "mymenutop",
  created() {
    const res = this.$http.get("http://wthrcdn.etouch.cn/weather_mini?city=哈尔滨")
    console.log('天气')
    console.log(res)
  },
  mounted() {
     setTimeout(() => {
       this.restaurants = this.toblockdata;
     },500)
  },
  props: ["toblockdata"],
  data() {
    return {
      searchdata: [],
      state: "",
      timeout: null,
      restaurants: [],
    };
  },
  methods: {

    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1500 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.contents.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
.menutop {
  margin-top: 30px;
  margin-right: 30px;
  width: 300px;
  border-radius: 10px;
  float: right;
}
@media (max-width: 750px) {
  .menutop {
    display: none;
  }
}
.menutop ::v-deep .el-autocomplete {
  box-shadow: 2px 15px 29px #d6d6d6, -15px -15px 29px #ffffff;
  margin-left: -140px;
  width: 120%;
  border: white;
  border-radius: 20px;
}
</style>