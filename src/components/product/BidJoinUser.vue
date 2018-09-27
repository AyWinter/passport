<template>
    <div>
      <mt-header title="添加参与人员" fixed style="height:45px; font-size: 16px;">

      </mt-header>
      <div class="mobile-bg" style="margin-top:45px;"></div>
      <div class="bus-personal">
        <div class="bus-personal-pic" style="width:100%">
          <div class="bus-personal-model">
            <span style="width:100px;"><span style="color:red;width:5px;">*</span>手机号码：</span>
            <input type="tel" v-model="mobileNo" maxlength="11"/>
          </div>
          <div class="bus-personal-model" style="height:auto;height-line:auto;">
            <span style="width:100px;"><span style="color:red;width:5px;">*</span>备注：</span>
            <textarea v-model="explain" style="width:100%;height:150px;"
                      placeholder="" maxlength="160" ></textarea>
            <span style="float:right;width:50%;">(不长于160字)</span>
          </div>
        </div>
      </div>
      <div class="row mobile-menu5 " style="position: fixed; bottom: 0; height:50px;">

        <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="save ">保存</button>
      </div>
    </div>
</template>
<script>
  var qs = require('qs');
  import {Toast, MessageBox} from 'mint-ui';
    export default {
      data(){
        return {
          mobileNo: "",
          explain: "",
          productId: 0
        }
      },
      mounted: function ()
      {
        this.productId = this.$route.params.productId;
      },
      methods: {

        save: function ()
        {
          if (this.mobileNo == "")
          {
            MessageBox('提示', "请输入手机号码");
            return;
          }

          var url = global.API_ADDRESS_TEST + "bidJoinUser";

          var data = {
            mobileNo: this.mobileNo,
            productId: this.productId
          }

          this.$http.post(url, qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            if (response.data.code == 0)
            {
              Toast({
                message: '添加成功',
                iconClass: 'icon icon-success'
              });
              this.mobileNo = "";
              this.explain = "";
            }
            else
            {
              MessageBox('提示', response.data.msg);
              return;
            }
          }).catch(function (error){
            console.log(error);
          })
        }
      }
    }
</script>
