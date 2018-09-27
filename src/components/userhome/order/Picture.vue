<template>
    <div>
      <mt-header title="我的广告画面" fixed style="height:45px; font-size: 16px;">
        <router-link to="/userhome" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="mobile-order text-center" style="margin-top:100px;" v-if="pictures.length == 0">
        <span class="glyphicon glyphicon-list-alt"></span>
        <p class="f-20">暂时没有上传画面</p>
        <p>
        </p>
      </div>
      <div class="Details-Essentia2 " style="margin-top:45px;" v-if="pictures.length >= 0">
        <div class="bus-message" v-for="picture in pictures">
          <div class="bus-message-title ">
            <span class="c-yellow" v-if="picture.state == 0" style="float:left; color:black"> 状态：审核中</span>
            <span class="c-yellow" v-if="picture.state == 1" style="float:left; color:black"> 状态：审核成功</span>
            <span class="c-yellow" v-if="picture.state == 2" style="float:left; color:black"> 状态：审核失败</span>
          </div>
          <div class="bus-message-content" style="text-align: left; height:120px;">
            <img style="width:100px; height:100px;" :src="picture.filePath"/>
            <mt-button type="primary" size="small" style="float:right" @click="deletePicture(picture.id)">删除</mt-button>
          </div>
        </div>
      </div>
      <br/><br/><br/>
      <mt-button type="primary" size="large" style="position: fixed; bottom: 50px; height:50px;" @click="uploadPicture">上传画面</mt-button>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
    export default {
      data(){
        return {

          orderNo: "",
          pictures:[],
          scheduleNumber: "",
        }
      },
      mounted: function ()
      {
        this.orderNo = this.$route.params.orderNo;
        this.init();
      },
      methods:{

        init: function ()
        {
          var url = global.API_ADDRESS_TEST + "order/schedule/" + this.orderNo;

          this.$http.get(url, {}).then((response)=>{
            this.scheduleNumber = response.data.data;
            // 获取所有画面
            this.findPicture();
          }).catch(function (error){
            console.log(error);
          })
        },

        findPicture: function ()
        {
          var url = global.API_ADDRESS_TEST + "order/picture/" + this.scheduleNumber;

          this.$http.get(url, {}).then((response)=>{
            this.pictures = response.data.data;
          }).catch(function (error){
            console.log(error);
          })
        },

        // 上传图片
        uploadPicture: function ()
        {
          this.$router.push({path : "/order/picture/upload/" + this.scheduleNumber});
        },

        // 删除画面
        deletePicture: function (id)
        {
          MessageBox.confirm('删除该画面?').then(action => {

            var url = global.API_ADDRESS_TEST + "schedule/picture/" + id;

            this.$http.delete(url, {}).then((response)=>{

              MessageBox('提示', '删除成功');
              this.init();
            }).catch(function (error){
              console.log(error);
            })
          });
        }
      }
    }
</script>
