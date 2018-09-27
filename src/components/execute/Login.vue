<template>
    <div>
      <mt-header title="登录" fixed style="height:45px; font-size: 16px;">

      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="mobile-register" id="mobile-register">
        <p style="color:red;float:left">{{message}}</p>
        <div class="row">
          <div class="col-xs-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="icon-tablet"></i></span>
              <input type="tel" class="form-control " placeholder="手机号 " v-model="mobileNo" maxlength="11" >
            </div>
          </div>
        </div>
        <!--手机号码-->
        <div class="row">
          <div class="col-xs-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="icon-lock"></i></span>
              <input type="password" class="form-control " placeholder="密码" v-model="password" maxlength="16">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button type="button" class="btn  btn-default Application-btn" style="background-color: #26a2ff; border:1px solid #26a2ff; color:white" @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  var qs = require('qs');
  import {Toast} from 'mint-ui';
    export default {
      data(){
        return{
          mobileNo: "",
          password: "",
          message: "",
          type: 1
        }
      },
      mounted: function ()
      {
        sessionStorage.setItem("execute", this.type)
      },

      methods: {

        // 登录
        login: function ()
        {
          var url = global.API_ADDRESS_TEST + "account/execute/" + this.mobileNo + "/" + this.password;

          this.$http.get(url, {}).then((response)=>{

            var account = response.data.data;
            sessionStorage.setItem("token", account.id);

            this.$router.push({path : "/execute/list"})
          }).catch(function (error){
            console.log(error);
          })
        }
      }
    }
</script>
