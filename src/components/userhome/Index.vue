<template>
  <div>
    <div class="mobile-wrapper">
      <div class="mobile-me2  text-center">
        <img :src="headImg"  width="60" class="img-circle"><br/> {{nickName}}
      </div>
      <div class="mobile-me-list">
        <div class="col-xs-4 border">
          <a href="javascript:;" @click="order(2)"><i class="glyphicon glyphicon-th-list"></i>
            所有订单</a></div>
        <div class="col-xs-4 border">
          <a href="javascript:;" @click="order(0)"><i class="glyphicon glyphicon-credit-card"></i>
            待付款</a></div>
        <div class="col-xs-4 border">
          <a href="javascript:;" @click="order(1)">
            <i class="glyphicon glyphicon-time"></i>付款成功</a></div>
      </div>
      <div class="mobile-bg">
      </div>
      <div class="Details-Essentia2 ">
        <div class="row confrim-modle2 " @click="userinfo">
          <div class="col-xs-10" style="text-align:left"><i class="icon-user">&nbsp;</i>个人基本信息
          </div>
          <div class="col-xs-2 text-indent text-right">
            <span class="glyphicon glyphicon-chevron-right"></span></div>
        </div>
        <div class="row confrim-modle2 " @click="bid">
          <div class="col-xs-10" style="text-align:left"><i class="icon-edit">&nbsp;</i>我的竞价
          </div>
          <div class="col-xs-2 text-indent text-right">
            <span class="glyphicon glyphicon-chevron-right"></span></div>
        </div>
        <div class="row confrim-modle2 " @click="favorites">
          <div class="col-xs-10" style="text-align:left"><i class="icon-star-empty">&nbsp;</i>收藏夹
          </div>
          <div class="col-xs-2 text-indent text-right">
            <span class="glyphicon glyphicon-chevron-right"></span></div>
        </div>
        <div class="row confrim-modle2 " style="display: none">
          <a href="javascript:;">
            <div class="col-xs-10" style="text-align:left"><i class="icon-gear">&nbsp;</i>其他设置
            </div>
            <div class="col-xs-2 text-indent text-right">
              <span class="glyphicon glyphicon-chevron-right"></span></div>
          </a>
        </div>
        <div class="row confrim-modle2 " style="display: none">
          <a href="javascript:;">
            <div class="col-xs-10" style="text-align:left"><i class="icon-envelope-alt">&nbsp;</i>系统消息
            </div>
            <div class="col-xs-2 text-indent text-right">
              <span class="glyphicon glyphicon-chevron-right"></span></div>
          </a>
        </div>
      </div><br/>
      <button type="button" class="mobile-out" @click="logout">切换账号</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        headImg: "",
        nickName: "",
        vendorId: 0,
      }
    },
    mounted: function ()
    {
      this.init();
    },
    methods: {

      init: function ()
      {
        var url = global.API_ADDRESS_TEST + "userinfo";
        this.$http.get(url, {}).then((response)=>{
          var code = response.data.code;
          if (code == 0)
          {
            this.headImg = response.data.data.headImgUrl;
            this.nickName = response.data.data.nickName;
          }
        }).catch(function(error){
          console.log(error);
        })
      },

      order: function (payState) {
        this.$router.push({path: "/userhome/order/"+payState})
      },
      userinfo: function ()
      {
        this.$router.push({path: "/userhome/userinfo"})
      },
      product: function ()
      {
        this.$router.push({path: "/userhome/product"})
      },
      bid: function ()
      {
        this.$router.push({path: "/userhome/bid"})
      },

      // 登出
      logout: function ()
      {
        var url = global.API_ADDRESS_TEST + "account/logout";

        this.$http.get(url, {}).then((response) =>{
          var code = response.data.code;
          if (code == 0)
          {
            sessionStorage.removeItem("token");
            this.$router.push({path: "/sign"})
          }
        }).catch(function (error){
          console.log(error);
        })
      },

      // 收藏夹
      favorites: function ()
      {
        this.$router.push({path: "/favorites"})
      }
    }
  }
</script>
