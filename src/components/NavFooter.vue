<template>
  <div class="nav">
    <router-link to="/" class="nav-item">
      <i class="iconfont icon-shouye"></i>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="nav-item">
      <i class="iconfont icon-fenlei"></i>
      <div>分类</div>
    </router-link>
    <router-link to="/cart" class="nav-item">
      <i class="iconfont icon-gouwuche"></i>
      <div>购物车</div>
    </router-link>
    <router-link to="/profile/login" class="nav-item">
      <i class="iconfont icon-geren"></i>
      <div>个人</div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.97rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $colorA;
  border: 1px solid #d9d9d9;
  line-height: 1.4;
  &-item {
    flex: 1;
    text-align: center;
    outline: none;
    div {
      color: $colorF;
    }
    .iconfont {
      font-size: $fontD;
      color: $colorF;
    }
  }
  .router-link-exact-active {
    div {
      color: $colorB;
    }
    &:active {
      //去掉点击时背景颜色有默认色
      -webkit-tap-highlight-color: transparent;
    }
    .iconfont {
      color: $colorB;
    }
  }
}
</style>