<template>
  <div class="login">
    <!-- 登录 -->
    <div class="login_container">
      <div class="login_all">
        <div class="login_pic">
          <img src="../assets/picture/login.png" alt="" />
        </div>
        <div class="login_box">
          <p class="login_p">登&nbsp;录</p>
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
          >
            <el-form-item prop="username">
              <el-input placeholder="请输入用户名" v-model="loginForm.username">
                <!-- <template slot="prepend">账号：</template> -->
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <!-- <el-input
              v-model="loginForm.password"
              type="password"
              >
              <template slot="prepend">密码：</template>
              </el-input> -->
              <el-input
                placeholder="请输入密码"
                v-model="loginForm.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-link class="login_reg" @click="regDialogVisible = true"
              >立即注册<i class="el-icon-s-promotion el-icon--right"></i>
            </el-link>
            <el-form-item class="btns">
              <el-button type="primary" @click="login" round>登录</el-button>
              <el-button type="info" @click="resetLoginForm" round
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 注册 -->
    <el-dialog title="注册" :visible.sync="regDialogVisible" width="50%" center>
      <el-form
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
        <!-- <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item> -->
        <el-collapse>
          <el-collapse-item title="展开更多（非必填选项）" name="1">
            <el-form-item label="手机号码" prop="reg_phone">
              <el-input
                v-model="regForm.reg_checkPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="reg_email">
              <el-input
                v-model="regForm.reg_checkPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="regDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="register">注 册</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    // 注册两次密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regForm.reg_checkPassword !== "") {
          this.$refs.regFormRef.validateField("reg_checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.reg_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 注册页面的dialog
      regDialogVisible: false,
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
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
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
    };
  },
  components: { Qs },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        // let formData = new FormData;
        // formData.append("username", this.loginForm.username);
        // formData.append("password", this.loginForm.password);
        console.log(Qs.stringify(this.loginForm));
        const { data: res } = await this.$http.post(
          "account/login",
          Qs.stringify(this.loginForm)
        );

        if (res.code !== 200) return this.$message.error("账号或密码错误!");
        this.$message.success("登录成功！");
        console.log('账户数据：')
        console.log(res)
        this.$store.commit('set_username',res.data.username)
        this.$store.commit('set_token',res.token);
        this.$router.push("home");
        // console.log('token');
        // console.log(this.$store.state.token);
        // console.log(this.$store.state.username)
      });
    },
    register() {
      this.regDialogVisible = false;
      this.$refs.regFormRef.validate(async (valid) => {
        if (!valid) return;
        console.log("reg_log");
        console.log(this.regForm.reg_username);
        console.log(this.regForm.reg_password);
        // let formData = new FormData;
        // formData.append("reg_username", this.regForm.reg_username);
        // formData.append("password", this.regForm.password);
        console.log(Qs.stringify(this.regForm));
        const { data: res } = await this.$http.post(
          "register",
          Qs.stringify(this.regForm)
        );
        console.log(res);
        if (res.code !== 200) return this.$message.error("注册失败，请重试！");
        this.$message.success("注册成功！");
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.login {
  background-color: #d3e9fe;
  height: 100%;
  width: 100%;
}
.login_all {
  width: 956px;
  height: 500px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_pic {
  width: 430px;
  height: 500px;
  float: left;
}
.login_pic img {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 100%;
  height: 100%;
}
.login_p {
  text-shadow:5px 1px 6px #5da7f1;
  margin-top: 120px;
  margin-left: 100px;
  font-size: 20px;
}
.login_box {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  float: left;
  width: 525.8px;
  height: 500px;
  background-color: rgb(255, 255, 255);
}
.login_form {
  margin-left: 100px;
  margin-right: 100px;
}
.login_reg {
  float: right;
}
.btns {
  margin-top: 60px;
}
.el-button--primary {
  margin-left: 40px;
  width: 120px;
}

.reg_form {
  width: 70%;
  margin: 0 auto;
}
</style>