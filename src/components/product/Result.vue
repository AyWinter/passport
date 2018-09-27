<template>
    <div>
      <mt-header title="操作结果" fixed style="height:45px; font-size: 16px;">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div  class="mobile-bg" style="margin-top:45px;">
      </div>
      <div class="Details-Essential  " id="Details-Essential">

        <div class="row confrim-modle1  text-center Payment-Success">
          <div class="col-xs-12 ">
            <p  class="Payment-Success-i"><span class="glyphicon glyphicon-ok"></span></p>
            信息保存成功
          </div>
          <div class="row">
            <div class="col-xs-12 ">
              <div class="col-xs-12">
                <router-link to="/">
                  <button type="button" class="btn  btn-warning Application-btn" style="width:80%; background-color: #26a2ff; border-color: #26a2ff">返回首页</button>
                </router-link>
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
      }

    }
</script>
