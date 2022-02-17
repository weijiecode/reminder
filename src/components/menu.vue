<template>
  <div class="leftItem">
    <div class="headimage">
      <img src="../assets/test.jpg" alt="" />
      <div class="twoline">
        <p class="status">
          早上好&nbsp;<svg
            style="font-size: 20px"
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-a-zaoshangzaochen"></use>
          </svg>
        </p>
        <p class="nickname">你吃晚饭了吗</p>
      </div>
    </div>
    <div class="line"></div>
    <p class="menutop">选项</p>
    <div class="menubox">
      <ul class="menuul">
        <router-link to="/backlog">
          <li :class="{ isclick: isactive == 0 }" @click="isactive = 0">
            <div :class="{ menuline: isactive == 0 }"></div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-woderenwu"></use></svg
            >我的任务
          </li></router-link
        >
        <router-link to="/mycenter">
          <li :class="{ isclick: isactive == 1 }" @click="isactive = 1">
            <div :class="{ menuline: isactive == 1 }"></div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-iconfuzhi"></use></svg
            >个人中心
          </li></router-link
        >
        <router-link to="">
          <li :class="{ isclick: isactive == 2 }" @click="isactive = 2">
            <div :class="{ menuline: isactive == 2 }"></div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-rili"></use></svg
            >日历视图
          </li></router-link
        >
        <router-link to="">
          <li :class="{ isclick: isactive == 3 }" @click="isactive = 3">
            <div :class="{ menuline: isactive == 3 }"></div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-daqia"></use></svg
            >打卡
          </li></router-link
        >
        <router-link to="">
          <li :class="{ isclick: isactive == 4 }" @click="isactive = 4">
            <div :class="{ menuline: isactive == 4 }"></div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenlei"></use></svg
            >分类
          </li></router-link
        >
        <router-link to="">
          <li :class="{ isclick: isactive == 5 }" @click="isactive = 5">
            <div :class="{ menuline: isactive == 5 }"></div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tongji"></use></svg
            >统计
          </li></router-link
        >
      </ul>
    </div>
    <div class="line"></div>
    <p class="menutop">更多</p>
    <div class="morebox">
      <ul class="moreul">
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-app1"></use></svg
          >APP下载
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wodefankui"></use></svg
          >反馈与建议
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanyu"></use></svg
          >关于
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shezhi"></use></svg
          >设置
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否被触发，默认首页菜单被触发
      isactive: 0,
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
  margin-left: -25px;
  padding-left: 25px;
  width: 170px;
  border-radius: 8px;
  background-color: #ebf4ff;
}
.leftItem {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  color: rgba(15, 23, 42, 0.8);
  margin-top: 30px;
  margin-left: 30px;
  width: 220px;
  height: 92%;
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
  box-shadow: 0 0 0 3px rgb(214, 211, 211);
}
.twoline {
  float: left;
  margin-top: -10px;
  margin-left: 25px;
}
.status {
  color: #69696c;
  cursor: default;
  font-size: 14px;
}
.nickname {
  color: #464647;
  margin-top: -10px;
  font-size: 15px;
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
  font-size: 14px;
  margin-left: 25px;
}
.menuline {
  float: left;
  border-radius: 5px;
  height: 35px;
  margin-left: -40px;
  background: #5da7f1;
  border-left: 4px solid #5da7f1;
}
ul li:hover > div {
  float: left;
  border-radius: 5px;
  height: 35px;
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
    line-height: 30px;
  }
}
ul li:hover .icon {
  color: #5da7f1;
}
.menuul li:hover {
  margin-left: -25px;
  padding-left: 25px;
  width: 170px;
  border-radius: 8px;
  background-color: #ebf4ff;
}
</style>