<template>
    <div>
      <mt-header title="保证金支付" fixed style="height:45px; font-size: 16px;">

      </mt-header>
      <div class="mobile-wrapper" style="margin-top:45px;">
        <div class="Auction-Ketubbah">
          <div class="Auction-Ketubbah-top" >
            <p  align="center"><img src="../../../static/assets/bzj.png" width="120" ></p>
            <p>保证金</p>
            <p>￥ <span class="font">{{product.bidParameter.bidPrice}}</span></p>
          </div>
          <p class="Auction-Ketubbah-bottom">竞拍不成功时，缴纳的保证金将退回到原支付渠道</p>
        </div>

        <div  class="mobile-bg"> </div>
        <!--背景颜色层-->
        <div class="Auction-Ketubbah-inf">
          <div class="row">
            <div class="col-xs-4 text-right">手机号：</div>
            <div class="col-xs-7 pg0" style="text-align: left">{{mobileNo}}</div>
          </div>
        </div>
        <!--信息确认-->
        <div  class="mobile-bg"> </div>
        <!--背景颜色层-->
        <div class="Auction-Ketubbah-Agr"  style="text-align: left">
          <input type="checkbox" class="input" checked/>竞拍需同城广网竞拍协议 <a href="javascript:;" @click="agreement">查看协议</a>
        </div>
        <!--同意协议-->

        <div class="row mobile-menu8">
          <button type="button" class="Auction-det-button1 col-xs-12" @click="payBond" style="bottom:50px">
            <p class="font">缴纳保证金</p>
          </button>
        </div>
      </div>
      <br/><br/><br/>
    </div>
</template>
<script>
  var qs = require('qs');
    export default {
      data (){
        return {
          productId:"",
          product: "",
          mobileNo: "15981998308"
        }
      },
      mounted: function ()
      {
        this.productId = this.$route.params.id;
        this.initData();
      },
      methods: {
        initData: function () {
          var url = global.API_ADDRESS_TEST + "product/" + this.productId
          this.$http.get(url, {}).then( (response) => {
            console.log(response.data.data);
            this.product = response.data.data;

          }).catch(function (error) {
            console.log(error);
          });
        },

        payBond: function ()
        {
          var url = global.API_ADDRESS_TEST + "order/bond";
          var postData = {
            productId: this.productId
          }
          this.$http.post(url, qs.stringify(postData), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) => {
            console.log(response.data);
            if (response.data.code == 0) {
              var orderNo = response.data.data.orderNo;
              this.$router.push({path : "/payment/index/"+orderNo})
            }
          }).catch(function (error) {
            console.log(error);
          })
        },

        // 保证金协议
        agreement: function ()
        {
          this.$router.push({path: "/agreement/bond"})
        }
      }
    }
</script>
