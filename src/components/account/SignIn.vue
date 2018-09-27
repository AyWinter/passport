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
          <!--密码-->

          <div class="row">
            <div class="col-xs-7 pg-r0">
              <div class="input-group">
                <span class="input-group-addon"><i class="icon-picture"><span class=""></span></i></span>
                <input type="text" class="form-control" v-model="kaptcha" placeholder="图形验证码" maxlength="4">
              </div>
            </div>
            <div class="col-xs-5 text-right ">
              <img :src="kaptchaUrl" onclick="this.src = 'http://api.hunchg.com/kaptcha?d='+new Date()*1" class="register-yzm">
            </div>
          </div>
          <!--图形验证码-->
          <div class="row">
            <div class="col-xs-12">
              <button type="button" class="btn  btn-default Application-btn" style="background-color: #26a2ff; border:1px solid #26a2ff; color:white" @click="login">登录</button>
            </div>
          </div>
          <!--登录按钮-->
          <div class="row">
            <div class="col-xs-6 text-left mg-t10 ">
              <a href="javascript:;" @click="findPassword" >找回密码</a>
            </div>
            <div class="col-xs-6 text-right mg-t10">
              <a href="javascript:;" @click="regist" >免费注册</a>
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
        return {
          mobileNo:"",
          password:"",
          message: "",
          kaptcha: "",

          kaptchaUrl : global.API_ADDRESS_TEST + "kaptcha"
        }
      },
      methods: {

        login: function ()
        {
          if (this.mobileNo == "")
          {
            Toast({
              message: "请输入手机号码",
              iconClass: 'icon icon-success'
            });
            return;
          }
          if (this.password == "")
          {
            Toast({
              message: "请输入密码",
              iconClass: 'icon icon-success'
            });
            return;
          }
          if (this.kaptcha == "")
          {
            Toast({
              message: "请输入图形验证码",
              iconClass: 'icon icon-success'
            });
            return;
          }
          var url = global.API_ADDRESS_TEST + "account/"+this.mobileNo+"/"+this.password+"/"+this.kaptcha
          this.$http.get(url, {}).then((response)=>{
            console.log(response.data);
            if (response.data.code == 0)
            {
              let token = response.data.data;
              sessionStorage.setItem("token", token)
              var returnUrl = sessionStorage.getItem("returnUrl");
              if (returnUrl != null)
              {
                this.$router.push({path: returnUrl})
              }
              else
              {
                var vendorId = sessionStorage.getItem("vendorId");
                if (parseInt(vendorId) == 1)
                {
                  this.$router.push({path : "/damei"})
                }
                else
                {
                  this.$router.push({path : "/"})
                }
              }
            }
            else
            {
              this.message = response.data.msg;
            }
          }).catch(function (error){
            console.log(error);
          })
        },
        regist: function ()
        {
          this.$router.push({path: "/regist"})
        },

        // 找回密码
        findPassword: function ()
        {
          this.$router.push({path: "/findPassword"})
        }
      }
    }
</script>
