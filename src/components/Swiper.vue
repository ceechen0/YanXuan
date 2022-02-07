<template>
  <div
    class="swiper"
    :style="{ height: height }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- 图片容器 -->
    <ul class="swiper-slide" :style="slideStyle">
      <li
        class="swiper-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{ width: itemWidth + 'px' }"
        @click="handleClick(item)"
      >
        <img :src="item" />
      </li>
    </ul>
    <!-- 分页器 -->
    <ul class="swiper-dots" v-if="options.showDots">
      <li
        class="dots-item"
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: nowIndex === index }"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideStyle: { width: "15rem" },
      itemWidth: 750, //单张图片的宽度
      nowIndex: 0, //当前选中元素的索引
      timer: null, //轮播图播放定时器
      touchStart: {}, //触摸开始时的位置
      touchEnd: {}, //触摸结束时的位置
    };
  },
  watch: {
    //监听list 当图片数组发生改变时重新计算slider的宽度
    list() {
      this.calcWidth();
    },
  },
  props: {
    height: {
      type: String,
      default: "3rem",
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Object,
      default() {
        return {
          showDots: true, //是否显示分页器
          interval: 3000, //轮播的间隔时间
          autoplay: true, //是否自动播放
        };
      },
    },
  },
  methods: {
    //计算slide的宽度
    calcWidth() {
      this.$nextTick(() => {
        //计算一张图片的宽度
        this.itemWidth = document.body.clientWidth;
        const length = this.list.length;
        this.slideStyle.width = this.itemWidth * length + "px";
      });
    },
    //slider移动的函数
    move() {
      this.slideStyle.transform = `translateX(-${
        this.itemWidth * this.nowIndex
      }px)`;
    },
    //自动播放
    autoMove() {
      if (this.options.autoplay) {
        this.timer = setInterval(() => {
          this.nowIndex++;
          if (this.nowIndex > this.list.length - 1) {
            this.nowIndex = 0; //如果播放到最后一张，就回到第一张
          }
          this.move();
        }, this.options.interval);
      }
    },
    onTouchStart(e) {
      //开始触摸点的信息
      this.touchStart = e.changedTouches[0];
      //   console.log(this.touchStart);
      //触摸时暂时关闭自动播放
      if (this.options.autoplay) {
        clearInterval(this.timer);
      }
    },
    onTouchEnd(e) {
      //结束时触摸点的信息
      this.touchEnd = e.changedTouches[0];
      //判断左滑还是右滑
      if (this.touchEnd.clientX - this.touchStart.clientX > 30) {
        this.nowIndex--;
        if (this.nowIndex < 0) {
          this.nowIndex = this.list.length - 1;
        }
      } else if (this.touchEnd.clientX - this.touchStart.clientX < -30) {
        this.nowIndex++;
        if (this.nowIndex > this.list.length - 1) {
          this.nowIndex = 0;
        }
      }
      this.move();
      this.autoMove();
    },
    handleClick(item) {
      this.$emit("onClick", item);
    },
  },
  mounted() {
    this.calcWidth(),
      this.autoMove(),
      window.addEventListener("resize", this.calcWidth);
  },
  destroyed() {
    if (this.options.autoplay) {
      clearInterval(this.timer);
    }
    window.removeEventListener("resize", this.calcWidth);
  },
};
</script>

<style lang='scss' scoped>
.swiper {
  overflow: hidden;
  position: relative;
  &-slide {
    height: 100%;
    transition: transform 0.5s ease;
    .swiper-item {
      float: left;
      list-style: none;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-dots {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.16rem;
    .dots-item {
      width: 0.4rem;
      height: 0.04rem;
      background-color: $colorA;
      opacity: 0.4;
      float: left;
      margin: 0 0.04rem;
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>