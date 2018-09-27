<template>
    <div>
      <mt-header title="订单详情" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="Confirm-address1 " style="text-align:left; margin-top:45px;">
        <ul class="mg-l10" v-if="customer != null">
          <li>购买用户信息</li>
          <li>姓名：{{customer.name}}</li>
          <li>联系电话： {{customer.phone}}  &nbsp;&nbsp; </li>
        </ul>
      </div>
      <div  class="mobile-bg">
      </div>
      <div class="Details-Essential  " style="text-align:left">
        <div class="Details-Essential boder-tn ">
          <div class="col-xs-12">
            <ul>
              <li>订单编号: {{order.orderNo}} </li>
              <li>订单金额: ￥{{order.amount}} </li>
              <li>折扣金额: ￥{{order.discountAmount}} </li>
              <li>下单时间：{{order.createdTime | formatDate}}</li>
              <li>
                付款时间:
                <b v-if="order.state == 1">{{order.payTime | formatDate}}</b>
                <b v-if="order.state != 1">未付款</b>
              </li>
              <li>
                付款方式：
                <b v-if="order.state == 1"><b v-if="order.payMethod == 1">微信支付</b></b>
                <b v-if="order.state != 1">未付款</b>

              </li>
              <li>
                订单状态：
                <b v-if="order.state == 3">
                  已取消
                </b>
                <b v-if="order.state == 0 || order.state == null">
                  待付款
                </b>
                <b v-if="order.state == 1">
                  已付款
                </b>
              </li>
              <li v-if="order.refundState != null">
                退款状态：
                <b v-if="order.refundState == 1">退款成功</b>
                <b v-if="order.refundState == 2">系统审核中</b>
                <b v-if="order.refundState == 3">拒绝退款</b>
              </li>
              <li>留言：{{order.message}} </li>
            </ul>
          </div>
        </div>
        <div  class="mobile-bg">
        </div>
        <div class="Details-Essential  ">
          <div class="row">
            <div class="col-xs-8 text-indent">
              广告位清单：
            </div>
            <div>
              <mt-button style="margin-top:-10px; display: none" size="small" type="primary" @click="picture">广告画面</mt-button>

            </div>
          </div>

          <div class="bus-Details-Essential " v-for="orderProduct in order.orderProducts">
            <div class="shopp-car  bg-gray">
              <div class="col-xs-4  " >
                <img :src="orderProduct.product.images[0].path" width="100%">
              </div>
              <div class="col-xs-8">
                <dl class="mobile-inf " v-if="orderProduct.product != null">
                  <dt style="display:block"><strong>{{orderProduct.product.number}} </strong></dt>
                  <dd style="display:block">{{orderProduct.amount}} / {{orderProduct.cycle}}   共   {{orderProduct.quantity}}{{orderProduct.cycle}}</dd>
                  <dd>
                    <span class="glyphicon glyphicon-map-marker"></span>
                    {{orderProduct.product.position.area}}
                    {{orderProduct.product.position.road}}
                    {{orderProduct.product.position.station}}
                  </dd>
                  <dd>{{orderProduct.startTime | formatDate}} 至 {{orderProduct.endTime | formatDate}}</dd>
                </dl>
              </div>
            </div>
          </div>


        </div>

        <div class="row shopp-car-edit ">
          <div class="col-xs-8 " style="float:left;">
                <span class="c-red  f-16" style="float:left">

                </span>
          </div>
          <!--1-->
          <div class="col-xs-4 pg-l0 text-right" v-if="order.state == 1 && order.refundState == null">
            <mt-button style="margin-top:-10px;" size="small" type="primary" @click="refund">申请退款</mt-button>
          </div>
          <div class="col-xs-4 pg-l0 text-right" v-if="order.refundState == 2" style="display: none">
            <mt-button style="margin-top:-10px;" size="small" type="primary" @click="progress">退款进度</mt-button>
          </div>
        </div>

        <div class="row mobile-menu5 " style="position: fixed; bottom: 50px; height:50px;" v-if="order.state != 1 && order.state != 3">

          <div style="width:100%;">
            <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="pay">付款
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {formatDate} from '../../../../static/js/date.js';
    export default {
      data(){
        return {
          order: "",
          orderNo: "",
          customer: ""
        }
      },
      filters: {

        formatDate: function (value) {
          var date = new Date(value);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      mounted:function ()
      {
        this.orderNo = this.$route.params.orderNo;
        this.initData();
        this.getCustomer();
      },
      methods: {
        initData: function ()
        {
          var url = global.API_ADDRESS_TEST + "order/" + this.orderNo;
          this.$http.get(url, {}).then((response) => {
            this.order = response.data.data;
            console.log(this.order);
          }).catch(function (error){
            console.log(error);
          })
        },

        // 获取客户信息
        getCustomer: function ()
        {
          var url = global.API_ADDRESS_TEST + "customer";
          this.$http.get(url, {}).then((response)=>{
            this.customer = response.data.data;
          }).catch(function (error){
            console.log(error);
          })
        },
        pay: function ()
        {
          var url = global.API_ADDRESS_TEST + "order/check/"+this.orderNo;
          this.$http.get(url, {}).then((response) => {
            console.log(response.data);
            if (response.data.code == 0)
            {
              this.$router.push({path: "/payment/index/"+this.orderNo})
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

        // 广告画面
        picture: function ()
        {
           this.$router.push({path: "/order/picture/"+ this.orderNo});
        },

        // 申请退款
        refund: function ()
        {
          this.$router.push({path: "/order/refund/"+ this.orderNo});
        },

        // 退款进度
        progress: function ()
        {

        }

      }
    }
</script>
