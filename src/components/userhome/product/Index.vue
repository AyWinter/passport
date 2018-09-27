<template>
    <div>
      <mt-header title="我的广告位" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">普通广告位</mt-tab-item>
        <mt-tab-item id="2">竞价广告位</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="bus-Details-information" v-for="product in products" style="margin-top:20px;" v-if="product.priceType == 0">
            <div class="bus-Details-Essential boder-tn ">
              <div class="shopp-car  bg-gray">
                <div class="col-xs-4  " >
                  <img :src="product.images[0].path" width="100%">
                </div>
                <div class="col-xs-8" style="text-align:left">
                  <dl class="mobile-inf ">
                    <dt><strong>{{product.name}}</strong></dt>
                    <dd><i class=" icon-map-marker"></i>：{{product.city}}{{product.area}}{{product.address}}</dd>
                    <dd>级别：{{product.level}}</dd>
                    <dd>类型：{{product.productType}}</dd>
                  </dl>
                </div>
              </div>
              <div class="row shopp-car-edit  pg-b5">
                <div class="col-xs-12 text-right" >
                  <button type="button" class="btn btn-warning orders-btn" style="background-color: #26a2ff; border-color: #26a2ff" @click="period(product)">查看档期</button>
                  <button type="button" class="btn btn-warning orders-btn" style="background-color: #26a2ff; border-color: #26a2ff" @click="detail(product.id)">详情</button>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="bus-Details-information" v-for="product in products" style="margin-top:20px;" v-if="product.priceType == 1">
            <div class="bus-Details-Essential boder-tn ">
              <div class="shopp-car  bg-gray">
                <div class="col-xs-4  " >
                  <img :src="product.images[0].path" width="100%">
                </div>
                <div class="col-xs-8" style="text-align:left">
                  <dl class="mobile-inf ">
                    <dt><strong>{{product.name}}</strong></dt>
                    <dd><i class=" icon-map-marker"></i>：{{product.city}}{{product.area}}{{product.address}}</dd>
                    <dd>级别：{{product.level}}</dd>
                    <dd>类型：{{product.productType}}</dd>
                  </dl>
                </div>
              </div>
              <div class="row shopp-car-edit  pg-b5">
                <div class="col-xs-12 text-right" >
                  <button type="button" class="btn btn-warning orders-btn" style="background-color: #26a2ff; border-color: #26a2ff">查看档期</button>
                  <button type="button" class="btn btn-warning orders-btn" style="background-color: #26a2ff; border-color: #26a2ff">详情</button>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>

      </mt-tab-container>
      <mt-popup
        v-model="showPeriod"
        popup-transition="popup-fade" style="width:80%">
        <br/>
        <label>广告位档期：</label>
        <ul>
          <li v-for="period in periods">
            {{period.startTime | formatData}} -- {{period.endTime | formatData}}
          </li>
        </ul>
        <br/>
      </mt-popup>

    </div>
</template>
<script>
  import {formatDate} from '../../../../static/js/date.js';
    export default {
      data(){
        return{
          selected: "1",
          products: [],
          showPeriod: false,
          periods:[]
        }
      },
      filters: {

        formatData: function (value) {
          var date = new Date(value);
          return formatDate(date, 'yyyy年MM月dd日');
        }
      },
      mounted: function ()
      {
        this.initData();
      },
      methods: {
        initData: function ()
        {
          var url = global.API_ADDRESS_TEST + "product/user"

          this.$http.get(url, {}).then((response) => {
            this.products = response.data.data;
          }).catch(function (error){
            console.log(error);
          })
        },
        detail: function (id)
        {
          this.$router.push({path: "/userhome/product/detail/"+id})
        },
        period: function (item)
        {
          this.showPeriod = true;
          this.periods = item.periods;
        },
      }
    }
</script>
