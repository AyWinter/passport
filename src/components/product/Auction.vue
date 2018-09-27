<template>
  <div>
    <div class="mobile-wrapper">
      <mt-header title="竞价广告位详情" fixed style="height:45px; font-size: 16px;">

        <mt-button slot="right">
          <router-link to="/shopcart/index">
            <i class="icon-shopping-cart"></i>&nbsp;&nbsp;&nbsp;
          </router-link>
        </mt-button>
      </mt-header>

      <div style="width:100%; height:200px; margin-top:45px">

        <div class="Auction-time-sign">
          <div class="Auction-time-transparent"></div>
          <span>{{surplusTime}}</span>
        </div>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="image in product.images">
            <img :src="image.path" style="width:100%; height:200px"/>
          </mt-swipe-item>
        </mt-swipe>

      </div>
      <div class="Details-information row ">
        <div class="Auction-det">
          <div class="col-xs-9">
            <strong class="mg-l10" style="float:left">{{product.name}}</strong><br>
            <span class="f-10 mg-l10" style="float:left">
              <i class=" icon-map-marker"></i>&nbsp;位置：{{product.position.city}}{{product.position.area}}{{product.position.road}}{{product.position.station}}
            </span><br>
          </div>
          <div class="col-xs-3 Details-Collection">
            <i class="icon-star" productId="${result.id}"></i>
            <span>已收藏</span>
          </div>
        </div>
        <div class="col-xs-12">
          <div class="Auction-Price-left ">RMB<br>当前价</div>
          <div class="Auction-Price-right"><span class="c-red ">￥{{currentPrice}}</span></div>
          <!--
          <div class="Auction-det-cont" style="float:left">
            围观 974次 &nbsp;&nbsp;&nbsp;&nbsp;  |&nbsp;&nbsp;&nbsp;     报名 11  人  &nbsp;&nbsp;&nbsp;  |  &nbsp;&nbsp;&nbsp;&nbsp;      设置提醒 36 人
          </div>
-->
        </div>
        <div class="mobile-bg"></div>
        <div class="Auction-Details-information  row" style="border: 1px solid white">
          <div class="Auction-record-title" v-if="product != ''">
            <div class=" col-xs-7"><i class="icon-th-list"></i>&nbsp;出价记录 &nbsp;&nbsp; <span class="c-gray">| </span>&nbsp;&nbsp;
              <span class="c-red">{{product.bidRecords.length}}条</span></div>
            <div class=" col-xs-5 text-right"><span class="icon-angle-right"></span></div>
          </div>
          <div class=" col-xs-12" style="font-size:14px;">
            <ul class="Auction-record-list">
              <li class="c-red" v-for="(bidRecord, index) in product.bidRecords">

                <span class="w15">
                  <font class="Auction-lead" v-if="bidRecord.state == 0">领先</font>
                  <font class="Auction-lead1" v-if="bidRecord.state == 1">出局</font>
                </span>
                <span class="w25">{{bidRecord.mobileNo | formatMobileNo}}</span>
                <span class="w20">￥{{bidRecord.amount}}</span>
                <span class="w30">{{bidRecord.createdTime | formatData}}</span>
              </li>

            </ul>
          </div>
        </div>
        <div class="mobile-bg">
        </div>
        <!--背景颜色层-->
        <div class="Details-information  row" v-if="product != ''">
          <ul class="Auction-Essential">
            <li class="col-xs-6">起拍价： ￥{{product.bidParameter.startPrice}}</li>
            <li class="col-xs-6">保证金：￥{{product.bidParameter.bidPrice}}</li>
            <li class="col-xs-6">加价幅度：￥{{product.bidParameter.increasePrice}}</li>
            <li class="col-xs-6" v-if="product.bidParameter.reservePrice == 0">保留价：无</li>
            <li class="col-xs-6" v-if="product.bidParameter.reservePrice > 0">保留价： 有</li>
          </ul>
        </div>
        <div class="mobile-bg">
        </div>
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">图文详情</mt-tab-item>
          <mt-tab-item id="2">规格参数</mt-tab-item>
          <mt-tab-item id="3">交易须知</mt-tab-item>
          <mt-tab-item id="4">保证金须知</mt-tab-item>
          <mt-tab-item id="5">参与条件</mt-tab-item>
        </mt-navbar>

      </div>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div>
          <ul class="box01_list" style="float:left">
            <li class="li_list" style="float:left">媒体类型：{{product.productType}}</li>
            <br/>
          </ul>
        </div>
        <br/><br/>
        <div id="allMap" style="height:300px; width:100%;">

        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <table class="bus-deta-table" v-if="product!=''">
          <tr>
            <td width="30%" align="right">媒体类型：</td>
            <td>{{product.productType}}</td>
          </tr>
          <tr>
            <td width="30%" align="right">媒体区域：</td>
            <td>{{product.province}}{{product.city}}{{product.area}}</td>
          </tr>
          <tr>
            <td width="30%" align="right">规格：</td>
            <td>{{product.attribute.length}}m  *  {{product.attribute.width}}m</td>
          </tr>
          <tr>
            <td width="30%" align="right">材质：</td>
            <td>{{product.attribute.material}}</td>
          </tr>
          <tr>
            <td width="30%" align="right">照明方式：</td>
            <td>{{product.attribute.lighting}}</td>
          </tr>
          <tr>
            <td width="30%" align="right">人流量：</td>
            <td>{{product.attribute.visitorsFlowrate}}</td>
          </tr>
          <tr>
            <td width="30%" align="right">车流量：</td>
            <td>{{product.attribute.vehicleFlowrate}}</td>
          </tr>
        </table>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul class="box01_list" style="float:left">
          <li class="li_list">{{product.tradeRule}}</li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <br/>
        <div style="width:90%; margin-left:15px;">
          <ul>
            <li style="text-align:left">一、保证金的缴纳：</li>
            <br/>
            <li style="text-align:left">保证金是竞拍人参加竞拍的凭证，如用户有意参加相关广告位竞拍活动，则须缴纳卖家设置的参与竞拍活动的保证金。</li>
            <br/>
            <li style="text-align:left">二、保证金的返还：</li>
            <br/>
            <li style="text-align:left">1.用户未成功竞拍广告位；</li>
            <li style="text-align:left">2.用户竞拍成功后，商家主动关闭交易或未履约发货或因商家其他原因导致交易未完成的；</li>
            <li style="text-align:left">3.用户竞拍成功后，对该广告位下单并付款后，可申请退款保证金；</li>
            <li style="text-align:left">4.待退款的保证金请在《我的》-《我的消息》-《待退竞价保证金》中查看，申请退款保证金；</li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">

      </mt-tab-container-item>
    </mt-tab-container>
    <div class="row mobile-menu8" v-if="payBond && product != ''">
      <button type="button" class="Auction-det-button1 col-xs-12" @click="join" style="bottom:50px;">
        <p class="font">去报名</p>
        <p> （保证金额 ￥{{product.bidParameter.bidPrice}}）</p>
      </button>
    </div>
    <div v-if="payBond == false">

      <div class="row mobile-menu8" v-if="state == 2">
        <button type="button" class="Auction-det-button1 col-xs-12" style="bottom:50px;">
          <p class="font">已结束</p>
        </button>
      </div>
      <div class="row mobile-menu8" v-if="state == 0">
        <button type="button" class="Auction-det-button1 col-xs-12" style="bottom:50px;">
          <p class="font">未开始</p>
        </button>
      </div>
      <div class="row mobile-menu8" v-if="state == 1">
        <button type="button" class="Auction-det-button1 col-xs-12" @click="offer" style="bottom:50px;">
          <p class="font">立即出价</p>
        </button>
      </div>
    </div>

    <mt-popup style="width:100%; height:150px;"
              v-model="popupVisible"
              position="bottom">
      <div style="margin-top:50px;">
        <span class="input-number-decrement" @click="changePrice('reduce')">–</span>
        <input class="input-number" type="text" readonly v-model="myPrice">
        <span class="input-number-increment" @click="changePrice('add')">+</span>

        <div class="bus-car-pupc">
          <mt-button type="primary" size="large" @click="submitPrice">立即出价</mt-button>
        </div>
      </div>
    </mt-popup>

    <br/><br/><br/><br/>
  </div>
</template>
<script>
  import {formatDate} from '../../../static/js/date.js';
  import {Toast} from 'mint-ui';
  import {MP} from '../../map.js'
  import { Indicator } from 'mint-ui';

  var qs = require('qs');
  export default {

    data() {
      return {
        product: "",
        selected: "1",
        ak: "6k5fuebHsOTszXKK9sMUGZWnTxArebya",
        payBond: true,
        popupVisible: false,
        currentPrice: 0,
        myPrice: 0,
        surplusTime: "",
        bidDiffTime: "",
        productId: 0,
        state: 0,   // 竞价状态   0 未开始  1 已开始 2 已结束

        geolocation: "",
        geoc: "",
        map: ""
      }
    },
    filters: {
      formatMobileNo: function (value) {
        return value.substring(0, 3) + "****" + value.substring(7, 11);
      },
      formatData: function (value) {
        var date = new Date(value);
        return formatDate(date, 'MM.dd hh : mm');
      }
    },
    mounted: function () {
      this.productId = this.$route.params.id;
      this.initData();
      this.getBond();
      // 竞价剩余时间设置
      this.getDiffTime();

      this.$nextTick(function () {
        var _this = this;
        MP(_this.ak).then(BMap => {
          //在此调用api
          _this.initMap();
        })
      })
    },
    methods: {
      initData: function () {
        Indicator.open();
        var url = global.API_ADDRESS_TEST + "product/" + this.productId
        this.$http.get(url, {}).then((response) => {
          this.product = response.data.data;
          // 出价记录排序
          this.product.bidRecords.sort(function (a, b) {
            return b.amount - a.amount;
          })
          if ( this.product.bidRecords == "")
          {
            this.currentPrice = this.product.bidParameter.startPrice;
          }
          else
          {
            this.currentPrice = this.product.bidRecords[0].amount;
          }
          this.myPrice = this.currentPrice + this.product.bidParameter.increasePrice;

          // 设置广告位置
          var point = new BMap.Point(this.product.lon, this.product.lat);
          this.map.centerAndZoom(point, 15);
          var marker = new BMap.Marker(point);
          this.map.addOverlay(marker);

          Indicator.close();
        }).catch(function (error) {
          console.log(error);
          Indicator.close();
        });
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
          }
        })
      },

      getDiffTime: function ()
      {
        var url = global.API_ADDRESS_TEST + "server/time/"+this.productId
        this.$http.get(url, {}).then((response)=>{
          if (response.data.code == 0) {
            this.bidDiffTime = response.data.data;

            setInterval(this.setJoinTime, 1000);
          }

        }).catch(function (error) {
          console.log(error);
        });
      },

      // 设置参与时间
      setJoinTime: function ()
      {
        if (this.bidDiffTime.type == 2)
        {
          this.surplusTime = "竞价已结束";
          this.state = 2;
          return;
        }

        // 竞价未开始
        if (this.bidDiffTime.type == 0 && this.bidDiffTime.startDiffTime > 0)
        {
          var d = parseInt(this.bidDiffTime.startDiffTime / (24 * 60 * 60));
          var h = parseInt((this.bidDiffTime.startDiffTime - (d * 24 * 60 * 60)) / (60 * 60));
          var m = parseInt((this.bidDiffTime.startDiffTime - (d * 24 * 60 * 60) - (h * 60 * 60)) / 60);
          var s = parseInt(this.bidDiffTime.startDiffTime - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60));

          var type = "即将开始：";
          this.state = 0;
          this.surplusTime = type +d+"天"+h+"时"+m+"分"+s+"秒";

          this.bidDiffTime.startDiffTime --;
        }
        else
        {
          if (this.bidDiffTime.endDiffTime <= 0)
          {
            this.surplusTime = "竞价已结束";
            this.state = 2;
            return;
          }
          var d = parseInt(this.bidDiffTime.endDiffTime / (24 * 60 * 60));
          var h = parseInt((this.bidDiffTime.endDiffTime - (d * 24 * 60 * 60)) / (60 * 60));
          var m = parseInt((this.bidDiffTime.endDiffTime - (d * 24 * 60 * 60) - (h * 60 * 60)) / 60);
          var s = parseInt(this.bidDiffTime.endDiffTime - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60));

          var type = "距离结束：";
          this.state = 1;
          this.surplusTime = type +d+"天"+h+"时"+m+"分"+s+"秒";

          this.bidDiffTime.endDiffTime --;
        }
      },

      // 获取支付保证金记录
      getBond: function () {
        var url = global.API_ADDRESS_TEST + "bond/" + this.productId;
        this.$http.get(url, {}).then((response) =>{
          if (response.data.code == 0) {
            console.log("已支付保证金");
            this.payBond = false;
          }
          else {
            console.log("未支付保证金");
          }

        }).catch(function (error) {
          console.log(error);
        });
      },

      // 支付保证金
      join: function () {
        this.$router.push({path: "/product/bond/" + this.product.id})
      },

      // 出价
      offer: function () {
        this.popupVisible = true;
      },

      changePrice: function (type) {
        if (type == 'add') {
          this.myPrice += this.product.bidParameter.increasePrice;
        }
        else {
          if (this.myPrice - this.currentPrice > this.product.bidParameter.increasePrice) {
            this.myPrice -= this.product.bidParameter.increasePrice;
          }
        }
      },

      // 出价
      submitPrice: function () {
        var url = global.API_ADDRESS_TEST + "bidRecord";

        var postData = {
          productId: this.product.id,
          amount: this.myPrice
        }
        this.$http.post(url, qs.stringify(postData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then( (response)=> {
          if (response.data.code == 0) {
            Toast({
              message: '出价成功',
              iconClass: 'icon icon-success'
            });
            this.popupVisible = false;
            // 获取所有出价记录
            this.getBidRecord();
          }
        }).catch(function (error) {
          console.log(error);
        })

      },

      // 获取所有出价记录
      getBidRecord: function () {
        var url = global.API_ADDRESS_TEST + "bidRecord/" + this.product.id;
        this.$http.get(url, {}).then( (response) => {
          console.log(response.data.data);

          this.product.bidRecords = response.data.data;
          this.currentPrice = this.product.bidRecords[0].amount;
          this.myPrice = this.currentPrice + this.product.bidParameter.increasePrice;
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>
