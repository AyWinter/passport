<template>
    <div>
      <mt-header title="退款申请" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="mobile-bg" style="margin-top:45px;"></div>
      <div class="bus-personal">
        <div class="bus-personal-pic" style="width:100%">
          <div class="bus-personal-model" style="height:auto;height-line:auto;">
            <span style="width:100px;"><span style="color:red;width:5px;">*</span>退款原因：</span>
            <textarea v-model="reason" style="width:100%;height:250px;" maxlength="100" ></textarea>
            <span style="float:right;width:50%;">(不长于50字)</span>
          </div>
        </div>
      </div>
      <div class="row mobile-menu5 " style="position: fixed; bottom: 50px; height:50px;">

        <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="save">保存</button>
      </div>
    </div>
</template>
<script>
  import {Toast, MessageBox} from 'mint-ui';
  var qs = require('qs');
    export default {
      data(){
        return{

          orderNo: "",
          reason:"",
        }
      },
      mounted: function ()
      {
        this.orderNo = this.$route.params.orderNo;
      },
      methods:{

        // 保存
        save: function ()
        {
          if (this.reason == "")
          {
            MessageBox('提示', '请输入退款原因');
            return;
          }

          var data = {
            orderNo: this.orderNo,
            reason: this.reason
          };

          var url = global.API_ADDRESS_TEST + "order/refund/apply";
          this.$http.post(url, qs.stringify(data),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            var code = response.data.code;
            if (code != 0)
            {
              var msg = response.data.msg;
              MessageBox('提示', msg);
            }
            else
            {
              this.$router.push({path: "/order/refund/result"});
            }
          }).catch(function (error){
            console.log(error);
          })
        }
      }
    }
</script>
