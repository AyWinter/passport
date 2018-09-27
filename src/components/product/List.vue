<template>
  <div>
    <div style="height:50px; ">
      <router-link to="/search/index">
        <mt-search v-model="searchKey"></mt-search>
      </router-link>
    </div>
    <div v-for="position in positions" @click="detail(position)">
      <div class="row mobile-product-mode ">
        <div class="col-xs-5 pg-l0">
          <img :src="image" class="product-img2 ">
        </div>
        <div class="col-xs-7">
          <dl class="mobile-inf">
            <dd class="c-gray"><span class="glyphicon glyphicon-map-marker"></span>
              {{position.area}}{{position.road}}{{position.station}}
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div v-if="positions.length > 0">
      <mt-button type="primary" @click="first">首页</mt-button>
      <mt-button type="primary" @click="last">上一页</mt-button>
      <mt-button type="primary" @click="next">下一页</mt-button>
      <mt-button type="primary" @click="end">尾页</mt-button>
    </div>
    <div class="mobile-order text-center" v-if="positions.length == 0">
      <span class="glyphicon glyphicon-list-alt"></span>
      <p class="f-20">暂无广告位</p>
      <p>
        <button type="button" class="btn btn-default btn-order" @click="goHome">返回首页
        </button>
      </p>
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import { Toast } from 'mint-ui';
  var qs = require('qs');
  export default {
    data() {
      return {
        vendorId: 0,
        allLoaded: false,
        searchKey: "",
        positions: [],
        deliverTime: new Date(),
        image: "http://oss.hunchg.com/product_15354440249465043.jpg",

        // 分页相关
        totalPage: 0,
        page: 0,
        pageSize: 0,
      }
    },
    mounted: function () {
      this.vendorId = parseInt(sessionStorage.getItem("vendorId"));
      this.init();
    },
    methods: {

      init: function () {
        Indicator.open();
        var url = global.API_ADDRESS_TEST + "product/list";
        var data = {
          page: this.page,
          vendorId: this.vendorId
        };

        this.$http.post(url, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          Indicator.close();
          this.positions = response.data.data.content;
          this.totalPage = response.data.data.totalPages;
          this.pageSize = response.data.data.size;
          this.page = response.data.data.number
        }).catch(function (error) {
          console.log(error);
          Indicator.close();
        })
      },

      detail: function (position) {
        this.$router.push({path: "/product/detail/" + position.id})
      },

      first: function ()
      {
        if (this.page == 0)
        {
          Toast({
            message: '已是首页',
            duration: 1000
          });
          return;
        }
        this.page = 0;
        this.init();
      },

      last: function ()
      {
        if (this.page == 0)
        {
          Toast({
            message: '已是首页',
            duration: 1000
          });
          return;
        }
        if (this.page >= 1)
        {
          this.page = this.page - 1;
        }
        this.init();
      },

      next: function ()
      {
        if (this.page + 1 == this.totalPage)
        {
          Toast({
            message: '已是尾页',
            duration: 1000
          });
          return;
        }
        else
        {
          this.page += 1;
        }
        this.init();
      },

      end: function ()
      {
        if (this.page + 1 == this.totalPage)
        {
          Toast({
            message: '已是尾页',
            duration: 1000
          });
          return;
        }
        this.page = this.totalPage - 1;
        this.init();
      },

      // 返回首页
      goHome: function ()
      {
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
