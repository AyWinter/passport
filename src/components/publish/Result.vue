<template>
  <div>
    <mt-header title="操作结果" fixed style="height:45px; font-size: 16px;">

    </mt-header>
    <div  class="mobile-bg" style="margin-top:45px;">
    </div>
    <div class="Details-Essential  " id="Details-Essential">

      <div class="row confrim-modle1  text-center Payment-Success">
        <div class="col-xs-12 ">
          <p  class="Payment-Success-i"><span class="glyphicon glyphicon-ok"></span></p>
          需求发布成功。<br/>请保持电话通畅，资源方会尽快跟您联系
        </div>
        <div class="row">
          <div class="col-xs-12 ">
            <div class="col-xs-12">

                <button type="button" @click="goHome" class="btn  btn-warning Application-btn" style="width:80%; background-color: #26a2ff; border-color: #26a2ff">返回首页</button>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    methods: {

      goHome: function ()
      {
        var vendorId = sessionStorage.getItem("vendorId");
        if (parseInt(vendorId) == 1)
        {
          this.$router.push({path : "/damei"})
        }
        else
        {
          this.$router.push({path : "/"})
        }
      }
    }

  }
</script>
