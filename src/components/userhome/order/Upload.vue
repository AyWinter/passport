<template>
    <div>
      <mt-header title="上传画面" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <br/>
      <div class="bus-personal" id="bus-personal">
        <div class="bus-personal-pic">

          <ul id="warp" class="" >
            <li>
              <input type="file" id="pictureFront" class="UP-file">
              <img id="picture" src="../../../../static/assets/a11.png" width="150" height="150"/>
              <textarea id="pictureBase64" style="display: none"></textarea><br/>
            </li>
          </ul>
        </div><br/>
        <div>
          <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="save">保存</button>
        </div>
      </div>
    </div>
</template>
<script>
  function readFile() {
    var file = this.files[0];
    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
    if (!/image\/\w+/.test(file.type)) {
      alert("请确保文件为图像类型");
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      pictureBase64.innerHTML = this.result;
      document.getElementById("picture").src = this.result
    }
  }
  var qs = require('qs');
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
    export default {
      data(){
        return {
          scheduleNumber: "",
          vendorId: 0
        }
      },
      mounted: function ()
      {
        this.scheduleNumber = this.$route.params.scheduleNumber;
        this.vendorId = parseInt(sessionStorage.getItem("vendorId"));
        this.initUpload();
      },
      methods: {

        initUpload: function ()
        {
          var file1 = document.getElementById("pictureFront");
          var file1Base64 = document.getElementById("pictureBase64");
          var img1 = document.getElementById("picture");
          if (typeof(FileReader) === 'undefined') {
            file1Base64.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
            file1.setAttribute('disabled', 'disabled');
          } else {
            file1.addEventListener('change', readFile, false);
          }
        },

        save: function ()
        {
          Indicator.open();
          var pictureBase64 = document.getElementById("pictureBase64").value;
          if (pictureBase64 == null || pictureBase64 == "")
          {
            Toast('请上传画面');
            return;
          }

          var data = {
            scheduleNumber:  this.scheduleNumber,
            pictureBase64: pictureBase64,
            vendorId: this.vendorId,
          };

          var url = global.API_ADDRESS_TEST + "schedule/picture/upload";
          this.$http.post(url, qs.stringify(data),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            var code = response.data.code;
            if (code == -1)
            {
              var msg = response.data.msg;
              Toast(msg);
            }
            else
            {
              Toast("保存成功");
            }
            Indicator.close();
          }).catch(function (error){
            console.log(error);
            Indicator.close();
          })
        },
      }
    }
</script>
