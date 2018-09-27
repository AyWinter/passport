<template>
    <div>
      <mt-header title="注册" fixed style="height:45px; font-size: 16px;">

      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="mobile-register" id="mobile-register">
        <form role="form" id="reg_Ver" >
          <p style="color:red">{{message}}</p>
          <div class="row">
            <div class="col-xs-12">
              <div class="input-group">
                <span class="input-group-addon"><i class="icon-tablet"></i></span>
                <input type="tel" class="form-control " placeholder="手机号" v-model="mobileNo" maxlength="11">
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
            <div class="col-xs-12">
              <div class="input-group">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input type="password" class="form-control " placeholder="确认密码" v-model="confirmPassword" maxlength="16">
              </div>
            </div>
          </div>
          <!--再次密码-->
          <div class="row">
            <div class="col-xs-7 pg-r0">
              <div class="input-group">
                <span class="input-group-addon"><i class="i-picture"><span class="icon-picture"></span></i></span>
                <input type="text" class="form-control" placeholder="图形验证码" v-model="graphCode" maxlength="4">
              </div>
            </div>
            <div class="col-xs-5 text-right ">
              <img src="http://api.hunchg.com/kaptcha" onclick="this.src = 'http://api.hunchg.com/kaptcha?d='+new Date()*1" class="register-yzm">
            </div>
          </div>
          <!--图形验证码-->
          <div class="row">
            <div class="col-xs-7 pg-r0">
              <div class="input-group">
                <span class="input-group-addon"><i class="icon-envelope"></i></span>
                <input type="text" class="form-control " placeholder="手机验证码" v-model="mobileCode" maxlength="4">
              </div>
            </div>
            <div class="col-xs-5  text-center ">
              <input type="button" class="register-yzm" id="verifyCode" @click="getVerifyCode" value="获取验证码">
            </div>
          </div>
          <!--获取验证码-->
          <div class="row mg-t10">
            <div class="col-xs-12 ">阅读并同意<a href="javascript:;" class="c-yellow" @click="registAgreement">《城际公交注册协议》</a></div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <button type="button" class="btn  btn-warning Application-btn" style="background-color: #26a2ff; border-color: #26a2ff" @click="regist">同意并注册</button>
            </div>
          </div>
          <!--登录按钮-->

          <div class="row">
            <div class="col-xs-12">
              <button type="button" class="btn  btn-default Application-btn" style="background-color: #26a2ff;  border-color: #26a2ff; color:white" @click="login">登录</button>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import {Toast} from 'mint-ui';
  var qs = require('qs');
    export default {
      data(){
        return {
          mobileNo: "",
          password: "",
          confirmPassword: "",
          graphCode: "",
          mobileCode:"",
          message:"",
          count: 60
        }
      },
      methods: {
        login: function ()
        {
          this.$router.push({path: "/sign"})
        },

        regist: function ()
        {
          if (this.mobileNo == "")
          {
            this.message = "请输入手机号码";
            return;
          }
          if (this.password == "")
          {
            this.message = "请输入密码";
            return;
          }
          if (this.confirmPassword == "")
          {
            this.message = "请输入确认密码";
            return;
          }
          if (this.graphCode == "")
          {
            this.message = "请输入图形验证码";
            return;
          }
          if (this.mobileCode == "")
          {
            this.message = "请输入手机验证码";
            return;
          }

          var url = global.API_ADDRESS_TEST + "account";
          var requestData = {
            mobileNo: this.mobileNo,
            password: this.password,
            kaptcha: this.graphCode,
            mobileVerifyCode: this.mobileCode,
            state: 1
          };
          this.$http.post(url, qs.stringify(requestData), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then( (response)=> {
            var code = response.data.code;
            console.log("code:" + code);
            if (code != 0)
            {
              this.message = response.data.msg;
            }
            else
            {
              this.$router.push({path : "/regist/result"})
            }
          }).catch(function (error) {
           console(error);
          });
        },

        // 获取手机验证码
        getVerifyCode: function ()
        {

          if (this.mobileNo == "")
          {
            MessageBox('提示', '请输入手机号码');
            return;
          }
          if (this.graphCode == "")
          {
            MessageBox('提示', '请输入图形验证码');
            return;
          }


          var url = global.API_ADDRESS_TEST + "/sms/regist/"+this.mobileNo+"/"+this.graphCode;
          this.$http.get(url, {}).then((response)=>{
            var code = response.data.code;
            if (code == 0)
            {
              Toast({
                message: '发送成功',
                iconClass: 'icon icon-success'
              });

              this.setGetCodeBtnStyle();
            }
            else
            {
              var msg = response.data.msg;
              MessageBox('提示', msg);
            }
          }).catch(function (error){
            console.log(error);
          })
        },

        setGetCodeBtnStyle: function ()
        {
          if (this.count == 0) {
            document.getElementById("verifyCode").value = "获取验证码";
            document.getElementById("verifyCode").disabled = false;
            document.getElementById("verifyCode").style.background = "#f79935"
            this.count = 60;
            return;
          } else {
            document.getElementById("verifyCode").style.background = "#c9c9c9"
            document.getElementById("verifyCode").value = this.count + "s";
            document.getElementById("verifyCode").disabled = true;
            this.count --;
          }
          var _this = this;
          setTimeout(function() {
              _this.setGetCodeBtnStyle() }
            ,1000)
        },

        // 注册协议
        registAgreement: function ()
        {
          this.$router.push({path: "/agreement/regist"})
        }
      }
    }
</script>
