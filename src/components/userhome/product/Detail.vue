<template>
    <div>
      <mt-header title="广告位详情" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome/product" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style=" margin-top:45px;">
      </div>
      <div class="Confirm-address1 " style="text-align:left;">
        <ul class="mg-l10">
          <li>{{product.name}}</li>
          <li>
            <span class="glyphicon glyphicon-map-marker"></span>
            {{product.city}}{{product.area}}{{product.address}}
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          id: 0,
          product: ""
        }
      },
      mounted: function ()
      {
        this.id = this.$route.params.id;
        this.initData();
      },
      methods:
      {
        initData: function()
        {
          var url = global.API_ADDRESS_TEST + "product/" + this.id;
          this.$http.get(url, {}).then((response)=>{
            this.product = response.data.data
            console.log(this.product);
          }).catch(function (error){
            console.log(error);
          })
        }
      }
    }
</script>
