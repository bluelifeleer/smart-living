<template>
  <div class="login-container">
    <div class="login-form-box">
      <div class="login-form-items" v-for="(form,key,$index) in logins" :key="$index">
        <label for="key" v-if="(key=='phone')">{{form.label}}</label>
        <label for="key" v-else-if="(key=='password'&&loginType==1)">{{form.label}}</label>
        <label for="key" v-else-if="(key=='msgCode'&&loginType==2)">{{form.label}}</label>
        <!-- <label for="key" v-else>{{form.label}}</label> -->
        <div class="login-form-input-boxs" v-if="(key=='phone')">
          <v-touch tag="a" href="javascript:void(0);" class="select-area-code" @tap="selectAreaCode($event)">{{areaCode.code}}</v-touch>
          <input :type="form.type" :name="form.name" v-model="form.value" :placeholder="form.placeholder" style="float:left;width:40%;" />
        </div>
        <div class="login-form-input-boxs" v-else-if="(key=='password'&&loginType==1)">
          <input :type="form.type" :name="form.name" v-model="form.value" :placeholder="form.placeholder" />
        </div>
        <div class="login-form-input-boxs" v-else-if="(key=='msgCode'&&loginType==2)">
          <input :type="form.type" :name="form.name" v-model="form.value" :placeholder="form.placeholder" style="float:left;width:40%;" />
          <v-touch tag="a" href="javascript:void(0);" class="send-msg-code" v-if="!countTimer.enable">{{countTimer.nums}}s</v-touch>
          <v-touch tag="a" href="javascript:void(0);" class="send-msg-code" @tap="sendMsgCode($event)" v-else :class="{'send-msg-code-active':countTimer.enable}">发送验证码</v-touch>
        </div>
        <!-- <div class="login-form-input-boxs" v-else>
          <input :type="form.type" :name="form.name" v-model="form.value" :placeholder="form.placeholder" />
        </div> -->
      </div>
      <div class="login-form-items">
        <v-touch tag="a" href="javascript:void(0);" class="login-form-submit" @tap="loginFormSubmit($event)">登录</v-touch>
      </div>
      <div class="login-form-items">
        <v-touch tag="a" href="javascript:void(0);" class="forget-password" @tap="forgetPassword($event)">忘记密码</v-touch>
      </div>
      <div class="login-form-items">
        <v-touch tag="a" href="javascript:void(0);" class="msg-login" @tap="msgLogin($event)">{{loginText}}</v-touch>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginType: 1,
      loginText: '短信登录',
      countTimer: {
        enable: true,
        timer: null,
        nums: 60,
      },
      areaCode: {
        "city": "中国大陆",
        "code": "+86"
      },
      logins: {
        phone: {
          label: '手机号',
          type: 'text',
          name: 'phone',
          value: '',
          placeholder: '输入手机号'
        },
        password: {
          label: '密码',
          type: 'password',
          name: 'password',
          value: '',
          placeholder: '输入密码'
        },
        msgCode: {
          label: '验证码',
          type: 'text',
          name: 'msgCode',
          value: '',
          placeholder: '短信验证码'
        }
      }
    }
  },
  components: {},
  created() {
    let areaCode = JSON.parse(sessionStorage.getItem('areaCode')) || null
    this.areaCode = areaCode ? areaCode : {
      "city": "中国大陆",
      "code": "+86"
    }
  },
  methods: {
    selectAreaCode(e) {
      this.$router.push({
        path: '/areacode'
      })
    },
    sendMsgCode() {
      if (!this.logins.phone.value) {
        this.$toast({
          type: "error",
          message: '手机号不能为空',
          icon: 'cross'
        })
      } else {
        if (!(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(this.logins.phone.value))) {

          this.$toast({
            type: "error",
            message: '手机号格式错误',
            icon: 'cross'
          })
        } else {
          this.$toast.allowMultiple()
          let loading = this.$toast.loading({
            message: '',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
          });
          let _this = this
          this.$http({
            url: '/msg/send',
            method: 'post',
            data: {
              account: this.logins.phone.value,
              scene: 1, // 登陆
              client: 1, // 客户端
              type: 1, // 验证码
              env: 'dev' // 发送短信使用标识；'dev'：开发环境，'pro'：测试环境
            }
          }).then(res => {
            loading.clear()
            if (res.data.code && res.data.success) {
              this.$toast({
                type: "success",
                message: '验证码发送成功',
                icon: 'success'
              })
              this.countTimer.timer = setInterval(function() {
                if (_this.countTimer.nums <= 0) {
                  clearInterval(_this.countTimer.timer)
                  _this.countTimer.enable = true
                } else {
                  _this.countTimer.enable = false
                  _this.countTimer.nums--
                }
                console.log(_this.countTimer.nums)
              }, 1000)
            } else {
              this.$toast({
                type: "error",
                message: '验证码发送失败',
                icon: 'cross'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    forgetPassword(e) {},
    msgLogin(e) {
      this.loginType = this.loginType == 1 ? 2 : 1
      this.loginText = this.loginType == 1 ? '短信登录' : '密码登录'
    },
    loginFormSubmit(e) {}
  },
  mounted() {}
}

</script>
<style scoped>
.login-container {
  width: 100%;
  height: auto;
}


.login-form-box {
  width: 80%;
  height: auto;
  padding: 10%;
  margin: 0 auto;
}

.login-form-items {
  width: 100%;
  height: auto;
  margin: 0 0 20px 0;
}

.login-form-items label {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #14151a;
}

.login-form-items .login-form-input-boxs {
  display: block;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #e1e1e1;
}

.login-form-items .login-form-input-boxs input {
  display: block;
  width: 100%;
  height: 48px;
  lin-height: 48px;
  font-size: 17px;
  color: #14151a;
}

.select-area-code {
  display: block;
  float: left;
  width: 80px;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  color: #18191d;
  position: relative;
}

.select-area-code:before {
  display: block;
  width: 20px;
  height: 20px;
  font-family: "iconfont";
  content: "\e851";
  line-height: 20px;
  text-align: center;
  position: absolute;
  right: 24px;
  top: 15px
}

.select-area-code:after {
  display: block;
  width: 1px;
  height: 20px;
  content: "";
  background: #dfdfdf;
  position: absolute;
  right: 10px;
  top: 15px
}

.send-msg-code {
  display: block;
  float: right;
  width: 100px;
  height: 27px;
  line-height: 27px;
  text-align: center;
  border: 1px solid #fafafa;
  border-radius: 5px;
  background: #fafafa;
  color: #a3a4a6;
  font-size: 15px;
  margin: 10px 0;
}

.send-msg-code-active {
  border: 1px solid #3b87f5;
  color: #FFF;
  background: #3b87f5;
}

.login-form-submit {
  display: block;
  width: 100%;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #FFF;
  border: 1px solid #3b87f5;
  border-radius: 5px;
  background: #3b87f5;
  font-size: 17px;
}

.forget-password {
  display: block;
  width: 100%;
  height: 28px;
  line-height: 28px;
  text-align: left;
  color: #9fa0a2;
  font-size: 15px;
}

.msg-login {
  display: block;
  width: 100%;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #468add;
  font-size: 15px;
  margin: 50px auto;
}

</style>
