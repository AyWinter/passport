<template>
  <div>
    <mt-header title="广告位发布" fixed style="height:45px; font-size: 16px;">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mobile-bg" style="margin-top:45px;">
    </div>
    <div class="bus-personal" id="bus-personal">
      <label style="color:red">{{msg}}</label>
      <p>广告位图片</p>
      <div class="bus-personal-pic" style="width:100%">
        <ul class="UP-warp">
          <li>
            <input type="file" id="file1" class="UP-file">
            <img id="img1" src="../../../static/assets/a11.png"/>
            <textarea id="file1Base64" style="display: none"></textarea><br/>
          </li>
          <li>
            <input type="file" id="file2" class="UP-file">
            <img id="img2" src="../../../static/assets/a11.png"/>
            <textarea id="file2Base64" style="display: none"></textarea><br/>
          </li>
        </ul>
      </div>
      <br/>
      <p>基本信息</p>
      <div class="bus-personal-model"><span>类型：</span>
        <select v-model="currentProuctType" style="float:left; margin-top:10px;">
          <option v-for="productType in parameters.productType">{{productType.value}}</option>
        </select>
      </div>
      <div class="bus-personal-model"><span>名称：</span><input
        style="border: 1px solid #f4f4f4; height:38px; float:left; margin-top:2px;" type="text" v-model="name"
        placeholder="请输入名称" maxlength="100"></div>
      <div class="bus-personal-model"><span>编号：</span><input
        style="border: 1px solid #f4f4f4; height:38px; float:left; margin-top:2px;" type="text" v-model="number"
        placeholder="请输入编号" maxlength="20"></div>
      <div class="bus-personal-model"><span>级别：</span>
        <select v-model="currentLevel" style="float:left; margin-top:10px;">
          <option v-for="level in parameters.productLevel">{{level.value}}</option>
        </select>
      </div>
      <div class="bus-personal-model"><span>公商类型：</span>
        <select v-model="currentUseType" style="float:left; margin-top:10px;">
          <option v-for="useType in parameters.useType">{{useType.value}}</option>
        </select>
      </div>
      <div class="bus-personal-mode2 bus-personal-checkbox"><span>价格类型：</span>
        <div class="bus-personal-priceright">
        <input type="radio" v-model="priceType" value="0" @change="updatePriceTypeUI">周期价
        &nbsp;&nbsp;<input type="radio" v-model="priceType" value="1" @change="updatePriceTypeUI">竞价
      </div>
    </div>

    <!--  竞价相关  -->
    <div v-show="bidShow">
      <div class="bus-personal-model">
        <span>起拍价格：</span>
        <input type="number" style="width: 35%; border: 0" v-model="startPrice" placeholder="起拍价格" min="0"
               max="9999999">
        元/面/
        <select v-model="priceUnit">
          <option value="月">月</option>
          <option value="季">季</option>
          <option value="年">年</option>
        </select>
      </div>
      <div class="bus-personal-model">
        <span>递增价格：</span>
        <input type="number" style="border: 0" v-model="increasePrice" placeholder="递增金额" min="0" max="9999999">
      </div>
      <div class="bus-personal-model">
        <span>保证金：</span>
        <input type="number" style="border: 0" v-model="bidPrice" placeholder="保证金" min="0" max="9999999">
      </div>
      <div class="bus-personal-model">
        <span>保留价：</span>
        <input type="number" style="border: 0" v-model="reservePrice" placeholder="保留价" min="0" max="9999999">
      </div>
      <div class="bus-personal-model"><span>参与方式：</span>
        <select v-model="joinMode">
          <option value="0">无人员限制</option>
          <option value="1">指定参与人员</option>
        </select>
      </div>
      <p style="font-size:12px; color:red;" v-if="joinMode == 1">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        指定人员参与须在信息保存成功后，添加参与人员
      </p>
      <div class="bus-personal-model" style="height:90px;" v-if="joinMode == 1">
        <span>参与条件：</span>
        <textarea v-model="joinRule" style="line-height:12px;font-size:12px;width:70%; height:85px; border-color:#D3D3D3; font-size:12px;"></textarea>
      </div>
      <div class="bus-personal-model">
        <span>起拍时间：</span>
        <input type="datetime-local" v-model="startTime" placeholder="起拍时间">
      </div>
      <div class="bus-personal-model">
        <span>结束时间：</span>
        <input type="datetime-local" v-model="endTime" placeholder="起拍时间">
      </div>
      <div class="bus-personal-model">
        <span>交付时间：</span>
        <input type="datetime-local" v-model="deliverTime" placeholder="投放时间">
      </div>
    </div>

    <div v-show="generalShow">
      <div class="bus-personal-mode2 bus-personal-checkbox"><span>投放周期：</span>
        <div class="bus-personal-priceright">
          <label v-for="item in priceCycle">
            <input type="checkbox" v-model="item.checked" :value="item.value">{{item.text}}&nbsp;&nbsp;
          </label>
        </div>
      </div>
      <div class="bus-personal-mode2 "><span>投放价格：</span>
        <div class="bus-personal-priceright">
          <div class="bus-personal-day" v-for="item in priceCycle">
            <label v-show="item.checked">
              <input type="text" v-model="item.price" class="bus-personal-priceinput"> 元 / {{item.text}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="bus-personal-model" style="height:90px;">
      <span>交易须知：</span>
      <textarea id="tradeRule" v-model="tradeRule"
                style="line-height:12px;font-size:12px;width:70%; height:85px; border-color:#D3D3D3; font-size:12px;"></textarea>
    </div>
    <br/>
    <p>规格属性</p>

    <div class="bus-personal-model"><span>长（米）：</span><input
      style="border: 1px solid #f4f4f4; float:left; height:38px;margin-top:2px;" type="text" v-model="long"
      placeholder="请输入长"></div>
    <div class="bus-personal-model"><span>宽（米）：</span><input
      style="border: 1px solid #f4f4f4; float:left; height:38px;margin-top:2px;" type="text" v-model="width"
      placeholder="请输入宽"></div>
    <div class="bus-personal-model"><span>材质：</span>
      <select v-model="currentMaterial" style="float:left; margin-top:10px;">
        <option v-for="material in parameters.material">{{material.value}}</option>
      </select>
    </div>
    <div class="bus-personal-model"><span>照明：</span>
      <select v-model="currentLiginting" style="float:left; margin-top:10px;">
        <option v-for="lighting in parameters.lighting">{{lighting.value}}</option>
      </select>
    </div>
    <div class="bus-personal-model"><span>人流量：</span>
      <select v-model="currentVisitorsFlowrate" style="float:left; margin-top:10px;">
        <option v-for="visitorsFlowrate in parameters.visitorsFlowrate">{{visitorsFlowrate.value}}</option>
      </select>
    </div>
    <div class="bus-personal-model"><span>车流量：</span>
      <select v-model="currentVehicleFlowrate" style="float:left; margin-top:10px;">
        <option v-for="vehicleFlowrate in parameters.vehicleFlowrate">{{vehicleFlowrate.value}}</option>
      </select>
    </div>

      <div class="bus-personal-model"><span>路段：</span><input
        style="border: 1px solid #f4f4f4; float:left; height:38px;margin-top:2px;" type="text" v-model="road"
        placeholder="请输路段"></div>
      <div class="bus-personal-model"><span>站点：</span><input
        style="border: 1px solid #f4f4f4; float:left; height:38px;margin-top:2px;" type="text" v-model="station"
        placeholder="请输站点"></div>

    <!-- 广告位置 -->
    <div class="mobile-bg" ></div>
    <div id="divMapContent" class="bus-personal-pic">
      <p style="margin-left:5%;">设置位置
        <input type="button" class="mobile-search-btn" value="我的位置"
                                               style="border-radius:25px;float: right;margin-right: 5%;margin-top:-5px;"
                                               @click="myLocation"/>
      </p>
      <p style="font-size:12px;">
        当前定位：<input type="text"
                    style="padding-left:8px; height: 30px;line-height: 30px;width:80%;border: none; overflow: hidden;background-color:transparent"
                    v-model="productLocation" readOnly/>
      </p>
      <div class="mobile-search1">
        <div class="mobile-search-c">
          <input type="text" placeholder="输入地址进行搜索" class="mobile-search-text1" id="txtAddress"/>
          <button type="button" class="mobile-search-btn" id="butSearch"
                  onclick="sear(document.getElementById('txtAddress').value)">搜索
          </button>
        </div>
      </div>
      <!--百度地图显示的地方-->
      <div style="width: 98%; height: 400px;" id="allmap">
      </div>
      <!--百度地图显示的地方-->


      <div>
        <input type="hidden" v-model="lon"/>
        <input type="hidden" v-model="lat"/>
      </div>
    </div>
    <br>
      <button type="button" style="width:100%" class="btn  btn-warning bus-btn " @click="save">保存</button>
  </div>
    <div class="row mobile-menu5 " style="position: fixed; bottom: 0; height:50px;">


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
      file1Base64.innerHTML = this.result;
      document.getElementById("img1").src = this.result
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
      file2Base64.innerHTML = this.result;
      document.getElementById("img2").src = this.result
    }
  }

  var qs = require('qs');
  import {MP} from '../../map.js'
  import { Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        msg: "",
        img1Path: "",
        img2Path: "",
        img1Base64: "",
        img2Base64: "",
        currentProuctType: "",
        name: "",
        number: "",
        currentLevel: "",
        priceType: "0",
        tradeRule: "",
        long: "",
        width: "",
        priceCycle: [],
        lon: "",  // 经度
        lat: "",  // 维度
        productLocation: "",
        parameters: "",
        currentMaterial: "",  // 材质
        currentLiginting: "",   // 照明方式
        currentVisitorsFlowrate: "",  // 人流量
        currentVehicleFlowrate: "",   // 车流量
        currentUseType: "",   // 公商类型
        road: "",   // 路段
        station: "",   // 站点

        startPrice: "0",// 起拍价格
        priceUnit: "月",
        increasePrice: "0",  // 递增金额
        bidPrice: "0",  // 保证金
        reservePrice: "0",  // 保留价
        joinMode: "0",  // 参与方式   ： 无人员限制   指定参与人员
        joinRule: "",
        startTime: "",  // 开始时间
        endTime: "",  // 结束时间
        deliverTime: "",  // 广告位交付时间
        bidShow: false,  // 竞价部分的显示隐藏
        generalShow: true,  // 周期价格的显示隐藏
        msg: "",
        // 地图相关
        ak: "6k5fuebHsOTszXKK9sMUGZWnTxArebya",
        map: "",
        geoc: ""
      }
    },
    mounted: function () {
      this.initUpload();
      this.initData();
      this.$nextTick(function() {
        var _this = this;
        MP(_this.ak).then(BMap => {
          //在此调用api
          _this.initMap();
        })
      })
    },
    methods: {

      initUpload: function ()
      {
        var file1 = document.getElementById("file1");
        var file1Base64 = document.getElementById("file1Base64");
        var img1 = document.getElementById("img1");

        var file2 = document.getElementById("file2");
        var file2Base64 = document.getElementById("file2Base64");
        var img2 = document.getElementById("img2");

        if (typeof(FileReader) === 'undefined') {
          alert("error");
          idcardFrontBase64.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
          idcardFront.setAttribute('disabled', 'disabled');
        } else {
          file1.addEventListener('change', readFile, false);
          file2.addEventListener('change', readFile2, false);
        }
      },

      initMap: function ()
      {
        var _this = this;
        _this.map = new BMap.Map("allmap");//在指定的容器内创建地图实例
        _this.map.setDefaultCursor("crosshair");//设置地图默认的鼠标指针样式
        _this.map.enableScrollWheelZoom();//启用滚轮放大缩小，默认禁用。
        //根据经纬度选择默认范围
        //map.centerAndZoom(new BMap.Point(116.124878, 24.309178), 13);
        _this.map.centerAndZoom("长沙", 15);//默认地图的显示范围
        _this.map.addControl(new BMap.NavigationControl());
        _this.geoc = new BMap.Geocoder();
        // 鼠标右键点击
        _this.map.addEventListener("rightclick", function (e) {//地图右键单击事件，左键为click
          _this.map.clearOverlays();//添加标注前清空以前的所有标注
          var pt = e.point;
          _this.geoc.getLocation(pt, function (rs) {
            var addComp = rs.addressComponents;
            _this.productLocation = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
          });

          var marker = new BMap.Marker(pt);        // 创建标注
          _this.lon = pt.lng;
          _this.lat = pt.lat
          _map.addOverlay(marker);
        });
        // 触屏
        _this.map.addEventListener("touchstart", function (e) {
          _this.map.clearOverlays();//添加标注前清空以前的所有标注
          var pt = e.point;
          _this.geoc.getLocation(pt, function (rs) {
            var addComp = rs.addressComponents;
            _this.productLocation = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;

          });

          var marker = new BMap.Marker(pt);        // 创建标注
          _this.lon = pt.lng;
          _this.lat = pt.lat
          _this.map.addOverlay(marker);
        });
      },

      // 我的位置
      myLocation: function ()
      {
        var _this = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            _this.map.clearOverlays();//添加标注前清空以前的所有标注
            var pt = r.point;
            _this.geoc.getLocation(pt, function (rs) {
              var addComp = rs.addressComponents;
              _this.productLocation = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
            });
            var marker = new BMap.Marker(pt);        // 创建标注
            _this.lon = pt.lng;
            _this.lat = pt.lat
            _this.map.addOverlay(marker);
            _this.map.panTo(pt);
          }
          else {
            alert("定位失败");
          }
        }, {enableHighAccuracy: true});
      },

      initData: function () {
        var _this = this;
        var url = global.API_ADDRESS_TEST + "parameter";
        this.$http.get(url, {}).then(function (response) {
          if (response.data.code != 0) {
            _this.msg = response.data.msg;
          }
          else if (response.data.data != null) {

            // 参数
            _this.parameters = response.data.data;
            // 广告类型
            _this.currentProuctType = _this.parameters.productType[0].value;
            // 级别
            _this.currentLevel = _this.parameters.productLevel[0].value;
            // 材质
            _this.currentMaterial = _this.parameters.material[0].value;
            // 照明
            _this.currentLiginting = _this.parameters.lighting[0].value;
            // 人流量
            _this.currentVisitorsFlowrate = _this.parameters.visitorsFlowrate[0].value;
            // 车流量
            _this.currentVehicleFlowrate = _this.parameters.vehicleFlowrate[0].value;
            // 工商类型
            _this.currentUseType = _this.parameters.useType[0].value;
          }

        }).catch(function (error) {
          console.log(error);
        })

        this.priceCycle = [
          {checked: true, value: "日", text: "日", price: ""},
//          {checked: true, value: "周", text: "周", price: ""},
//          {checked: true, value: "月", text: "月", price: ""},
//          {checked: true, value: "季", text: "季", price: ""},
//          {checked: true, value: "年", text: "年", price: ""}
        ]
      },
      updatePriceTypeUI: function () {
        if (this.priceType == "1") {
          this.bidShow = true;
          this.generalShow = false;
        }
        else {
          this.bidShow = false;
          this.generalShow = true;
        }
      },

      save: function ()
      {
//        Indicator.open();
// 价格验证
        var regex = /^[0-9]+(.[0-9]{1,2})?$/
        if (this.priceType == 0)
        {
          // 周期价格
          for (var i = 0; i < this.priceCycle.length; i ++)
          {
            if (this.priceCycle[i].checked)
            {
              var price = this.priceCycle[i].price;
              if (price == null || price == "")
              {
//                Indicator.close();
                this.msg = "请输入价格";
                scrollTo(0, 0);
                return;
              }
              else if (!regex.test(price))
              {
                this.msg = "请输入正确价格";
                scrollTo(0, 0);
//                Indicator.close();
                return;
              }
              else if (parseFloat(price) <= 0)
              {
                this.msg = "请输入正确价格";
                scrollTo(0, 0);
//                Indicator.close();
                return;
              }
              else
              {
                this.msg = "";
              }
            }
          }
        }
        else
        {
          // 竞价
          // 起拍价格
          if (this.startPrice == "" || this.startPrice == null)
          {
            this.msg = "请输入起拍价格";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          else if (!regex.test(this.startPrice))
          {
            this.msg = "请输入正确的起拍价格";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          else if (parseFloat(this.startPrice) <= 0)
          {
            this.msg = "请输入正确的起拍价格";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }

          // 递增价格
          if (this.increasePrice == "" || this.increasePrice == null)
          {
            this.msg = "请输入递增金额 ";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          else if (!regex.test(this.increasePrice))
          {
            this.msg = "请输入正确的递增金额";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          else if (parseFloat(this.increasePrice) <= 0)
          {
            this.msg = "请输入正确的递增金额";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }

          // 保证金
          if (this.bidPrice == "" || this.bidPrice == null)
          {
            this.msg = "请输入递增金额 ";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          else if (!regex.test(this.bidPrice))
          {
            this.msg = "请输入正确的递增金额";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          else if (parseFloat(this.bidPrice) <= 0)
          {
            this.msg = "请输入正确的递增金额";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }

          // 保留价
          if (this.reservePrice == "" || this.reservePrice == null)
          {
            this.msg = "请输入保留价";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          else if (!regex.test(this.reservePrice))
          {
            this.msg = "请输入正确的保留价";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }

          // 时间校验
          // 起拍时间
          if (this.startTime == null || this.startTime == "")
          {
            this.msg = "请输入开始时间";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          // 结束时间
          if (this.endTime == null || this.endTime == "")
          {
            this.msg = "请输入结束时间";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          // 投放时间
          if (this.deliverTime == null || this.deliverTime == "")
          {
            this.msg = "请输入投放时间";
            scrollTo(0, 0);
//            Indicator.close();
            return;
          }
          // 参与方式
          if (this.joinMode == 1)
          {
            // 参与条件
            if (this.joinRule == null || this.joinRule == "")
            {
              this.msg = "请输入参与条件";
              scrollTo(0, 0);
//              Indicator.close();
              return;
            }
          }
        }
        // 规格属性校验
        // 长度
        if (this.long == "" || this.long == null)
        {
          this.msg = "请输入长度";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }
        else if (!regex.test(this.long))
        {
          this.msg = "请输入正确的长度";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }
        else if (parseFloat(this.long) <= 0)
        {
          this.msg = "请输入正确的长度";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }
        // 宽度
        if (this.width == "" || this.width == null)
        {
          this.msg = "请输入宽度";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }
        else if (!regex.test(this.width))
        {
          this.msg = "请输入正确的宽度";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }
        else if (parseFloat(this.width) <= 0)
        {
          this.msg = "请输入正确的宽度";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }

        // 广告位置校验
        if (this.road == "" || this.road == "")
        {
          this.msg = "请输入路段";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }
        if (this.station == "" || this.station == "")
        {
          this.msg = "请输入站点";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }
        if (this.productLocation == null || this.productLocation == "")
        {
          this.msg = "请设置广告位位置";
          scrollTo(0, 0);
//          Indicator.close();
          return;
        }
        var img1Base64 = document.getElementById("file1Base64").value;
        var img2Base64 = document.getElementById("file2Base64").value;

        var cycleArray = new Array();
        var cyclePriceArray = new Array();
        for (var i = 0; i < this.priceCycle.length; i ++)
        {
          if (this.priceCycle[i].checked)
          {
            cycleArray.push(this.priceCycle[i].value)
            cyclePriceArray.push(this.priceCycle[i].price)
          }
        }
        var postData = {
          name: this.name,
          number: this.number,
          productType: this.currentProuctType,
          level: this.currentLevel,
          priceType: this.priceType,
          useType: this.currentUseType,
          cycles: cycleArray.toString(),
          cyclePrice: cyclePriceArray.toString(),
          img1Base64: img1Base64,
          img2Base64: img2Base64,
          startPrice: this.startPrice,
          priceUnit: this.priceUnit,
          reservePrice: this.reservePrice,
          bidPrice: this.bidPrice,
          increasePrice: this.increasePrice,
          joinMode: this.joinMode,
          joinRule: this.joinRule,
          startTimeParam: this.startTime.replace("T", " "),
          endTimeParam: this.endTime.replace("T", " "),
          deliverTimeParam: this.deliverTime.replace("T", " "),
          tradeRule: this.tradeRule,
          lon: this.lon,
          lat: this.lat,
          location: this.productLocation,
          length: this.long,
          width: this.width,
          material: this.currentMaterial,
          lighting: this.currentLiginting,
          visitorsFlowrate: this.currentVisitorsFlowrate,
          vehicleFlowrate: this.currentVehicleFlowrate,
        }

        var url = global.API_ADDRESS_TEST + "product";
        this.$http.post(url, qs.stringify(postData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then( (response)=> {
          var code = response.data.code;
          var data = response.data.data;
          console.log("code:" + code);
          if (code != 0)
          {
            this.msg = response.data.msg;
            scrollTo(0, 0);
//            Indicator.close();
          }
          else
          {
            if (this.joinMode == 1)
            {
              // 添加竞价参与人员
              this.$router.push({path: "/product/bidJoinUser/" + data.id})
            }
            else
            {
              this.$router.push({path : "/product/result"})
            }
//            Indicator.close();
          }
        }).catch(function (error) {
          console.log(error);
//          Indicator.close();
        });

      }
    }
  }
</script>
