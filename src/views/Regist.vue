<template>
  <div>
    <form-comp formType="regist" @onClick="onRegist" />
  </div>
</template>

<script>
import FormComp from "../components/Form.vue";
import { API_USER_REGIST } from "@/api.config.js";
export default {
  components: {
    FormComp,
  },
  methods: {
    async onRegist(info) {
      console.log(info);
      const { code, msg } = await this.$axios.post(API_USER_REGIST, {
        info,
      });
      // console.log(code, msg);
      // alert(msg);
      this.$showToast({
        msg,
      });
      if (code === 1) {
        //注册成功
        this.$router.push("/profile/login");
      }
    },
  },
};
</script>

<style>
</style>