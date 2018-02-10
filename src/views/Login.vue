<template>
  <div>
     <!--LOGO和登录-->
    <nav-header></nav-header>

    <!-- 登录与注册表单 -->
    <div class="md-form md-form-width">
        <form action="">
            <div class="md-form-head">
                <h4 v-if="showLogin">登 录</h4>
                <h4 v-else>注册</h4>
            </div>
            <div class="md-form-middle">
              <div class="error-wrap" v-show="errTip">
                <span class="error error-show">{{errMsg}}</span>
              </div>
              <!-- <div class="error-wrap">
                <span>用户名或者密码错误</span>
              </div> -->
              <ul>
                <li class="log-form-input">
                  <i class="icon icon-user"></i>
                  <input class="form-user" v-model="userName" type="text" placeholder="请输入用户名"> 
                </li>
                <li class="log-form-input">
                  <i class="icon icon-password"></i>
                  <input type="password" v-model="userPwd" placeholder="请输入密码">
                </li>
                <li v-show="!showLogin" class="log-form-input">
                  <i class="icon icon-password"></i>
                  <input type="password" v-model="conUserPwd" placeholder="请输入确认密码">
                </li>
                <li>
                  <button type="button" class="btn" v-if="showLogin" @click="login">登录</button>
                  <button type="button" class="btn" v-else @click="signIn">注册</button>
                </li>
              </ul>
            </div>
            <div class="md-form-footer">
                <p v-if="showLogin">还没有账号？<a href="javascript:;" @click="handleSignin" >立即注册</a></p>
                <p v-else>已注册账号？<a href="javascript:;" @click="showLogin=true">立即登录</a></p>
            </div>
        </form>
        
    </div>

    <!-- 模态框 -->
    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">注册成功，请登录</p>
      <div slot="btnGroup">
        <button class="btn btn--m" @click="closeModal">&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;</button>
        <button class="btn btn--m btn--red" @click="closeModal">&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;</button>
      </div>
    </modal>
     <!--尾部-->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import Modal from "@/components/Modal.vue"
import axios from "axios"
import "../assets/css/base.css";
import "../assets/css/form.scss";

export default {
  components: {
    NavHeader,
    NavFooter,
    Modal
  },
  data() {
    return {
      showLogin: true,
      errTip:false,
      mdShow:false,
      errMsg:'',
      userName:'',
      userPwd:'',
      conUserPwd:'',
    };
  },
  methods: {
    //登录
    login(){
      if (!this.userName || !this.userPwd){
        this.errTip = true
        this.errMsg = "请填写用户名和密码"
        return;
      }
      axios.post("/users/login", {
        userName: this.userName,
        userPwd: this.userPwd,
      })
      .then((response) => {
        let res = response.data
        if(res.status == '0'){
          this.errTip =false
          this.$store.commit("updateUserInfo", res.result.userName);
          this.getCartCount();
          this.$router.push({ path: "/" });
        } else{
          this.errTip = true
          this.errMsg = "用户名或密码有误，请重新填写"
        }
      })
    },
    // 注册
    signIn(){
      if(!this.userName || !this.userPwd || !this.conUserPwd ) {
        this.errTip = true
        this.errMsg = "注册信息请填写完整"
        return;
      }
      if(this.userPwd.length < 6) {
        this.errTip = true
        this.errMsg = "密码长度不能小于六位"
        return
      }
      if(!this.checkPws(this.userPwd,this.conUserPwd)){
        this.errTip = true
        this.errMsg = "密码不一致"
        return
      }
      axios.post("/users/signIn", {
        userName: this.userName,
        userPwd:  this.userPwd
      }).then((response) => {
        let res = response.data
        if(res.status == '1001'){
          this.errTip = true
          this.errMsg = res.msg
          return
        } else if (res.status == '0') {
          this.showLogin = true
          this.mdShow = true
          this.errMsg = ''
        } else {
          return false
        }
      })
    },
    //立即注册
    handleSignin(){
      this.userName = null
      this.userPwd = null
      this.showLogin = false
    },
    closeModal(){
      this.mdShow = false
    },
    //判断密码是否一致
    checkPws(pws1,pws2){
      let result = null
      return result = pws1===pws2 ? true : false
    },
     //获取用户购物车数量
    getCartCount() {
      axios.get("/users/getCount").then(response => {
        let res = response.data;
        this.$store.commit("initCartCount", res.result);
      });
    }
  }
};
</script>
