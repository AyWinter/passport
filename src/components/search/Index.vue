<template>
  <div>
    <div class="mobile-search1">
      <div class="mobile-search-c">
        <input type="text" id="suggestId" style="width:75%"
               placeholder="请输入广告位置" class="mobile-search-text"/>
        <div id="searchResultPanel"
             style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
      </div>

      <div class="btn-group">
        <button type="button" style="border: 0px; margin-top:7px; color:white" class="search" @click="popUp">
          条件筛选 <span class="icon-chevron-down"></span>
        </button>

      </div>
    </div>
    <div class="mobile-bg"></div>
    <div id="allMap" style="height:420px; width:100%;">

    </div>

    <mt-popup style="width:100%;"
              v-model="popupVisible"
              position="top">
      <div class="modal-header">
        <h4 class="modal-title">地区</h4>
      </div>
      <div class="modal-body">
        <ul class="search_ul">
          <li class="col-xs-4" v-for="item in area" @click="selectArea(item)">
            <a href="javascript:void(0)" :class="{'active':item.selected == true}">{{item.value}}</a>
          </li>
        </ul>
      </div>

      <div style="clear: both;">
        <div class="search_Ben">
          <br/>
          <button type="button" class=" btn btn-warning" @click="conditionSearch">确定</button>
          <button type="button" class="btn btn-default" @click="cancle">取消</button>
        </div>
      </div>
      <br/>
    </mt-popup>


    <mt-popup style="width:100%;"
              v-model="productAttrPopupVisible"
              position="bottom">
      <div id="box1" style="display:block" class="bus-car-pup">
        <br/>
        <div>
          <b style="font-size:14px; float:left">&nbsp;&nbsp;&nbsp;{{title}}</b>
          <b @click="detail">广告位详情</b>
        </div>
        <div class="bus-car-pupc">
          <br/>
          <p style="float: left"> 投放周期：</p><br/><br/>
          <div class="bus-car-Choice" style="float:left;" >
            <a  href="#" v-for="(cycle, index) in cycle" @click="getPrice(cycle)" :class="currentCycle == cycle.cycle? 'click' : ''">{{cycle.cycle}}</a>
          </div>
        </div>
        <div class="bus-car-pupc">
          <br/>
          <p style="float: left"> 价格：{{currentPrice}}</p>
        </div>
        <div class="bus-car-pupc">
          <br/>
          <p style="float: left"> 数量：</p>
          <div class="Details-Essential-buy">
            <span class="minus-number" @click="changeQuantity('reduce')">-</span>
            <div class="input">
              <input type="text" value="1" v-model="quantity" class="mobile-number" readonly/>
            </div>
            <span class="add-number" @click="changeQuantity('add')">+</span>
          </div>
        </div>
        <div class="bus-car-pupc">
          <br/>
          <p style="float: left">
            投放时间：
            <input type="date" style="border:none" v-model="deliverTime"/>
          </p>
        </div>

        <div class="bus-car-pupc" style="text-align:left">
          <br/>
          <div style="float: left">
            已选档期：<br/>
          <table>
            <tr v-for="period in periods">
              <td style="border:1px; height:30px;">{{period.startTime | formatDate}}  至  {{period.endTime | formatDate}}</td>
            </tr>
            <tr><td></td></tr>
          </table>
          </div>
        </div>
        <br/>
        <div class="bus-car-pupc">
          <mt-button type="primary" size="large" @click="addShopcart">加入购物车</mt-button>
          <br/>
          <a style="float:left" @click="removeShopcart" v-if="showRemove">移出购物车</a>
        </div>
        <div class="bus-car-pupc" style="text-align:left">
          <br/>
          <div style="float: left">

          </div>
        </div>
      </div>

    </mt-popup>
  </div>
</template>
<script>

  Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  }

  Array.prototype.remove = function(val) {
    for(var i=0; i<this.length; i++) {
      if(this[i] == val) {
        this.splice(i, 1);
        break;
      }
    }
  }
  import {Indicator} from 'mint-ui';
  import {MP} from '../../map.js'
  import {Toast, MessageBox} from 'mint-ui';
  import {formatDate} from '../../../static/js/date.js';
  var qs = require('qs');

  export default {
    data() {
      return {
        vendorId: 0,
        ak: "6k5fuebHsOTszXKK9sMUGZWnTxArebya",
        popupVisible: false,
        productAttrPopupVisible: false,
        productType: [],
        area: [
          {value: "开福区", selected: true},
          {value: "芙蓉区", selected: false},
          {value: "天心区", selected: false},
          {value: "岳麓区", selected: false},
          {value: "雨花区", selected: false},
          {value: "望城区", selected: false},
          {value: "长沙县", selected: false},
        ],
        currentArea: "开福区",
        currentProductType: "",
        position: [],
        markerIcon_Blue: '../../static/assets/marker_blue.jpg',
        markerIcon_Red: '../../static/assets/marker_red.jpg',
        shopcart: [],

        title: "",
        cycle:[],
        periods:[],
        currentCycle: "",
        currentPrice: "",
        unitPrice: "",
        quantity: "1",
        productId: 0,
        deliverTime: "",
        showRemove: false,

        geolocation: "",
        geoc: "",
        map: ""
      }
    },
    filters: {
      formatDate: function (value) {
        var date = new Date(value);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    mounted: function () {
      this.vendorId = parseInt(sessionStorage.getItem("vendorId"));
      this.initData();
      this.$nextTick(function () {
        var _this = this;
        MP(_this.ak).then(BMap => {
          //在此调用api
          _this.initMap();
        })
      });

      // this.getCurrentShopcart();
    },
    methods: {

      initData: function () {
        var _this = this;
        var url = global.API_ADDRESS_TEST + "parameter"
        this.$http.get(url, {}).then(function (response) {
          _this.productType = response.data.data.productType;
          for (var i = 0; i < _this.productType.length; i++) {
            if (i == 0) {
              _this.currentProductType = _this.productType[i].value;
              _this.$set(_this.productType[i], "selected", true);
            }
            else {
              _this.$set(_this.productType[i], "selected", false);
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
        // 当前选中的区域
        this.currentArea = this.area[0].value;
      },

      // 获取当前购物车中的产品
      getCurrentShopcart: function ()
      {
        var url = global.API_ADDRESS_TEST + "shopcart";
        this.$http.get(url, {}).then((response) => {
          for (var i = 0; i < response.data.data.length; i ++)
          {
            this.shopcart.push(response.data.data[i].product.id)
          }
        }).catch (function (error){
          console.log(error);
        })
      },

      initMap: function () {
        var _this = this;
        this.geolocation = new BMap.Geolocation();
        this.geoc = new BMap.Geocoder();
        this.geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var lat = r.point.lat;
            var lng = r.point.lng;
            var city = "";
            var pt = r.point;
            _this.geoc.getLocation(pt, function (rs) {
              var addComp = rs.addressComponents;
              city = addComp.city;
            })
            _this.map = new BMap.Map("allMap");    // 创建Map实例
            var point = new BMap.Point("112.95756", "28.20035");
            _this.map.centerAndZoom("长沙", 13);  // 初始化地图,设置中心点坐标和地图级别
            // 创建地址解析器实例
            _this.map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            _this.map.setCurrentCity(city);          // 设置地图显示的城市 此项是必须设置的
            _this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            // 查询所有广告位
            _this.getAllProduct();

            var ac = new BMap.Autocomplete( //建立一个自动完成的对象
              {
                "input" : "suggestId",
                "location" : _this.map
              });
            ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
              var str = "";
              var _value = e.fromitem.value;
              var value = "";
              if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district
                  + _value.street + _value.business;
              }
              str = "FromItem<br />index = " + e.fromitem.index
                + "<br />value = " + value;

              value = "";
              if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district
                  + _value.street + _value.business;
              }
              str += "<br />ToItem<br />index = " + e.toitem.index
                + "<br />value = " + value;
              document.getElementById("searchResultPanel").innerHTML = str;
            });

            var myValue;
            ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
              var _value = e.item.value;
              myValue = _value.province + _value.city + _value.district
                + _value.street + _value.business;
              document.getElementById("searchResultPanel").innerHTML = "onconfirm<br />index = "
                + e.item.index + "<br />myValue = " + myValue;

              _this.currentArea = _value.district;
              setPlace();
            });

            function setPlace() {
              function myFun() {
                var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
                _this.map.centerAndZoom(pp, 18);
                // map.addOverlay(new BMap.Marker(pp)); //添加标注
                // 广告位置

                var opts = {
                  width : 200, // 信息窗口宽度
                  height : 50, // 信息窗口高度
                  title : "广告位信息", // 信息窗口标题
                  enableMessage : true
                  //设置允许信息窗发送短息
                };
                // 查询所有站点
                 _this.getAllProduct();
              }
              var local = new BMap.LocalSearch(_this.map, { //智能搜索
                onSearchComplete : myFun
              });
              local.search(myValue);
            }
          }
        })
      },

      addClickHandler: function (position, marker) {
        var _this = this;
        marker.addEventListener("click", function (e) {

          _this.$router.push({path : "/product/detail/"+position.id})
          // 打开详细界面
          //_this.openInfo(product, e, marker)
        });
      },

      // 弹出广告位详情
      openInfo: function (product, e, marker) {

        this.productId = product.id;
        this.title = product.name;
        this.cycle = product.prices;
        this.currentCycle = product.prices[0].cycle;
        this.unitPrice = product.prices[0].price;
        this.periods = product.periods;
        this.currentPrice = this.unitPrice;
        this.productAttrPopupVisible = true;

        if (this.shopcart.contains(product.id))
        {
          this.showRemove = true;
        }
        else
        {
          this.showRemove = false;
        }
      },

      // 更新数量
      changeQuantity: function (type)
      {
        if ('add' == type)
        {
          this.quantity ++
        }
        else
        {
          if (this.quantity > 1)
          {
            this.quantity --
          }
        }

        this.currentPrice = this.unitPrice * this.quantity
      },

      // 获取价格
      getPrice: function (cycle)
      {
        this.currentCycle = cycle.cycle;
        this.unitPrice = cycle.price;
        this.currentPrice = cycle.price;
        this.quantity = 1;
      },

      popUp: function () {
        this.popupVisible = true;
      },

      selectProductType: function (item) {
        for (var i = 0; i < this.productType.length; i++) {
          this.$set(this.productType[i], "selected", false);
        }
        item.selected = true;
        this.currentProductType = item.value;
      },

      selectArea: function (item) {
        for (var i = 0; i < this.area.length; i++) {
          this.$set(this.area[i], "selected", false);
        }
        item.selected = true;
        this.currentArea = item.value;
      },

      cancle: function () {
        this.popupVisible = false;
      },

      // 弹框中条件查询
      conditionSearch: function () {

//        this.currentProductType = encodeURIComponent(this.currentProductType);
//        this.currentArea = encodeURIComponent(this.currentArea);
        Indicator.open();
        var data = {
          //productType: this.currentProductType,
          area: this.currentArea,
          vendorId: this.vendorId,
        }

        var url = global.API_ADDRESS_TEST + "product/position/search";
        this.$http.post(url, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=>{
          Indicator.close();
          this.position = response.data.data;
          this.popupVisible = false;
          this.showPosition();
        }).catch(function (error){
          console.log(error);
          Indicator.close();
        })

//        var url = global.API_ADDRESS_TEST + "product/"+this.currentProductType+"/"+this.currentArea;
//        this.$http.get(url, {}).then((response)=>{
//
//          this.product = response.data.data;
//          this.popupVisible = false;
//          this.showProduct();
//
//        }).catch(function (error){
//          console.log(error);
//        })

      },

      showPosition: function ()
      {
        this.map.clearOverlays();
        for (var i = 0;i < this.position.length; i ++)
        {
          var markerIcon = this.markerIcon_Red;
          if (this.shopcart.contains(this.position[i].id))
          {
            markerIcon = this.markerIcon_Blue;
          }
          var icon = new BMap.Icon(markerIcon, new BMap.Size(23, 25));
          var marker = new BMap.Marker(new BMap.Point(
            this.position[i].lon, this.position[i].lat), {icon: icon}); // 创建标注
          this.map.addOverlay(marker); // 将标注添加到地图中

//          var point = new BMap.Point(this.position[0].lon, this.position[0].lat);
//          this.map.centerAndZoom(point, 15);

          this.addClickHandler(this.position[i], marker);
        }
      },
      // 加入购物车
      addShopcart: function ()
      {
        if (this.deliverTime == "")
        {
          MessageBox('提示', '请选择广告投放时间');
          return;
        }

        var postData = {
          productId: this.productId,
          cycle: this.currentCycle,
          quantity: this.quantity,
          deliverTime: this.deliverTime
        }
        var url = global.API_ADDRESS_TEST + "shopcart";
        this.$http.post(url, qs.stringify(postData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=>{
          if (response.data.code == 0) {
            MessageBox('提示', "已加入购物车");
            this.productAttrPopupVisible = false;

            this.map.clearOverlays();
            this.shopcart.push(this.productId);
            this.showProduct();
          }
          else
          {
            var msg = response.data.msg;
            MessageBox('提示', msg);
          }
        }).catch(function (error) {
          console.log(error);
        })
      },

      // 广告位详情
      detail: function ()
      {
        this.$router.push({path : "/product/detail/"+this.productId})
      },

      // 移除购物车
      removeShopcart: function ()
      {
        var url = global.API_ADDRESS_TEST + "shopcart/product/" + this.productId;

        this.$http.delete(url, {}).then((response)=>{

          if (response.data.code == 0)
          {
            MessageBox('提示', "移出成功");
            this.productAttrPopupVisible = false;
            this.map.clearOverlays();
            this.shopcart.remove(this.productId)
            this.showProduct();
          }
          else
          {
            MessageBox('提示', response.data.msg);
          }

        }).catch(function (error){
          console.log(error);
        })
      },

      //获取所有广告位
      getAllProduct: function ()
      {
        Indicator.open();
        var data = {
          //productType: this.currentProductType,
          area: this.currentArea,
          vendorId: this.vendorId,
        }

        var url = global.API_ADDRESS_TEST + "product/position/search";
        this.$http.post(url, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=>{
          Indicator.close();
          this.position = response.data.data;
          this.popupVisible = false;
          this.showPosition();
        }).catch(function (error){
          console.log(error);
          Indicator.close();
        })
      }
    }
  }
</script>
