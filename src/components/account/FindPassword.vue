<template>
    <div>
      <mt-header title="找回密码" fixed style="height:45px; font-size: 16px;">
      </mt-header>
      <div class="mobile-wrapper" style="margin-top:50px;">
        <div class="mobile-Crumbs">
          <div :class="step1Class">&nbsp;&nbsp;<span class="num-Dot">1</span>&nbsp;验证身份 <span class="glyphicon glyphicon-chevron-right"></span></div>
          <div :class="step2Class" ><span class="num-Dot">2</span>&nbsp;设置密码 <span class="glyphicon glyphicon-chevron-right"></span></div>
          <div :class="step3Class"><span class="num-Dot">3</span>&nbsp;完成</div>
        </div>
      </div>
      <div class="mobile-register" id="mobile-register" v-if="step1Class == 'choice pull-left'">
        <div class="row">
          <div class="col-xs-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="icon-tablet"></i></span>
              <input type="tel" class="form-control " placeholder="注册手机号码" v-model="mobileNo" maxlength="11" >
            </div>
          </div>
        </div>
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
        <div class="row">
          <div class="col-xs-12">
            <button type="button" class="btn  btn-default Application-btn" style="background-color: #26a2ff;  border-color: #26a2ff; color:white" @click="next">下一步</button>
          </div>
        </div>
      </div>
      <div class="mobile-register"  v-if="step2Class == 'choice pull-left'">
        <div class="row">
          <div class="col-xs-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="icon-tablet"></i></span>
              <input type="password" class="form-control " placeholder="新密码" v-model="password" maxlength="11" >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="icon-tablet"></i></span>
              <input type="password" class="form-control " placeholder="确认密码" v-model="confirmPassword" maxlength="11" >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button type="button" class="btn  btn-default Application-btn" style="background-color: #26a2ff;  border-color: #26a2ff; color:white" @click="resetPassword">重置密码</button>
          </div>
        </div>
      </div>
      <div class="mobile-register"  v-if="step3Class == 'choice pull-left'">
        <div class="Details-Essential  ">
          <div class="row confrim-modle1  text-center Payment-Success">
            <div class="col-xs-12 ">
              <p  class="Payment-Success-i"><span class="glyphicon glyphicon-ok"></span></p>
              密码修改成功
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <button type="button" class="btn  btn-default Application-btn" style="background-color: #26a2ff;  border-color: #26a2ff; color:white" @click="login">立即登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import {Toast} from 'mint-ui';
  var qs = require('qs');
    export default {
      data(){
        return{
          mobileNo: "",
          graphCode: "",
          mobileCode: "",
          count:60,
          step1Class: "choice pull-left",
          step2Class: "pull-left",
          step3Class: "pull-left",

          password: "",
          confirmPassword: ""
        }
      },
      methods: {
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

          var url = global.API_ADDRESS_TEST + "/sms/findPwd/"+this.mobileNo+"/"+this.graphCode;
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

        next: function ()
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
          if (this.mobileCode == "")
          {
            MessageBox('提示', '请输入手机验证码');
            return;
          }

          var url = global.API_ADDRESS_TEST + "findPassword/verify/"+this.mobileNo+"/"+this.mobileCode;
          this.$http.get(url, {}).then((response)=>{
            var code = response.data.code;
            if (code == 0)
            {
              this.step1Class = "pull-left";
              this.step2Class = "choice pull-left";
              this.step3Class = "pull-left";
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

        resetPassword: function ()
        {
          if (this.password == "")
          {
            MessageBox('提示', '请输入密码');
            return;
          }
          if (this.confirmPassword == "")
          {
            MessageBox('提示', '请输入确认密码');
            return;
          }

          var url = global.API_ADDRESS_TEST + "resetPassword";
          var data = {
            mobileNo: this.mobileNo,
            password: this.password,
            confirmPassword: this.confirmPassword
          }

          this.$http.post(url, qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            var code = response.data.code;
            if (code == 0)
            {
              this.step1Class = "pull-left";
              this.step2Class = "pull-left";
              this.step3Class = "choice pull-left";
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

        login: function ()
        {
          this.$router.push({path : "/sign"})
        }
      },
    }
</script>
