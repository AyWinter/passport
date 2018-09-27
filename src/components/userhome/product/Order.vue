<template>
    <div>
      <mt-header title="我的订单" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome/product" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="bus-Details-information" v-for="product in orderProduct">
        <div class="bus-Details-Essential boder-tn " >
          <div class="shopp-car  bg-gray">
            <div class="col-xs-4  " >
              <img :src="product.product.images[0].path" width="100%">
            </div>
            <div class="col-xs-8" style="text-align:left">
              <dl class="mobile-inf ">

                <dd>金额：{{product.amount}}</dd>
                <dd>折扣：{{product.discountAmount}}</dd>
                <dd>投放周期：<br/>{{product.startTime | formatDate}} — {{product.endTime | formatDate}}</dd>
              </dl>
            </div>
          </div>
          <div class="row shopp-car-edit  pg-b5" >
            <div class="col-xs-12 text-right">
              <button type="button" class="btn btn-warning orders-btn"
                      style="background-color: #26a2ff; border-color: #26a2ff" @click="detail(product.id)">详情
              </button>
            </div>
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
          orderProduct:[]
        }
      },
      filters: {

        formatDate: function (value) {
          var date = new Date(value);
          return formatDate(date, 'yyyy年MM月dd日');
        }
      },
      mounted: function ()
      {
        this.initData();
      },
      methods: {
        initData: function ()
        {
          var url = global.API_ADDRESS_TEST + "order/product";
          this.$http.get(url, {}).then((response)=>{
            this.orderProduct = response.data.data;
          }).catch (function (error){
            console.log(error);
          })
        },
        detail: function (id)
        {

        }
      }
    }
</script>
