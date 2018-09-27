<template>
  <div>
    <div>
      <mt-header title="地图" fixed style="height:45px; font-size: 16px;">
        <router-link to="/shopcart/index" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="mobile-bg" style="margin-top:45px;"></div>
    <div id="allMap" style="height:300px; width:100%;">

    </div>
    <div style="float:left; width:100%;">
      <input type="button" value="当前位置" @click="currentPosotion"/><br/>
      广告位：<input type="text" style="width:90%"/><br/>
    经度：<input type="" v-model="lon" style="width:90%" readonly/><br/>
    纬度：<input type="" v-model="lat" style="width:90%" readonly/><br/>
    位置：<input type="" v-model="productLocation" style="width:90%" readonly/><br/>
    </div>
  </div>
</template>
<script>
  import {MP} from '../map.js'
  export default {
    data(){
      return {
        ak: "6k5fuebHsOTszXKK9sMUGZWnTxArebya",
        markerIcon: '../../static/assets/marker_blue.jpg',
        // 地图相关
        map: "",
        geoc: "",

        productLocation: "",
        lon: "",
        lat: ""

      }
    },
    mounted: function ()
    {
      this.$nextTick(function () {
        var _this = this;
        MP(_this.ak).then(BMap => {
          //在此调用api
          _this.initMap();
        })
      });
    },
    methods: {
      initMap: function () {
        var _this = this;
        _this.map = new BMap.Map("allMap");//在指定的容器内创建地图实例
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

      // 当前位置
      currentPosotion: function ()
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
      }
    }
  }
</script>
