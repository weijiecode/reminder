<template>
  <div class="clockbox">
    <div class="clock">
      <p class="clockp">每日打卡</p>
      <!-- 日历区域 -->
      <div class="calendarbox">
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-")[2] }}
              <div class="line">
                <div v-for="item in calendarList" :key="item.index">
                  <span v-if="item.donedatetime == data.day">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-wancheng"></use>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
    <div class="rightbox">
      <!-- 打卡区域 -->
      <p style="margin-top: 0;" class="myp">操作</p>
      <div class="dosuccess">
        <div class="btndo">
          <div v-if="!showall" class="nodo">
            <svg width="150" height="150">
              <circle
                fill="none"
                stroke="#909399"
                stroke-width="10"
                cx="320"
                cy="80"
                r="60"
                class="circle"
                stroke-linecap="round"
                transform="rotate(-90 200 200) "
              />
              <polyline
                fill="none"
                stroke="#909399"
                stroke-width="10"
                points="40,80 70,110 120,60"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tick"
              />
            </svg>
            <h4 style="margin-left: 40px" class="clickh">今日未打卡</h4>
          </div>
          <div v-if="showall" class="yesdo">
            <svg width="150" height="150">
              <circle
                v-if="showall"
                fill="none"
                stroke="#68E534"
                stroke-width="10"
                cx="320"
                cy="80"
                r="60"
                class="circle"
                stroke-linecap="round"
                transform="rotate(-90 200 200) "
              />
              <polyline
                v-if="showall"
                fill="none"
                stroke="#68E534"
                stroke-width="10"
                points="40,80 70,110 120,60"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="tick"
              />
            </svg>
            <h4 v-if="showall" class="clickh">今日打卡已完成</h4>
          </div>
          <el-button type="primary" round @click="btndaily">点击打卡</el-button>
          <el-link style="font-size: 12px" type="info" @click="btnnodaily"
            >修改状态</el-link
          >
        </div>
      </div>
      <p class="myp">打卡详情</p>
      <div class="clockmore">
        <div class="nocreat" v-if="iscreate == 0">
          <p class="clockmorep">未创建打卡任务，点击按钮创建</p>
          <el-tooltip
            style="margin-left: 115px"
            content="创建打卡任务"
            placement="bottom"
            effect="light"
          >
            <el-button
              type="primary"
              @click="isnew = true"
              icon="el-icon-plus"
              circle
            ></el-button>
          </el-tooltip>
        </div>
        <div class="yescreat" v-if="iscreate == 1">
          <svg
            style="float: left; margin: 15px 10px 0 15px; font-size: 25px"
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-a-xiaolianbiaoqing"></use>
          </svg>
          <p class="onep">
            {{ dailyclockdata.content
            }}<span class="onepspan"
              >（坚持天数：{{ dailyclockdata.daytype }}天）</span
            >
          </p>
          <p class="twop">已完成：</p>
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="percentage"
          ></el-progress>
          <el-tooltip content="编辑打卡信息" placement="bottom" effect="light">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="btnchangeclock"
            ></el-button>
          </el-tooltip>

          <el-popconfirm @confirm="deleteclock" title="确定删除该项打卡吗？">
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </el-popconfirm>
        </div>
      </div>
    </div>
    <!-- 创建打卡任务弹窗 -->
    <div class="mask" v-show="isnew">
      <div class="newthing">
        <p class="newthingp">新建打卡任务</p>
        <svg
          style="margin-left: 65px; margin-top: 20px; font-size: 60px"
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-a-xiaolianbiaoqing"></use>
        </svg>
        <el-input
          type="textarea"
          placeholder="每天进步一点点"
          v-model="dailyclockForm.content"
          maxlength="10"
          show-word-limit
        >
        </el-input>
        <div class="menuthing">
          <!-- 坚持天数下拉框 -->
          <p class="dayp">坚持天数</p>
          <el-select
            size="mini"
            v-model="dailyclockForm.daytype"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dayoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="confirmcancel">
            <span class="btncancel" @click="isnew = false">取消</span>
            <span class="btnconfirm" @click="newItemConfirm">确定</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改打卡任务弹窗 -->
    <div class="mask" v-show="isnewchange">
      <div class="newthing">
        <p class="newthingp">新建打卡任务</p>
        <svg
          style="margin-left: 65px; margin-top: 20px; font-size: 60px"
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-a-xiaolianbiaoqing"></use>
        </svg>
        <el-input
          type="textarea"
          placeholder="每天进步一点点"
          v-model="dailyclockchangeForm.content"
          maxlength="10"
          show-word-limit
        >
        </el-input>
        <div class="menuthing">
          <!-- 坚持天数下拉框 -->
          <p class="dayp">坚持天数</p>
          <el-select
            size="mini"
            v-model="dailyclockchangeForm.daytype"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dayoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="confirmcancel">
            <span class="btncancel" @click="isnewchange = false">取消</span>
            <span class="btnconfirm" @click="newItemchangeConfirm">保存</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {datetimes} from '../mixins/mixin'
export default {
  mixins: [datetimes],
  created() {
    // 打卡信息
    this.getclockdata();
    // 打卡天数
    this.getclockdays();
  },
  data() {
    return {
      // 显示打卡完成动画
      showall: false,
      // 是否创建打卡任务
      iscreate: 0,
      // 新建打卡弹框
      isnew: false,
      // 修改打卡弹框
      isnewchange: false,
      // 完成进度
      percentage: 0,
      // 完成打卡的天数
      daylength: 0,
      // 新建打卡表单
      dailyclockForm: {
        content: "",
        daytype: "",
      },
      // 修改打卡表单
      dailyclockchangeForm: {
        content: "",
        daytype: "",
      },
      calendarList: {
        donedatetime: "",
      },
      // 坚持天数选项
      dayoptions: [
        {
          value: "7",
          label: "7天",
        },
        {
          value: "21",
          label: "21天",
        },
        {
          value: "30",
          label: "30天",
        },
        {
          value: "100",
          label: "100天",
        },
        {
          value: "365",
          label: "365天",
        },
        {
          value: "9999",
          label: "永远",
        },
      ],
      // 打卡数据
      dailyclockdata: {
        content: "",
        daytype: "",
        donedatetime: "",
        startdatetime: "",
      },
      // 今日打卡日期
      donedatetime: "",
      // // 今天日期
      // todaydate: "",
      // 是否点击过打卡
      isdone: 0,
    };
  },
  methods: {
    // 点击打卡按钮
    async btndaily() {
      if (this.iscreate == 1 && this.isdone == 0) {
        this.showall = true;
        const { data: res } = await this.$http.post("/clock/doneclock", {
          donedatetime: this.todaydate,
        });
        // console.log('123')
        // console.log(this.todaydate)
        if (res.code == 200) {
          this.isdone = 1;
          this.showall = true;
          // 重新获取所有打卡天数的记录
          this.getclockdays();
        } else {
          this.isdone = 0;
          this.showall = false;
          this.$message.error("今日打卡失败，请重试");
        }
      } else if (this.iscreate == 0) {
        this.$message.error("请先创建打卡任务后再点击");
      } else if (this.isdone == 1) {
        this.$message({
          message: "今天已点击过打卡，请勿重复点击",
          type: "warning",
        });
      }
    },
    // 取消打卡状态
    async btnnodaily() {
      if (this.isdone == 1) {
        const { data: res } = await this.$http.post("/clock/deletedoneclock", {
          donedatetime: this.todaydate,
        });
        if (res.code == 200) {
          // 重新获取所有打卡天数的记录
          this.getclockdays();
          this.$message({
            type: "success",
            message: "修改状态成功",
          });
          this.showall = false;
          this.isdone = 0;
        } else {
          this.$message.error("修改状态失败，请重试");
        }
      } else {
        this.$message.error("当前状态不能修改");
      }
    },
    // 确定提交打卡信息
    async newItemConfirm() {
      if (
        this.dailyclockForm.content == "" ||
        this.dailyclockForm.daytype == ""
      ) {
        this.$message.error("填写正确再提交，请重试");
      } else {
        const { data: res } = await this.$http.post("/clock/insertclock", {
          content: this.dailyclockForm.content,
          daytype: this.dailyclockForm.daytype,
        });
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "添加打卡任务成功",
          });
          this.isnew = false;
          this.iscreate = 1;
          this.getclockdata();
        } else {
          this.$message.error("保存失败，请重试");
          //   this.dailyclockdata.content = "";
          //   this.dailyclockdata.daytype = "";
        }
      }
    },
    // 修改按钮
    btnchangeclock() {
      this.isnewchange = true;
      this.dailyclockchangeForm.content = this.dailyclockdata.content;
      this.dailyclockchangeForm.daytype = this.dailyclockdata.daytype;
    },
    // 修改提交打卡信息
    async newItemchangeConfirm() {
      if (
        this.dailyclockchangeForm.content == "" ||
        this.dailyclockchangeForm.daytype == ""
      ) {
        this.$message.error("填写正确再提交，请重试");
      } else {
        const { data: res } = await this.$http.post("/clock/updateclock", {
          content: this.dailyclockchangeForm.content,
          daytype: this.dailyclockchangeForm.daytype,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "添加打卡任务成功",
          });
          this.getclockdata();
          this.isnewchange = false;
          this.iscreate = 1;
        } else {
          this.$message.error("保存失败，请重试");
        }
      }
    },
    // 获取打卡信息
    async getclockdata() {
      const { data: res } = await this.$http.get("/clock/selectclock");
      // console.log(res);
      if (res.code == 200) {
        this.iscreate = 1;
        this.dailyclockdata = res.data[0];
        // console.log(this.dailyclockdata);
      } else {
        this.iscreate = 0;
      }
    },
    // 获取打卡天数
    async getclockdays() {
      const { data: res } = await this.$http.post("/clock/clockdays", {
        username: localStorage.getItem("username"),
      });
      // console.log("123");
      // console.log(res.data.length);
      // 完成打卡的天数
      this.daylength = res.data.length;
      if (res.code == 200) {
        // 日历显示数据
        this.calendarList = res.data;
        // console.log("天数");
        // console.log(this.daylength);
        // console.log(this.percentage);
        // 循环遍历 是否有今天的日期，来判断今天是否已打卡
        res.data.forEach((item, index) => {
          if (this.todaydate == item.donedatetime) {
            (this.isdone = 1), (this.showall = true);
          }
        });
      } else if (res.code == 201) {
        this.calendarList = "";
      }
    },
    // 删除打卡信息
    async deleteclock() {
      const { data: res } = await this.$http.post("/clock/deleteclock", {
        username: localStorage.getItem("username"),
      });
      this.deleteclockdays();
      if (res.code == 200) {
        this.showall = false;
        this.iscreate = 0;
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
        this.$message.error("删除打卡信息失败，请重试");
      }
    },
    // 删除所有天数记录
    async deleteclockdays() {
      const { data: res } = await this.$http.post("/clock/deleteclockdays", {
        username: localStorage.getItem("username"),
      });
      if (res.code == 200) {
        this.showall = false;
        this.iscreate = 0;
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
      }
    },
  },
  watch: {
    // 监听打卡天数和总共打卡天数，计算完成进度
    daylength(newValue) {
      this.percentage = Math.ceil((newValue / this.dailyclockdata.daytype) * 100);
    },
    "dailyclockdata.daytype"(newValue) {
      this.percentage = Math.ceil((this.daylength / newValue) * 100);
    },
  },
};
</script>

<style scoped>
.clockbox {
  height: 100%;
  margin-left: 280px;
}
.clock {
  margin-top: 65px;
  height: calc(100% - 75px);
  width: calc(100% - 350px);
  float: left;
}
.clockp {
  margin-top: 8px;
  font-size: 20px;
  font-weight: 600;
}
.calendarbox {
  height: calc(100% - 75px);
  min-height: 454px;
}
::v-deep .el-calendar {
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
  height: 100%;
  min-width: 454px;
  float: left;
}
::v-deep .el-calendar__header {
  height: 30px;
}
::v-deep .el-calendar-table thead th {
  padding: 0;
}
::v-deep .el-calendar-table .el-calendar-day {
  height: 58px;
}
.rightbox {
  margin-top: 5px;
  margin-left: 30px;
  width: 270px;
  border-radius: 10px;
  float: left;
  height: calc(100% - 96px);
}
/* 打卡 */
.btndo {
  margin-left: 60px;
}
.myp {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
}
.dosuccess {
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
  height: 260px;
  width: 270px;
  border-radius: 10px;
  background-color: white;
}
.clockmore {
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
  height: 145px;
  width: 270px;
  border-radius: 10px;
  background-color: white;
}
h2 {
  font-family: Helvetica;
  font-size: 36px;
  margin-top: 40px;
  color: #333;
  opacity: 0;
}

/* input[type="checkbox"]:checked ~ h2 {
  animation: 0.6s title ease-in-out;
  animation-delay: 1.2s;
  animation-fill-mode: forwards;
} */
.clickh {
  margin-top: 0;
  margin-left: 25px;
  opacity: 0;
  animation: 0.6s title ease-in-out;
  animation-delay: 1.2s;
  animation-fill-mode: forwards;
}
::v-deep .el-button.is-round {
  margin-left: 30px;
}
.circle {
  stroke-dasharray: 1194;
  stroke-dashoffset: 1194;
}

svg .circle {
  animation: circle 1s ease-in-out;
  animation-fill-mode: forwards;
}

.tick {
  stroke-dasharray: 350;
  stroke-dashoffset: 350;
}

svg .tick {
  animation: tick 0.8s ease-out;
  animation-fill-mode: forwards;
  animation-delay: 0.95s;
}

@keyframes circle {
  from {
    stroke-dashoffset: 1194;
  }
  to {
    stroke-dashoffset: 2388;
  }
}

@keyframes tick {
  from {
    stroke-dashoffset: 350;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes title {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (max-width: 960px) {
  .rightbox {
    display: none;
  }
}
/* 打卡详情 */
.clockmorep {
  padding-top: 40px;
  padding-left: 20px;
  color: #a6a9ad;
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
.menuthing {
  cursor: pointer;
  margin-left: 50px;
}
.newthingp {
  font-size: 20px;
  font-weight: 500;
  margin-left: 30px;
}
.dayp {
  margin-top: 35px;
  margin-left: 20px;
  float: left;
  color: #8d8282;
}
::v-deep .el-select {
  margin-top: 34px;
  margin-left: 10px;
  width: 100px;
}
::v-deep .el-textarea {
  width: 550px;
  margin-left: 50px;
  height: 25px;
  margin-top: 10px;
}
::v-deep .el-textarea__inner {
  font-size: 18px;
  border-radius: 10px;
}
::v-deep .el-tabs--border-card {
  border-radius: 10px;
}
::v-deep .el-textarea__inner {
  margin-top: -35px;
}
.confirmcancel {
  float: right;
  margin-top: 75px;
  margin-right: 75px;
  cursor: pointer;
}
.btnconfirm {
  font-size: 22px;
  color: #5da7f1;
}
.btncancel {
  font-size: 22px;
  margin-right: 50px;
  color: #60686e;
}
.btncancel:hover {
  color: rgb(49, 44, 44);
}
.btnconfirm:hover {
  color: #2888e7;
}
.onep {
  padding-top: 15px;
}
.onepspan {
  font-size: 12px;
  color: #8f8585;
}
.twop {
  float: left;
  font-size: 13px;
  margin-left: 15px;
}
::v-deep .el-progress-bar__inner {
  height: 95%;
}
::v-deep .el-progress-bar__outer {
  width: 180px;
}
::v-deep .el-progress {
  float: left;
  line-height: 2.5;
}
::v-deep .el-link.el-link--info {
  margin-top: 10px;
  margin-left: 10px;
}
::v-deep .el-button--mini.is-circle {
  margin-top: 10px;
  margin-right: 10px;
}
.line .icon {
  font-size: 25px;
  float: right;
}
</style>



