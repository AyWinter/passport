<template>
    <div>
      <mt-header title="收藏夹" fixed style="height:45px; font-size: 16px;">

        <mt-button slot="right">
          <p @click="clear">清空</p>
        </mt-button>
      </mt-header>
      <br/><br/>
      <div class="mobile-order text-center" v-if="favorites.length == 0">
        <span class="glyphicon glyphicon-list-alt"></span>
        <p class="f-20">收藏夹为空</p>
      </div>
      <div class="row mobile-product-mode " v-for="item in favorites">
          <div class="col-xs-5 pg-l0">
            <a @click="detail(item)"><img :src="image" class="product-img2 "></a>
          </div>
          <div class="col-xs-6">
            <dl class="mobile-inf">
              <dt>{{item.position.area}}{{item.position.road}}{{item.position.station}}</dt>
              <dd>
                <p class="glyphicon glyphicon-trash" style="float:right; margin-top:20px;" @click="remove(item)">
                </p>
              </dd>
            </dl>
          </div>
      </div>
      <br/><br/>
    </div>
</template>
<script>
    export default {
      data(){
        return{
          favorites:[],
          image: "http://oss.hunchg.com/product_15354440249465043.jpg",
        }
      },
      mounted: function ()
      {
        this.init();
      },
      methods: {
        init: function ()
        {
          var url = global.API_ADDRESS_TEST + "favorites";
          this.$http.get(url, {}).then((response)=>{

            this.favorites = response.data.data;
          }).catch(function (error){
            console.log(error);
          })
        },
        clear: function ()
        {
          var url = global.API_ADDRESS_TEST + "favorites/remove";
          this.$http.delete(url, {}).then((response)=>{

            var code = response.data.code;
            if (code == 0)
            {
              this.init();
            }
          }).catch(function (error){
            console.log(error);
          })
        },
        remove: function (item)
        {
          var url = global.API_ADDRESS_TEST + "favorites/" + item.position.id;
          this.$http.delete(url, {}).then((response)=>{

            var code = response.data.code;
            if (code == 0)
            {
              this.init();
            }
          }).catch(function (error){
            console.log(error);
          })
        },
        detail: function (item)
        {
          this.$router.push({path: "/product/detail/" + item.position.id})
        }
      }
    }
</script>
