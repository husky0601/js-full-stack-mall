<template>
  <div>
    <!--LOGO和登录-->
    <nav-header></nav-header>

    <!--导航栏-->
    <nav-bread>
      <span>下单成功</span>
    </nav-bread>

    <!--订单成功-->
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2">
          <span>下单成功</span>
        </h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur">
            <span>选择地址</span>
          </li>
          <li class="cur">
            <span>查看订单</span>
          </li>
          <li class="cur"> 
            <span>付款ING</span>
          </li>
          <li class="cur">
            <span>付款成功</span>
          </li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/ok-2.png" alt="Success"></div>
        <div class="order-create-main">
          <h3>感谢！<br>您的订单正在处理中</h3>
          <p>
            <span>订单编码：{{orderId}}</span>
            <span>订单总额：{{orderTotal | currency('￥')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">购物车列表</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">商品列表</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--尾部-->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import NavBread from "@/components/NavBread";
import { currency } from "@/utils/currency";
import axios from "axios";
export default {
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  filters: {
    currency: currency
  },
  data() {
    return {
      orderId: 0,
      orderTotal: 0
    };
  },
  mounted() {
    this.getOrderList();
  },

  methods: {
    getOrderList() {
      var orderId = this.$route.query.orderId;
      if (!orderId) {
        return;
      }
      console.log(orderId);
      axios
        .get("/users/order/suc", {
          params: {
            orderId: orderId
          }
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            (this.orderId = res.result.orderId),
              (this.orderTotal = res.result.orderTotal);
          }
        });
    }
  }
};
</script>
