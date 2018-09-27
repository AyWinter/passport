<template>
  <div>
    <div style="height:50px; ">
      <router-link to="/search/index">
        <mt-search v-model="key"></mt-search>
      </router-link>
    </div>
    <div style="width:100%; height:150px; margin-top:-10px;">
      <mt-swipe :auto="4000">
        <mt-swipe-item><img :src="imgUrl1" style="width:100%; height:100%;"/></mt-swipe-item>
        <mt-swipe-item><img :src="imgUrl2" style="width:100%; height:100%;"/></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class=" mobile-list">
      <div class="col-xs-3">
        <router-link to="/product/list"><i class="i-classification"></i>
          所有广告位</router-link></div>
      <div class="col-xs-3">
        <router-link to="/product/bid"><i class="i-Distribution"></i>
          竞价</router-link>
      </div>
      <div class="col-xs-3" @click="publish">
        <i class="i-Collection"></i>
        信息发布</div>
      <div class="col-xs-3">
        <router-link to="/userhome"><i class="i-Order"></i>
          用户中心</router-link></div>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        key: "",
        imgUrl1: "../static/assets/1.png",
        imgUrl2: "../static/assets/2.png",

      }
    },
    mounted: function ()
    {

    },
    methods: {
      search: function ()
      {
        this.$router.push({path : "/search/index"})
      },

      // 信息发布
      publish: function ()
      {
        this.$router.push({path: "/publish"})
      }
    }
  }
</script>
<style type="text/css">
  .dameiTop{ position:relative; vertical-align:bottom; margin-top:50px;}
  .dameiTop .dameiName{ position:absolute;bottom:4.5rem;left:1rem;right:1rem; z-index:1; text-align:center;}
  .dameiTop .dameiLogo{width:6rem;height:6rem;border-radius:50%;overflow:hidden; vertical-align:middle; margin:0.5rem auto;}
  .dameiTop .dameiP{color:#fff; font-size:1.8rem; text-shadow:0 0 0.5rem rgba(0,0,0,0.5);}
  .dameiTop .dameiPhone{border:1px solid #fff;border-radius:2.2rem;line-height:2.2rem;padding:0 1.2rem 0 2.2rem;font-size:12px;right:1rem;bottom:9rem; z-index:2; background-color:rgba(255,255,255,0.1); position:absolute; color:#Fff; background:url(./../../static/assets/damei_t.png) 0.5rem center no-repeat; background-size:1.2rem;}
  .damiNav{ position: relative; height:3rem; width:100%;}
  .damiNav .dm_ul{ position:absolute;bottom:-0.5rem; right:0.5rem; left:0.5rem; background-color:#fff; box-shadow:0 0.2rem 0.2rem rgba(0,0,0,0.1);padding:0.8rem 0;border-radius:0.5rem;}
  .damiNav .dm_ul li{width:33.3%; float:left; text-align:center; font-size:0.5rem; font-size:1.2rem; }
  .damiNav .dm_ul li a{color:#555;}
  .damiNav .dm_ul li.cur a,.damiNav .dm_ul li.cur i{color:#ff5105 !important;}
  .damiNav .dm_ul li i{  display:block; margin:0 auto 0.2rem; font-size:3.2rem;}
  .dameiPro{padding:0.5rem;}
  .dameiPro .mobile-product-mode{border-radius:5px; margin-top:0; margin-bottom:0.5rem;}
  .dameiPro .mobile-product-mode .col-xs-7{ padding:0;}
  .dameiPro .mobile-product-mode .mobile-inf{ margin-left:0;}
</style>
