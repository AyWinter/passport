<template>
  <div>
    <mt-header title="折扣活动" fixed style="height:45px; font-size: 16px;">
      <router-link to="/userhome" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">
        <router-link to="/userhome/activity/add">
          <p style="margin-top:14px; color:white">创建</p>
        </router-link>
      </mt-button>
    </mt-header>
    <div class="mobile-bg" style="margin-top:45px;">
    </div>
    <div class=" row">
      <div class=" col-xs-12">
        <ul class="Auction-record-list" id="Auction-record-lead">
          <li style="font-weight:bold;"><span class="w10">序号</span> <span class="w90">活动内容及时间</span>
          </li>
          <li style="height:90px;" v-for="(activity,index) in activitys">
              <span class="w10">
                <font class="Auction-lead1">{{index + 1}}</font>
              </span>
              <span class="w60">
              满{{activity.amount}}元，打{{activity.discount}}折
              </span>
              <span class="w30">
                <a @click="del(activity.id)">
								  <i class="icon-trash" style="color:red;"></i>
								</a>
							</span><br/>
              <p style="text-align:left">
                &nbsp;&nbsp;&nbsp;&nbsp;
                有效期限：
              {{activity.startTime | formatDate}}
              ~{{activity.endTime | formatDate}}
              </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../../../static/js/date.js';
  import { MessageBox } from 'mint-ui';
  import {Toast} from 'mint-ui';
  export default {
    data() {
      return {
        activitys:[]
      }
    },
    filters: {

      formatDate: function (value) {
        var date = new Date(value);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      initData: function ()
      {
        var url = global.API_ADDRESS_TEST + "activity";
        this.$http.get(url, {}).then((response)=>{
          this.activitys = response.data.data;
        }).catch(function (error){
          console.log(error);
        })
      },
      del: function (id)
      {
        MessageBox.confirm('确定删除此折扣活动?').then(action => {

          var url = global.API_ADDRESS_TEST + "activity/"+id;
          this.$http.delete(url, {}).then((response)=>{
            if (response.data.code == 0)
            {
              Toast({
                message: "删除成功",
                iconClass: 'icon icon-success'
              });

              this.initData();
            }
          })
        });
      }
    }
  }
</script>
