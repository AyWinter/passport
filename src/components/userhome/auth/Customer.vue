<template>
    <div>
      <mt-header title="客户信息" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="bus-personal" id="bus-personal">
        <div class="bus-personal-model"><span>客户名称：</span><input name="" type="text" style="border:0px;" v-model="name"
                                                                 placeholder="请输入客户名称" maxlength="50"></div>
        <div class="bus-personal-model"><span>联系电话：</span><input name="" type="text" style="border:0px;" v-model="phone"
                                                                 placeholder="请输入联系电话" maxlength="20"></div>
        <div class="bus-personal-model"><span>地址：</span><input name="" type="text" style="border:0px;" v-model="address"
                                                                 placeholder="" maxlength="100"></div>
        <div class="bus-personal-model"><span>发票抬头：</span><input name="" type="text" style="border:0px;" v-model="invoiceTitle"
                                                               placeholder="" maxlength="100"></div>
        <div class="bus-personal-model"><span>纳税人识别号：</span><input name="" type="text" style="border:0px;" v-model="taxIdentificationNumber"
                                                               placeholder="" maxlength="100"></div>
        <div class="bus-personal-model"><span>开户银行：</span><input name="" type="text" style="border:0px;" v-model="depositBank"
                                                               placeholder="" maxlength="100"></div>
        <div class="bus-personal-model"><span>开户账号：</span><input name="" type="text" style="border:0px;" v-model="depositNumber"
                                                               placeholder="" maxlength="100"></div>
        <br/>
        <div>
          <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="save">保存</button>
        </div>
      </div>

    </div>
</template>
<script>
  var qs = require('qs');
  import { Toast } from 'mint-ui';
    export default {
      data(){
        return {
          vendorId: 0,
          id: 0,
          name: "",
          phone: "",
          invoiceTitle: "",   // 发票抬头
          taxIdentificationNumber: "",   // 纳税人识别号
          depositBank: "",   // 开户银行
          depositNumber: "",   // 开户账号
          address: ""
        }
      },
      mounted: function ()
      {
        this.vendorId = parseInt(sessionStorage.getItem("vendorId"));
        this.init();
      },
      methods:{

        init: function ()
        {
          var url = global.API_ADDRESS_TEST + "customer";
          this.$http.get(url, {}).then((response)=>{
            var customer = response.data.data;
            if (customer != null)
            {
              this.id = customer.id;
              this.name = customer.name;
              this.phone = customer.phone;
              this.invoiceTitle = customer.invoiceTitle;
              this.taxIdentificationNumber = customer.taxIdentificationNumber;
              this.depositBank = customer.depositBank;
              this.depositNumber = customer.depositNumber;
              this.address = customer.address;
            }
          }).catch(function (error){
            console.log(error);
          })
        },

        save: function ()
        {
          if (this.name == "" || this.name == null)
          {
            Toast('请输入客户名称');
            return;
          }
          if (this.phone == "" || this.phone == null)
          {
            Toast('请输入联系电话');
            return;
          }

          var url = global.API_ADDRESS_TEST + "customer";
          var data = {
            id: this.id,
            vendorId: this.vendorId,
            name: this.name,
            phone: this.phone,
            invoiceTitle: this.invoiceTitle,
            taxIdentificationNumber: this.taxIdentificationNumber,
            depositBank: this.depositBank,
            depositNumber: this.depositNumber,
            address: this.address
          };
          this.$http.post(url, qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            if (response.data.code == -1)
            {
              var msg = response.data.msg;
              Toast(msg);
            }
            else {
              Toast({
                message: '保存成功',
                iconClass: 'icon icon-success'
              });
              this.init();
            }
          }).catch(function (error){
            console.log(error);
          })
        }
      }
    }
</script>
