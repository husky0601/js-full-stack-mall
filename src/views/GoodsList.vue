<template>
  <div>
    <!--LOGO与登录-->
    <nav-header></nav-header>

    <!--导航信息栏-->
    <nav-bread>
      <span>商品</span>
    </nav-bread>

    <!--商品列表-->
    <div class="accessory-result-page accessory-page">
      <div class="container">

        <!--商品过滤头-->
        <div class="filter-nav">
          <span class="sortby">排序</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a href="javascript:void(0)" class="price" :class="{'sort-up':sortFlag}" @click="sortList">价格
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop()">
            <i class="icono-filter"></i>
          </a>
        </div>

        <div class="accessory-result">

          <!--价格筛选列表-->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>商品类别</dt>
              <dd>
                <a href="javascript:void(0)" :class="{cur:typeChecked=='all'}" @click="chackall">所有</a>
              </dd>
              <dd v-for="(type,index) in goodsFilter" :key="index">
                <span></span>
                <a href="javascript:void(0)" @click="setPriceFilter(index,type.value)" :class="{cur:typeChecked===index}">{{type.value}}</a>
              </dd>
            </dl>
          </div>

          <!--商品列表-->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-lazy="item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">￥{{parseInt(item.salePrice)}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m btn--green" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <!--加载页面-->
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <loader-more v-show="loading"></loader-more>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--全局模态框-->
    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">请先登录,否则无法加入购物车！</p>
      <div slot="btnGroup">
        <button class="btn btn--m" @click="closeModal">&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;</button>
        <button class="btn btn--m btn--green" @click="closeModal">&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;</button>
      </div>
    </modal>
    <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>添加成功！</span>
      </p>
      <!--<p slot="message">请先登录,否则无法加入到购物车中!</p>-->
      <div slot="btnGroup">
        <button class="btn btn--m" @click="mdShowCart=false">继续购物</button>
        <router-link href="javascript:;" to="/cart" class="btn btn--m btn--red">查看购物车</router-link>
      </div>
    </modal>

    <!--遮罩层-->
    <div class="md-overlay" v-show="overLayFlag" @click="closePop()"></div>

    <!--尾部-->
    <nav-footer></nav-footer>
  </div>
</template>

<script >
import "../assets/css/base.css";
import "../assets/css/product.css";
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import NavBread from "@/components/NavBread";
import LoaderMore from "@/components/LoaderMore";
import Modal from "@/components/Modal";
import axios from "axios";
//import qs from 'qs'
export default {
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    LoaderMore,
    Modal
  },
  data() {
    return {
      goodsList: [],
      priceFilter: [
        { startPrice: "0.00", endPrice: "500.00" },
        { startPrice: "500.00", endPrice: "1000.00" },
        { startPrice: "1000.00", endPrice: "2000.00" }
      ],
      goodsFilter:[
        {goodsType:0, value:"男款"},
        {goodsType:1, value:"女款"},
        {goodsType:2, value:"包"},
        {goodsType:3, value:"鞋"},
      ],
      demoList: [],
      typeChecked: "all",
      overLayFlag: false, //控制遮罩层的显示
      filterBy: false, // 控制筛选价格列表显示
      sortFlag: true, // 代表正序排列
      page: 1,
      pageSize: 8,
      priceGt: 0,
      priceLte: 0,
      goodsType: '',
      busy: true,
      loading: false, //是否显示加载动画
      mdShow: false, //是否显示模态框
      mdShowCart: false //是否显示模态框
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    //获取商品列表
    getGoodsList(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        typeAll: this.typeChecked,
        goodsType: this.goodsType,
        // priceGt: this.priceGt,
        // priceLte: this.priceLte
      };
      this.loading = true;
      axios
        .get("/goods/list", {
          params: param
        })
        .then(response => {
          let res = response.data;
          if (res.status === "0") {
            this.loading = false;
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list);
              if (res.result.count == 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
        });
    },
    //商品排序
    sortList() {
      console.log(this.sortFlag);
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    //加载商品
    loadMore() {
      this.busy = false;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
    //显示遮罩层
    showFilterPop() {
      this.overLayFlag = true;
      this.filterBy = true;
    },
    //设置价格过滤
    setPriceFilter(index, goodsType) {
      console.log("goodsType:" + goodsType)
      this.typeChecked = index;
      this.page = 1;
      this.goodsType = goodsType
      // this.priceGt = parseFloat(startPrice);
      // this.priceLte = parseFloat(endPrice);
      this.getGoodsList();
      this.closePop();
    },
    //关闭遮罩层
    closePop() {
      this.overLayFlag = false;
      this.filterBy = false;
    },
    //加入购物车
    addCart(productId) {
      axios
        .post("/goods/addCart", {
          productId: productId
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.mdShowCart = true;
            this.$store.commit("updateCartCount", 1);
          } else {
            this.mdShow = true;
          }
        });
    },
    //关闭弹框
    closeModal() {
      this.mdShow = false;
      this.mdShowCart = false;
    },
    //点击
    chackall() {
      this.typeChecked = "all";
      this.priceGt = 0;
      this.priceLte = 0;
      this.getGoodsList();
    },
  }
};
</script>

