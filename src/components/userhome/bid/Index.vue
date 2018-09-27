<template>
    <div>
      <mt-header title="我的竞价" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="Details-Essentia2 " style="margin-top:45px;">
        <div class="row confrim-modle2 " style="text-align: left" @click="bid">
          <div class="col-xs-10  bus-icon-message">
            <i class="icon-bell bg-yellow">&nbsp;</i>
            竞价成功的广告位（待付款）
          </div>
          <div class="col-xs-2 bus-me-cion text-right">
            <span class="glyphicon glyphicon-chevron-right"></span>
          </div>
        </div>
        <div class="row confrim-modle2 " style="text-align: left" @click="refund">
          <div class="col-xs-10  bus-icon-message">
            <i class="icon-dollar bg-blue">&nbsp;</i>待退竞价保证金
          </div>
          <div class="col-xs-2 bus-me-cion text-right">
            <span class="glyphicon glyphicon-chevron-right"></span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
      data(){
        return {

        }
      },
      methods: {
        // 待退款保证金
        refund: function ()
        {
          this.$router.push({path: "/userhome/bid/bond"})
        },
        // 竞价成功的广告位
        bid: function ()
        {
          this.$router.push({path: "/userhome/bid/result"})
        }
      }
    }
</script>
