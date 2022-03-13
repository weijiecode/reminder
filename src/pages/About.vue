<template>
  <div class="aboutbox">
    <div class="about">
      <p class="myp">关于</p>
      <div class="msgcontent">
        <img src="../assets/logo2.png" alt="" />
        <p class="title">Version 1.0.0</p>
        <p class="subtitle">
          <span>日暮清单</span>
          是我的第一个多终端同步的应用
        </p>
        <p style="margin-top: -10px" class="subtitle">
          一款以"记"为中心的待办清单产品，后续上线记账、备忘录、课程表......
        </p>
        <p class="subtitle">关于作者</p>
        <div class="user">          
          </el-popover>
          <div class="allphoto" style="display:flex;">
              <el-popover placement="top" title width="200" trigger="hover">
                  <div style="width:200px;height:200px;">
                      <img
                      style="width:100%;height:100%;object-fit: cover;"
                      src="../assets/QRcode/微信.png"
                      alt/>
                    </div>
                    <div style="width:80px;height:80px;" slot="reference">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-weixin"></use>
                        </svg>
                    </div>
                </el-popover>
              <el-popover placement="top" title width="200" trigger="hover">
                  <div style="width:200px;height:200px;">
                      <img
                      style="width:100%;height:100%;object-fit: cover;"
                      src="../assets/QRcode/推特.png"
                      alt/>
                    </div>
                    <div style="width:80px;height:80px;" slot="reference">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-14"></use>
                        </svg>
                    </div>
                </el-popover>
                <el-popover placement="top" title width="200" trigger="hover">
                  <div style="width:200px;height:200px;">
                      <img
                      style="width:100%;height:100%;object-fit: cover;"
                      src="../assets/QRcode/微博.png"
                      alt/>
                    </div>
                    <div style="width:80px;height:80px;" slot="reference">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-weibo"></use>
                        </svg>
                    </div>
                </el-popover>
                <el-popover placement="top" title width="200" trigger="hover">
                  <div style="width:200px;height:200px;">
                      <img
                      style="width:100%;height:100%;object-fit: cover;"
                      src="../assets/QRcode/QQ.png"
                      alt/>
                    </div>
                    <div style="width:80px;height:80px;" slot="reference">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-qq"></use>
                        </svg>
                    </div>
                </el-popover>
          </div>
          <div class="git" style="margin-top: -20px">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-github"></use>
              </svg>
              <el-link href="https://github.com/weijiecode" target="_blank">https://github.com/weijiecode</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.aboutbox {
  height: 100%;
  margin-left: 280px;
}
.about {
  margin-top: -10px;
  height: calc(100% - 95px);
  width: 100%;
  float: left;
}
.msgcontent {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  min-width: 900px;
  min-height: 450px;
  height: calc(100% - 49px);
  width: calc(100% - 30px);
  float: left;
  margin-bottom: 30px;
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
  border-radius: 10px;
}
.msgcontent img {
  margin-top: 50px;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 2px solid #e7e4e4;
}
.myp {
  margin-top: 8px;
  font-size: 20px;
  font-weight: 600;
}
.title {
  font-size: 15px;
  color: #aaa;
}
.subtitle {
  color: rgb(121, 118, 118);
}
.subtitle span {
  color: rgb(34, 33, 33);
}
.user {
  margin-top: 20px;
}
.user .icon {
  cursor: pointer;
  font-size: 25px;
  margin: 0 20px;
}
</style>