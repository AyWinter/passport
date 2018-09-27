<template>
    <div>
      <mt-header title="支付" fixed style="height:45px; font-size: 16px;">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <!--背景颜色层-->
      <div class="Details-Essential  ">
        <div class="row confrim-modle1 mobile-payment " @click="wechatpay">
          <div class="col-xs-3 text-indent"><i class="pay-wx"></i></div>
          <div class="col-xs-7  pg-l0">
            <span class="f-16" style="float:left">微信支付</span>
            <p class="c-gray" style="float:left">推荐安装微信5.0及以上版本支付</p>
          </div>
          <div class="col-xs-2  text-center">
            <span class="glyphicon glyphicon-chevron-right"></span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          orderNo : ""
        }
      },
      mounted: function() {
        var orderNo = this.$route.params.orderNo;
        this.orderNo = orderNo;

        this.getOrderState();
      },
      methods: {
        wechatpay: function ()
        {

          var url = global.API_ADDRESS_TEST + "wechatPaySign/"+this.orderNo;
          this.$http.get(url, {}).then((response) => {
            if (response.data.code == 0)
            {
              var appId = response.data.data.appId;
              var timeStamp = response.data.data.timeStamp;
              var nonceStr = response.data.data.nonceStr;
              var prepayId = response.data.data.wechatPackage;
              var signType = response.data.data.signType;
              var sign = response.data.data.sign;

              WeixinJSBridge.invoke('getBrandWCPayRequest', {
                "appId" : appId, //公众号名称，由商户传入
                "timeStamp" : timeStamp + "", //时间戳，自1970年以来的秒数
                "nonceStr" : nonceStr, //随机串
                "package" : prepayId,
                "signType" : signType, //微信签名方式：
                "paySign" : sign
                //微信签名
              }, function(res) {
                if (res.err_msg == "get_brand_wcpay_request：ok") {
                } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              });
            }
            else
            {
              alert(error);
            }
          }).catch(function (error){
          })
        },

        getOrderState: function ()
        {
          if(this && this._isDestroyed){ //_isDestroyed 组件是否被销毁
            return;
          }

          var url = global.API_ADDRESS_TEST + "order/"+this.orderNo;

          this.$http.get(url, {}).then((response) => {
            if (response.data.data.state == 1)
            {
              // 支付成功
              this.$router.push({path : "/payment/result"})
            }
          }).catch(function (error){
            console.log(error);
          })

          var _this = this;
          setTimeout(function() {
              _this.getOrderState() }
            ,3000)
        }
      }
    }
</script>
