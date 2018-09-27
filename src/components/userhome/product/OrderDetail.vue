<template>
    <div>
      <mt-header title="订单详情" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome/order" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg">
      </div>
      <div class="Confirm-address1 " style="text-align:left; margin-top:45px;">
        <ul class="mg-l10">
          <li>购买用户信息</li>
          <li>姓名：{{order.receiver.name}}</li>
          <li>联系电话： {{order.receiver.mobileNo}}  &nbsp;&nbsp; </li>
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
          </div>

          <div class="bus-Details-Essential " v-for="orderProduct in order.orderProducts">
            <div class="shopp-car  bg-gray">
              <div class="col-xs-4  " >
                <img :src="orderProduct.product.images[0].path" width="100%">
              </div>
              <div class="col-xs-8">
                <dl class="mobile-inf ">
                  <dt><strong>{{orderProduct.product.name}} </strong></dt>
                  <dd>{{orderProduct.amount}} / {{orderProduct.cycle}}   共   {{orderProduct.quantity}}{{orderProduct.cycle}}</dd>
                  <dd>
                    <span class="glyphicon glyphicon-map-marker"></span>
                    {{orderProduct.product.city}}
                    {{orderProduct.product.area}}
                    {{orderProduct.product.address}}
                  </dd>
                  <dd>{{orderProduct.startTime | formatDate}} 至 {{orderProduct.endTime | formatDate}}</dd>
                </dl>
              </div>
            </div>
          </div>

        </div><br/><br/>
        <div class="row mobile-menu5 " style="position: fixed; bottom: 0; height:50px;" v-if="order.state != 1">

          <div style="width:100%;">
            <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="pay">付款
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          id: 0,
          order: ""
        }
      },
      mounted: function ()
      {
        this.id = this.$route.params.id
        this.initData();
      },
      methods: {

        initData: function ()
        {

        }
      }
    }
</script>
