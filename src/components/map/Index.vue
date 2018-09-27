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
      <div id="allMap" style="height:450px; width:100%;">

      </div>
    </div>
</template>
<script>
  import {MP} from '../../map.js'
    export default {
      data(){
        return {
          ak: "6k5fuebHsOTszXKK9sMUGZWnTxArebya",
          markerIcon: '../../static/assets/marker_blue.jpg',
          geolocation: "",
          geoc: "",
          map: ""
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
              _this.map.centerAndZoom(point, 13);  // 初始化地图,设置中心点坐标和地图级别
              // 创建地址解析器实例
              _this.map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
              _this.map.setCurrentCity(city);          // 设置地图显示的城市 此项是必须设置的
              _this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

              _this.initData();
            }
          })
        },

        initData: function ()
        {
          var url = global.API_ADDRESS_TEST + "shopcart"

          this.$http.get(url, {}).then((response) => {

            for (var i = 0; i < response.data.data.length; i ++)
            {
              var icon = new BMap.Icon(this.markerIcon, new BMap.Size(23, 25));
              var marker = new BMap.Marker(new BMap.Point(
                response.data.data[i].product.position.lon, response.data.data[i].product.position.lat), {icon: icon}); // 创建标注
              this.map.addOverlay(marker)

            }
            if (response.data.data.length > 0)
            {
              var point = new BMap.Point(response.data.data[0].product.position.lon, response.data.data[0].product.position.lat);
            }
            this.map.centerAndZoom(point, 15);
          }).catch(function (error){

          })
        }
      }
    }
</script>
