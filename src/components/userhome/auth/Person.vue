<template>
    <div>
      <mt-header title="个人信息认证" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="bus-personal" id="bus-personal">
        <p style="color:red">{{msg}}</p>
        <div class="bus-personal-model"><span>状态：</span>
          <input style="border:0px; color:red" value="未认证" readonly v-if="realName == ''"/>
          <input style="border:0px" value="审核中" readonly v-if="state == 0 && realName != ''"/>
          <input style="border:0px" value="审核成功" readonly v-if="state == 1"/>
          <input style="border:0px; color:red" value="审核失败" readonly v-if="state == 2"/>
        </div>
        <div class="bus-personal-model"><span>真实姓名：</span><input style="border:0px" type="text" v-model="realName"  placeholder="请输入您的真实姓名" maxlength="10"></div>
        <div class="bus-personal-model"><span>身份证号：</span><input style="border:0px" type="text" v-model="idcardNo" placeholder="请输入您的身份证号" maxlength="18"></div>

        <div class="bus-personal-pic" style="text-align:left">
          <p>身份证正反面照片</p>
          <font class="">温馨提示：请上传原始比例的身份证正反面，请勿剪裁涂改，保证身份证信息清晰显示，否则无法通过审核</font>


          <ul id="warp" class="UP-warp">
            <li>
              <input type="file" id="idcardFront" class="UP-file">
              <img id="idcardFrontImg" src="../../../../static/assets/sfz.png" width="150" height="100"/>
              <textarea id="idcardFrontBase64" style="display: none"></textarea><br/>
            </li>

            <li>
              <input type="file" id="idcardBack" class="UP-file">
              <img id="idcardBackImg" src="../../../../static/assets/sfz1.png" width="100" height="100">
              <textarea id="idcardBackBase64" style="display: none"></textarea><br/>
            </li>
          </ul>
        </div><br/>
        <div>
          <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="save">保存</button>
        </div>
      </div>
      <div class="row mobile-menu5 " style="position: fixed; bottom: 0; height:50px;">

        <div style="width:100%;">

        </div>
      </div>
    </div>
</template>

<script>
  function readFile(){
    var file = this.files[0];
    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
    if(!/image\/\w+/.test(file.type)){
      alert("请确保文件为图像类型");
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
      idcardFrontBase64.innerHTML = this.result;
      document.getElementById("idcardFrontImg").src=this.result
    }
  }

  function readFile2(){
    var file = this.files[0];
    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
    if(!/image\/\w+/.test(file.type)){
      alert("请确保文件为图像类型");
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
      idcardBackBase64.innerHTML = this.result;
      document.getElementById("idcardBackImg").src=this.result
    }
  }
  import { Indicator } from 'mint-ui';
  import {Toast} from 'mint-ui';
  var qs = require('qs');
    export default {
      data(){
        return {
          id:0,
          accountId: 0,
          realName: "",
          idcardNo: "",
          idcardFrontBase64:"",
          idcardBackBase64:"",
          idcardFrontPath: "",
          idcardBackPath: "",
          msg: "",
          state: 0
        }
      },
      mounted: function ()
      {
        this.initUpload();
        this.init();
      },
      methods: {

        initUpload: function ()
        {
          var idcardFront = document.getElementById("idcardFront");
          var idcardFrontBase64= document.getElementById("idcardFrontBase64");
          var idcardFrontImg = document.getElementById("idcardFrontImg");

          var idcardBack = document.getElementById("idcardBack");
          var idcardBackBase64= document.getElementById("idcardBackBase64");
          var idcardBackImg = document.getElementById("idcardBackImg");

          if ( typeof(FileReader) === 'undefined' ){
            idcardFrontBase64.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
            idcardFront.setAttribute( 'disabled','disabled' );
          } else {
            idcardFront.addEventListener( 'change',readFile,false );
            idcardBack.addEventListener( 'change',readFile2,false );
          }
        },


        init: function ()
        {
          var url = global.API_ADDRESS_TEST + "person"
          this.$http.get(url, {}).then( (response) => {
            if (response.data.code != 0)
            {
              this.msg = response.data.msg;
            }
            else if (response.data.data != null)
            {
              this.realName = response.data.data.name;
              this.idcardNo = response.data.data.idcardNo;
              this.idcardFrontPath = response.data.data.idcardImgFront;
              this.idcardBackPath = response.data.data.idcardImgBack;
              this.id = response.data.data.id;
              this.accountId = response.data.data.accountId;
              this.state = response.data.data.state;

              document.getElementById("idcardFrontImg").src = this.idcardFrontPath;
              document.getElementById("idcardBackImg").src = this.idcardBackPath;
            }

          }).catch(function (error) {
            console(error);
          });
        },
        save: function ()
        {
          if (this.realName == null || this.realName == "")
          {
            Toast({
              message: '请输入真实姓名',
              iconClass: 'icon icon-success'
            });
            return;
          }
          if (this.idcardNo == null || this.idcardNo == "")
          {
            Indicator.close();
            Toast({
              message: '请输入身份证号码',
              iconClass: 'icon icon-success'
            });
            return;
          }
          this.idcardFrontBase64 = document.getElementById("idcardFrontBase64").value;
          this.idcardBackBase64 = document.getElementById("idcardBackBase64").value;
          var postData = {
            id: this.id,
            accountId: this.accountId,
            name: this.realName,
            idcardNo: this.idcardNo,
            idcardFrontBase64: this.idcardFrontBase64,
            idcardBackBase64: this.idcardBackBase64,
            idcardImgFront: this.idcardFrontPath,
            idcardImgBack:this.idcardBackPath
          }
          var url = global.API_ADDRESS_TEST + "person"
          this.$http.post(url, qs.stringify(postData), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then( (response) => {
            var code = response.data.code;
            Indicator.close();
            if (code != 0)
            {
              this.msg = response.data.msg;
            }
            else
            {
              this.$router.push({path: '/userhome/result'})
            }
          }).catch(function (error) {
            Indicator.close();
            console.log(error);
          });

        }
      }
    }
</script>
