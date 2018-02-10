<template>
  <div>
    <!--LOGO和登录-->
    <nav-header></nav-header>

    <!--导航栏-->
    <nav-bread>
      <span>我的订单</span>
    </nav-bread>
    <!--地址列表-->
    <div>
      <div class="container">
        <div class="checkout-order">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>我的订单</span></h2>
          </div>
          <!-- process step -->
          <div class="check-step">
            <ul>
              <li class="cur"><span>选择地址</span></li>
              <li class="cur"><span>查看订单</span></li>
              <li><span>付款ING</span></li>
              <li><span>付款成功</span></li>
            </ul>
          </div>

          <!-- order list -->
          <div class="page-title-normal checkout-title">
            <h2><span>订单详情</span></h2>
          </div>
          <div class="item-list-wrap confirm-item-list-wrap">
            <div class="cart-item order-item">
              <div class="cart-item-head">
                <ul>
                  <li>订单详情</li>
                  <li>单价</li>
                  <li>数量</li>
                  <li>商品总价</li>
                </ul>
              </div>
              <ul class="cart-item-list">
                <li v-for="(item,index) in cartList" v-if="item.checked == '1'">
                  <div class="cart-tab-1">
                    <div class="cart-item-pic">
                      <img v-lazy="item.productImage " alt="">
                    </div>
                    <div class="cart-item-title">
                      <div class="item-name">{{item.productName}}</div>

                    </div>
                  </div>
                  <div class="cart-tab-2">
                    <div class="item-price">{{item.salePrice | currency('￥')}}</div>
                  </div>
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self">
                        <div class="select-self-area">
                          <span class="select-ipt">×{{item.productNum}}</span>
                        </div>
                      </div>
                      <div class="item-stock item-stock-no">数量</div>
                    </div>
                  </div>
                  <div class="cart-tab-4">
                    <div class="item-price-total">{{item.productNum * item.salePrice | currency('￥')}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Price count -->
          <div class="price-count-wrap">
            <div class="price-count">
              <ul>
                <li>
                  <span>商品价格:</span>
                  <span>{{subtotal | currency('￥')}}</span>
                </li>
                <li>
                  <span>配送费用:</span>
                  <span>{{shipping | currency('￥')}}</span>
                </li>
                <li>
                  <span>折扣:</span>
                  <span>{{discount | currency('￥')}}</span>
                </li>
                <li>
                  <span>税费:</span>
                  <span>{{tax | currency('￥')}}</span>
                </li>
                <li class="order-total-price">
                  <span>订单总价:</span>
                  <span>{{orderTotal | currency('￥')}}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="order-foot-wrap">
            <div class="prev-btn-wrap">
              <router-link class="btn btn--m" to="/cart">上一步</router-link>
            </div>
            <div class="next-btn-wrap">
              <button class="btn btn--m btn--red" @click="payMent">继续付款</button>
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
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import {currency} from '@/utils/currency'
  import axios from 'axios'
  export default{
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    filters: {
      currency: currency
    },
    data(){
      return {
        cartList: [],
        shipping: 100, //配送费
        discount: 500, //折扣费用
        tax: 50, // 税费
        subtotal: 0, //商品总价格
        orderTotal: 0, //折扣后的价格
      }
    },
    mounted(){
      this.getCartList()
    },

    methods: {
      getCartList(){
        axios.get('/users/cart').then((response) => {
          let res = response.data
          if (res.status == '0') {
            this.cartList = res.result
            this.cartList.forEach((item) => {
              if (item.checked == '1') {
                this.subtotal += item.productNum * item.salePrice
              }
            })
            this.orderTotal = this.subtotal + this.shipping - this.discount + this.tax
          }
        })
      },
      //提交订单
      payMent(){
        var addressId = this.$route.query.addressId
        axios.post('/users/order/pay', {
          addressId: addressId,
          orderTotal: this.orderTotal
        }).then((response) => {
          let res = response.data
          if (res.status == '0') {
            this.delCartProduct()
            this.$router.push({path:'/ordersuc?orderId='+res.result.orderId})
          }
        })
      },
      //将已提交的订单从购物车列表中删除
      delCartProduct(){
        if(window.localStorage){
          var arr =JSON.parse(localStorage.getItem("saveProduct"))
          console.log(arr)
          arr.forEach((item) => {
            axios.post('/users/cart/del',{
              productId: item.productId
            }).then((response) => {
              let res = response.data
              if(res.status == '0'){
                this.$store.commit("updateCartCount", -item.productNum);
              }
            })
          })
          localStorage.removeItem("saveProduct")
        }
      }
    },
  }
</script>
