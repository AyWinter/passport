<template>
  <div>
    <mt-header title="竞价广告位" fixed style="height:45px; font-size: 16px;">
    </mt-header>
    <div class="mobile-wrapper" style="margin-top:45px;">
    </div>
    <div class="Auction-notice" id="Roll">
      <div style="width:70px;">
        <i class=" icon-volume-up c-gray mg-l10  f-18"></i>
      </div>
      <div style="position:absolute;width:260px; margin-left:80px; margin-top:-47px; z-index: 99">
        <marquee direction="left">
          <label v-for="bidResult in bidResult">用户：{{bidResult.mobileNo}}竞价成功</label>
        </marquee>
      </div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">最近热拍</mt-tab-item>
      <mt-tab-item id="2">即将开拍</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="Auction-content" v-if="products.length != 0">
          <div class="row mobile-product-mode " @click="detail(product.id)" v-for="product in products"
               v-if="product.bidParameter.diffTimeType == 0">
            <div class="col-xs-3 pg-l0"><img :src="product.images[0].path" class="product-img2 "></div>
            <div class="col-xs-9  ">
              <dl class="mobile-inf">
                <dt>{{product.name}}</dt>
                <dd class="c-gray1"><span
                  class="glyphicon glyphicon-map-marker"></span>{{product.position.area}}{{product.position.road}}{{product.position.station}}
                </dd>
                <dd class="c-gray1"><span class="c-red">当前价：{{product.currentPrice}}/面/{{product.bidParameter.priceUnit}}</span>
                </dd>

                <dd class="c-gray1" style="margin-left:30px;">
                  <div>
                    <p class="Auction-time" style="float:left; width:180px;">
                      {{product.surplusTime}}
                    </p>
                    <button type="button" class="Auction-time-button">
                    </button>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="Auction-content">
          <div class="row mobile-product-mode " @click="detail(product.id)" v-for="product in products"
               v-if="product.bidParameter.diffTimeType == 1">
            <div class="col-xs-3 pg-l0"><img :src="product.images[0].path" class="product-img2 "></div>
            <div class="col-xs-9 ">
              <dl class="mobile-inf">
                <dt>{{product.name}}</dt>
                <dd class="c-gray1"><span
                  class="glyphicon glyphicon-map-marker"></span>{{product.position.area}}{{product.position.road}}{{product.position.station}}
                </dd>
                <dd class="c-gray1"><span
                  class="c-green">起拍价：{{product.bidParameter.startPrice}}/面/{{product.bidParameter.priceUnit}}</span>
                </dd>
                <dd class="c-gray1" style="margin-left:30px;">
                  <div>
                    <p class="Auction-time" style="float:left; width:180px;">
                      {{product.surplusTime}}
                    </p>
                    <button type="button" class="Auction-time-button">
                    </button>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';

  export default {
    data() {
      return {
        selected: "1",
        products: [],
        productSize: 0,
        bidResult: [],
        vendorId: 0
      }
    },
    mounted: function () {
      this.vendorId = parseInt(sessionStorage.getItem("vendorId"));
      this.init();
      setInterval(this.getProductSize, 1000);
      this.bidSuccess();
    },
    methods: {

      getProductSize: function () {
        this.productSize = this.products.length;

        for (var i = 0; i < this.products.length; i++) {
          setInterval(this.setJoinTime(this.products[i]), 1000);
        }
      },

      init: function () {
        Indicator.open();
        var url = global.API_ADDRESS_TEST + "product/bid/"+this.vendorId;

        this.$http.get(url, {}).then((response) => {
          this.products = response.data.data;

          for (var i = 0; i < this.products.length; i++) {
            this.products[i].bidRecords.sort(function (a, b) {
              return b.amount - a.amount;
            })

            var currentPrice = this.products[i].bidParameter.startPrice;
            if (this.products[i].bidRecords.length > 0) {
              currentPrice = this.products[i].bidRecords[0].amount;
            }
            this.$set(this.products[i], "currentPrice", currentPrice);
            var surplusTime = "";

            this.$set(this.products[i], "surplusTime", surplusTime);

          }
          Indicator.close()
        }).catch(function (error) {
          console.log(error);
          Indicator.close()
        })
      },

      // 设置参与时间
      setJoinTime: function (item) {
        // 获取服务器时间
        if (item.bidParameter.diffTime == 0) {
          item.surplusTime = "竞价已结束";
        }
        else {
          var d = parseInt(item.bidParameter.diffTime / (24 * 60 * 60));
          var h = parseInt((item.bidParameter.diffTime - (d * 24 * 60 * 60)) / (60 * 60));
          var m = parseInt((item.bidParameter.diffTime - (d * 24 * 60 * 60) - (h * 60 * 60)) / 60);
          var s = parseInt(item.bidParameter.diffTime - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60));

          if (item.bidParameter.diffTimeType == 0) {
            item.surplusTime = "距结束：" + d + "天" + h + "时" + m + "分" + s + "秒";
          }
          else {
            item.surplusTime = "距开始：" + d + "天" + h + "时" + m + "分" + s + "秒";
          }

          item.bidParameter.diffTime--
        }
      },

      // 广告位详情
      detail: function (id) {
        this.$router.push({path: "/product/auction/" + id})
      },

      // 获取竞价成功得记录
      bidSuccess: function () {
        var url = global.API_ADDRESS_TEST + "bidResult/all";

        this.$http.get(url, {}).then((response) => {
          this.bidResult = response.data.data;
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  }
</script>
