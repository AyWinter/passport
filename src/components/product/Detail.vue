<template>
  <div>
    <mt-header title="广告位详情" fixed style="height:45px; font-size: 16px;">

      <mt-button slot="right">
        <router-link to="/shopcart/index">
          <i class="icon-shopping-cart" style="color:white"></i>&nbsp;&nbsp;&nbsp;
        </router-link>
      </mt-button>
    </mt-header>
    <div class="mobile-order text-center" v-if="products.length == 0">
      <br/><br/>
      <span class="glyphicon glyphicon-list-alt"></span>
      <p class="f-20">该站点下暂无可用广告位</p>
      <p>
        <button type="button" class="btn btn-default btn-order" @click="search">返回重新搜索
        </button>
      </p>
    </div>

    <div v-if="products.length != 0">

    <div style="width:100%; height:200px; margin-top:45px">

      <mt-swipe :auto="10000">
        <mt-swipe-item v-for="image in currentProduct.images">
          <img :src="image.path" style="width:100%; height:200px"/>
        </mt-swipe-item>
      </mt-swipe>

    </div>
    <div class="Details-information row">
      <div class="col-xs-9">
        <strong class="mg-l10" style="float:left">{{currentProduct.position.station}}</strong><br>
        <span class="c-red mg-l10" style="float:left" v-if="currentProduct.prices != null">
            ￥{{currentProduct.prices[0].price}} / {{currentProduct.prices[0].cycle}} &nbsp;&nbsp;&nbsp;
          等级   {{currentProduct.level}}
          </span><br>
        <span class="f-10 mg-l10" style="float:left">
            <i class=" icon-map-marker"></i>
            &nbsp;位置：{{currentProduct.position.city}}{{currentProduct.position.area}}{{currentProduct.position.road}}{{currentProduct.position.station}}
          </span><br>
      </div>
      <div class="col-xs-3 Details-Collection" @click="saveFavorites"><i :class="favorites ? 'icon-star':'icon-star-empty'"></i><span>收藏</span>
      </div>
    </div>

    <div class="Details-information row" style="width:104%">
      <div class="q_item" style="padding:0 20px; text-align: left">
        <ul class="i_ul">
          <li :class="item.id == currentProduct.id? 'on' : ''" v-for="(item, index) in products" @click="setCurrentProduct(item)">
            <span>{{item.number}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="Auction-Details-information  row" style="height:auto;width:104%" v-if="activityVisible">
      <div class="Auction-record-title" style="text-align:left">
        <div class=" col-xs-7">
          <i class="icon-th-list"></i>折扣活动&nbsp;&nbsp; <span class="c-gray">|
								<span>&nbsp;&nbsp; <span class="c-red"></span>
							</span> </span>
        </div>
      </div>
      <div class=" col-xs-12">
        <ul class="Auction-record-list" id="ulBidQtLst">
          <li v-for="(item,index) in activitys">
            <span class="w10"> <font class="Auction-lead1">{{index+1}}</font></span>
            <span class="w90 c-red">满 {{item.amount}} 元，打 {{item.discount * 10}} 折</span>
            <p style="margin-left:10%;">{{item.startTime | formatDate2}}-{{item.endTime | formatDate2}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div style="text-align: left">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">图文详情</mt-tab-item>
        <mt-tab-item id="2">规格参数</mt-tab-item>
        <mt-tab-item id="3">交易须知</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div>
            <ul class="box01_list" style="float:left">
              <li class="li_list" style="float:left">资源方：{{enterprise.name}}</li><br/>
              <li class="li_list" style="float:left">联系电话：{{enterprise.phoneNo}}</li><br/>
              <li class="li_list" style="float:left">媒体类型：{{currentProduct.productType}}</li>
              <br/>
              <li class="li_list" style="text-align:left">已选档期：
                <table>
                  <tr v-if="vendorId != 8" v-for="period in periods">
                    <td style="border:1px">{{period.startTime | formatDate}}  -  {{period.endTime | formatDate}}</td>
                  </tr>
                  <tr v-if="vendorId == 8" v-for="period in periods">
                    <td style="border:1px">{{period}}</td>
                  </tr>
                </table>
              </li>
              <br/>
            </ul>
          </div>
          <br/><br/>
          <div id="allMap" style="height:300px; width:100%;">

          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <table class="bus-deta-table" v-if="currentProduct!=''">
            <tr>
              <td width="30%" align="right">媒体类型：</td>
              <td>{{currentProduct.productType}}</td>
            </tr>
            <tr>
              <td width="30%" align="right">规格：</td>
              <td>{{currentProduct.attribute.length}}m  *  {{currentProduct.attribute.width}}m</td>
            </tr>
            <tr>
              <td width="30%" align="right">材质：</td>
              <td>{{currentProduct.attribute.material}}</td>
            </tr>
            <tr>
              <td width="30%" align="right">照明方式：</td>
              <td>{{currentProduct.attribute.lighting}}</td>
            </tr>
            <tr>
              <td width="30%" align="right">人流量：</td>
              <td>{{currentProduct.attribute.visitorsFlowrate}}</td>
            </tr>
            <tr>
              <td width="30%" align="right">车流量：</td>
              <td>{{currentProduct.attribute.vehicleFlowrate}}</td>
            </tr>
          </table>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">

          <ul class="box01_list" style="float:left">
            <!--
            <li class="li_list">{{currentProduct.tradeRule}}</li>

            <li class="li_list" v-for="item in buyPeriods">
              {{item}}
            </li>
            -->
            <li class="li_list" style="float:left">
              1、购买时间按自然月分为两个时段，即1-14号和16-29号。
            </li><br/>
            <li class="li_list" style="float:left">
              2、您下单前请充分预留3-5天的设计制作及上刊时间，其中每月的15号、30号或31号为固定的上刊时间，您不能选择该日期为起止日期。
            </li>
            <li class="li_list" style="float:left">
              3、您可在本时段内任何时间起订，一个时段内最短购买时间不少于3天。本时段内购买时间少于3天的，须向下一时段顺延，且跨时段需以整时段为单位购买。
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <br/><br/><br/><br/><br/>


    <mt-popup style="width:100%;"
              v-model="popupVisible"
              position="bottom">
      <div id="box1" style="display:block; height:350px;" class="bus-car-pup">
        <div class="bus-car-pupc" style="display: none">
          <br/>
          <p style="float: left"> 投放周期：</p><br/><br/>
          <div class="bus-car-Choice" style="float:left;">
            <a href="#" v-for="(cycle, index) in currentProduct.prices" @click="getPrice(cycle)"
               :class="currentCycle == cycle.cycle? 'click' : ''">{{cycle.cycle}}</a>
          </div>
        </div>
        <div class="bus-car-pupc" style="display: none">
          <br/>
          <p style="float: left"> 价格：{{currentPrice}}</p>
        </div>
        <div class="bus-car-pupc" style="display: none">
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
          <div class="q_item" style="text-align: left">
            <p>可选择档期：</p>
            <ul class="i_ul">
              <li v-for="item in buyPeriods">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="bus-car-pupc" style="margin-top:-50px;">
          <br/>
          <p style="float: left">
            起投时间：
            <input type="date" v-model="deliverTime"/>
          </p>
        </div>
        <div class="bus-car-pupc">
          <br/>
          <p style="float: left">
            结束时间：
            <input type="date" v-model="endTime"/>
          </p>
        </div>
        <div class="bus-car-pupc">
          <mt-button type="primary" size="large" @click="addShopcart">加入购物车</mt-button>
        </div>
      </div>

    </mt-popup>

    <mt-button type="primary" size="large" style="position: fixed; bottom: 50px; height:50px;" @click="popUp">选择投放时间
    </mt-button>

    </div>
  </div>

</template>

<script>
  import {formatDate} from '../../../static/js/date.js';
  import {Toast, MessageBox} from 'mint-ui';
  import {MP} from '../../map.js'
  import { Indicator } from 'mint-ui';

  var qs = require('qs');
  export default {
    data() {
      return {
        vendorId: 0,
        positionId: 0,
        fixed: true,
        searchKey: "",
        products: [],
        currentProduct:"",
        selected: "1",
        ak: "6k5fuebHsOTszXKK9sMUGZWnTxArebya",
        popupVisible: false,
        currentCycle: "",
        unitPrice: "",
        currentPrice: "",
        quantity: "1",
        deliverTime: "", // 起投时间
        endTime: "", // 结束时间
        activitys: [],
        activityVisible:false,

        geolocation: "",
        geoc: "",
        map: "",

        // 企业信息
        enterprise:"",

        // 收藏状态
        favorites: false,
        // 所有排期
        periods:[],
        // 能够买的四个周期
        buyPeriods:[]
      }
    },
    filters: {
      formatDate2: function (value) {
        var date = new Date(value);
        return formatDate(date, 'MM.dd hh:mm');
      },
      formatDate: function (value) {
        var date = new Date(value);
        return formatDate(date, 'yyyy.MM.dd');
      },
      formatDiscount: function (value)
      {
        return "";
      }
    },
    mounted: function () {

      this.positionId  = this.$route.params.id;
      this.vendorId = parseInt(sessionStorage.getItem("vendorId"));
      this.$nextTick(function () {
        var _this = this;
        MP(this.ak).then(BMap => {
          //在此调用api
          _this.initMap();
        })
      });
      this.init();
      this.getFavorites();
      this.getBuyPeriods();
    },
    methods: {

      init: function () {
        Indicator.open();
        var url = global.API_ADDRESS_TEST + "product/position/" + this.positionId
        this.$http.get(url, {}).then( (response) => {
          if (response.data.data.priceType == 1) {
            this.$router.push({path: "/product/auction/" + response.data.data.id})
            Indicator.close();
            return;
          }
          this.products = response.data.data;
          if (this.products.length > 0)
          {
            this.currentProduct = this.products[0];
          }
          this.currentCycle = this.currentProduct.prices[0].cycle;
          this.unitPrice = this.currentProduct.prices[0].price;
          this.currentPrice = this.unitPrice;
          // 获取资源方信息
          this.getEnterprise(this.currentProduct.accountId);
          // 获取排期信息
          this.getProductPeriod();
          if (this.vendorId == global.DAMEI_ACCOUNT_ID)
          {
            this.getProductPeriodDM();
          }

          // 设置广告位置
          var point = new BMap.Point(this.currentProduct.position.lon, this.currentProduct.position.lat);
          this.map.centerAndZoom(point, 20);
          var marker = new BMap.Marker(point);
          this.map.addOverlay(marker);

          Indicator.close();
        }).catch(function (error) {
          console.log(error);
          Indicator.close();
        });
      },

      // 获取可以购买的四个时间段
      getBuyPeriods: function ()
      {
        var url = global.API_ADDRESS_TEST + "product/period/enable";
        this.$http.get(url, {}).then((response)=>{
          this.buyPeriods = response.data.data;
        }).catch(function (e){
          console.log(e);
        })
      },

      // 获取资源方信息
      getEnterprise: function (accountId)
      {
        var url = global.API_ADDRESS_TEST + "enterprise/"+accountId;
        this.$http.get(url, {}).then((response)=>{
          this.enterprise = response.data.data;
        }).catch(function (error){
          console.log(error);
        })
      },

      // 获取排期信息（达美用）
      getProductPeriodDM: function ()
      {
        var url = global.API_ADDRESS_TEST + "product/unavaiTime/" + this.currentProduct.pointId;
        this.$http.get(url, {}).then((response) => {

          this.periods = response.data.data;
        }).catch(function (error){
          console.log(error);
        })
      },

      // 获取排期信息
      getProductPeriod: function ()
      {
        var url = global.API_ADDRESS_TEST + "product/period/" + this.currentProduct.id;

        this.$http.get(url, {}).then((response)=>{

          this.periods = response.data.data;
          if (this.periods.length > 0)
          {
            this.periods = this.periods.sort((a, b) => a.startTime - b.startTime);
          }

        }).catch(function (error){
          console.log(error);
        })
      },

      // 获取所有折扣活动
      getActivity: function ()
      {
        var url = global.API_ADDRESS_TEST + "activity/position/"+this.positionId
        this.$http.get(url, {}).then((response) => {
          if (response.data.data.length > 0)
          {
            this.activitys = response.data.data;
            this.activityVisible = true;
          }
          else
          {
            this.activityVisible = false;
          }
        }).catch(function (error){
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
            var point = new BMap.Point(lng, lat);
            _this.map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
            // 创建地址解析器实例
            _this.map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            _this.map.setCurrentCity(city);          // 设置地图显示的城市 此项是必须设置的
            _this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            _this.init();
            _this.getActivity();
          }

        })
      },

      popUp: function () {
        this.popupVisible = true;
      },

      // 获取价格
      getPrice: function (cycle) {
        this.currentCycle = cycle.cycle;
        this.unitPrice = cycle.price;
        this.currentPrice = cycle.price;
        this.quantity = 1;
      },

      // 更新数量
      changeQuantity: function (type) {
        if ('add' == type) {
          this.quantity++
        }
        else {
          if (this.quantity > 1) {
            this.quantity--
          }
        }

        this.currentPrice = this.unitPrice * this.quantity
      },

      openPicker() {
        this.$refs.picker.open();
      },

      addShopcart: function () {

        if (this.deliverTime == "")
        {
          MessageBox('提示', '请选择起投时间');
          return;
        }
        if (this.endTime == "")
        {
          MessageBox('提示', '请选择结束时间');
          return;
        }

        var postData = {
          productId: this.currentProduct.id,
          cycle: this.currentCycle,
          deliverTime: this.deliverTime,
          endTime: this.endTime
        }
        var url = global.API_ADDRESS_TEST + "shopcart";
        var _this = this;
        this.$http.post(url, qs.stringify(postData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (response) {
          console.log(response.data);
          if (response.data.code == 0) {
            Toast({
              message: '已加入购物车',
              iconClass: 'icon icon-success'
            });
            _this.popupVisible = false;
          }
          else
          {
            var msg = response.data.msg;
            Toast({
              message: msg,
              iconClass: 'icon icon-success'
            });
            _this.popupVisible = false;
          }
        }).catch(function (error) {
          console.log(error);
        })
      },

      getFavorites: function ()
      {
        var url = global.API_ADDRESS_TEST + "favorites/" + this.positionId;
        this.$http.get(url, {}).then((response)=>{
          if (response.data.data == null)
          {
            this.favorites = false;
          }
          else
          {
            this.favorites = true;
          }
        }).catch(function (error){
          console.log(error);
        })
      },

      // 收藏
      saveFavorites: function ()
      {
        var url = global.API_ADDRESS_TEST + "favorites";

        if (!this.favorites)
        {
          var data = {
            positionId: this.positionId
          };

          this.$http.post(url, qs.stringify(data),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            var code = response.data.code;
            if (code == 0)
            {
              this.favorites = true;
            }

          }).catch(function (error){
            console.log(error);
          })
        }
        else
        {
          url = url + "/" + this.positionId;
          this.$http.delete(url, {}).then((response)=>{

            var code = response.data.code;
            if (code == 0)
            {
              this.favorites = false;
            }
          }).catch(function (error){
            console.log(error);
          })
        }
        // this.favorites = !this.favorites;
      },

      // 点击广告位，更新当前product
      setCurrentProduct: function (item)
      {
        this.currentProduct = item;

        if (this.vendorId == global.DAMEI_ACCOUNT_ID)
        {
          this.getProductPeriodDM();
        }
        else
        {
          this.getProductPeriod();
        }
      },

      // 重新收缩
      search: function ()
      {
        this.$router.push({path : "/search/index"})
      }
    }
  }
</script>
<style>
  .q_pic {
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
    margin-left:10px;
  }

  .q_pic li {
    position: relative;
    float: left;
    width: 100px;
    height: 40px;
    border: 1px solid #ccc;
    list-style: none;
    margin: 10px;
    line-height: 0;
    vertical-align: middle;
  }

  .q_pic li span {
    width: 100%;
    height: 40px;
    line-height: 0;
    vertical-align: middle;
  }

  .q_pic li.on {
    border-color: green;
  }

  .q_pic li.on::before {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #26a2ff;
    right: 5px;
    top: 5px;
    content: "√";
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
  }
  .q_but_box{ position:relative; border-bottom:1px solid #eee; padding:10px;}
  .q_but_box .q_h2{font-size:16px; margin-bottom:5px;}
  .q_but_box .q_klj{ color:#999;}
  .q_but_box .q_xj{color:red;}
  .q_but_box .q_wz{ margin-top:10px;}
  .q_shouC{ position:absolute; right:5px;top:30px;width:50px; text-align:center; border-left:1px solid #eee;}
  .q_tabUl{ border-bottom:1px solid #eee; border-top:1px solid #eee; height:40px; line-height:40px;}
  .q_tabUl li{float:left;text-align:center; width:33.3%; height:39px; font-size:14px;}
  .q_tabUl li.on{color:#03F;border-bottom:2px solid #03F; position:relative;}
  .q_item{ margin:10px 0; position:relative;}
  .q_item .i_ul{ margin-top:10px;}
  .q_item .i_ul li{ display:inline-block; padding:0px 10px; background-color:#eee; color:#666; line-height:33px; margin-bottom:10px; margin-right:10px; border-radius:5px;}
  .q_item .i_ul li.on{ color:#fff; background-color:#26a2ff;}
  .q_item .adT_tx {text-align: center;width:100%;line-height: 35px;outline: none;
    border: 1px solid #e4e4e4;border-radius: 5px;height: 35px;background-color: #f5f5f5; box-sizing:border-box; margin:5px 0;}
  .q_buyCar{ display:block; margin:20px 10px; border-radius:5px; background-color:#06F;color:#fff; font-size:14px; text-align:center; line-height:44px; text-decoration:none;}
  .b_pRed i{border:1px dashed red; margin-right:5px; padding:2px 5px;color:red;}
</style>

