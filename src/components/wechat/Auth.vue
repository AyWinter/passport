<template>
    <div>
    </div>
</template>
<script>
    export default {
      data (){
        return {
          access_code : "",
          redirectUrl: "",
          getAccessTokenUrl: "",
          openId: "",
        }
      },
      mounted: function ()
      {
        this.auth();
      },
      methods:
      {
        auth: function ()
        {
          var access_code = this.GetQueryString('code');
          this.access_code = access_code;
          if (this.access_code != null && this.access_code != "")
          {
            var url = global.API_ADDRESS_TEST + "wechat/auth/" + this.access_code;
            this.$http.get(url, {}).then((response) => {
              if (response.data.code == 0)
              {
                var vendorId = sessionStorage.getItem("vendorId");
                let token = response.data.data;
                if (token != null && token != "")
                {
                  sessionStorage.setItem("token", token)
                }
                if (parseInt(vendorId) == 8)
                {
                  this.$router.push({path : "/damei"})
                }
                else
                {
                  this.$router.push({path : "/"})
                }
              }
            }).catch(function (error){
            })
            return;
          }

          var authUrl = global.AUTH_USER_URL;
          var appId = global.APPID;
          authUrl = authUrl.replace("APPID", appId);

          // 回调地址
          var redirectUrl = global.REDIRECT_URL;
          redirectUrl = encodeURIComponent(redirectUrl);

          this.redirectUrl = redirectUrl;
          authUrl = authUrl.replace("REDIRECT_URI", redirectUrl)
          authUrl = authUrl.replace("SCOPE", global.SCOPE_USERINFO);
          window.location = authUrl;
        },

        GetQueryString: function (name)
        {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if (r != null)
            return unescape(r[2]);
          return null;
        }
      }
    }
</script>
