<template>
  <div>
    <mt-header title="订单确认" fixed style="height:45px; font-size: 16px;">

    </mt-header>
    <div class=" Confirm-address  " style="margin-top:45px; height:100px;" v-if="customer != ''">
      <ul class="mg-l10" style="float:left">
        <li style="float:left">购买用户信息</li><br/>
        <li>客户名称：<input type="text" readonly
                      v-model="customer.name" style="color:black;" /></li>
        <li>联系方式：<input type="number" readonly
                      v-model="customer.phone" style="color:black;" />
        </li>
      </ul>
    </div>
    <div  class="mobile-bg"></div>
    <div class="Details-Essential  ">
      <div class="row"style="float:left;">
        <div class="col-xs-8" style="float:left; width:100%">
          &nbsp;&nbsp;&nbsp;广告位清单：
        </div>
      </div><br/>

      <div class="Details-Essential  shopp-car-remove" style="" v-for="(product, index) in product">
        <div class="shopp-car">

          <div class="col-xs-3 " onclick="">
            <img :src="product.product.images[0].path" style="max-height: 100px;width:100px; height:60px;">
          </div>
          <div class="col-xs-7">
            <dl class="mobile-inf ">
              <dd>
                <b v-for="(cycle,index) in product.product.prices" v-if="cycle.cycle == product.cycle">
                  {{cycle.price | formatMoney}}/{{cycle.cycle}}
                </b>
                &nbsp;&nbsp; 时长：{{product.quantity}}  {{product.cycle}}
              </dd>
              <dd> 
                投放时间：{{product.deliverTime}} 至 {{product.endTime}}
              </dd>
              <dd>
                <i class=" icon-map-marker"></i>
                {{product.product.position.area}}
                {{product.product.position.road}}
                {{product.product.position.station}}
              </dd>
              <dd style="text-align: left" v-if="product.amount > 0 && product.product.prices.length > 0">
                <p style="font-size: 8px; color:red">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  满{{product.amount}}打{{product.discount * 10}}折
                </p>
              </dd>
            </dl>
          </div>
        </div>
        <div class="row shopp-car-edit ">
          <div class="col-xs-8 " style="float:left;">
                <span class="c-red  f-16" style="float:left">
                  总价：
                  <b v-if="product.product.prices.length == 0">
                    {{totalAmount}}
                  </b>
                  <b v-for="(cycle,index) in product.product.prices" v-if="cycle.cycle == product.cycle">
                    <b v-if="product.discount > 0">
                    {{product.quantity * cycle.price * product.discount}}
                    </b>
                    <b v-if="product.discount == 0">
                    {{product.quantity * cycle.price}}
                    </b>
                  </b>
                  <b v-if="product.discount > 0">
                    <b style="font-size: 10px;" v-for="(cycle,index) in product.product.prices" v-if="cycle.cycle == product.cycle">
                      （原价：{{product.quantity * cycle.price}}）
                    </b>
                  </b>
                </span>
          </div>
        </div>
      </div>
      <div  class="mobile-bg"></div>
      <div class="Details-Essential ">
        <div class=" confrim-modle1 ">
          <div class="text-indent" style="float:left">留言：</div>
          <textarea cols="" rows="" class="bus-order-text"
                    placeholder="选填：对本次交易的说明"
                    style="margin-left:16px; float:left" v-model="message"></textarea>
        </div>
      </div>
    </div>
    <br/><br/><br/>
    <div class="row mobile-menu5 " style="position: fixed; bottom: 50px; height:50px;" v-if="customer != ''">

      <div class="col-xs-12 text-right">
        总计 <font class="car-red">{{totalAmount | formatMoney}}</font>
        <button type="button" class="btn  btn-warning bus-btn " @click="createOrder ">下单
        </button>
      </div>
    </div>
    <mt-button v-if="customer == ''" type="primary" size="large" style="position: fixed; bottom: 50px; height:50px;" @click="setCustomer">
      完善个人信息
    </mt-button>
  </div>
</template>
<script>
  var qs = require('qs');
  import {Toast} from 'mint-ui';
  import { Indicator } from 'mint-ui';
  export default {
    data(){
      return {
        key: "",
        imgUrl1: "./../src/assets/1.png",
        product: [],
        totalAmount: 0,
        message: "",  // 订单留言
        receiverName: "",
        receiverMobileNo: "",

        // 客户信息
        customer: "",
        vendorId: 0,
      }
    },
    filters: {
      formatMoney: function (value) {
        return "￥ " + value;
      }
    },
    mounted: function ()
    {
      this.vendorId = sessionStorage.getItem("vendorId");
      this.init();
      this.getCustomerInfo();
    },
    methods: {
      init: function () {
        var url = global.API_ADDRESS_TEST + "shopcart/true";
        this.$http.get(url, {}).then( (response) =>{
          if (response.data.code == 0)
          {
            this.product = response.data.data;
          }
          for (var i = 0; i < this.product.length; i ++ )
          {
            // 竞价广告位
            if (this.product[i].product.prices.length == 0)
            {
              var url2 = global.API_ADDRESS_TEST + "bidResult/"+this.product[i].product.id;
              this.$http.get(url2, {}).then((response)=>{
                var amount;
                if (response.data.data.amount < response.data.data.product.bidParameter.reservePrice)
                {
                  amount = response.data.data.product.bidParameter.reservePrice;
                }
                else
                {
                  amount = response.data.data.amount
                }
                this.totalAmount += amount;
              }).catch(function (error){
                console.log(error);
              })
            }
            else
            {
              for (var j = 0; j < this.product[i].product.prices.length; j ++)
              {
                if (this.product[i].cycle == this.product[i].product.prices[j].cycle)
                {
                  if (this.product[i].selected)
                  {
                    var discount = this.product[i].discount;
                    var amount = this.product[i].quantity * this.product[i].product.prices[j].price;
                    if (discount > 0)
                    {
                      amount = amount * discount;
                    }
                    this.totalAmount += amount;
                  }
                }
              }
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      // 下单
      createOrder: function ()
      {
//        if (this.customerName == null || this.customerName == "")
//        {
//          Toast({
//            message: '请输入客户名称',
//            iconClass: 'icon icon-success'
//          });
//          return;
//        }
//        if (this.customerPhone == null || this.customerPhone == "")
//        {
//          Toast({
//            message: '请输入联系方式',
//            iconClass: 'icon icon-success'
//          });
//          return;
//        }

        var url = global.API_ADDRESS_TEST + "order";
        var postData = {
          name: this.customer.name,
          phone: this.customer.phone,
          clientNumber: this.customer.number,
          message: this.message,
          vendorId: this.vendorId,
        }

        this.$http.post(url, qs.stringify(postData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then( (response) => {
          if (response.data.code == 0)
          {
            var orderNo = response.data.data.orderNo;
            this.$router.push({path : "/payment/index/"+orderNo})
          }
          else
          {
            var msg = response.data.msg;
            Toast({
              message: msg,
              iconClass: 'icon icon-success'
            });
          }
        }).catch(function (error){
          console.log(error);
        })

      },

      // 获取客户信息
      getCustomerInfo: function ()
      {
        var url = global.API_ADDRESS_TEST + "customer";
        this.$http.get(url, {}).then((response)=>{
          var client = response.data.data;
          if (client != null)
          {
//            this.customerName = customer.name;
//            this.customerPhone = customer.phone;
            this.customer = client;
          }
        }).catch(function (error){
          console.log(error);
        })
      },

      // 完善个人信息
      setCustomer: function ()
      {
        this.$router.push({path : "/userhome/customer"})
      }
    }
  }
</script>
