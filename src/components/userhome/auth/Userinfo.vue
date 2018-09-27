<template>
    <div>
      <mt-header title="基本信息认证" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="bus-Authentication">
        <!--
        <div class="bus-Authentication-model" @click="person">
          <i class="icon-user"></i>普通用户认证
        </div>
        -->
        <div class="bus-Authentication-model" @click="customer">
          <i class="icon-user"></i>用户信息
        </div>
        <div class="bus-Authentication-model" v-if="damei == 0" @click="enterprise">
          <i class="icon-building"></i>资源方认证<br/>
        </div>
      </div>
      <!--联系电话-->
    </div>
</template>
<script>
    export default {
      data(){
        return {
          damei: 0,
        }
      },
      mounted: function ()
      {
        var vendorId = sessionStorage.getItem("vendorId");
        if (parseInt(vendorId) == global.DAMEI_ACCOUNT_ID)
        {
          this.damei = 1;
        }
      },
      methods: {

        person: function ()
        {
          this.$router.push({path: "/userhome/person"})
        },

        enterprise: function ()
        {
          this.$router.push({path: "/userhome/enterprise"})
        },

        customer: function ()
        {
          this.$router.push({path: "/userhome/customer"})
        }
      }
    }
</script>
