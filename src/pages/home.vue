<template>
  <div class="home">
    <Menu></Menu>
    <Menutop :toblockdata="blockdata"></Menutop>
    <div class="homebox" v-if="$route.path == '/home'">
      <div class="homecontent">
        <i @click="reload()" class="el-icon-refresh-right" style=""></i>
        <div class="contentcenter">
          <p class="onep">
            欢迎您，{{ username }}&nbsp;&nbsp;
            <svg style="font-size: 30px" class="icon" aria-hidden="true">
              <use xlink:href="#icon-ziyuan"></use>
            </svg>
          </p>
          <p class="twop">以下是你当前的任务统计数据</p>
          <div class="block-num" style="background-color: #6f9ef6">
            <p class="blockp">今日待完成</p>
            <p class="blockpp">
              {{ todaynodone }}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gf-list6"></use>
              </svg>
            </p>
          </div>
          <div class="block-num" style="background-color: #fa8e8c">
            <p class="blockp">超期未完成</p>
            <p class="blockpp">
              {{ overnodone }}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyingchaoshijiankong"></use>
              </svg>
            </p>
          </div>
          <div class="block-num" style="background-color: #98de6e">
            <p class="blockp">总待完成</p>
            <p class="blockpp">
              {{ allblock }}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gf-list4"></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "../components/menu.vue";
import Menutop from "../components/menutop.vue";
import { datetimes } from "../mixins/mixin";
export default {
  created() {
    this.username = this.$store.state.nickname;
    this.getseacherdata();
  },
  mixins: [datetimes],
  data() {
    return {
      username: "",
      // 所有待办数据
      blockdata: {},
      // 今日待完成数
      todaynodone: "",
      // 超期未完成数
      overnodone: "",
      // 总待办数
      allblock: 0,
    };
  },
  components: {
    Menu,
    Menutop,
  },
  methods: {
    async getseacherdata() {
      const { data: res } = await this.$http.get("/backlog/selectbacklog");
      if (res.code == 200) {
        this.blockdata = res.data;
        this.allblock = res.data.length;
        this.todaynodone = res.data.filter((item) => {
          return (
            this.todaydate == item.datetime.split(" ")[0] && item.done == 0
          );
        }).length;
        this.overnodone = res.data.filter((item) => {
          return this.todaydate > item.datetime.split(" ")[0] && item.done == 0;
        }).length;
      } else {
        this.$message.error("获取搜索数据失败，请重试");
      }
      // console.log(this.blockdata);
    },
    reload() {
      window.location.reload()
    }
  },
};
</script>

<style scoped>
.home {
  background-color: #f1f2f6;
  width: 100%;
  height: 100%;
}
.homebox {
  height: 100%;
  margin-left: 280px;
}
.homecontent {
  min-width: 900px;
  min-height: 450px;
  margin-top: 20px;
  background-color: white;
  height: calc(100% - 120px);
  width: calc(100% - 30px);
  float: left;
  box-shadow: 2px 15px 29px #d6d6d6, -15px -15px 29px #ffffff;
  border-radius: 10px;
  margin-bottom: 30px;
}
.contentcenter {
  margin-top: 10%;
  margin-left: 20%;
}
.onep {
  font-size: 24px;
  font-weight: 600;
}
.twop {
  color: #888;
  font-size: 13px;
  margin-top: 18px;
}
.block-num {
  float: left;
  width: 180px;
  height: 90px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 24px;
}
.block-num:hover {
  box-shadow: 0 0 10px #ccc;
}
.blockp {
  margin-left: 20px;
  color: hsla(0, 0%, 100%, 0.6);
  font-size: 12px;
}
.blockpp {
  margin-top: -5px;
  margin-left: 20px;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
}
.blockpp .icon {
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 20px;
  float: right;
  margin-right: 20px;
  margin-top: 15px;
}
.el-icon-refresh-right {
  float: right;
  margin-right: 50px;
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
}
</style>