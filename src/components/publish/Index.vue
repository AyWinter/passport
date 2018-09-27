<template>
    <div>
      <mt-header title="信息发布" fixed style="height:45px; font-size: 16px;">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="bus-Authentication">
        <div class="bus-Authentication-model" @click="demand">
          <i class="icon-user"></i>需求发布
        </div>
        <div class="bus-Authentication-model" @click="product">
          <i class="icon-building"></i>广告位发布<br/>
        </div>
      </div>
    </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import {Toast, MessageBox} from 'mint-ui';
    export default {
      data(){
        return {

        }
      },
      methods: {

        // 需求发布
        demand: function ()
        {
          this.$router.push({path: "/publish/demand"})
        },

        // 广告位发布
        product: function ()
        {
          Indicator.open();
          // 验证是否有权限发布广告位
          var url = global.API_ADDRESS_TEST + "product/publish/validate";

          this.$http.get(url,{}).then((response)=>{
            if (response.data.code == 0)
            {
              Indicator.close();
              this.$router.push({path: "/product/publish"})
            }
            else
            {
              Indicator.close();
              var msg = response.data.msg;
              MessageBox('提示', msg);
            }
          }).catch(function (error){
            console.log(error);
            Indicator.close();
          })
        }
      }
    }
</script>
