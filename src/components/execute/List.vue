<template>
    <div>
      <mt-header title="我的执行单" fixed style="height:45px; font-size: 16px;">

      </mt-header>
      <div class="mobile-order text-center" style="margin-top:100px;" v-if="executes.length == 0">
        <span class="glyphicon glyphicon-list-alt"></span>
        <p class="f-20">暂无待安装的广告</p>
        <p>

        </p>
      </div>
      <div class="Details-Essentia2 " style="margin-top:45px;" >
        <div class="bus-message" style="text-align: left" v-for="execute in executes">
          <div class="bus-message-module ">
            <div class="bus-message-title ">
              <span class="c-yellow"> 执行单号：{{execute.number}}</span>
            </div>
            <div class="bus-message-content" style="text-align: left">
              <p>
                计划安装时间：{{execute.planInstallTime | formatDate}}<br/>
              </p>
              <p style="text-align: right">
                <mt-button type="primary" size="small" @click="detail(execute)">详细</mt-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {formatDate} from '../../../static/js/date.js';
    export default {
      data(){
        return {
          userId: 0,
          executes:[],
        }
      },
      filters: {

        formatDate: function (value) {
          var date = new Date(value);
          return formatDate(date, 'yyyy年MM月dd日 hh:mm');
        }
      },
      mounted: function ()
      {
        this.userId = sessionStorage.getItem("token");
        this.init();
      },
      methods: {

        // 查询我的执行单
        init: function ()
        {
          var url = global.API_ADDRESS_TEST + "execute/me/" + this.userId;

          this.$http.get(url, {}).then((response)=>{
            console.log(response.data.data);
            this.executes = response.data.data;
          }).catch(function (error){
            console.log(error);
          })
        },

        // 详细信息
        detail: function (execute)
        {

        }
      }
    }
</script>
