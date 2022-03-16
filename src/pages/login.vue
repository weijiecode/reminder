<template>
  <div class="login">
    <!-- 登录 -->
    <img class="logoimg" src="../assets/logo2.png" alt="" />
    <div v-if="loginorregister == 0" class="loginbox">
      <div class="login-title">欢迎访问日暮清单</div>
      <div class="login-subtitle">请输入您的凭证访问账户。</div>
      <div class="login-input">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              placeholder="请输入您的账号"
              v-model="loginForm.username"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入您的密码"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-checkbox style="margin-bottom: 20px;" v-model="issevenlogin">七天免登录</el-checkbox>
          <p class="subpwd" @click="contactroot">找回密码</p>
          <el-form-item class="btns">
            <el-button style="width: 100%" type="primary" @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <p class="nouser">还没有账号？<p @click="loginorregister = 1" class="subnouser">注册账号</p></p>
      </div>
    </div>
    <p v-if="loginorregister == 0" class="agree">登录或完成注册即代表你同意<router-link class="subtitle" to='/agreement' target='_blank'>用户协议</router-link>和<router-link class="subtitle" to='/private' target='_blank'>隐私政策</router-link></p>
    <div v-if="loginorregister == 1" class="loginbox">
      <div class="login-title">欢迎访问日暮清单</div>
      <el-steps :active="active" finish-status="success">
        <el-step title="账号密码"></el-step>
        <el-step title="个人资料"></el-step>
        <el-step title="确认信息"></el-step>
      </el-steps>
      <!-- 步骤一 -->
      <el-form
        v-show="active == 0"
        :model="regForm"
        status-icon
        :rules="regFormRules"
        ref="regFormRef"
        label-width="100px"
        class="reg_form"
      >
        <el-form-item label="账号" prop="reg_username" class="is-required">
          <el-input
            v-model="regForm.reg_username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="reg_password" class="is-required">
          <el-input
            type="password"
            v-model="regForm.reg_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="reg_checkPassword"
          class="is-required"
        >
          <el-input
            type="password"
            v-model="regForm.reg_checkPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      <div class="btn">
        <el-button style="margin-top: 12px;" @click="nextone">下一步</el-button>
      </div>
        </el-form>
      
      <!-- 步骤二 -->
      <el-form
      v-show="active == 1"
        :model="regdataForm"
        status-icon
        :rules="regdataFormRules"
        ref="regdataFormRef"
        label-width="100px"
        class="reg_form"
      >
      <el-form-item label="昵称" prop="reg_nickname" class="is-required">
                <el-input
                  v-model="regdataForm.reg_nickname"
                ></el-input>
        </el-form-item>
        <el-form-item label="性别">
                <el-radio v-model="regdataForm.reg_sex" :label="1"
                  ><svg style="font-size: 20px" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xingbie1"></use></svg
                ></el-radio>
                <el-radio v-model="regdataForm.reg_sex" :label="0"
                  ><svg style="font-size: 20px" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xingbie"></use></svg
                ></el-radio>
        </el-form-item>
        <el-form-item label="手机号码" prop="reg_phone">
                <el-input
                  v-model="regdataForm.reg_phone"
                ></el-input>
        </el-form-item>
      <div class="btn1">
      <el-button style="margin-top: 12px;" @click="active = 0">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="nexttwo">下一步</el-button>
      </div>
      </el-form>
      <!-- 步骤三 -->
      <el-form
        v-show="active == 2"
        label-width="100px"
        class="reg_form"
      >
      <el-form-item label="账号">
          <el-input
            v-model="regForm.reg_username"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
      <el-form-item label="昵称">
                <el-input
                :disabled="true"
                  v-model="regdataForm.reg_nickname"
                ></el-input>
        </el-form-item>
        <el-form-item label="性别">
                <el-radio :disabled="true" v-model="regdataForm.reg_sex" :label="1"
                  ><svg style="font-size: 20px" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xingbie1"></use></svg
                ></el-radio>
                <el-radio :disabled="true" v-model="regdataForm.reg_sex" :label="0"
                  ><svg style="font-size: 20px" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xingbie"></use></svg
                ></el-radio>
        </el-form-item>
        <el-form-item label="手机号码">
                <el-input
                :disabled="true"
                  v-model="regdataForm.reg_phone"
                ></el-input>
        </el-form-item>
      <div class="btn1">
      <el-button style="margin-top: 12px;" @click="active = 1">上一步</el-button>
      <el-button style="width:84px;height:40px;margin-top:10px;padding-left:15px;" type="primary" @click="register">确认注册</el-button>
      </div>
      </el-form>
      <div class="login-input">
        <p class="nouser">已经有账号？<p @click="loginorregister = 0" class="subnouser">登录账号</p></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 注册两次密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的密码"));
      } else {
        if (this.regForm.reg_checkPassword !== "") {
          this.$refs.regFormRef.validateField("reg_checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入您的密码"));
      } else if (value !== this.regForm.reg_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 注册页面的dialog
      regDialogVisible: false,
      // 七天免登录
      issevenlogin: false,
      // 登录or注册
      loginorregister: 0,
      // 步骤条
      active: 0,
      // 所有消息的id
      messageid: [],
      // 登录表单
      loginForm: {
        username: "",
        password: "",
      },
      // 注册表单
      regForm: {
        reg_username: "",
        reg_password: "",
        reg_checkPassword: "",
      },
      // 注册表单个人资料
      regdataForm: {
        reg_nickname: "",
        reg_sex: 1,
        reg_phone: "",
      },
      // 登录表单规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      // 注册表单规则
      regFormRules: {
        reg_username: [
          { required: true, message: "请输入注册名称", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "长度在 4 到 10 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              if (/^[A-Za-z0-9]{4,10}$/.test(value) == false) {
                callback(new Error("请输入数字或者字母"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        reg_password: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        reg_checkPassword: [
          { validator: validatePass2, trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      regdataFormRules: {
        reg_nickname: [
          {
            required: true,
            message: "请输入长度在 3 到 8 个字符的昵称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 8,
            message: "长度在 3 到 8 个字符",
            trigger: "blur",
          },
        ],
        // 可以为空
        reg_phone: [
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
      },
    };
  },
  methods: {
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("account/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
          sevenlogin: this.issevenlogin,
        });
        console.log(res);
        if (res.code !== 200) return this.$message.error("账号或密码错误!");
        this.$message.success("登录成功！");
        console.log("账户数据：");
        console.log(res);
        this.$store.commit("set_username", res.data.username);
        this.$store.commit("set_nickname", res.data.nickname);
        this.$store.commit("set_photo", res.data.photo);
        this.$store.commit("set_sex", res.data.sex);
        this.$store.commit("set_token", res.token);
        this.$router.push("home");
        // console.log('token');
        // console.log(this.$store.state.token);
        // console.log(this.$store.state.username)
      });
    },
    // 注册
    async register() {
      const { data: res } = await this.$http.post("/account/register", {
        reg_username: this.regForm.reg_username,
        reg_password: this.regForm.reg_password,
        reg_nickname: this.regdataForm.reg_nickname,
        reg_sex: this.regdataForm.reg_sex,
        reg_phone: this.regdataForm.reg_phone,
      });
      if (res.code !== 200) return this.$message.error("注册失败，请重试！");
      else if (res.code == 200) {
        this.getmessageid();
        this.$message.success("注册成功！");
        setTimeout(() => {
          this.loginorregister = 0;
        }, 1000);
      }
      // console.log(res);
    },
    // 获取所有消息id
    async getmessageid() {
      const { data: res } = await this.$http.post("/account/selectmessageid", {
        username: this.regForm.reg_username,
      });
      if (res.code == 200) {
        this.messageid = res.data;
        this.addmessage()
      }
      // console.log(this.messageid);
    },
    // 给新用户添加未读消息
    addmessage() {
      this.messageid.forEach(async(element) => {
        const { data: res } = await this.$http.post("/account/addmessage", {
          message_id: element.id,
          username: this.regForm.reg_username
        });
        // console.log(res)
      });
    },
    // 找回密码
    contactroot() {
      this.$alert("请联系管理员重置此账号密码", "提示", {
        confirmButtonText: "确定",
      });
    },
    // 注册下一步
    nextone() {
      this.$refs.regFormRef.validate(async (valid) => {
        const { data: res } = await this.$http.post("/account/selectusername", {
          username: this.regForm.reg_username,
        });
        if (res.code == 200) {
          this.$message.error(
            this.regForm.reg_username + "，该用户名已被注册，请修改！"
          );
        } else {
          if (!valid) return;
          this.active = 1;
        }
      });
    },
    // 注册第二步下一步
    nexttwo() {
      this.$refs.regdataFormRef.validate(async (valid) => {
        if (!valid) return;
        this.active = 2;
      });
    },
  },
};
</script>

<style scoped>
.login {
  color: rgb(96, 98, 102);
  background-color: #f3f6fe;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logoimg {
  box-shadow: 0 0 10px #e6ecfa;
  margin-top: 30px;
  width: 60px;
  height: 60px;
  border-radius: 12px;
}
.loginbox {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 10px #e6ecfa;
  margin-top: 32px;
  width: 400px;
}
.login-title {
  font-size: 24px;
  font-weight: 600;
  margin-top: 36px;
  text-align: center;
}
.login-subtitle {
  color: #aaa;
  font-size: 14px;
  margin-top: 12px;
  padding: 0 12px;
  text-align: center;
}
.login-input {
  margin: 32px 40px;
}
.nouser {
  font-size: 14px;
  float: left;
  cursor: default;
  color: #aaa;
  margin-bottom: 30px;
}
.subnouser {
  color: #5da7f1;
  cursor: pointer;
  float: left;
  font-size: 14px;
}
.subpwd {
  color: #5da7f1;
  cursor: pointer;
  float: right;
  font-size: 14px;
  margin-top: 0;
}
.forgestpwd {
  margin-left: 260px;
}
::v-deep .el-step__title {
  font-size: 12px;
  margin-left: -15px;
}
::v-deep .el-steps--horizontal {
  width: 50%;
  margin: 10px auto;
  color: #aaa;
}
.reg_form {
  margin-right: 63px;
  margin-top: 20px;
}
::v-deep .el-form-item__label {
  color: #767474;
}
.btn {
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.btn1 {
  width: 400px;
  display: flex;
  justify-content: center;
}
.agree {
  color: #aaa;
  font-size: 12px;
}
.subtitle {
  margin: 0 5px;
  cursor: pointer;
  color: #5da7f1;
}
</style>