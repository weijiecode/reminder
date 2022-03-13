<template>
  <div class="mycenter">
    <div class="center">
      <p class="myp">个人中心</p>
      <div class="centerbox">
        <div class="boxtop">
          <div class="headimage">
            <img
              v-if="formMyCenter.photo != null"
              :src="formMyCenter.photo"
              alt=""
            />
            <svg
              v-if="formMyCenter.photo == null && formMyCenter.sex == 0"
              id="photo"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-icon-test"></use>
            </svg>
            <svg
              v-if="formMyCenter.photo == null && formMyCenter.sex == 1"
              id="photo"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-icon-test2"></use>
            </svg>
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
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 用户头像 -->
        <div v-show="menuShow == 2" class="boxbottom">
          <div class="photoleft">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="$http.defaults.baseURL + 'mycenter/photouploadurl'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="userphoto" :src="userphoto" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button type="primary" @click="submituserphoto">保存</el-button>
          </div>
          <div class="phototip">
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhuyi"></use>
              </svg>
              上传头像图片只能是 JPG 或 PNG 格式!
            </p>
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhuyi"></use>
              </svg>
              图片大小不能超过 2MB！
            </p>
          </div>
        </div>
        <!-- 密码修改 -->
        <div v-show="menuShow == 3" class="boxbottom">
          <el-form
            ref="formpasswordRef"
            :rules="passwordrules"
            class="formbox"
            label-position="right"
            label-width="80px"
            :model="formpassword"
          >
            <el-form-item label="旧密码" prop="oldpassword">
              <el-input
                type="password"
                style="width: 260px"
                v-model="formpassword.oldpassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
              <el-input
                type="password"
                style="width: 260px"
                v-model="formpassword.newpassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="twonewpassword">
              <el-input
                type="password"
                style="width: 260px"
                v-model="formpassword.twonewpassword"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitformPassword('formpassword')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
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
    // 填写两次密码验证
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.formpassword.twonewpassword !== "") {
          this.$refs.formpasswordRef.validateField("twonewpassword");
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formpassword.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      menuShow: 1,
      formMyCenter: {
        username: "",
        nickname: "",
        introduction: "",
        sex: "",
        photo: "",
        phone: "",
        email: "",
        selectemail: "",
      },
      formpassword: {
        oldpassword: "",
        newpassword: "",
        twonewpassword: "",
      },
      userphoto: "",
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
      //  个人信息验证规则
      mycenterrules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" },
        ],
        phone: [
          {
            validator: function (rule, value, callback) {
              if (
                /^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i.test(
                  value
                ) == false &&
                value != ""
              ) {
                callback(new Error("请输入正确的手机号"));
              } else {
                //校验通过
                callback();
              }
            },
          },
        ],
        email: [{ max: 15, message: "长度不能超过15字符", trigger: "blur" }],
      },
      // 密码验证规则
      passwordrules: {
        oldpassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        newpassword: [
          { validator: validatePassword, required: true, trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        twonewpassword: [
          { validator: validatePassword2, required: true, trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 获取用户数据
    async getuserdata() {
      const { data: res } = await this.$http.post("/mycenter/userdata", {
        username: localStorage.getItem("username"),
      });
      // console.log(res);
      if (res.code == 200) {
        this.formMyCenter = res.data[0];
        if (res.data[0].email != null) {
          this.formMyCenter.selectemail = this.formMyCenter.email.split("@")[1];
          this.formMyCenter.email = this.formMyCenter.email.split("@")[0];
        } else {
          this.formMyCenter.email = "";
        }
      }
      // console.log("用户数据：");
      // console.log(this.formMyCenter);
    },
    // 提交个人资料
    submitformMyCenter() {
      this.$refs.formmycenterRef.validate(async (valid) => {
        if (valid) {
          // console.log(this.formMyCenter);
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
          // console.log(res);
          if (res.code == 200) {
            this.$store.commit("set_nickname", this.formMyCenter.nickname);
            this.$store.commit("set_photo", this.formMyCenter.photo);
            this.$store.commit("set_sex", this.formMyCenter.sex);
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
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    // 上传头像后操作
    handleAvatarSuccess(res, file) {
      this.userphoto = res.data.url;
      console.log(res);
    },
    // 上传头像到后端
    async submituserphoto() {
      if (this.userphoto != "") {
        const { data: res } = await this.$http.post("/mycenter/updatephoto", {
          photo: this.userphoto,
          oldphoto: this.formMyCenter.photo,
          username: localStorage.getItem("username"),
        });
        if (res.code == 200) {
          this.formMyCenter.photo = this.userphoto;
          this.$store.commit("set_photo", this.userphoto);
          this.$message({
            type: "success",
            message: "修改头像成功",
          });
        } else {
          this.$message.error("修改头像失败，请重试");
        }
      } else {
        this.$message.error("请上传头像后保存！");
      }
    },
    // 修改密码
    submitformPassword() {
      this.$refs.formpasswordRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post(
            "/mycenter/updatepassword",
            {
              newpassword: this.formpassword.newpassword,
              username: localStorage.getItem("username"),
              oldpassword: this.formpassword.oldpassword,
            }
          );
          console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "修改密码成功！",
            });
          } else {
            this.$message.error("旧密码错误，修改密码失败，请重试");
          }
        } else {
          this.$message.error("密码修改失败，请重试");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.mycenter {
  margin-left: 280px;
}
.center {
  margin-top: -10px;
  width: calc(100% - 30px);
  float: left;
}
.myp {
  margin-top: 8px;
  font-size: 20px;
  font-weight: 600;
}
.centerbox {
  overflow: auto;
  min-height: 400px;
  /* height: calc(100% - 160px); */
  height: 790px;
  min-width: 600px;
  color: rgba(15, 23, 42, 0.8);
  border-radius: 10px;
}
.boxtop {
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
  border-radius: 10px;
  height: 140px;
  background-color: white;
}
.boxbottom {
  margin-top: 30px;
  box-shadow: 2px 5px 29px #d6d6d6, -15px -15px 29px #ffffff;
  border-radius: 10px;
  height: 600px;
  background-color: white;
}
.phototip {
  font-size: 15px;
  color: #69696c;
  margin-top: 90px;
  margin-left: 50px;
  float: left;
  width: 300px;
  height: 100px;
}
.photoleft {
  float: left;
}
.boxbottom ::v-deep .el-button--primary {
  margin-top: 50px;
  margin-left: 60px;
}
::v-deep .el-button--primary {
  width: 160px;
  border-radius: 20px;
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
  box-shadow: 0 0 0 3px rgb(237 234 234);
}
#photo {
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
  background-color: #b2d1f0;
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