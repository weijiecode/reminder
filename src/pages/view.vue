<template>
  <div class="viewbox">
    <div class="view">
      <p class="viewp">日历视图</p>
      <div class="calendarbox">
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">            
            <div :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-")[2] }}
              <div class="line">
              <div v-for="item in calendarList" :key="item.index">
                <span
                  v-if="item.datetime == data.day"
                >
                  <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.classvalue"></use>
            </svg>
                  <span>{{ item.contents }}
                    <svg v-if="item.done == 0" class="icon" aria-hidden="true">
                      <use xlink:href="#icon-extension_not_completed"></use></svg
                  >
                  <svg v-if="item.done == 1" class="icon" aria-hidden="true">
                      <use xlink:href="#icon-wei-"></use></svg
                  ></span>
                </span>
              </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getallbacklog();
  },
  data() {
    return {
      calendarList: [
        {
          contents: "",
          datetime: "",
          done: "",
          classvalue: "",
        },
      ],
    };
  },
  methods: {
    async getallbacklog() {
      const { data: res } = await this.$http.get("/backlog/alluserdata");
      if (res.code == 200) {
        this.calendarList = res.data;
      }
      this.calendarList.forEach((item, index) => {
        // console.log(item.datetime)
        this.calendarList[index].datetime = item.datetime.split(" ")[0];
      });
      // console.log(this.calendarList);
    },
  },
};
</script>

<style scoped>
.is-selected {
  color: #1989fa;
}
.line {
  color: rgb(99, 104, 104);
  font-size: 13px;
  height: 56px;
  overflow: auto;
}
::v-deep .el-calendar {
  box-shadow: 2px 15px 29px #d6d6d6, -15px -15px 29px #ffffff;
  border-radius: 10px;
  margin-bottom: 30px;
}
.viewbox {
  margin-left: 280px;
}
.view {
  width: calc(100% - 30px);
  float: left;
}
.viewp {
  font-size: 20px;
  font-weight: 600;
}
</style>