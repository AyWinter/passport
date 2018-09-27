<template>
  <div id="app" style="margin-top:0px;">
    <router-view/>

    <br/><br/><br/>
    <div class="row mobile-menu mobile-menu-index" v-if="execute != '1'">
      <div class="col-xs-3"> <a href="javascript:;" @click="home"><i class="icon-home"></i>首页</a></div>
      <div class="col-xs-3"> <a href="javascript:;" @click="product"><i class="icon-reorder"></i> 广告位</a></div>
      <div class="col-xs-3"> <a href="javascript:;" @click="shopcart"><i class="icon-shopping-cart"></i>购物车</a></div>
      <div class="col-xs-3"> <a href="javascript:;" @click="userhome"><i class="icon-user"></i> 我的</a> </div>
    </div>
  </div>
</template>

<script>
export default {
  data()
  {
    return {
      selected: "",
      execute: "",
    }
  },
  mounted: function ()
  {
    this.execute = sessionStorage.getItem("execute")
  },
  methods: {

    // 首页
    home: function ()
    {
      var vendorId = sessionStorage.getItem("vendorId");
      if (parseInt(vendorId) == global.DAMEI_ACCOUNT_ID)
      {
        this.$router.push({path: "/damei"});
      }
      else
      {
        this.$router.push({path: "/"});
      }
    },

    // 所有广告位
    product: function ()
    {
      this.$router.push({path: "/product/list"});
    },

    // 购物车
    shopcart: function ()
    {
      this.$router.push({path: "/shopcart/index"});
    },

    // 用户中心
    userhome: function ()
    {
      this.$router.push({path: "/userhome"});
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
