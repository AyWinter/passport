<template>
  <div>
    <div style="height:50px; ">
      <router-link to="/search/index">
        <mt-search v-model="key"></mt-search>
      </router-link>
    </div>
    <div class="dameiTop">
      <img src="./../../static/assets/damei_banner.jpg" width="100%">
      <div class="dameiName">
        <div class="dameiLogo"><img src="./../../static/assets/damei_logo.jpg" width="100%"></div>
        <div class="dameiP">长沙城投达美</div>
      </div>
    </div>
    <div class="damiNav">
      <ul class="dm_ul clearfix">
        <li class="cur"><a href="javascript:;"><i class="icon-home"></i>达美首页</a></li>
        <li @click="bid"><a href="javascript:;"><i class="icon-legal"></i>竞拍</a></li>
        <li @click="product"><a href="javascript:;"><i class="icon-list"></i>广告位</a></li>
        <li @click="publish"><a href="javascript:;"><i class="icon-edit"></i>需求发布</a></li>
      </ul>
    </div>
    <div class="dameiPro">

      <div class="row mobile-product-mode " v-for="position in positions" @click="detail(position.id)">
        <div class="col-xs-5 pg-l0">
          <img :src="productImg" class="product-img2 ">
        </div>
        <div class="col-xs-7">
          <dl class="mobile-inf">
            <dt></dt>
            <dt></dt>
            <dd class="c-gray"><span class="glyphicon glyphicon-map-marker"></span>{{position.city}}{{position.area}}{{position.road}}{{position.station}}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        key: "",
        imgUrl1: "../static/assets/1.png",
        imgUrl2: "../static/assets/2.png",

        productImg: "http://oss.hunchg.com/product_15354440249465043.jpg",
        positions:[],
        vendorId: 0
      }
    },
    mounted: function ()
    {
      // 企业ID
        this.vendorId = sessionStorage.getItem("vendorId");
        this.vendorId = global.DAMEI_ACCOUNT_ID;
//      var vendorId = this.$route.params.id;
//      if (vendorId != null && vendorId != "")
//      {
//        sessionStorage.setItem("vendorId", parseInt(vendorId));
//      }
//      else
//      {
//        if (sessionStorage.getItem("vendorId") == null)
//        {
//          sessionStorage.setItem("vendorId", 0);
//        }
//      }
      // 热门广告位
      this.hotProduct();
    },
    methods: {

      hotProduct: function ()
      {
        var url = global.API_ADDRESS_TEST + "product/hot/"+this.vendorId;

        this.$http.get(url, {}).then((response)=>{
          this.positions = response.data.data;
          console.log(this.positions);
        }).catch(function (error){
          console.log(error);
        })
      },

      search: function ()
      {
        this.$router.push({path : "/search/index"})
      },

      // 信息发布
      publish: function ()
      {
        this.$router.push({path: "/publish/demand"})
      },

      // 竞价
      bid: function ()
      {
        this.$router.push({path: "/product/bid"});
      },

      // 所有广告位
      product: function ()
      {
        this.$router.push({path: "/product/list"});
        // this.$router.push({path: "/search/index"});
      },

      // 广告位详情
      detail: function (id)
      {
        this.$router.push({path: "/product/detail/"+id});
      }
    }
  }
</script>
<style type="text/css">
  .dameiTop{ position:relative; vertical-align:bottom; margin-top:-5px;}
  .dameiTop .dameiName{ position:absolute;bottom:4.5rem;left:1rem;right:1rem; z-index:1; text-align:center;}
  .dameiTop .dameiLogo{width:6rem;height:6rem;border-radius:50%;overflow:hidden; vertical-align:middle; margin:0.5rem auto;}
  .dameiTop .dameiP{color:#fff; font-size:1.8rem; text-shadow:0 0 0.5rem rgba(0,0,0,0.5);}
  .dameiTop .dameiPhone{border:1px solid #fff;border-radius:2.2rem;line-height:2.2rem;padding:0 1.2rem 0 2.2rem;font-size:12px;right:1rem;bottom:9rem; z-index:2; background-color:rgba(255,255,255,0.1); position:absolute; color:#Fff; background:url(./../../static/assets/damei_t.png) 0.5rem center no-repeat; background-size:1.2rem;}
  .damiNav{ position: relative; height:3rem; width:100%;}
  .damiNav .dm_ul{ position:absolute;bottom:-0.5rem; right:0.5rem; left:0.5rem; background-color:#fff; box-shadow:0 0.2rem 0.2rem rgba(0,0,0,0.1);padding:0.8rem 0;border-radius:0.5rem;}
  .damiNav .dm_ul li{width:25%; float:left; text-align:center; font-size:0.5rem; font-size:1.2rem; }
  .damiNav .dm_ul li a{color:#555;}
  .damiNav .dm_ul li.cur a,.damiNav .dm_ul li.cur i{color:#ff5105 !important;}
  .damiNav .dm_ul li i{  display:block; margin:0 auto 0.2rem; font-size:3.2rem;}
  .dameiPro{padding:0.5rem;}
  .dameiPro .mobile-product-mode{border-radius:5px; margin-top:0; margin-bottom:0.5rem;}
  .dameiPro .mobile-product-mode .col-xs-7{ padding:0;}
  .dameiPro .mobile-product-mode .mobile-inf{ margin-left:0;}
</style>
