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
    <div class="mbox">
      <!-- 消息通知 -->
      <svg
        style="float: left"
        @click="blockmessage"
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-tongzhi"></use>
      </svg>
      <div class="redradius"></div>
      <!-- 退出 -->
      <el-tooltip content="安全退出" placement="bottom" effect="light">
        <svg style="float: right" @click="exit" class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuichu"></use>
        </svg>
      </el-tooltip>
    </div>
    <!-- 待办详情弹窗 -->
    <div class="mask" v-show="isshow">
      <div class="newthing">
        <p class="newthingp">待办详情</p>
        <p class="contents">
          待办内容：<span class="onecontents">{{ backlogForm.contents }}</span>
        </p>
        <p class="contents">
          时间日期：<span class="onecontents">{{ backlogForm.datetime }}</span>
        </p>
        <p class="contents">
          当前类别：
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="backlogForm.classvalue"></use></svg
          >&nbsp;&nbsp;
          <span class="onecontents">{{ backlogForm.colorclass }}</span>
        </p>
        <p class="contents">
          是否完成：<span class="onecontents">{{ backlogForm.done }}</span>
        </p>

        <div class="confirmcancel">
          <span class="btnconfirm" @click="isshow = false">关闭</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mymenutop",
  created() {},
  mounted() {},
  data() {
    return {
      state: "",
      timeout: null,
      restaurants: [],
      // 待办详情
      isshow: false,
      // 待办数据
      backlogForm: {
        contents: "",
        datetime: "",
        classvalue: "",
        colorclass: "",
        done: "",
      },
    };
  },
  methods: {
    async getseacherdata() {
      const { data: res } = await this.$http.get("/backlog/selectbacklog");
      if (res.code == 200) {
        this.restaurants = res.data;
      } else {
        this.$message.error("获取搜索数据失败，请重试");
      }
    },
    querySearchAsync(queryString, cb) {
      this.getseacherdata().then(() => {
        var restaurants = this.restaurants;
        var results = queryString
          ? restaurants.filter(this.createStateFilter(queryString))
          : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1500 * Math.random());
      });
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.contents.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.isshow = true;
      console.log(item);
      this.backlogForm.contents = item.contents;
      this.backlogForm.datetime = item.datetime;
      this.backlogForm.classvalue = item.classvalue;
      if (item.colorbg == "#5da7f1") this.backlogForm.colorclass = "生活";
      else if (item.colorbg == "#d81e06") this.backlogForm.colorclass = "工作";
      else if (item.colorbg == "#82529d") this.backlogForm.colorclass = "学习";
      else if (item.colorbg == "#f36372") this.backlogForm.colorclass = "健康";
      else if (item.colorbg == "#2aa515") this.backlogForm.colorclass = "社交";
      else if (item.colorbg == "#e0620d") this.backlogForm.colorclass = "其它";
      if (item.done == 0) this.backlogForm.done = "未完成";
      else if (item.done == 1) this.backlogForm.done = "已完成";
    },
    // 退出
    exit() {
      this.$confirm("此操作将退出账号，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.commit("del_token");
          localStorage.removeItem("dataStore");
          this.$notify.info({
            title: "提示",
            message: "账号已安全退出",
          });
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    blockmessage() {},
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
  margin-left: -180px;
  width: 120%;
  border: white;
  border-radius: 20px;
}
.mask {
  z-index: 99;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.newthing {
  z-index: 100;
  width: 800px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.newthingp {
  font-size: 20px;
  font-weight: 500;
  margin-left: 30px;
}
.confirmcancel {
  color: rgba(15, 23, 42, 0.8);
  float: right;
  font-size: 20px;
  margin-right: 75px;
  cursor: pointer;
}
.contents {
  margin-left: 70px;
  font-size: 18px;
  color: rgb(128 137 157 / 80%);
}
.onecontents {
  font-size: 16px;
  color: rgba(15, 23, 42, 0.8);
}
.menutop .icon {
  font-size: 20px;
  cursor: pointer;
}
.redradius {
  float: left;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 100%;
}
.mbox {
  width: 70px;
  float: right;
  margin-top: 10px;
  margin-right: 15px;
}
/* 弹框bug */
::v-deep .focusing {
  display: none;
}
</style>