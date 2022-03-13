<template>
  <div class="feedbackbox">
    <div class="feedback">
      <p class="myp">反馈与建议</p>
      <div class="msgcontent">
        <el-form style="width: 80%;margin-top: 20px;" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <vue-editor
              v-model="model.content"
              useCustomImageHandler
              @image-added="handleImageAdded"
            ></vue-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  methods: {
    // 图片地址
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const { data: res } = await this.$http.post(
        "/feedback/photouploadeditorurl",
        formData
      );
      console.log(res);
      const url = res.data.url;
      this.model.photourl = url;
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
    async submit() {
      const { data: res } = await this.$http.post("/feedback/updateeditor", {
        title: this.model.title,
        content: this.model.content,
      });
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "提交成功，感谢你的反馈与建议！",
        });
        (this.model.title = ""), (this.model.content = "");
      } else {
        this.$message.error("提交失败，请重试！");
      }
    },
  },
  data() {
    return {
      model: {
        title: "",
        content: "",
        photourl: "",
      },
    };
  },
};
</script>

<style scoped>
.feedbackbox {
  height: 100%;
  margin-left: 280px;
}
.feedback {
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
</style>