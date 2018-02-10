<template>
  <div class="loader-more">
    <div class="loader-more-inner">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>

<style type="text/css" scoped>
  .loader-more{
    width: 100px;
    height:100px;
    margin: 10px auto;
  }
  .loader-more-inner{
    position: relative;
    top: 40px;
    left: 40px;
  }
  /*兼容谷歌及Safari*/
  @-webkit-keyframes loader-more-inner {
    50%{
      transform: scale(0.4);
      opacity: 0.3;
    }
    100%{
      transform: scale(1);
      opacity: 1;
    }
  }
  /*兼容火狐*/
  @-moz-keyframes loader-more-inner {
    50%{
      transform: scale(0.4);
      opacity: 0.3;
    }
    100%{
      transform: scale(1);
      opacity: 1;
    }
  }
  /*兼容IE*/
  @-o-keyframes loader-more-inner {
    50%{
      transform: scale(0.4);
      opacity: 0.3;
    }
    100%{
      transform: scale(1);
      opacity: 1;
    }
  }

  .loader-more-inner i{
    display: block;
    width: 15px;
    height:15px;
    border-radius: 50%;
    position: absolute;
    background: #d33b1a;
  }
  .loader-more-inner i:nth-child(1){
    top: 0px;
    left: -30px;
    -webkit-animation:loader-more-inner 1s ease 0s infinite ;
    animation:loader-more-inner 1s ease 0s infinite ;
  }
  .loader-more-inner i:nth-child(2){
    top: -20px;
    left: -20px;
    -webkit-animation:loader-more-inner 1s ease 0.12s infinite ;
    animation:loader-more-inner 1s ease 0.12s infinite ;
  }
  .loader-more-inner i:nth-child(3){
    top: -30px;
    left: 0px;
    -webkit-animation:loader-more-inner 1s ease 0.24s infinite ;
    animation:loader-more-inner 1s ease 0.24s infinite ;
  }
  .loader-more-inner i:nth-child(4){
    top: -20px;
    left: 20px;
    -webkit-animation:loader-more-inner 1s ease 0.36s infinite ;
    animation:loader-more-inner 1s ease 0.36s infinite ;
  }
  .loader-more-inner i:nth-child(5){
    top: 0px;
    left: 30px;
    -webkit-animation:loader-more-inner 1s ease 0.48s infinite ;
    animation:loader-more-inner 1s ease 0.48s infinite ;
  }
  .loader-more-inner i:nth-child(6){
    top: 20px;
    left: 20px;
    -webkit-animation:loader-more-inner 1s ease 0.6s infinite ;
    animation:loader-more-inner 1s ease 0.6s infinite ;
  }
  .loader-more-inner i:nth-child(7){
    top: 30px;
    left: 0px;
    -webkit-animation:loader-more-inner 1s ease 0.72s infinite ;
    animation:loader-more-inner 1s ease 0.72s infinite ;
  }
  .loader-more-inner i:nth-child(8){
    top: 20px;
    left: -20px;
    -webkit-animation:loader-more-inner 1s ease 0.84s infinite ;
    animation:loader-more-inner 1s ease 0.84s infinite ;
  }
</style>
