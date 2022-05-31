<template>
  <div class="leftItem">
    <div class="headimage" @click="$router.push('/mycenter')">
      <img v-if="photo != null" :src="photo" alt="" />
      <svg
        v-if="photo == null && sex == 0"
        id="photo"
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-icon-test"></use>
      </svg>
      <svg
        v-if="photo == null && sex == 1"
        id="photo"
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-icon-test2"></use>
      </svg>
      <div class="online"></div>
      <div class="twoline">
        <p class="status" v-if="timestatus == 0">
          上午好&nbsp;<svg
            style="font-size: 20px"
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-a-zaoshangzaochen"></use>
          </svg>
        </p>
        <p class="status" v-if="timestatus == 1">
          下午好&nbsp;
          <svg style="font-size: 20px" class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiawu"></use>
          </svg>
        </p>
        <p class="status" v-if="timestatus == 2">
          晚上好&nbsp;
          <svg style="font-size: 14px" class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-yueliangwanshang"></use>
          </svg>
        </p>
        <p class="nickname">{{ nickname }}</p>
      </div>
    </div>
    <div class="line"></div>
    <p class="menutop">选项</p>
    <div class="menubox">
      <ul class="menuul">
        <router-link to="/home">
          <li :class="{ isclick: $route.path == '/home' }">
            <div :class="{ menuline: $route.path == '/home' }"></div>
            <svg
              :class="{ isclicksvg: $route.path == '/home' }"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-home-full"></use></svg
            >首页
          </li></router-link
        >
        <router-link to="/backlog">
          <li :class="{ isclick: $route.path == '/backlog' }">
            <div :class="{ menuline: $route.path == '/backlog' }"></div>
            <svg
              :class="{ isclicksvg: $route.path == '/backlog' }"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-renwu"></use></svg
            >我的任务
          </li></router-link
        >
        <router-link to="/mycenter">
          <li :class="{ isclick: $route.path == '/mycenter' }">
            <div :class="{ menuline: $route.path == '/mycenter' }"></div>
            <svg
              :class="{ isclicksvg: $route.path == '/mycenter' }"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-gerenzhongxin"></use></svg
            >个人中心
          </li></router-link
        >
        <!-- || $route.path=='/home'  -->
        <router-link to="/view">
          <li :class="{ isclick: $route.path == '/view' }">
            <div :class="{ menuline: $route.path == '/view' }"></div>
            <svg
              :class="{ isclicksvg: $route.path == '/view' }"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-rili2"></use></svg
            >日历视图
          </li></router-link
        >
        <router-link to="/dailyclock">
          <li :class="{ isclick: $route.path == '/dailyclock' }">
            <div :class="{ menuline: $route.path == '/dailyclock' }"></div>
            <svg
              :class="{ isclicksvg: $route.path == '/dailyclock' }"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-dagou"></use></svg
            >每日打卡
          </li></router-link
        >
        <router-link to="/statistics">
          <li :class="{ isclick: $route.path == '/statistics' }">
            <div :class="{ menuline: $route.path == '/statistics' }"></div>
            <svg
              :class="{ isclicksvg: $route.path == '/statistics' }"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-tongjifenxi"></use></svg
            >统计分析
          </li></router-link
        >
      </ul>
    </div>
    <div class="line"></div>
    <p class="menutop">更多</p>
    <div class="morebox">
      <ul class="moreul">
        <router-link to="/app">
          <li :class="{ styli: $route.path == '/app' }">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-app1"></use></svg
            >APP下载
          </li>
        </router-link>
        <router-link to="/feedback">
          <li :class="{ styli: $route.path == '/feedback' }">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wodefankui"></use></svg
            >反馈与建议
          </li></router-link
        >
        <router-link to="/about">
          <li :class="{ styli: $route.path == '/about' }">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guanyu"></use></svg
            >关于
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { datetimes } from "../mixins/mixin";
import pubsub from "pubsub-js";
export default {
  mixins: [datetimes],
  created() {
    const { nickname, photo, sex } = JSON.parse(
      localStorage.getItem("userdata")
    );
    this.nickname = nickname;
    this.photo = photo;
    this.sex = sex;
    if (this.hours >= 6 && this.hours < 12) this.timestatus = 0;
    else if (this.hours >= 12 && this.hours < 19) this.timestatus = 1;
    else this.timestatus = 2;
  },
  mounted() {
    pubsub.subscribe("userdata", (msg, dataObj) => {
      console.log("订阅", dataObj);
      const {nickname,photo,sex} = dataObj;
      this.nickname = nickname;
      this.photo = photo;
      this.sex = sex;
    });
  },
  // watch: {
  //   // 监听个人资料修改保存后同步渲染
  //   "$store.state.nickname"(newvalue) {
  //     this.nickname = newvalue;
  //   },
  //   "$store.state.photo"(newvalue) {
  //     this.photo = newvalue;
  //   },
  //   "$store.state.sex"(newvalue) {
  //     this.sex = newvalue;
  //   },
  // },
  data() {
    return {
      nickname: "",
      photo: "",
      sex: "",
      // 当前时间段
      timestatus: 0,
    };
  },
};
</script>

<style scoped>
/* 1440*700   1370*615*/
a {
  color: rgba(15, 23, 42, 0.8);
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.router-link {
  text-decoration: none;
  color: #fff;
}
.isclick {
  color: #5da7f1;
  height: 32px;
  margin-left: -25px;
  padding-left: 25px;
  width: 170px;
  border-radius: 8px;
  background-color: #ebf4ff;
}
.menuul .icon {
  font-size: 17px;
  color: #9d9d9f;
}
.isclicksvg {
  color: #5da7f1 !important;
}
.leftItem {
  z-index: 2;
  position: fixed;
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
  color: rgba(15, 23, 42, 0.8);
  margin-top: 30px;
  margin-left: 30px;
  width: 220px;
  height: calc(100% - 60px);
  background-color: white;
  border-radius: 10px;
  float: left;
  min-height: 560px;
}
.headimage {
  cursor: pointer;
  margin-left: 30px;
  margin-top: 30px;
  border-radius: 50%;
}
.headimage img {
  float: left;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgb(237 234 234);
}
#photo {
  margin-right: 0;
  float: left;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgb(237 234 234);
}
.twoline {
  float: left;
  margin-left: 25px;
}
.status {
  color: #89898d;
  cursor: default;
  font-size: 11px;
}
.nickname {
  color: #464647;
  margin-top: -10px;
  font-size: 14px;
}
.nickname:hover {
  color: black;
}
.line {
  border-top: 1px solid rgba(15, 23, 42, 0.4);
  width: 170px;
  margin: 0 auto;
  display: flex;
}
.icon {
  margin-right: 20px;
}
.menubox {
  font-size: 14px;
  width: 220px;
  /* background-color: darkgray; */
  border-radius: 20px;
}
.morebox {
  font-size: 13px;
  margin: 0 auto;
  width: 170px;
  padding: 2px 0;
  background-color: rgb(240, 239, 238);
  border-radius: 8px;
}
.menutop {
  cursor: default;
  font-size: 12px;
  margin-left: 25px;
}
.menuline {
  float: left;
  border-radius: 5px;
  height: 25px;
  margin-top: 2px;
  margin-left: -40px;
  background: #5da7f1;
  border-left: 4px solid #5da7f1;
}

ul li {
  width: 170px;
  cursor: pointer;
  line-height: 38px;
  list-style: none;
}
@media (max-height: 680px) {
  ul li {
    line-height: 32px;
  }
}
ul li:hover .icon {
  color: #5da7f1;
}
.menuul li:hover {
  color: #5da7f1;
  margin-left: -25px;
  padding-left: 25px;
  width: 170px;
  border-radius: 8px;
}
.online {
  border: 1px solid white;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #8bcf70;
  margin-top: 40px;
  margin-left: -10px;
  float: left;
}
.styli {
  color: #5da7f1;
}
</style>