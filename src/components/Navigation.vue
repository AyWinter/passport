<template>
      <div class="h_wrapper">
        <div class="wapBg"><img src="../../static/assets/wap_bg.jpg" width="100%;"></div>
        <div class="h_main" style="margin-top:90px;">
          <s class="dj"></s>
          <ul class="h_nav"  style="margin-top:10px;">
            <li>
              <a href="https://www.kunrn.com" title="湘坤融"><img src="../../static/assets/i_kr.png"></a>
            </li>
            <li>
              <a href="https://www.manni.com" title="曼尼"><img src="../../static/assets/i_mn.png"></a>
            </li>
            <li class="curr" style="height:65px;">
              <a href="https://www.hunchg.com" title="星城广"><img src="../../static/assets/i_cg.png"></a>
            </li>
            <li>
              <a href="https://www.caidw668.com" title="菜大王"><img src="../../static/assets/i_cdw.png"></a>
            </li>
            <li>
              <a href="https://www.baidu.com" title="霖梧湘"><img src="../../static/assets/i_lwx.png"></a>
            </li>
          </ul>
          <ul class="h_list" style="margin-top:30px;">
            <li>
              <p>资金出借&nbsp;&nbsp;投资导向</p><a href="https://www.kunrn.com"><span>湘坤融</span>&nbsp;&nbsp;www.kunrn.com</a>
            </li>
            <li>
              <p>资产处置&nbsp;&nbsp;收款托管</p><a href="https://www.manni.com"><span>曼尼</span>&nbsp;&nbsp;www.manni.com</a>
            </li>
            <li>
              <p>广告买卖&nbsp;&nbsp;轻松交易</p><a href="https://www.hunchg.com"><span>星城广</span>&nbsp;&nbsp;www.hunchg.com</a>
            </li>
            <li>
              <p>菜米油盐&nbsp;&nbsp;加盟开店</p><a href="https://www.caidw668.com"><span>菜大王</span>&nbsp;&nbsp;www.caidw668.com</a>
            </li>
            <li>
              <p>禽鱼养殖&nbsp;&nbsp;蔬菜基地</p><a href="https://www.baidu.com"><span>霖梧湘</span>&nbsp;&nbsp;www.baidu.com</a>
            </li>
          </ul>
        </div>

      </div>
</template>
<script>
    export default {
      data(){
        return {

        }
      },
      mounted: function ()
      {
        this.forbidScroll();
      },
      methods:{

        forbidScroll: function ()
        {
          document.body.style.overflow='hidden';
        }
      }
    }
</script>
<style>
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td {margin:0;padding:0;font-family:'Microsoft YaHei';font-size: 12px;}
  ol,ul {list-style:none}
  .h_wrapper{width:100%; position: relative;}
  .h_main{position: absolute; z-index: 2;top:20rem;}
  .h_main s.dj{position: absolute;width:69px;height:48px; background: url(../../static/assets/dianji.png) center no-repeat;left:50%; top:-3.5rem; margin-left: -35px; background-size: 80%;}
  .h_nav{padding-top: 10px;height: 4rem;}
  .h_nav li{width:17.7%; background-image: url(../../static/assets/btnbg.png); background-repeat: no-repeat; background-size: 100%;float:left; position: relative;margin-left: 2%; box-sizing: border-box;}
  .h_nav li img{width:80%;}
  .h_nav li:nth-child(5){margin-right:0px; }
  .h_nav li a{display: block;text-align: center;padding:0.5rem 0.2rem 1rem 0;vertical-align: middle;}
  .h_nav li.curr{ background-image: url(../../static/assets/bbg.png);margin-top: -1rem;}
  .h_nav li.curr a{padding:1.5rem 0px 2rem;}
  .h_list{padding-top:1rem;}
  .h_list li{height:2.2rem; margin:2rem 2%; line-height: 2.2rem;}
  .h_list li p{ background-color: #fff; border-radius: 50px; padding:0 1rem;font-size: 0.8rem;color:#333; text-align: center; position: relative;display: inline-block; height:30px; width:150px;}
  .h_list li p::after{content: "";position: absolute;width:34px;height:30px; background: url(../../static/assets/ij.png) center no-repeat;top:0.1rem;right:-2rem; background-size:80%; }
  .h_list li a{display: inline-block;margin-left:2rem;border-radius:50px;border:1px solid #fff; color:#fff; font-size: 0.8rem;padding-right:0.5rem; text-decoration: none;box-sizing: border-box; height:30px;}
  .h_list li a span{display: inline-block;border:1px solid #fff;padding:0 0.5rem; margin: -1px; position: relative; border-radius:50px; height:30px;}

  .wapBg{position: relative;width:100%;z-index: 1;}
  @media screen and (max-width: 376px){
    .h_main{top:18rem;}.h_list{padding-top:0;}
    .h_list li p{font-size: 1.2rem;}
    .h_list li a{font-size: 1.2rem;margin-left: 1.5rem;}
    .h_list li p::after{background-size: 50%;right:-1.8rem;}
  }
</style>
