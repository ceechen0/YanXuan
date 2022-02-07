<template>
  <div>
    <form-comp formType="login" @onClick="onLogin" />
  </div>
</template>

<script>
import FormComp from "../components/Form.vue";
import { API_USER_LOGIN } from "@/api.config.js";
export default {
  components: {
    FormComp,
  },
  methods: {
    async onLogin({ username, password }) {
      const { code, msg, user } = await this.$axios.post(API_USER_LOGIN, {
        username,
        password,
      });
      if (code === 0) {
        //未登录
        // alert(msg);
        this.$showToast({
          msg,
        });
      } else if (code === 1) {
        //登录成功
        // alert("登录成功");
        this.$showToast({
          msg: "登录成功",
        });
        // console.log(user);
        //保存用户信息到vuex
        this.$store.commit("setUserinfo", user);
        //路由回退上一步
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style>
</style>