<template>
  <div class="login-box">
    <div class="login-form">
      <p class="login-title">用户登录</p>
      <p class="login-en">USER LOGIN</p>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="ruleForm.username"
            size="large"
            suffix-icon="iconfont icon-yonghu"
            @keyup.enter.native="submitForm('ruleForm')"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            suffix-icon="iconfont icon-mima"
            @keyup.enter.native="submitForm('ruleForm')"
            size="large"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ruleForm.savepwd">记住密码</el-checkbox>
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            :loading="loginOff"
            @click="submitForm('ruleForm')"
            >{{ loginTxt }}</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loginOff: false,
      loginTxt: '登录',
      ruleForm: {
        username: '',
        password: '',
        savepwd: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginOff = true
          this.loginTxt = '登录中...'
          if (
            this.ruleForm.username === 'admin' &&
            this.$md5(this.ruleForm.password) === this.$md5('12345')
          ) {
            if (this.ruleForm.savepwd) {
              // 记住密码7天过期 通过base64加密，md5无法反解
              // { username: this.ruleForm.username, password: this.$md5(this.ruleForm.password), savepwd: this.ruleForm.savepwd }
              this.Cookies.set(
                'savePw',
                {
                  username: this.ruleForm.username,
                  password: this.$base64.encode(this.ruleForm.password),
                  savepwd: this.ruleForm.savepwd
                },
                { expires: 7 }
              )
            } else {
              this.Cookies.set('savePw', '')
            }
            let user = 'userToken23123123'
            this.Cookies.set('userToken', user)
            this.$store.commit('setUserToken', user)
            this.$router.push({ name: 'home' })
          } else {
            this.loginOff = false
            this.loginTxt = '登录'
            this.$message({
              showClose: true,
              center: true,
              message: '账号或密码有误，请重新输入',
              type: 'error'
            })
          }
        } else {
          this.$message({
            showClose: true,
            center: true,
            message: '请检查输入是否正确',
            type: 'error'
          })
          return false
        }
      })
    }
  },
  created () {},
  mounted () {
    this.remPw = this.Cookies.get('savePw')
    if (this.remPw) {
      // console.log("记住");
      // console.log(JSON.parse(this.remPw))
      this.remForm = JSON.parse(this.remPw)
      this.ruleForm = {
        username: this.remForm.username,
        password: this.$base64.decode(this.remForm.password),
        savepwd: this.remForm.savepwd
      }
      // console.log(this.ruleForm)
    } else {
      // console.log("忘记");
      this.ruleForm = {
        username: '',
        password: '',
        savepwd: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  min-width: 1100px;
  min-height: 590px;
  background: url("../../assets/icons/login/bg.png") no-repeat center center;
  background-size: 100% 100%;
  .login-form {
    padding: 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.8);
    position: fixed;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 4px;
    .login-title {
      margin: 0;
      font-size: 28px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: #4452d5;
      line-height: 40px;
    }
    .login-en {
      margin: 0;
      font-size: 18px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: #b0b0b0;
    }
    .ms-content {
      padding: 30px 0;
      .el-input {
        width: 300px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #484848;
      }
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 30px;
    }
    .login-btn {
      width: 100%;
      .el-button {
        width: 100%;
        height: 40px;
        background: rgba(68, 82, 213, 1);
        border-radius: 4px;
        font-size: 16px;
      }
    }
  }
}
</style>
