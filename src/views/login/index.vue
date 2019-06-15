<template>
  <div class="bg" :style="{backgroundImage:'url('+siteInfo.image_url+')'}">
    <div class="login-box">
      <div class="logo">
        <img :src="siteInfo.login_url" alt>
      </div>

      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
          'account',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'passwd',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'value',
          { rules: [{ required: true, message: 'Please input your captcha!' }] }
        ]"
          ></a-input>
          <img :src="captchaImg" alt @click="getCaptcha">
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
          >Remember me</a-checkbox>
          <a class="login-form-forgot" href>Forgot password</a>
          <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>Or
          <a href>register now!</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { captcha, getSiteInfo, } from "@/api/user";
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      siteInfo: {},
      captchaImg: ""
    };
  },

  mounted() {
    this.getCaptcha();
    this.getSiteInfo();
  },
  methods: {
    getSiteInfo() {
      getSiteInfo().then(res => {
        this.siteInfo = res.data[0];
      });
    },
    getCaptcha() {
      captcha().then(res => {
        this.captchaImg = res.data[0];
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        $store: { dispatch }
      } = this;

      this.form.validateFields((err, values) => {
        if (!err) {
          const data = this.form.getFieldsValue();
          dispatch("login", data).then((res)=>{
            this.$router.push('/')
          });
        }
      });
    },
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
<style lang="less" scoped>
.bg {
  min-height: 100vh;
  overflow: hidden;
  background-position: top center;
  .login-box {
    width: 400px;
    margin: 200px auto;
    background: #fff;
    padding: 30px;
    .logo {
      img {
        width: 335px;
      }
    }
    .login-form {
      margin-top: 20px;
    }
  }
}
</style>
