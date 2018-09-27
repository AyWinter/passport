<template>
    <div>
      <mt-header title="折扣活动添加" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome/activity" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="bus-personal" id="bus-personal">
        <p style="color:red">{{msg}}</p>
        <div class="bus-personal-model"><span>满：</span><input
          style="border: 1px solid #f4f4f4; height:38px; float:left; margin-top:2px;" type="text" v-model="amount"
          placeholder="请输入名称" maxlength="9">元</div>
        <div class="bus-personal-model"><span>打：</span><input
          style="border: 1px solid #f4f4f4; height:38px; float:left; margin-top:2px;" type="text" v-model="discount"
          placeholder="请输入名称" maxlength="9">折</div>
        <div class="bus-personal-model"><span>开始时间：</span><input
          style="border: 1px solid #f4f4f4; height:38px; float:left; margin-top:2px;" type="datetime-local" v-model="startTime"
          ></div>
        <div class="bus-personal-model"><span>结束时间：</span><input
          style="border: 1px solid #f4f4f4; height:38px; float:left; margin-top:2px;" type="datetime-local" v-model="endTime"
          ></div>
        <div class="bus-personal-model">
          示例：满5000元打9折
        </div>
      </div>
      <div class="row mobile-menu5 " style="position: fixed; bottom: 0; height:50px;">

        <div style="width:100%;">
          <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="save">保存</button>
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
          amount:0,
          discount:0,
          startTime: "",
          endTime: "",
          msg: ""
        }
      },
      methods: {
        save: function ()
        {
          var postData = {
            amount: this.amount,
            discount: this.discount,
            startTime: this.startTime.replace("T", " "),
            endTime: this.endTime.replace("T", " "),
          }
          var url = global.API_ADDRESS_TEST + "activity"
          this.$http.post(url, qs.stringify(postData)).then((response)=>{
            if (response.data.code != 0)
            {
              this.msg = response.data.msg;
            }
            else
            {
              this.$router.push({path: "/userhome/activity"})
            }
          }).catch(function (error){
            console.log(error);
          })
        }
      }
    }
</script>
