<template>
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
        <el-tab-pane>
          <span slot="label"
            ><i class="el-icon-document-checked"></i> 今日待办</span
          >
          今日待办
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 最近7天</span>
          最近7天
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="rightItem">
      <!-- 统计分析 -->
      <p class="myp1">概览</p>
      <div class="boxone"></div>
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
  </div>
</template>

<script>
import Qs from "qs"
import Overview from "../components/overview.vue";
export default {
  data() {
    return {
      inputsearch: "",
      backlogForm: {
          contents: "",
          datetime: "",
          // 颜色分类 提交颜色类别的id
          class: "#icon-yuandian",
      },
      // 颜色分类的value(默认蓝色)
      classvalue: "#icon-yuandian",
      // 新建待办弹框
      isnew: false,
      // 颜色分类弹框
      iscolor: false,
      colors: [
        {
          cid: 1,
          cvalue: "#icon-yuandian",
        },
        {
          cid: 2,
          cvalue: "#icon-yuandian-copy-copy",
        },
        {
          cid: 3,
          cvalue: "#icon-yuandian-copy-copy-copy",
        },
        {
          cid: 4,
          cvalue: "#icon-yuandian-copy",
        },
        {
          cid: 5,
          cvalue: "#icon-yuandian-copy-copy1",
        },
        {
          cid: 6,
          cvalue: "#icon-yuandian-copy1",
        },
      ],
    };
  },
  components: {
      Qs,
    Overview,
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
      this.backlogForm.class = colors.cid;
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
        this.classvalue != "#icon-yuandian"
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
            this.isnew = false
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
            // 清空
            this.backlogForm.contents = ''
            this.backlogForm.datetime = ''
            this.classvalue = '#icon-yuandian'
            this.isnew = false
          });
      } else {
        this.isnew = false;
      }
    },
    // 确定
    async newItemConfirm() {
        console.log(this.backlogForm)
        const { data:res } = await this.$http.post('/backlog/insertbacklog',Qs.stringify(this.backlogForm))
        console.log(res)
        if(res.code == 200){
            this.$message({
                message: '添加待办事件成功',
                type: 'success'
            })
            this.backlogForm.contents = ''
            this.backlogForm.datetime = ''
            this.classvalue = '#icon-yuandian'
            this.isnew = false
        }else {
            this.$message.error('添加待办失败，请重试')
            this.isnew = false
        }

    },
  },
};
</script>

<style scoped>
/* @media screen and (max-width: 880px) {
.centerleft {
  height: 100%;
  width: calc(100% - 220px);
  margin-left: 250px;
  
}
}

@media screen and (max-width: 880px) {
  .centerItem {
  margin-top: 75px;
  margin-left: 30px;
  width: calc(100% - 400px);
  height: 75%;
  border-radius: 10px;
  float: left;
}
} */

.centerleft {
  height: 100%;
  width: calc(100% - 220px);
  margin-left: 250px;
  
}
  .centerItem {
  margin-top: 75px;
  margin-left: 30px;
  width: calc(100% - 400px);
  height: 75%;
  border-radius: 10px;
  float: left;
}
.centerItem ::v-deep .el-button {
  float: right;
  margin-top: -70px;
  font-size: 25px;
  margin-right: 60px;
}
.myp {
  font-size: 25px;
  font-weight: 600;
}
.rightItem {
  margin-top: 75px;
  margin-right: 30px;
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
}
::v-deep .is-active {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
::v-deep .el-tabs--border-card {
  border: white;
  box-shadow: 0;
}
.myp1 {
  margin-top: 20px;
  font-size: 25px;
  font-weight: 600;
}
.newthingp {
  font-size: 20px;
  font-weight: 500;
  margin-left: 30px;
}
.boxone {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  width: 100%;
  height: 300px;
  background-color: white;
  margin-top: 24px;
  border-radius: 10px;
}
::v-deep .el-textarea {
  width: 700px;
  margin-left: 50px;
  height: 25px;
  margin-top: 15px;
}
::v-deep .el-textarea__inner {
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
  margin-top: 70px;
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
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  width: 200px;
  height: 40px;
  padding-left: 20px;
  padding-top: 10px;
}
.allcolor svg {
  cursor: pointer;
  float: left;
  margin-left: 5px;
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