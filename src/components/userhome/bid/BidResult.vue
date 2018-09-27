<template>
  <div>
    <mt-header title="我的竞价" fixed style="height:45px; font-size: 16px;">
      <router-link to="/userhome/bid" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mobile-order text-center" style="margin-top:100px;" v-if="bidResults.length == 0">
      <span class="glyphicon glyphicon-list-alt"></span>
      <p class="f-20">暂无竞拍成功的广告位</p>
      <p>
        <button type="button" class="btn btn-default btn-order"
                @click="goHome">随便逛逛</button>
      </p>
    </div>
    <div class="Details-Essentia2 " style="margin-top:45px;" >
      <div class="bus-message" style="text-align: left" v-for="result in bidResults">
        <div class="bus-message-module ">
        <div class="bus-message-title ">
          <span class="c-yellow" @click="detail(result.product.id)"> 广告位：{{result.product.name}}</span>
        </div>
        <div class="bus-message-content" style="text-align: left">
          <p v-if="result.amount < result.product.bidParameter.reservePrice">
            由于您的出价小于保留价，此次交易未达成。<br/>
            保留价：{{result.product.bidParameter.reservePrice}}
          </p>
          最终出价：{{result.amount}}<br/>
          <p style="text-align: right" v-if="result.amount < result.product.bidParameter.reservePrice">
            <mt-button type="primary" size="small" @click="buy(result.product.id)">以保留价下单</mt-button>
            <mt-button type="primary" size="small" @click="cancel(result.id)">取消交易</mt-button>
          </p>
          <p style="text-align: right" v-if="result.amount >= result.product.bidParameter.reservePrice">
            <mt-button type="primary" size="small" @click="buy(result.product.id)">下单</mt-button>
          </p>
        </div>
      </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  var qs = require('qs');
  export default {
    data(){
      return {
        bidResults:[]
      }
    },
    mounted: function ()
    {
      this.init();
    },
    methods: {
      init: function ()
      {
        var url = global.API_ADDRESS_TEST + "bidResult";

        this.$http.get(url, {}).then((response)=>{
          this.bidResults = response.data.data;
        }).catch(function (error){
          console.log(error);
        })
      },

      // 广告位详情
      detail: function (id)
      {

      },

      // 关闭交易
      cancel: function (id)
      {
        var data = {
          id: id,
          state: 3
        };
        var url = global.API_ADDRESS_TEST + "bidResult/cancel"
        this.$http.post(url, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=>{
          if (response.data.code == 0)
          {
            Toast({
              message: '已成功关闭',
              iconClass: 'icon icon-success'
            });

            this.init();
          }
        }).catch(function (error){
          console.log(error);
        })
      },

      buy: function (productId)
      {
        var url = global.API_ADDRESS_TEST + "bidResult/buy";

        var data = {
          productId: productId
        };

        this.$http.post(url, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=>{
          if (response.data.code == 0)
          {
            this.$router.push({path: "/order/confirm"})
          }
        }).catch(function (error){
          console.log(error);
        });
      },

      goHome: function ()
      {
        var vendorId = sessionStorage.getItem("vendorId");
        if (vendorId == global.DAMEI_ACCOUNT_ID)
        {
          this.$router.push({path: "/damei"})
        }
        else
        {
          this.$router.push({path: "/"})
        }
      }
    }
  }
</script>
