<template>
    <div>
      <mt-header title="需求发布" fixed style="height:45px; font-size: 16px;">
      </mt-header>
      <div class="mobile-bg" style="margin-top:45px;"></div>
      <div class="bus-personal">
        <div class="bus-personal-pic" style="width:100%">
          <div class="bus-personal-model">
            <span style="width:100px;"><span style="color:red;width:5px;">*</span>求购类型：</span>
            <select style="float:left; margin-top:14px;" v-model="currentMediaType">
              <option v-for="mediaType in mediaType">{{mediaType.value}}</option>
            </select>
          </div>
          <div class="bus-personal-model" style="height:auto;height-line:auto;">
            <span style="width:100px;"><span style="color:red;width:5px;">*</span>求购信息：</span>
            <textarea v-model="content" style="width:100%;height:250px;"
                      placeholder="请输入信息内容" maxlength="160" ></textarea>
            <span style="float:right;width:50%;">(不长于160字)</span>
          </div>
        </div>
      </div>
      <div class="row mobile-menu5 " style="position: fixed; bottom: 50px; height:50px;">

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
          mediaType: [],
          currentMediaType: "",
          content: "",
          vendorId: 0
        }
      },
      mounted: function ()
      {
        this.vendorId = sessionStorage.getItem("vendorId");
        this.init();
      },
      methods: {

        init: function ()
        {
          var url = global.API_ADDRESS_TEST + "parameter";

          this.$http.get(url, {}).then((response)=>{
            this.mediaType = response.data.data.productType;
            this.currentMediaType = response.data.data.productType[0].value;
          }).catch(function (error){
            console.log(error);
          })
        },

        save: function ()
        {
          if (this.content == "")
          {
            MessageBox('提示', "请输入内容");
            return;
          }

          var data = {
            mediaType: this.currentMediaType,
            content : this.content,
            vendorId: this.vendorId
          }

          var url = global.API_ADDRESS_TEST + "demand";

          this.$http.post(url, qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            if (response.data.code == 0)
            {
              this.$router.push({path: "/publish/demand/result"})
            }
          })
        }
      }
    }
</script>
