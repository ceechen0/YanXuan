<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="logo"></div>
      <div class="search" @click="$router.push('/search')">
        <i class="iconfont icon-sousuo"></i>
        <span class="placeholoder">搜索商品，共{{ total }}款好物</span>
      </div>
      <div v-if="userinfo" class="cart" @click="goCart">
        <i class="iconfont icon-gouwuche"></i>
        <span class="cart-num" v-if="cartNum > 0">{{ cartNum }}</span>
      </div>
      <div class="login" v-else @click="login">登录</div>
    </div>

    <!-- 触底加载滚动区域 -->
    <div class="scroll-container" ref="scroll-container">
      <div class="scroll-inner" ref="scroll-inner">
        <!-- 轮播图 -->
        <swiper
          height="3.7rem"
          :list="bannerList"
          class="swiper"
          @onClick="swiperClick"
        />
        <!-- 首页信息 -->
        <!-- 首页信息-服务信息 -->
        <div
          class="service-policy"
          v-if="
            info &&
            info.commonConfigModule &&
            info.commonConfigModule.brandDescPicUrl
          "
        >
          <img :src="info.commonConfigModule.brandDescPicUrl" alt="" />
        </div>
        <!-- 首页信息-分类列表 -->
        <ul class="kingkong" v-if="info && info.kingKongAreaV4">
          <li
            class="kingkong-item"
            v-for="(item, index) in info.kingKongAreaV4.slice(0, 10)"
            :key="index"
          >
            <img :src="item.picUrls[0]" alt="" />
            <div class="title">{{ item.title }}</div>
          </li>
        </ul>
        <!-- 首页信息-大Banner -->
        <div
          class="operation-cfg"
          v-if="info && info.staticResource && info.staticResource.pic"
        >
          <img :src="info.staticResource.pic" alt="" />
        </div>
        <!-- 首页信息-商品展示 -->
        <div class="rcmd" v-if="rcmdItemList.length > 0">
          <div class="rcmd-title">推荐商品</div>
          <div class="rcmd-list">
            <product
              v-for="(item, index) in rcmdItemList"
              :key="index"
              :item="item.categoryItem"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <nav-footer />

    <!-- 触底加载页面 -->
    <loading v-show="isLoading" />

    <!-- 回到顶部 -->
    <div class="to-top" @click="backToTop"></div>
  </div>
</template>

<script>
import NavFooter from "../components/NavFooter.vue";
import Swiper from "../components/Swiper.vue";
import Product from "../components/Product.vue";
import Loading from "../components/Loading.vue";
import {
  API_HOME,
  API_HOME_TOTAL_NUM,
  API_HOME_RCMD,
  API_CART_NUM,
} from "@/api.config.js";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      total: "", //当前商品总数
      bannerList: [], //轮播图的地址
      info: {}, //首页信息
      rcmdItemList: [], //获取的推荐商品列表
      isLoading: false, //是否显示触底加载页面 默认false
    };
  },
  components: {
    NavFooter,
    Swiper,
    Product,
    Loading,
  },
  computed: {
    ...mapState(["cartNum", "userinfo"]),
  },
  methods: {
    ...mapMutations(["initCartNum", "setUserinfo"]),
    swiperClick(item) {
      console.log(item);
    },
    async getTotalNums() {
      //获取搜索框总物品数
      const total = await this.$axios.get(API_HOME_TOTAL_NUM);
      // console.log(res.data.data);
      this.total = total;
    },
    async getHomeinfo() {
      //获取首页信息
      const res = await this.$axios.get(API_HOME);
      // console.log(res);
      this.info = res;
      this.bannerList = res.focus.map((item) => item.img);
    },
    async getRcmdInfo(lastItemId = 0, size = 20) {
      //获取商品信息
      this.isLoading = true;
      const { rcmdItemList } = await this.$axios.post(API_HOME_RCMD, {
        lastItemId, //最后一个商品的id
        size, //一次分页显示多少商品
      });
      // console.log(res);
      this.rcmdItemList = this.rcmdItemList.concat(rcmdItemList);
      // console.log(rcmdItemList);
      // this.rcmdItemList.forEach((item) => {
      //   console.log(item.categoryItem.name);
      // });
      this.isLoading = false;
    },
    initScroll() {
      const scrollTop = this.scrollContainer.scrollTop; //滚动过的高度
      this.scrollInnerH = this.scrollInner.scrollHeight; //整个滚动区域的高度
      //当滚过的高度加上固定视区的高度等于整个滚动区域高度时
      if (scrollTop + this.scrollContainerH + 1 >= this.scrollInnerH) {
        // console.log("触底了");
        this.getRcmdInfo(this.rcmdItemList[this.rcmdItemList.length - 1].id);
      }
    },
    //防抖函数 防止短时间内多次触发一个函数 防抖函数只会执行最后一次函数
    debounce(fn, delay) {
      let timer = null;
      return () => {
        if (timer !== null) {
          clearInterval(timer);
        }
        timer = setTimeout(fn, delay);
      };
    },
    //节流函数 指定时间间隔内，只会执行一次
    throttle(fn, delay) {
      let startTime = 0;
      return () => {
        const nowTime = Date.now();
        if (nowTime - startTime > delay) {
          startTime = nowTime;
          fn();
        }
      };
    },
    //回到顶部
    backToTop() {
      const timer = setInterval(() => {
        this.scrollContainer.scrollTop = this.scrollContainer.scrollTop - 100;
        if (this.scrollContainer.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 17);
    },
    async getCartNum() {
      const res = await this.$axios.get(API_CART_NUM);
      if (res) {
        this.initCartNum(res.num);
        this.setUserinfo(res.user);
      }
    },
    login() {
      this.$router.push("/profile/login");
    },
    goCart() {
      this.$router.push("/cart");
    },
  },
  created() {
    this.getTotalNums();
    this.getHomeinfo();
    this.getRcmdInfo();
    this.getCartNum();
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollContainer = this.$refs["scroll-container"];
      this.scrollInner = this.$refs["scroll-inner"];
      this.scrollContainerH = this.scrollContainer.clientHeight; //固定的视区的高度
      this.scrollContainer.addEventListener(
        "scroll",
        this.debounce(this.initScroll, 300)
      );
    });
  },
  destroyed() {
    this.scrollContainer.removeEventListener("scroll", this.initScroll);
  },
};
</script>

<style lang='scss' scoped>
.header {
  z-index: 999;
  height: 0.88rem;
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: $colorA;
  box-sizing: border-box; //变成怪异盒模型显示 整个大小固定 只会往内挤
  .logo {
    width: 1.38rem;
    height: 0.4rem;
    background-image: url("../assets/img/logo.png");
    background-size: cover;
  }
  .search {
    flex: 1;
    background-color: #ededed;
    margin: 0 0.2rem;
    border-radius: 0.08rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-sousuo {
      font-size: $fontB;
      color: $colorC;
      margin-right: 0.1rem;
    }
    .placeholoder {
      color: $colorF;
      font-size: $fontB;
    }
  }
  .login {
    width: 0.72rem;
    height: 0.38rem;
    line-height: 0.38rem;
    text-align: center;
    color: $colorB;
    border: 1px solid $colorB;
    border-radius: 0.08rem;
    font-size: $fontB;
  }
}

.kingkong {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  &-item {
    width: 1.1rem;
    height: 1.56rem;
    margin: 0.1rem 0.2rem;
    text-align: center;
    img {
      width: 100px;
    }
    .title {
      color: $colorC;
      font-size: $fontA;
      white-space: nowrap;
    }
  }
}
.rcmd {
  background-color: $colorA;
  &-title {
    text-align: center;
    padding: 0.2rem 0;
    font-weight: 700;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 0.2rem;
  }
}

.scroll {
  &-container {
    position: absolute;
    top: 0.88rem;
    bottom: 0.97rem;
    left: 0;
    right: 0;
    overflow-y: scroll;
  }
}

.to-top {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../assets/img/to-top.png");
  background-size: 0.8rem 0.8rem;
  position: fixed;
  right: 0.2rem;
  bottom: 1.4rem;
  z-index: 99;
}

.cart {
  position: relative;
  .iconfont {
    font-size: 0.56rem;
  }
  &-num {
    width: 0.36rem;
    height: 0.36rem;
    border-radius: 50%;
    background-color: $colorB;
    text-align: center;
    line-height: 0.36rem;
    color: $colorA;
    position: absolute;
    top: 0.1rem;
    right: -0.1rem;
    font-size: $fontA;
  }
}
</style>