<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="用户名"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <Toutiaoicon icon="shouji"></Toutiaoicon>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="密码"
        :rules="rules.code"
        required
        maxlength="6"
        type="number"
      >
        <template #left-icon>
          <Toutiaoicon icon="yanzhengma"></Toutiaoicon>
        </template>

        <template #button>
          <van-count-down
            :time="5000"
            format="ss 秒"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            size="small"
            type="primary"
            class="send-sms-btn"
            native-type="button"
            @click="sendSmsCode"
            :loading="isDisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/uesr";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  props: {},
  data() {
    return {
      isDisabled: false,
      isShowCountDown: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        Toast.success("登录成功");
        console.log(res);
      } catch (e) {
        // console.log(e);
        Toast.fail(e?.response?.data?.message || "服务器走神了");
      }
    },
    async sendSmsCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisabled = true;
        await getSmsCode(this.user.mobile);
        this.isShowCountDown = true;
        Toast.success("发送验证码成功");
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "服务器走神了");
        this.isShowCountDown = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
