<template>
  <div>
    <header-comp />
    <div class="order-detail" v-if="orderDetail">
      <div class="item" v-for="item in orderDetail.list" :key="item._id">
        <img :src="item.pic" class="pic" />
        <div class="detail">
          <div class="name">{{ item.name }}</div>
          <div class="price">￥{{ item.price }}</div>
        </div>
      </div>
      <div class="footer">
        <div class="total">应付:￥{{ orderDetail.total }}</div>
        <div class="confirm" @click="pay">去付款</div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_ORDER_DETAIL } from "@/api.config.js";
import HeaderComp from "../components/Header.vue";
export default {
  components: {
    HeaderComp,
  },
  data() {
    return {
      orderDetail: null, //订单商品详情
    };
  },
  async created() {
    const orderNo = this.$route.params.orderNo;
    // console.log(orderNo);
    const res = await this.$axios.get(API_ORDER_DETAIL, {
      params: {
        orderNo,
      },
    });
    console.log(res);
    this.orderDetail = res;
  },
  methods: {
    pay() {
      this.$showToast({
        btnShow: true,
        msg: `请支付${this.orderDetail.total}元`,
        callback: () => {
          this.$showToast({
            msg: "支付成功",
          });
          this.$router.go(-1);
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.order-detail {
  padding-top: 0.88rem;
  margin-bottom: 1.5rem;
  .item {
    display: flex;
    align-items: center;
    background-color: $colorA;
    margin-top: 0.2rem;
    padding: 0.2rem;
    .pic {
      width: 1.56rem;
      height: 1.56rem;
      margin: 0 0.2rem;
      border-radius: 0.06rem;
    }
    .detail {
      flex: 1;
      .name {
        font-size: $fontB;
        color: $colorC;
        font-weight: 700;
      }
      .price {
        color: $colorB;
        font-size: $fontC;
      }
    }
  }
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
  background-color: $colorA;
  display: flex;
  align-items: center;
  .total {
    flex: 1;
    text-align: right;
    margin-right: 0.2rem;
    color: $colorB;
  }
  .confirm {
    background-color: $colorB;
    height: 100%;
    width: 2.4rem;
    text-align: center;
    line-height: 1.2rem;
    color: $colorA;
  }
}
</style>