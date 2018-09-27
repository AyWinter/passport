<template>
  <div>
    <mt-header title="购物车" fixed style="height:45px; font-size: 16px;">
      <router-link to="/map/index" slot="left">
        <span class="glyphicon glyphicon-map-marker"></span>
        <a style="color:white">查看位置</a>
      </router-link>
      <mt-button slot="right">
        <p @click="clear">清空</p>
      </mt-button>
    </mt-header>
    <br/><br/><br/>
    <div class="mobile-order text-center" v-if="shopcart.length == 0">
      <span class="glyphicon glyphicon-list-alt"></span>
      <p class="f-20">购物车为空</p>
      <p class=" c-gray">可以看看哪些想买的</p>
      <p>
        <button type="button" class="btn btn-default btn-order" @click="goHome">随便逛逛
        </button>
      </p>
    </div>

    <div class="Details-Essential  shopp-car-remove" style="" v-for="(product, index) in shopcart">
      <div class="shopp-car">
        <div class="col-xs-1">
          <input type="checkbox" v-model="product.selected" @change="select(product)"/>
        </div>
        <div class="col-xs-3 ">
          <img :src="product.product.images[0].path" style="max-height: 100px;width:100px; height:60px;">
        </div>
        <div class="col-xs-7">
          <dl class="mobile-inf ">
            <dd>
              <b v-for="(cycle,index) in product.product.prices" v-if="cycle.cycle == product.cycle">
                {{cycle.price | formatMoney}}/{{cycle.cycle}}
              </b>
              &nbsp;&nbsp; 时长：{{product.quantity}}  {{product.cycle}}
            </dd>
            <dd> 
              投放时段：{{product.deliverTime}} 至 {{product.endTime | formatDate}}
            </dd>
            <dd>
              <i class=" icon-map-marker"></i>
              {{product.product.position.area}}
              {{product.product.position.road}}
              {{product.product.position.station}}
            </dd>
            <dd style="text-align: left" v-if="product.amount > 0">
              <p style="font-size: 8px; color:red">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                满{{product.amount}}打{{product.discount * 10}}折
              </p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="row shopp-car-edit ">
        <div class="col-xs-8 " style="float:left;">
                <span class="c-red  f-16" style="float:left">
                  总价：
                  <b v-for="(cycle,index) in product.product.prices" v-if="cycle.cycle == product.cycle">
                    <b v-if="product.discount > 0">
                    {{product.quantity * cycle.price * product.discount}}
                    </b>
                    <b v-if="product.discount == 0">
                    {{product.quantity * cycle.price}}
                    </b>
                  </b>
                  <b v-if="product.discount > 0">
                    <b style="font-size: 10px;" v-for="(cycle,index) in product.product.prices"
                       v-if="cycle.cycle == product.cycle">
                      （原价：{{product.quantity * cycle.price}}）
                    </b>
                  </b>
                </span>
        </div>
        <!--1-->
        <div class="col-xs-4 pg-l0 text-right">
          <p class="glyphicon glyphicon-trash" @click="deleteProduct(product)">
          </p>
        </div>
      </div>
    </div>
    <br/><br/>
    <div class="mobile-bg"></div>
    <div class="row mobile-menu5 " style="position: fixed; bottom: 50px; height:50px;" v-if="shopcart.length > 0">
      <div class="col-xs-3 text-left">
        &nbsp;<input type="checkbox"
                     class="mobile-checkbox" v-model="selectAll" @change="selectAllMethod">&nbsp;&nbsp;全选
      </div>
      <div class="col-xs-9 text-right">
        总计 <font class="car-red">{{totalAmount | formatMoney}}</font>
        <button type="button" class="btn  btn-warning bus-btn " @click="settlement ">去结算
        </button>
      </div>
    </div>
  </div>
</template>
<script>

  import {Toast, MessageBox} from 'mint-ui';
  import {formatDate} from '../../../static/js/date.js';
  var qs = require('qs');
  export default {
    data() {
      return {
        fixed: true,
        shopcart: [],
        totalAmount: 0,
        selectAll: true
      }
    },
    filters: {
      formatMoney: function (value) {
        return "￥ " + value;
      },
      formatDate: function (value) {
        var date = new Date(value);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        var url = global.API_ADDRESS_TEST + "shopcart";
        this.$http.get(url, {}).then((response) => {
          if (response.data.code == 0) {
            this.shopcart = response.data.data;
          }
          for (var i = 0; i < this.shopcart.length; i++) {
            for (var j = 0; j < this.shopcart[i].product.prices.length; j++) {
              if (this.shopcart[i].cycle == this.shopcart[i].product.prices[j].cycle) {
                if (this.shopcart[i].selected) {
                  var discount = this.shopcart[i].discount;
                  var amount = this.shopcart[i].quantity * this.shopcart[i].product.prices[j].price;
                  if (discount > 0) {
                    amount = amount * discount;
                  }
                  this.totalAmount += amount;
                }
              }
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      select: function (item) {
        this.calculateAmount(item);
      },

      calculateAmount: function (item) {
        this.updateSelect(item);
        for (var i = 0; i < item.product.prices.length; i++) {
          if (item.cycle == item.product.prices[i].cycle) {

            var discount = item.discount;
            if (item.selected == true) {
              var amount = item.product.prices[i].price * item.quantity;
              if (discount > 0) {
                amount = amount * discount;
              }
              this.totalAmount += amount;
            }
            else if (item.selected == false) {
              var amount = item.product.prices[i].price * item.quantity;
              if (discount > 0) {
                amount = amount * discount;
              }
              this.totalAmount -= amount;
            }
          }
        }
      },

      // 更新购物车产品的选中状态
      updateSelect: function (item) {
        var url = global.API_ADDRESS_TEST + "shopcart/" + item.id;
        var _this = this;
        var postData = {
          selected: item.selected
        }
        this.$http.post(url, qs.stringify(postData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (response) {
        }).catch(function (error) {
          console.log(error);
        });
      },

      selectAllMethod: function () {
        this.totalAmount = 0;
        for (var i = 0; i < this.shopcart.length; i++) {
          if (this.selectAll == true) {
            this.shopcart[i].selected = true;
            for (var j = 0; j < this.shopcart[i].product.prices.length; j++) {
              if (this.shopcart[i].cycle == this.shopcart[i].product.prices[j].cycle) {
                var discount = this.shopcart[i].discount;

                if (discount > 0) {
                  this.totalAmount += this.shopcart[i].quantity * this.shopcart[i].product.prices[j].price * discount;
                }
                else {
                  this.totalAmount += this.shopcart[i].quantity * this.shopcart[i].product.prices[j].price;
                }
                break;
              }
            }
          }
          else {
            this.shopcart[i].selected = false
            this.totalAmount = 0;
          }

          this.updateSelect(this.shopcart[i]);
        }
      },

      // 清空购物车
      clear: function () {

        MessageBox.confirm('清空购物车?').then(action => {

          var url = global.API_ADDRESS_TEST + "shopcart";
          var _this = this;
          var reqData = {_method: "DELETE"}
          this.$http.delete(url, reqData).then(function (response) {
            if (response.data.code == 0) {
              Toast({
                message: '移除成功',
                iconClass: 'icon icon-success'
              });
              //
              _this.init();
            }
          }).catch(function (error) {
            console.log(error);
          });
        });
      },

      // 删除单个产品
      deleteProduct: function (item) {

        MessageBox.confirm('删除改广告位?').then(action => {

          var url = global.API_ADDRESS_TEST + "shopcart/" + item.id
          var _this = this;
          var reqData = {_method: "DELETE"}
          this.$http.delete(url, reqData).then(function (response) {
            if (response.data.code == 0) {
              Toast({
                message: '移除成功',
                iconClass: 'icon icon-success'
              });
              //
              _this.init();
            }
          }).catch(function (error) {
            console.log(error);
          });
        });
      },

      // 去结算
      settlement: function () {
        if (this.totalAmount == 0) {
          MessageBox('提示', '请选择要结算的项目');
        }
        else {
          this.$router.push({path: "/order/confirm"})
        }
      },

      // 回首页
      goHome: function ()
      {
        var vendorId = sessionStorage.getItem("vendorId");
        if (vendorId == global.DAMEI_ACCOUNT_ID)
        {
          this.$router.push({path: "/damei"})
        }
        else
        {
          this.$router.push({path: "/"})
        }
      }
    }
  }
</script>
