<template>
  <div class="backlog">
    <div class="centerleft">
      <div class="centerItem">
        <p class="myp">我的待办</p>
        <el-tooltip content="新建待办" placement="bottom" effect="light">
          <el-button
            type="primary"
            @click="newItem"
            icon="el-icon-plus"
            circle
          ></el-button>
        </el-tooltip>
        <!-- 待办列表视图 -->
        <el-tabs type="border-card">
          <el-tab-pane v-loading.lock="isloading">
            <span slot="label"
              ><i class="el-icon-document-checked"></i> 今日</span
            >
            <el-empty
              description="暂无待办"
              v-if="todolist.length == 0 && todolistdone.length == 0"
            ></el-empty>
            <el-collapse
              v-if="todolist.length != 0 || todolistdone.length != 0"
              v-model="istodolist"
            >
              <el-collapse-item title="今日" name="1">
                <div
                  v-for="(todoitem, index) in todolist"
                  :key="index"
                  class="oneitem"
                >
                  <div
                    class="leftclass"
                    :style="{ backgroundColor: todoitem.colorbg }"
                  ></div>
                  <el-button circle @click="todo(todoitem.id)"></el-button>
                  <div class="pall">
                    <p class="pcontent">
                      {{ todoitem.contents }}
                    </p>
                    <p class="pdatetime">{{ todoitem.datetime }}</p>
                  </div>
                  <div class="allbtn">
                    <svg
                      @click="todochange(todoitem)"
                      class="icon"
                      aria-hidden="true"
                    >
                      <use xlink:href="#icon-xiugai"></use>
                    </svg>
                    <svg
                      @click="tododelete(todoitem.id)"
                      class="icon"
                      aria-hidden="true"
                    >
                      <use xlink:href="#icon-shanchutianchong"></use>
                    </svg>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                title="今日已完成"
                name="2"
                v-if="todolistdone.length != 0"
              >
                <div
                  v-for="(todoitem, index) in todolistdone"
                  :key="index"
                  class="oneitem"
                >
                  <div
                    class="leftclass"
                    :style="{ backgroundColor: todoitem.colorbg }"
                  ></div>
                  <el-button circle @click="tododone(todoitem.id)"></el-button>
                  <div class="pall">
                    <p
                      class="pcontent"
                      style="text-decoration: line-through; color: #757f87"
                    >
                      {{ todoitem.contents }}
                    </p>
                    <p class="pdatetime">{{ todoitem.datetime }}</p>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 最近7天</span>
            <el-empty
              description="暂无待办"
              v-if="sevendayslist == 0"
            ></el-empty>
            <div
              v-for="(todoitem, index) in sevendayslist"
              :key="index"
              class="oneitem"
            >
              <div
                class="leftclass"
                :style="{ backgroundColor: todoitem.colorbg }"
              ></div>
              <!-- 未完成 -->
              <div
                v-if="todoitem.done == 0"
                class="pall"
                style="margin-left: 30px"
              >
                <p class="pcontent">
                  {{ todoitem.contents }}
                </p>
                <p class="pdatetime">{{ todoitem.datetime }}</p>
              </div>
              <!-- 已完成 -->
              <div
                v-if="todoitem.done == 1"
                class="pall"
                style="margin-left: 30px"
              >
                <p
                  class="pcontent"
                  style="text-decoration: line-through; color: #757f87"
                >
                  {{ todoitem.contents }}
                </p>
                <p class="pdatetime">{{ todoitem.datetime }}</p>
              </div>
              <div class="allbtn">
                <svg
                  @click="todochange(todoitem)"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-xiugai"></use>
                </svg>
                <svg
                  @click="tododelete(todoitem.id)"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-shanchutianchong"></use>
                </svg>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-time"></i> 已过期</span>
            <el-empty
              description="暂无待办"
              v-if="overdayslist.length == 0"
            ></el-empty>
            <div
              v-for="(todoitem, index) in overdayslist"
              :key="index"
              class="oneitem"
            >
              <div
                class="leftclass"
                :style="{ backgroundColor: todoitem.colorbg }"
              ></div>
              <!-- 未完成 -->
              <div
                v-if="todoitem.done == 0"
                class="pall"
                style="margin-left: 30px"
              >
                <p class="pcontent">
                  {{ todoitem.contents }}
                </p>
                <p class="pdatetime">{{ todoitem.datetime }}</p>
              </div>
              <!-- 已完成 -->
              <div
                v-if="todoitem.done == 1"
                class="pall"
                style="margin-left: 30px"
              >
                <p
                  class="pcontent"
                  style="text-decoration: line-through; color: #757f87"
                >
                  {{ todoitem.contents }}
                </p>
                <p class="pdatetime">{{ todoitem.datetime }}</p>
              </div>
              <div class="allbtn">
                <svg
                  @click="todochange(todoitem)"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-xiugai"></use>
                </svg>
                <svg
                  @click="tododelete(todoitem.id)"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-shanchutianchong"></use>
                </svg>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="rightItem">
        <!-- 统计分析 -->
        <p class="myp1">概览</p>
        <div class="boxone">
          <Overview :toclass="colorclass"></Overview>
        </div>
      </div>
    </div>
    <!-- 新建待办弹窗 -->
    <div class="mask" v-show="isnew">
      <div class="newthing">
        <p class="newthingp">新建待办</p>
        <el-input
          type="textarea"
          placeholder="你想做点什么呢？"
          v-model="backlogForm.contents"
          maxlength="30"
          show-word-limit
        >
        </el-input>
        <div class="menuthing">
          <!-- 日期时间选择框 -->
          <div class="block">
            <el-date-picker
              v-model="backlogForm.datetime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
            >
            </el-date-picker>
          </div>
          <!-- 颜色类别选择 -->
          <div class="colorselect" @click="colorbox">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="classvalue"></use>
            </svg>
            <span class="selectp">选择分类</span>
            <div class="colorbox" v-show="iscolor">
              <div
                class="allcolor"
                @click="selectcolor(item)"
                v-for="item in colors"
                :key="item.cid"
              >
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="item.cvalue"></use>
                </svg>
                <span class="colorp">{{ item.cname }}</span>
              </div>
            </div>
          </div>
          <div class="confirmcancel">
            <span class="btncancel" @click="newItemCancel">取消</span>
            <span class="btnconfirm" @click="newItemConfirm">确定</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改待办弹窗 -->
    <div class="mask" v-show="ischange">
      <div class="newthing">
        <p class="newthingp">修改待办</p>
        <el-input
          type="textarea"
          placeholder="你想做点什么呢？"
          v-model="backlogchangeForm.contents"
          maxlength="30"
          show-word-limit
        >
        </el-input>
        <div class="menuthing">
          <!-- 日期时间选择框 -->
          <div class="block">
            <el-date-picker
              v-model="backlogchangeForm.datetime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
            >
            </el-date-picker>
          </div>
          <!-- 颜色类别选择 -->
          <div class="colorselect" @click="colorbox">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="backlogchangeForm.classvalue"></use>
            </svg>
            <span class="selectp">选择分类</span>
            <div class="colorbox" v-show="iscolor">
              <div
                class="allcolor"
                @click="selectchangecolor(item)"
                v-for="item in colors"
                :key="item.cid"
              >
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="item.cvalue"></use>
                </svg>
                <span class="colorp">{{ item.cname }}</span>
              </div>
            </div>
          </div>
          <div class="confirmcancel">
            <span class="btncancel" @click="changeItemCancel">取消</span>
            <span class="btnconfirm" @click="changeItemConfirm">保存</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import Overview from "../components/overview.vue";
import { datetimes } from "../mixins/mixin"

export default {
  mixins: [datetimes],
  data() {
    return {
      inputsearch: "",
      // 新建待办事项表单
      backlogForm: {
        contents: "",
        datetime: "",
        // 颜色分类 提交颜色类别的id
        classvalue: "#icon-life",
        colorbg: "#7766E7",
      },
      // 修改待办事项表单
      backlogchangeForm: {
        contents: "",
        datetime: "",
        classvalue: "",
        colorbg: "",
        id: "",
      },
      // // 当天日期
      // todaydate: "",
      // // 7天后日期
      // sevendate: "",
      // 颜色分类的value(默认蓝色)
      classvalue: "#icon-life",
      // 颜色分类的背景颜色value(默认蓝色)
      classbg: "#7766E7",
      // 新建待办弹框
      isnew: false,
      // 修改待办弹框
      ischange: false,
      // 颜色分类弹框
      iscolor: false,
      colors: [
        {
          cid: 0,
          cvalue: "#icon-life",
          cbg: "#7766E7",
          cname: "生活",
        },
        {
          cid: 1,
          cvalue: "#icon-work",
          cbg: "#518BF1",
          cname: "工作",
        },
        {
          cid: 2,
          cvalue: "#icon-study",
          cbg: "#FFCD00",
          cname: "学习",
        },
        {
          cid: 3,
          cvalue: "#icon-health",
          cbg: "#1DBD84",
          cname: "健康",
        },
        {
          cid: 4,
          cvalue: "#icon-social",
          cbg: "#FE738A",
          cname: "社交",
        },
        {
          cid: 5,
          cvalue: "#icon-other",
          cbg: "#C4C4C4",
          cname: "其它",
        },
      ],
      // 列表分组默认打开
      istodolist: ["1", "2"],
      // 未完成的待办事项列表
      todolist: [
        {
          id: "",
          contents: "",
          todoclass: "",
          datetime: "",
          done: "",
          class: "",
        },
      ],
      // 已完成的待办事项列表
      todolistdone: [
        {
          id: "",
          contents: "",
          todoclass: "",
          datetime: "",
          done: "",
          class: "",
        },
      ],
      // 最近七天的待办事项列表
      sevendayslist: [
        {
          id: "",
          contents: "",
          todoclass: "",
          datetime: "",
          done: "",
          class: "",
        },
      ],
      // 已过期的待办事项列表
      overdayslist: [
        {
          id: "",
          contents: "",
          todoclass: "",
          datetime: "",
          done: "",
          class: "",
        },
      ],
      // 加载动画
      isloading: false,
      // 分类颜色的value
      colorsvalue: [],
      colorsvaluedone: [],
      // 各分类统计
      colorclass: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
      }
    };
  },
  components: {
    Qs,
    Overview,
  },
  created() {
    this.getbacklogdata();
  },
  methods: {
    // 颜色选择弹框
    colorbox() {
      this.iscolor = !this.iscolor;
    },
    // 颜色分类
    selectcolor(colors) {
      // console.log(colors.cvalue)
      this.classvalue = colors.cvalue;
      this.backlogForm.classvalue = colors.cvalue;
      this.backlogForm.colorbg = colors.cbg;
    },
    // 修改颜色分类
    selectchangecolor(colors) {
      // console.log(colors.cvalue)
      this.classvalue = colors.cvalue;
      this.backlogchangeForm.classvalue = colors.cvalue;
      this.backlogchangeForm.colorbg = colors.cbg;
    },
    // 新建待办弹框
    newItem() {
      this.isnew = true;
    },
    // 取消
    newItemCancel() {
      if (
        this.backlogForm.contents != "" ||
        this.backlogForm.datetime ||
        this.classvalue != "#icon-life"
      ) {
        this.$confirm("当前有正在编辑的内容, 是否保存草稿?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.isnew = false;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
            // 清空
            this.backlogForm.contents = "";
            this.backlogForm.datetime = "";
            this.backlogForm.classvalue = "#icon-life";
            this.classvalue = "#icon-life";
            this.classbg = "#7766E7";
            this.isnew = false;
          });
      } else {
        this.isnew = false;
      }
    },
    // 确定
    async newItemConfirm() {
      this.isloading = true;
      // console.log(this.backlogForm);
      const { data: res } = await this.$http.post(
        "/backlog/insertbacklog",
        Qs.stringify(this.backlogForm)
      );
      // console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "添加待办事件成功",
          type: "success",
        });
        this.backlogForm.contents = "";
        this.backlogForm.datetime = "";
        this.backlogForm.classvalue = "#icon-life";
        this.backlogForm.colorbg = "#7766E7";
        this.classvalue = "#icon-life";
        this.classbg = "#7766E7";
        this.isnew = false;
        this.getbacklogdata();
        setTimeout(() => {
          this.isloading = false;
        }, 500);
      } else {
        this.isloading = true;
        this.$message.error("添加待办失败，请重试");
        this.isnew = false;
      }
    },
    // 修改的取消
    changeItemCancel() {
      this.ischange = false;
    },
    // 修改的保存
    async changeItemConfirm() {
      this.isloading = true;
      const { data: res } = await this.$http.post(
        "/backlog/updatecontents",
        Qs.stringify(this.backlogchangeForm)
      );
      // console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "修改待办事件成功",
          type: "success",
        });
        this.backlogchangeForm.contents = "";
        this.backlogchangeForm.datetime = "";
        this.backlogchangeForm.classvalue = "#icon-life";
        this.backlogchangeForm.colorbg = "#7766E7";
        this.classvalue = "#icon-life";
        this.classbg = "#7766E7";
        this.ischange = false;
        this.getbacklogdata();
        setTimeout(() => {
          this.isloading = false;
        }, 500);
      } else {
        this.isloading = true;
        this.$message.error("修改待办失败，请重试");
        this.ischange = false;
      }
    },
    // 点击未完成
    async todo(todoid) {
      this.isloading = true;
      const { data: res } = await this.$http.post("/backlog/updatebacklog", {
        done: 1,
        id: todoid,
      });
      if (res.code == 200) {
        this.$message({
          message: "该待办事件已完成",
          type: "success",
        });
        setTimeout(() => {
          this.isloading = false;
        }, 300);
      } else {
        this.isloading = true;
      }
      this.getbacklogdata();
    },
    // 点击已完成
    async tododone(tododoneid) {
      this.isloading = true;
      const { data: res } = await this.$http.post("/backlog/updatebacklog", {
        done: 0,
        id: tododoneid,
      });
      if (res.code == 200) {
        this.$message("该待办事件已修改为未完成");
        setTimeout(() => {
          this.isloading = false;
        }, 300);
      } else {
        this.isloading = true;
      }
      this.getbacklogdata();
    },
    // 获取待办列表数据
    async getbacklogdata() {
      const { data: res } = await this.$http.get("/backlog/selectbacklog");
      //  console.log(res);
      if (res.code == 200) {
        // 初始化
        this.colorclass.a=0
        this.colorclass.b=0
        this.colorclass.c=0
        this.colorclass.d=0
        this.colorclass.e=0
        this.colorclass.f=0
        res.data.forEach((item,index) => {
          if(item.colorbg == '#7766E7'){this.colorclass.a++}
          else if(item.colorbg == '#518BF1'){this.colorclass.b++}
          else if(item.colorbg == '#FFCD00'){this.colorclass.c++}
          else if(item.colorbg == '#1DBD84'){this.colorclass.d++}
          else if(item.colorbg == '#FE738A'){this.colorclass.e++}
          else if(item.colorbg == '#C4C4C4'){this.colorclass.f++}
        })
        // 过滤当天日期的待办事项
        this.todolist = res.data.filter((item) => {
          return (
            this.todaydate == item.datetime.split(" ").shift() && item.done == 0
          );
        });
        // 过滤当天已完成待办事项列表
        this.todolistdone = res.data.filter((item) => {
          return (
            this.todaydate == item.datetime.split(" ").shift() && item.done == 1
          );
        });
        // 过滤最近七天的待办事项
        this.sevendayslist = res.data.filter((item) => {
          return (
            this.todaydate < item.datetime.split(" ").shift() &&
            this.sevendate > item.datetime.split(" ").shift()
          );
        });
        // 过滤过期的待办事项
        this.overdayslist = res.data.filter((item) => {
          return this.todaydate > item.datetime.split(" ").shift();
        });
      } else {
        this.sevendayslist = 0;
        this.overdayslist = 0;
      }
    },
    // 修改待办事项内容
    async todochange(todoitem) {
      this.ischange = true;
      // console.log(todoitem);
      this.backlogchangeForm.contents = todoitem.contents;
      this.backlogchangeForm.datetime = todoitem.datetime;
      this.backlogchangeForm.classvalue = todoitem.classvalue;
      this.backlogchangeForm.colorbg = todoitem.colorbg;
      this.backlogchangeForm.id = todoitem.id;
    },
    // 删除待办事项
    async tododelete(todoitemid) {
      this.isloading = true;
      const { data: res } = await this.$http.post("/backlog/deletebacklog", {
        id: todoitemid,
      });
      if (res.code == 200) {
        this.$message({
          showClose: true,
          message: "该待办事项已删除",
          type: "success",
        });
        this.getbacklogdata();
        setTimeout(() => {
          this.isloading = false;
        }, 500);
      } else {
        this.isloading = true;
        this.$message.error("删除待办失败，请重试");
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 1100px) {
  .rightItem {
    display: none;
  }
}

.centerleft {
  height: 100%;
  margin-left: 250px;
}
.centerItem {
  margin-top: 75px;
  margin-left: 30px;
  width: calc(100% - 400px);
  height: calc(100% - 75px);
  border-radius: 10px;
  float: left;
}
/* 浏览器窗口width小于1100px时右边的div消失，中间的div随着窗口width的改变二改变 */
@media (max-width: 1100px) {
  .centerItem {
    width: calc(100% - 100px);
    min-width: 500px;
  }
}
/* 新建按钮 */
.centerItem > ::v-deep .el-button {
  float: right;
  margin-top: -55px;
  font-size: 18px;
  margin-right: 60px;
}
/* 点击完成按钮 */
.oneitem > ::v-deep .el-button {
  float: left;
  border: 3px solid #5da7f1;
  transform: scale(0.6);
  margin-top: 8px;
  margin-left: 15px;
}
.oneitem > ::v-deep .el-button:hover {
  background-color: #5da7f1;
}
::v-deep .el-collapse-item__header {
  height: 30px;
}
.oneitem {
  height: 36px;
  padding-bottom: 8px;
  border-radius: 10px;
}
.leftclass {
  height: 70%;
  float: left;
  width: 5px;
  border-radius: 5px;
  margin-top: 10px;
}
.oneitem:hover {
  background-color: #ebf4ff;
}
.oneitem:hover .allbtn > .icon {
  display: inline-block;
}
.pall {
  cursor: default;
  line-height: 2px;
  padding-top: 2px;
}
.pcontent {
  font-size: 14px;
  font-weight: 600;
}
.pdatetime {
  color: #757f87;
  font-size: 12px;
}
.myp {
  font-size: 20px;
  font-weight: 600;
}
.rightItem {
  margin-left: 30px;
  width: 270px;
  border-radius: 10px;
  /* background-color: white; */
  float: left;
}
.block ::v-deep .el-input__inner {
  border-radius: 10px;
}
::v-deep .el-tabs__header {
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
::v-deep #tab-0 {
  border-top-left-radius: 13px;
  border-left: 0px solid white;
}
::v-deep .el-tabs--border-card {
  border: 1px solid #E4E7ED;
  box-shadow: 2px 15px 29px #d6d6d6, -15px -15px 29px #ffffff;;
  height: calc(100% - 96px);
  min-height: 450px;
}
::v-deep .el-collapse-item__wrap {
  overflow: auto;
  height: 160px;
}
::v-deep .el-tabs--border-card > .el-tabs__content {
  height: calc(100% - 70px);
  overflow: auto;
}
/* ::v-deep .el-tabs--border-card>.el-tabs__header .el-tabs__item {
  border: 0;
} */
.myp1 {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
}
.newthingp {
  font-size: 20px;
  font-weight: 500;
  margin-left: 30px;
}
.boxone {
  box-shadow: 2px 15px 29px #d6d6d6, -15px -15px 29px #ffffff;
  width: 260px;
  height: 300px;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;
  padding: 12px;
  padding-top: 20px;
}
::v-deep .el-textarea {
  width: 700px;
  margin-left: 50px;
  height: 25px;
  margin-top: 30px;
}
::v-deep .el-textarea__inner {
  margin-top: -35px;
  font-size: 18px;
  border-radius: 10px;
}
::v-deep .el-tabs--border-card {
  border-radius: 10px;
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
  margin-top: 45px;
  margin-left: 50px;
}
.block {
  float: left;
}
.colorselect {
  margin-left: 30px;
  font-size: 25px;
  float: left;
}
.selectp {
  line-height: 16px;
  margin-left: 5px;
  color: #757f87;
  font-size: 16px;
}
.colorbox {
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  width: 80px;
  padding-left: 20px;
  padding-bottom: 5px;
}
.colorp {
  color: #757f87;
  margin-left: 4px;
  font-size: 15px;
  margin-bottom: 3px;
}
.allcolor svg {
  margin-top: 8px;
  cursor: pointer;
  float: left;
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
.allbtn {
  float: right;
  margin-top: -35px;
}
.allbtn > .icon {
  margin-right: 20px;
  cursor: pointer;
  display: none;
}
</style>