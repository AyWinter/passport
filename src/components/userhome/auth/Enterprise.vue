<template>
    <div>
      <mt-header title="企业信息认证" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="bus-personal" id="bus-personal">
        <p style="color:red;">{{msg}}</p>
        <div class="bus-personal-model"><span>状态：</span>
          <input style="border:0px; color:red" value="未认证" readonly v-if="companyName == ''"/>
          <input style="border:0px" value="审核中" readonly v-if="state == 0 && companyName != ''"/>
          <input style="border:0px;" value="审核成功" readonly v-if="state == 1"/>
          <input style="border:0px; color:red" value="审核失败" readonly v-if="state == 2"/>
        </div>
        <div class="bus-personal-model"><span>公司名称：</span><input name="" type="text" style="border:0px;" v-model="companyName"
                                                                 placeholder="请输入公司名称" maxlength="50"></div>
        <div class="bus-personal-model"><span>公司地址：</span><input name="" type="text" style="border:0px;" v-model="address"
                                                                 placeholder="请输入公司地址" maxlength="100"></div>
        <div class="bus-personal-model"><span>公司电话：</span><input name="" type="text" style="border:0px;" v-model="phone"
                                                                 placeholder="请输入公司电话" maxlength="12"></div>
        <div class="bus-personal-model"><span>法人姓名：</span><input name="" type="text" style="border:0px;" v-model="legalPerson"
                                                                 placeholder="请输入法人姓名" maxlength="10"></div>
        <div class="bus-personal-model"><span>身份证号：</span><input name="" type="text" style="border:0px;" v-model="idcardNo"
                                                                 placeholder="请输入法人身份证号码" maxlength="18"></div>
        <div class="bus-personal-model"><span>开户银行：</span>
          <select style="width:55%" v-model="depositBank">
            <option>中国银行</option>
            <option>建设银行</option>
          </select>
        </div>
        <div class="bus-personal-model"><span>支行：</span><input name="" type="text" style="border:0px;" v-model="depositBankBranch"
                                                               placeholder="请输入开户银行支行" maxlength="50"></div>
        <div class="bus-personal-model"><span>银行账号：</span><input name="" type="text" style="border:0px;" v-model="accountNumber"
                                                                 placeholder="请输入开户银行账号" maxlength="18"></div>

        <div class="bus-personal-pic" style="text-align:left">
          <p>营业执照图片</p>

          <ul class="UP-warp1">
            <li>
              <input type="file" id="businessLicense" class="UP-file">
              <img id="businessLicenseImg" src="../../../../static/assets/yyzz.png" width="150" height="200"/>
              <textarea id="businessLicenseBase64" style="display: none"></textarea><br/>
            </li>
          </ul>
        </div>

        <div class="bus-personal-pic" style="text-align:left">
          <p>法人身份证图片</p>

          <ul class="UP-warp">
            <li>
              <input type="file" id="idcard" class="UP-file">
              <img id="idcardImg" src="../../../../static/assets/sfz.png" width="150" height="100"/>
              <textarea id="idcardBase64" style="display: none"></textarea><br/>
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
      businessLicenseBase64.innerHTML = this.result;
      document.getElementById("businessLicenseImg").src = this.result
    }
  }

  function readFile2() {
    var file = this.files[0];
    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
    if (!/image\/\w+/.test(file.type)) {
      alert("请确保文件为图像类型");
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      idcardBase64.innerHTML = this.result;
      document.getElementById("idcardImg").src = this.result
    }
  }
  import { Indicator } from 'mint-ui';
  import {Toast} from 'mint-ui';
  var qs = require('qs');
    export default {
      data(){
        return {
          msg: "",
          id: 0,
          accountId: 0,
          companyName: "",
          address: "",
          phone:"",
          legalPerson: "",
          idcardNo: "",
          depositBank: "中国银行",
          accountNumber: "",
          depositBankBranch: "",
          businessLicenseBase64: "",
          businessLicensePath: "",
          legalPersonIdcardBase64: "",
          legalPersonIdcardPath: "",
          state: 0
        }
      },
      mounted: function ()
      {
        this.initUpload();
        this.initData();
      },
      methods: {

        initUpload: function ()
        {
          var businessLicense = document.getElementById("businessLicense");
          var businessLicenseBase64 = document.getElementById("businessLicenseBase64");
          var businessLicenseImg = document.getElementById("businessLicenseImg");

          var idcard = document.getElementById("idcard");
          var idcardBase64 = document.getElementById("idcardBase64");
          var idcardImg = document.getElementById("idcardImg");

          if (typeof(FileReader) === 'undefined') {
            alert("error");
            idcardFrontBase64.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
            idcardFront.setAttribute('disabled', 'disabled');
          } else {
            businessLicense.addEventListener('change', readFile, false);
            idcard.addEventListener('change', readFile2, false);
          }
        },

        initData: function ()
        {
          var url = global.API_ADDRESS_TEST + "enterprise";
          this.$http.get(url, {}).then((response) => {
            if (response.data.data != null)
            {
              this.id = response.data.data.id;
              this.accountId = response.data.data.accountId;
              this.companyName = response.data.data.name;
              this.address = response.data.data.address;
              this.phone = response.data.data.phoneNo;
              this.legalPerson = response.data.data.legalPerson;
              this.idcardNo = response.data.data.legalPersonIdcardNo;
              this.depositBank = response.data.data.depositBank;
              this.depositBankBranch = response.data.data.depositBankBranch;
              this.accountNumber = response.data.data.accountNumber;
              this.businessLicensePath = response.data.data.businessLicense;
              this.legalPersonIdcardPath = response.data.data.legalPersonIdcard;
              this.state = response.data.data.state;

              document.getElementById("businessLicenseImg").src = this.businessLicensePath;
              document.getElementById("idcardImg").src = this.legalPersonIdcardPath;
            }
            this.enterprise = response.data.data;
          }).catch(function (error){
            alert(error);
          })
        },
        save: function ()
        {
          Indicator.open();
          this.businessLicenseBase64 = document.getElementById("businessLicenseBase64").value;
          this.legalPersonIdcardBase64 = document.getElementById("idcardBase64").value;

          var postData = {
            id: this.id,
            accountId : this.accountId,
            name: this.companyName,
            businessLicenseBase64: this.businessLicenseBase64,
            businessLicense: this.businessLicensePath,
            address: this.address,
            phoneNo: this.phone,
            legalPerson: this.legalPerson,
            legalPersonIdcardNo: this.idcardNo,
            legalPersonIdcardBase64: this.legalPersonIdcardBase64,
            legalPersonIdcard: this.legalPersonIdcardPath,
            depositBank: this.depositBank,
            depositBankBranch: this.depositBankBranch,
            accountNumber: this.accountNumber
          }

          var url = global.API_ADDRESS_TEST + "enterprise";
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
              scrollTo(0, 0);
            }
            else
            {
              this.$router.push({path: '/userhome/result'})
            }
          }).catch(function (error) {
            console.log(error);
            Indicator.close();
          });
        }
      }
    }
</script>
