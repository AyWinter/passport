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
            注册成功
          </div>
          <div class="row">
            <div class="col-xs-12 ">
              <div class="col-xs-12">
                  <button type="button" class="btn  btn-warning Application-btn" @click="signIn" style="width:80%; background-color: #26a2ff; border-color: #26a2ff">立即登录</button>
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
        signIn: function ()
        {
          this.$router.push({path: "/sign"});
//          var vendorId = sessionStorage.getItem("vendorId");
//          if (parseInt(vendorId) == 1)
//          {
//            this.$router.push({path : "/damei"})
//          }
//          else
//          {
//            this.$router.push({path : "/"})
//          }
        }
      }

    }
</script>
