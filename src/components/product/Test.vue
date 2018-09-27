<template>
    <div>
      <div id="map" style="width:100%; height:500px;; border:1px solid red"></div>
    </div>
</template>
<script>
  import {MP} from '../../map.js'
    export default {
      data(){
        return{
          geolocation: "",
          geoc: "",
          map: ""
        }
      },
      mounted: function (){
        this.initMap();
//        this.$nextTick(function () {
//          var _this = this;
//          MP(_this.ak).then(BMap => {
//            //在此调用api
//            _this.initMap();
//          })
//        })
      },
      methods:{
        initMap: function ()
        {
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
              _this.map = new BMap.Map("map");    // 创建Map实例
              var point = new BMap.Point(lng, lat);
              _this.map.centerAndZoom(point, 20);  // 初始化地图,设置中心点坐标和地图级别
              // 创建地址解析器实例
              _this.map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
              _this.map.setCurrentCity(city);          // 设置地图显示的城市 此项是必须设置的
              _this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            }
          })
        }
      }
    }
</script>
