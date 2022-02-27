<template>
  <div class="clockbox">
    <div class="clock">
      <p class="clockp">打卡</p>
      <!-- 日历区域 -->
      <div class="calendarbox">
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-")[2] }}
              <div class="line">
                <div v-for="item in calendarList" :key="item.index">
                  <span v-if="item.datetime == data.day">
                    <svg class="icon" aria-hidden="true">
                      <use :xlink:href="item.classvalue"></use>
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
      <p class="myp">操作</p>
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
          <el-tooltip content="修改状态" placement="bottom" effect="light">
            <el-button
              type="info"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="btnnodaily"
            ></el-button>
          </el-tooltip>
        </div>
      </div>
      <p class="myp">打卡详情</p>
      <div class="clockmore">
        <div class="nocreat">
          <p class="clockmorep">未创建打卡任务，点击按钮创建</p>
          <el-tooltip
            style="margin-left: 115px"
            content="创建打卡任务"
            placement="bottom"
            effect="light"
          >
            <el-button
              type="primary"
              @click="newItem"
              icon="el-icon-plus"
              circle
            ></el-button>
          </el-tooltip>
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
          <el-select size="mini" v-model="dailyclockForm.daytype" placeholder="请选择">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 显示打卡完成动画
      showall: false,
      // 是否创建打卡任务
      iscreate: 0,
      // 新建待办弹框
      isnew: false,
      dailyclockForm: {
        content: "",
        itemtype: "",
      },
      calendarList: {
        datetime: "",
        daytype: ""
      },
      // 坚持天数选项
      dayoptions: [{
          value: '7',
          label: '7天'
        }, {
          value: '21',
          label: '21天'
        }, {
          value: '30',
          label: '30天'
        }, {
          value: '100',
          label: '100天'
        }, {
          value: '365',
          label: '365天'
        }, {
          value: '9999',
          label: '永远'
        }],
    };
  },
  methods: {
    btndaily() {
      if (this.iscreate == 1) {
        this.showall = true;
      } else {
        this.$message.error("请先创建打卡任务后再点击");
      }
    },
    btnnodaily() {
      this.showall = false;
    },
    newItem() {
      this.isnew = true;
    },
    // 确定
    newItemConfirm() {},
  },
};
</script>

<style scoped>
.clockbox {
  margin-left: 280px;
}
.clock {
  margin-top: 75px;
  width: calc(100% - 350px);
  float: left;
}
.clockp {
  font-size: 20px;
  font-weight: 600;
}
::v-deep .el-calendar {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  border-radius: 10px;
  margin-bottom: 20px;
  min-width: 330px;
  float: left;
}
::v-deep .el-calendar__header {
  height: 15px;
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
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  height: 245px;
  width: 270px;
  border-radius: 10px;
  background-color: white;
}
.clockmore {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  height: 150px;
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
</style>