<template>
  <div class="mycenter">
    <div class="center">
      <p class="myp">个人中心</p>
      <div class="centerbox">
        <div class="boxtop">
          <div class="headimage">
            <img src="../assets/test.jpg" alt="" />
            <div class="twoline">
              <p class="nickname">
                {{ formMyCenter.nickname }}
                <svg
                  v-if="formMyCenter.sex == 1"
                  style="font-size: 20px"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-xingbie1"></use>
                </svg>
                <svg
                  v-if="formMyCenter.sex == 0"
                  style="font-size: 20px"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-xingbie"></use>
                </svg>
              </p>
              <p class="introduction">{{ formMyCenter.introduction }}</p>
            </div>
          </div>
          <div class="menus">
            <span @click="menuShow = 1"
              >基本资料
              <div :class="{ menuline: menuShow == 1 }"></div
            ></span>
            <span @click="menuShow = 2"
              >修改头像
              <div :class="{ menuline: menuShow == 2 }"></div
            ></span>
            <span @click="menuShow = 3"
              >密码管理
              <div :class="{ menuline: menuShow == 3 }"></div
            ></span>
          </div>
        </div>
        <!-- 基本资料 -->
        <div v-show="menuShow == 1" class="boxbottom">
          <el-form
            ref="formmycenterRef"
            :rules="mycenterrules"
            class="formbox"
            label-position="right"
            label-width="80px"
            :model="formMyCenter"
          >
            <el-form-item label="账号">
              <el-input
                disabled
                style="width: 200px"
                v-model="formMyCenter.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input
                style="width: 200px"
                v-model="formMyCenter.nickname"
              ></el-input>
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input
                style="width: 280px"
                type="textarea"
                placeholder="请输入内容"
                v-model="formMyCenter.introduction"
                maxlength="30"
                show-word-limit
              >
              </el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="formMyCenter.sex" :label="1"
                ><svg style="font-size: 20px" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xingbie1"></use></svg
              ></el-radio>
              <el-radio v-model="formMyCenter.sex" :label="0"
                ><svg style="font-size: 20px" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xingbie"></use></svg
              ></el-radio>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input
                style="width: 280px"
                v-model="formMyCenter.phone"
              ></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input
                style="width: 405px"
                v-model="formMyCenter.email"
                class="input-with-select"
              >
                <el-select
                  style="width: 125px"
                  v-model="formMyCenter.selectemail"
                  slot="append"
                  @change="$forceUpdate()"
                  placeholder="邮箱类型"
                >
                  <el-option
                    v-for="(item, index) in mycenteroptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitformMyCenter('formMyCenter')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 用户头像 -->
        <div v-show="menuShow == 2" class="boxbottom">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + 'mycenter/photoupload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="formMyCenter.photo"
              :src="formMyCenter.photo"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 密码修改 -->
        <div v-show="menuShow == 3" class="boxbottom">3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getuserdata();
  },
  data() {
    return {
      menuShow: 1,
      formMyCenter: {
        username: "",
        nickname: "",
        introduction: "",
        sex: "",
        phone: "",
        email: "",
        selectemail: "",
      },
      mycenteroptions: [
        {
          value: "qq.com",
          label: "@qq.com",
        },
        {
          value: "163.com",
          label: "@163.com",
        },
        {
          value: "icloud.com",
          label: "@icloud.com",
        },
        {
          value: "sina.com",
          label: "@sina.com",
        },
        {
          value: "gmail.com",
          label: "@gmail.com",
        },
      ],
      mycenterrules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" },
        ],
        phone: [{ max: 11, message: "长度不能超过11字符", trigger: "blur" }],
        email: [{ max: 15, message: "长度不能超过15字符", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 获取用户数据
    async getuserdata() {
      const { data: res } = await this.$http.post("/mycenter/userdata", {
        username: localStorage.getItem("username"),
      });
      console.log(res);
      if (res.code == 200) {
        this.formMyCenter = res.data[0];
        if (res.data[0].email != null) {
          this.formMyCenter.selectemail = this.formMyCenter.email.split("@")[1];
          this.formMyCenter.email = this.formMyCenter.email.split("@")[0];
        } else {
          this.formMyCenter.email = "";
        }
      }
      console.log("用户数据：");
      console.log(this.formMyCenter);
    },
    // 提交个人资料
    submitformMyCenter() {
      this.$refs.formmycenterRef.validate(async (valid) => {
        if (valid) {
          console.log(this.formMyCenter);
          const { data: res } = await this.$http.post(
            "/mycenter/updateuserdata",
            {
              nickname: this.formMyCenter.nickname,
              introduction: this.formMyCenter.introduction,
              sex: this.formMyCenter.sex,
              phone: this.formMyCenter.phone,
              email:
                this.formMyCenter.email + "@" + this.formMyCenter.selectemail,
              username: localStorage.getItem("username"),
            }
          );
          console.log(res);
          if (res.code == 200) {
            this.$store.commit("set_nickname", this.formMyCenter.nickname);
            this.$message({
              type: "success",
              message: "个人资料修改成功",
            });
          } else {
            this.$message.error("个人资料修改失败，请重试");
          }
        } else {
          this.$message.error("个人资料修改失败，请重试");
          return false;
        }
      });
    },
    // 上传头像前的验证
     beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG ||isPNG) && isLt2M;
      },
      // 上传头像操作
      handleAvatarSuccess(res, file) {
        console.log(res)
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
  },
};
</script>

<style scoped>
.mycenter {
  margin-left: 280px;
}
.center {
  width: calc(100% - 30px);
  float: left;
}
.myp {
  font-size: 20px;
  font-weight: 600;
}
.centerbox {
  overflow: auto;
  min-height: 400px;
  /* height: calc(100% - 160px); */
  height: 1000px;
  min-width: 600px;
  color: rgba(15, 23, 42, 0.8);
  border-radius: 10px;
}
.boxtop {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  border-radius: 10px;
  height: 140px;
  background-color: white;
}
.boxbottom {
  margin-top: 30px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  border-radius: 10px;
  height: 600px;
  background-color: white;
}
.headimage {
  display: flex;
  padding-top: 25px;
  cursor: default;
  margin-left: 30px;
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
  margin-left: 25px;
}
.introduction {
  font-size: 12px;
  color: rgb(147 144 144);
  line-height: 0;
}
.menus {
  margin-top: 20px;
  margin-left: 40px;
}
.menus span {
  margin-right: 25px;
  cursor: pointer;
  display: inline-block;
}

span:hover div {
  margin-left: 2px;
  margin-top: 2px;
  border-radius: 10px;
  height: 4px;
  width: 60px;
  background-color: #5da7f1;
}
.menuline {
  margin-left: 2px;
  margin-top: 2px;
  border-radius: 10px;
  height: 4px;
  width: 60px;
  background-color: #5da7f1;
}
.formbox {
  padding-top: 40px;
  padding-left: 30px;
}

/* 头像样式 */
::v-deep .avatar-uploader .el-upload {
  margin-top: 50px;
  margin-left: 50px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
::v-deep .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>