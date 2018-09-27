<template>
  <div>
    <mt-header title="我的订单" fixed style="height:45px; font-size: 16px;">
      <router-link to="/userhome" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mobile-bg" style="margin-top:45px;">
    </div>
    <div class="mobile-order text-center" v-if="orders.length == 0">
      <span class="glyphicon glyphicon-list-alt"></span>
      <p class="f-20">暂时没有订单</p>
      <p class=" c-gray">可以看看哪些想买的</p>
      <p>
        <button type="button" class="btn btn-default btn-order" @click="goHome">随便逛逛
        </button>
      </p>
    </div>
    <div class="bus-Details-information" v-for="order in orders">
      <div class="bus-Details-Essential boder-tn ">
        <div class="shopp-car  bg-gray" @click="detail(order.orderNo)">
          <div class="col-xs-4  ">
            <img :src="order.orderProducts[0].product.images[0].path" width="100%">
          </div>
          <div class="col-xs-8" style="text-align:left">
            <dl class="mobile-inf ">
              <dt><strong>订单号：{{order.orderNo}} </strong></dt>
              <dd>金额：{{order.amount}}</dd>
              <dd>折扣：{{order.discountAmount}}</dd>
              <dd>下单时间：{{order.createdTime | formatData}}</dd>
              <dd>剩余支付时间：{{order.surplusTimeText}}</dd>
              <dd>留言：{{order.message}}</dd>
            </dl>
          </div>
        </div>
        <div class="row shopp-car-edit  pg-b5" v-if="order.state != 1 && order.state != 3">
          <div class="col-xs-12 text-right">
            <button type="button" class="btn btn-warning orders-btn"
                    style="background-color: #26a2ff; border-color: #26a2ff" @click="pay(order.orderNo)">立即支付
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {formatDate} from '../../../../static/js/date.js';
  var qs = require('qs');

  export default {
    data() {
      return {
        selected: "1",
        orders: [],
        surplusTime: "",  // 支付剩余时间
      }
    },
    filters: {

      formatData: function (value) {
        var date = new Date(value);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    mounted: function () {
      this.initData();
      setInterval(this.setSurplusTime, 1000);
    },
    methods: {
      initData: function () {
        var payState = this.$route.params.payState;
        var url;
        if (payState == 2)
        {
          url = global.API_ADDRESS_TEST + "order/user";
        }
        else
        {
          url = global.API_ADDRESS_TEST + "order/user/"+payState;
        }
        this.$http.get(url, {}).then((response) => {
          this.orders = response.data.data;

          for (var i = 0; i < this.orders.length ; i ++)
          {
            var surplusTimeText = "";
            this.$set(this.orders[i], "surplusTimeText", surplusTimeText);
          }
        }).catch(function (error) {
          console.log(error);
        })
      },

      pay: function (orderNo) {
        var url = global.API_ADDRESS_TEST + "/order/check/" + orderNo
        this.$http.get(url, {}).then((response) => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$router.push({path: "/payment/index/" + orderNo})
          }
          else {
            var msg = response.data.msg;
            Toast({
              message: msg + " 所选时段被占用",
              iconClass: 'icon icon-success'
            });
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      detail: function (orderNo) {
        this.$router.push({path: "/userhome/order/detail/" + orderNo})
      },

      // 回首页
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
      },

      setSurplusTime: function ()
      {
        for (var i = 0; i < this.orders.length; i++) {
          setInterval(this.showSurplusTime(this.orders[i]), 1000);
        }
      },

      showSurplusTime: function (item)
      {
        // 获取服务器时间
        if (item.surplusTime <= 0) {
          item.surplusTimeText = "订单已取消";
          if (item.state != 3 && item.state != 1)
          {
            this.cancelOrder(item);
          }
          else if (item.state == 1)
          {
            item.surplusTimeText = "已支付";
          }
        }
        else {
          var d = parseInt(item.surplusTime / (24 * 60 * 60));
          var h = parseInt((item.surplusTime - (d * 24 * 60 * 60)) / (60 * 60));
          var m = parseInt((item.surplusTime - (d * 24 * 60 * 60) - (h * 60 * 60)) / 60);
          var s = parseInt(item.surplusTime - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60));

          item.surplusTimeText = m + "分" + s + "秒";

          item.surplusTime--
        }
      },

      // 取消订单
      cancelOrder: function (item)
      {
        var orderNo = item.orderNo;

        var url = global.API_ADDRESS_TEST + "/order/cancel";

        var data = {
          orderNo: orderNo
        }

        this.$http.post(url, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=>{

          var code = response.data.data.code;
          if (code != 0)
          {
            var msg = response.data.msg;
            console.log(msg);
          }
          else
          {
            this.orders = [];
            this.surplusTime = "";
            this.initData();
          }
        }).catch(function (error){
          console.log(error);
        })
      }
    }
  }
</script>
