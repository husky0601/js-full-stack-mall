<template>
  <div>
     <!--LOGO和登录-->
    <nav-header></nav-header>

    <!-- 登录与注册表单 -->
    <div class="md-form md-form-width">
        <form action="" ref="form">
            <div class="md-form-head">
                <h4>添加地址信息</h4>
            </div>
            <div class="md-form-middle">
              <div class="error-wrap" v-show="errTip">
                <span class="error error-show">{{errMsg}}</span>
              </div>
              <!-- <div class="error-wrap">
                <span>用户名或者密码错误</span>
              </div> -->
              <ul>
                <li>
                  <input v-model="userName" 
                    type="text" placeholder="请输入用户名" required>
                </li>
                <li>
                  <input type="text" v-model="tel" 
                  placeholder="请输入电话号码" required>
                </li>
                <li>
                  <input type="text" v-model="postCode" 
                    placeholder="请输入邮编" required>
                </li>
                <li>
                  <textarea v-model="streetName" cols="5"  
                    placeholder="请输入具体地址" required></textarea>
                  <!-- <textarea type="text" v-model="postCode" placeholder="请输入邮编"> -->
                </li>
                <li>
                  <button type="button" class="btn" @click="addAddress">提交</button>
                </li>
              </ul>
            </div>
            <!-- <div class="md-form-footer">
                <p v-if="showLogin">还没有账号？<a href="javascript:;" @click="showLogin=false" >立即注册</a></p>
                <p v-else>已注册账号？<a href="javascript:;" @click="showLogin=true">立即登录</a></p>
            </div> -->
        </form>
        
    </div>

    <!-- 模态框 -->
    <!-- <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">请添加地址</p>
      <div slot="btnGroup">
        <button class="btn btn--m" @click="closeModal">&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;</button>
        <button class="btn btn--m btn--red" @click="closeModal">&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;</button>
      </div>
    </modal> -->
     <!--尾部-->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
// import Modal from "@/components/Modal.vue"
import axios from "axios";
import "../assets/css/base.css";
import "../assets/css/form.scss";

export default {
  components: {
    NavHeader,
    NavFooter
    // Modal
  },
  data() {
    return {
      showLogin: true,
      errTip: false,
      mdShow: false,
      errMsg: "",
      userName: "",
      postCode: null,
      tel: null,
      streetName: "",
      isDefault: false,
      validArr: [],
    };
  },
  mounted(){
    this.getAllInput()
  },
  methods: {
    //提交新增地址
    addAddress() {
      if(!this.checkAll()){
        return
      }
      if(!this.isTel(this.tel)){
        this.errTip = true
        this.errMsg = '移动号码不合法，请重新输入'
        return
      }
      if(!this.isPostCode(this.postCode)){
        this.errTip = true
        this.errMsg = '邮编号码不正确，请重新输入'
      }
      axios
        .post("users/address/add", {
          userName: this.userName,
          postCode: this.postCode,
          tel: this.tel,
          streetName: this.streetName
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.$router.push({path: '/address'})
          }
        });
    },
    //获取所有的input
    getAllInput() {
      var li = this.$refs["form"].getElementsByTagName("li");
        var arr = []
      for(let i = 0; i < li.length; i++){
          let input = li[i].children[0].tagName.toLowerCase()
        if(input == 'input' || input == 'textarea'){
          this.validArr.push(li[i].firstChild)
        }
      }
      return this.validArr    
    },
    // 验证所有的input是否为空
    checkAll(){
      for(let i = 0; i < this.validArr.length; i++){
        let str = this.validArr[i].value
        if(!this.isRequired(str)){
          this.errTip = true
          this.errMsg = this.validArr[i].placeholder
          return false
        }
      }
      return true
    },
    isRequired(str) {
      if (str === "" || str === null || str === undefined) {
        return false;
      } else {
        return true;
      }
    },
    //验证邮编
    isPostCode(str) {
      let reg = /^[1-9][0-9]d{5}$/;
      return reg.test(str);
    },
    //验证电话号码
    isTel(str) {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/ 
      return reg.test(str);
    },
    //判断当前是否有地址
    // next(){
    //   if (!this.addressList){
    //     this.mdShow = true
    //     return
    //   }
    //   this.$router.push({path:'/OrderComfirm',query:{'addressId':this.selectAddrId}})
    // }
  }
};
</script>
