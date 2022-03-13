<template>
  <div class="messagebox">
    <div class="message">
      <p class="myp">消息通知</p>
      <div class="msgcontent">
        <div class="title">
          <div @click="showmessage = 0" :class="{ subtitle: showmessage == 0 }">
            全部消息
          </div>
          <div @click="showmessage = 1" :class="{ subtitle: showmessage == 1 }">
            官方
          </div>
          <div @click="showmessage = 2" :class="{ subtitle: showmessage == 2 }">
            通知
          </div>
          <div @click="showmessage = 3" :class="{ subtitle: showmessage == 3 }">
            私信
          </div>
          <div @click="allisread" class="subtitle1">全部已读</div>
        </div>
        <!-- 全部消息 -->
        <div v-if="showmessage == 0" class="content">
          <ul v-for="(item, index) in messagedata" :key="index">
            <li @click="updateread(item)">
              <img src="../assets/logo2.png" alt="" />
              <div class="licontent">
                <span class="licontents"
                  >{{ item.title }}{{ item.content }}</span
                >
                <span class="licontents1">{{ item.datetime }}</span>
              </div>
              <el-button
                size="small"
                v-if="item.isread == 1"
                style="margin-right: 50px; float: right; margin-top: -40px"
                type="info"
                round
                >已读</el-button
              >
              <el-button
                size="small"
                v-if="item.isread == 0"
                style="margin-right: 50px; float: right; margin-top: -40px"
                type="primary"
                round
                >标记已读</el-button
              >
            </li>
          </ul>
        </div>
        <!-- 官方 -->
        <div v-if="showmessage == 1" class="content">
          <el-empty v-if="gfmessagedata==''" description="暂无通知消息"></el-empty>
          <ul v-if="gfmessagedata!=''" v-for="(item, index) in gfmessagedata" :key="index">
            <li @click="updateread(item)">
              <img src="../assets/logo2.png" alt="" />
              <div class="licontent">
                <span class="licontents"
                  >{{ item.title }}{{ item.content }}</span
                >
                <span class="licontents1">{{ item.datetime }}</span>
              </div>
              <el-button
                size="small"
                v-if="item.isread == 1"
                style="margin-right: 50px; float: right; margin-top: -40px"
                type="info"
                round
                >已读</el-button
              >
              <el-button
                size="small"
                v-if="item.isread == 0"
                style="margin-right: 50px; float: right; margin-top: -40px"
                type="primary"
                round
                >标记已读</el-button
              >
            </li>
          </ul>
        </div>
        <!-- 通知 -->
        <div v-if="showmessage == 2" class="content">
          <el-empty v-if="tzmessagedata==''" description="暂无通知消息"></el-empty>
          <ul v-if="tzmessagedata!=''" v-for="(item, index) in tzmessagedata" :key="index">
            <li @click="updateread(item)">
              <img src="../assets/logo2.png" alt="" />
              <div class="licontent">
                <span class="licontents"
                  >{{ item.title }}{{ item.content }}</span
                >
                <span class="licontents1">{{ item.datetime }}</span>
              </div>
              <el-button
                size="small"
                v-if="item.isread == 1"
                style="margin-right: 50px; float: right; margin-top: -40px"
                type="info"
                round
                >已读</el-button
              >
              <el-button
                size="small"
                v-if="item.isread == 0"
                style="margin-right: 50px; float: right; margin-top: -40px"
                type="primary"
                round
                >标记已读</el-button
              >
            </li>
          </ul>
        </div>
        <!-- 私信 -->
        <div v-if="showmessage == 3" class="content">
          <el-empty v-if="sxmessagedata==''" description="暂无私信消息"></el-empty>
          <ul v-if="sxmessagedata!=''" v-for="(item, index) in sxmessagedata" :key="index">
            <li @click="updateread(item)">
              <img src="../assets/logo2.png" alt="" />
              <div class="licontent">
                <span class="licontents"
                  >{{ item.title }}{{ item.content }}</span
                >
                <span class="licontents1">{{ item.datetime }}</span>
              </div>
              <el-button
                size="small"
                v-if="item.isread == 1"
                style="margin-right: 50px; float: right; margin-top: -40px"
                type="info"
                round
                >已读</el-button
              >
              <el-button
                size="small"
                v-if="item.isread == 0"
                style="margin-right: 50px; float: right; margin-top: -40px"
                type="primary"
                round
                >标记已读</el-button
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../api/Bus"
export default {
  created() {
    this.showmessage = this.$route.query.classId;
    this.getmessageclass();
  },
  components: {
    Bus
  },
  data() {
    return {
      // 消息类别
      showmessage: 0,
      // 消息数据
      messagedata: {
        title: "",
        content: "",
        datetime: "",
        isread: 0,
        message_id: ""
      },
      gfmessagedata: {
        title: "",
        content: "",
        datetime: "",
        isread: 0,
        message_id: ""
      },
      tzmessagedata: {
        title: "",
        content: "",
        datetime: "",
        isread: 0,
        message_id: ""
      },
      sxmessagedata: {
        title: "",
        content: "",
        datetime: "",
        isread: 0,
        message_id: ""
      },
    };
  },
  methods: {
    // 获取消息数据
    async getmessageclass() {
      const { data: res } = await this.$http.get("/message/usermessage");
      if (res.code == 200) {
        this.messagedata = res.data;
        this.gfmessagedata = res.data.filter((item) => {
          return item.title == "【官方】";
        });
        this.tzmessagedata = res.data.filter((item) => {
          return item.title == "【通知】";
        });
        this.sxmessagedata = res.data.filter((item) => {
          return item.title == "【私信】";
        });
      }
    },
    // 修改已读状态
    async updateread(item) {
      if(item.isread == 0) {
        const { data: res } = await this.$http.post('/message/isreadmessage',{
          isread: 1,
          message_id: item.message_id
        })
        if(res.code == 200) {
          this.$message('该消息已读')
          this.getmessageclass()
          Bus.$emit('changedata')
        }else {
          this.$message('修改已读状态失败，请重试')
        }
      }
    },
    // 修改全部消息为已读
    async allisread() {
      const { data: res } = await this.$http.post('/message/isreadallmessage',{
        isread: 1
      })
       if(res.code == 200) {
          this.$message('全部消息已读')
          this.getmessageclass()
          Bus.$emit('changedata')
        }else {
          this.$message('修改已读状态失败，请重试')
        }
    }
  },
};
</script>

<style scoped>
.messagebox {
  height: 100%;
  margin-left: 280px;
}
.message {
  margin-top: -10px;
  height: calc(100% - 95px);
  width: 100%;
  float: left;
}
.msgcontent {
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
.myp {
  margin-top: 8px;
  font-size: 20px;
  font-weight: 600;
}
.title {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #aaa;
}
.title div {
  font-size: 15px;
  color: #aaa;
  cursor: pointer;
  float: left;
  margin-left: 50px;
  margin-top: 15px;
}
.subtitle1 {
  float: right !important;
  color: red !important;
  font-size: 13px !important;
  cursor: pointer !important;
  margin-right: 50px !important;
  margin-top: 15px !important;
}
.subtitle {
  color: #5da7f1 !important;
}
.content {
  overflow: auto;
  height: calc(100% - 51px);
}
ul li {
  cursor: pointer;
  list-style: none;
  margin: 25px 0;
}
ul li img {
  border: 1px solid #e5e0e0;
  float: left;
  width: 35px;
  height: 35px;
  border-radius: 100%;
}
.licontent {
  margin-left: 60px;
  display: flex;
  flex-direction: column;
}
.licontents {
  font-size: 15px;
}
.licontents1 {
  margin-left: 5px;
  font-size: 13px;
  color: #aaa;
}
</style>
