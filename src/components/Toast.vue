<template>
  <div class="Toastcontainer" v-show="show">
    <div class="toast">
      <div class="msg">{{ msg }}</div>
      <div class="btn" v-show="btnShow">
        <div class="btn-cancel" @click="cancel">取消</div>
        <div class="btn-confirm" @click="confirm">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false, //toast是否显示
      msg: "", //显示提示信息
      btnShow: false, //按钮是否显示
      callback: null, //点击确定时的回调函数
    };
  },
  watch: {
    show() {
      if (this.show && !this.btnShow) {
        setTimeout(() => {
          this.show = false;
        }, 1000);
      }
    },
  },
  methods: {
    cancel() {
      this.show = false;
    },
    confirm() {
      this.cancel();
      this.$nextTick(() => {
        this.callback && this.callback();
      });
    },
  },
};
</script>

<style lang='scss' scpoed>
.Toastcontainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  .toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(7, 17, 27, 0.8);
    border-radius: 0.1rem;
    color: $colorA;
    padding: 0.2rem 0.6rem;
    text-align: center;
    .btn {
      height: 0.8rem;
      display: flex;
      align-items: center;
      color: $colorA;
      margin-top: 0.4rem;
      border-top: 1px solid $colorA;
      div {
        flex: 1;
        width: 2rem;
      }
      &-cancel {
        border-right: 1px solid $colorA;
      }
    }
  }
}
</style>