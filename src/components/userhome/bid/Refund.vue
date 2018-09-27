<template>
    <div>
      <mt-header title="待退保证金" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome/bid" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="mobile-order text-center" style="margin-top:100px;" v-if="bond.length == 0">
        <span class="glyphicon glyphicon-list-alt"></span>
        <p class="f-20">暂无待退保证金记录</p>
        <p>
          <button type="button" class="btn btn-default btn-order"
                  @click="goHome">随便逛逛</button>
        </p>
      </div>
      <div class="Details-Essentia2 " style="margin-top:45px;" >
        <div class="bus-message" style="text-align: left" v-for="bond in bond">
          <div class="bus-message-module ">
            <div class="bus-message-title ">
              <span class="c-yellow"> 交易号：{{bond.transactionId}}</span>
            </div>
            <div class="bus-message-content" style="text-align: left">
              <p>
                付款时间：{{bond.createdTime | formatDate}}<br/>
                金额：{{bond.amount}}
              </p>
              <p style="text-align: right">
                <mt-button type="primary" size="small" @click="refund(bond)">申请退款</mt-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {formatDate} from '../../../../static/js/date.js';
  import {Toast, MessageBox} from 'mint-ui';
  import { Indicator } from 'mint-ui';
  var qs = require('qs');
    export default {
      data(){
        return {
          bond:[]
        }
      },
      filters: {

        formatDate: function (value) {
          var date = new Date(value);
          return formatDate(date, 'yyyy年MM月dd日 hh:mm');
        }
      },
      mounted: function ()
      {
        this.init();
      },
      methods: {

        init: function ()
        {
          var url = global.API_ADDRESS_TEST + "bond/user";

          this.$http.get(url, {}).then((response)=>{

            this.bond = response.data.data;
          }).catch(function (error){
            console.log(error);
          })
        },
        // 退款保证金
        refund: function (bond)
        {
          Indicator.open();
          var productId = bond.bond.productId;
          var url = global.API_ADDRESS_TEST + "bond/refund/check/"+productId;

          this.$http.get(url, {}).then((response)=>{

            var code = response.data.code;

            if (code != 0)
            {
              Indicator.close();
              MessageBox('提示',response.data.msg);
            }
            else
            {
              console.log("可以申请退款");
              url = global.API_ADDRESS_TEST + "refund/apply";
              var data = {
                productId: bond.bond.productId,
                orderNo: bond.orderNo
              }
              this.$http.post(url, qs.stringify(data), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then((response)=>{
                var code = response.data.code;
                if (code != 0)
                {
                  Indicator.close();
                  MessageBox('提示',response.data.msg);
                }
                else
                {
                  Indicator.close();
                  MessageBox('提示',"退款申请提交成功，预计两个工作日退款。");
                  this.init();
                }
              }).catch(function (error){
                Indicator.close();
                console.log(error);
              })
            }
          }).catch(function (error){
            Indicator.close();
            console.log(error);
          })
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
