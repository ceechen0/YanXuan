<template>
  <div>
    <div class="cate">
      <!-- 左边主分类表 -->
      <ul class="cate-nav">
        <li
          class="cate-nav-item"
          v-for="(item, index) in categoryList"
          :key="index"
          :class="{ active: actived === index }"
          @click="select(index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <!-- 右边子分类表 -->
      <ul class="cate-list">
        <li
          class="cate-list-item"
          v-for="sub in categoryGroupList"
          :key="sub.id"
        >
          <div class="title">{{ sub.name }}</div>
          <ul class="sub-item">
            <li
              class="sub-item-detail"
              v-for="item in sub.categoryList"
              :key="item.id"
              @click="getSubList(item.id)"
            >
              <img class="banner" :src="item.prettyBannerUrl" alt="" />
              <div class="name">{{ item.name }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <nav-footer />
    <loading v-show="isLoading" />
  </div>
</template>

<script>
import { API_CATE, API_CATE_SUB } from "@/api.config.js";
import NavFooter from "../components/NavFooter.vue";
import Loading from "../components/Loading.vue";
export default {
  data() {
    return {
      categoryList: [], //获取主分类列表
      actived: 0, //当前选中的主分类
      categoryGroupList: [], //子分类列表
      isLoading: false,
    };
  },
  methods: {
    async getCategory() {
      this.isLoading = true;
      const { categoryList } = await this.$axios.get(API_CATE);
      this.categoryList = categoryList;
      console.log(categoryList);
      this.getSubCategory(categoryList[0].id);
      this.isLoading = false;
    },
    select(index) {
      this.actived = index;
    },
    //获取子分类列表
    async getSubCategory(categoryId) {
      const {
        category: { categoryGroupList },
      } = await this.$axios.post(API_CATE_SUB, {
        categoryId,
      });
      this.categoryGroupList = categoryGroupList;
      // console.log(categoryGroupList);
    },
    getSubList(subId) {
      this.$router.push(
        `/cateDetail/${this.categoryList[this.actived].id}/${subId}`
      );
    },
  },
  watch: {
    actived() {
      this.getSubCategory(this.categoryList[this.actived].id);
    },
  },
  components: {
    NavFooter,
    Loading,
  },
  created() {
    this.getCategory();
  },
};
</script>

<style lang='scss' scoped>
.cate {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.97rem;
  background-color: $colorA;
  display: flex;
  &-nav {
    width: 1.4rem;
    padding: 0.2rem 0;
    margin-right: 0.2rem;
    &-item {
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      margin-top: 0.4rem;
      color: $colorC;
    }
    .active {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0.08rem;
        background-color: #ab2b2b;
      }
    }
  }
  &-list {
    flex: 1;
    overflow-y: scroll;
    padding: 0.2rem;
    border-left: 1px solid $colorE;
    &-item {
      margin-bottom: 0.3rem;
      .title {
        color: $colorC;
        font-weight: 700;
        border-bottom: 1px solid $colorE;
      }
      .sub-item {
        display: flex;
        flex-wrap: wrap;
        &-detail {
          width: 1.4rem;
          margin: 0.4rem 0.4rem 0 0;
          text-align: center;
          .banner {
            width: 1.2rem;
            height: 1.2rem;
          }
          .name {
            font-size: $fontA;
          }
        }
      }
    }
  }
}
</style>