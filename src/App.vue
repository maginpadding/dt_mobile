<template>
  <div id="app">
    <div class="app-bread center">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/domain/index/">域名交易</el-menu-item>
        <el-menu-item index="/domain/publish/">域名发布</el-menu-item>
        <el-menu-item
          index="/login/"
        >{{account.status?account.name+'('+account.grade_name+')':'立即登录'}}</el-menu-item>
      </el-menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
import API from "./API/api";

export default {
  name: "App",
  data() {
    return {
      activeIndex: "",
      account: {}
    };
  },
  watch: {
    $route(to, from) {
      this.activeIndex = to.path;
    }
  },
  created() {
    var _this = this;
    //检测是否登录
    $.getJSON(API.LOGIN_CHECK, function(res) {
      if (res) {
        _this.account = res;
      } else {
        _this.submitLogin();
      }
    });
  },
  methods: {
    submitLogin: function(val) {
      var _this = this;
      $.post(
        API.LOGIN,
        {
          username: 13732283164,
          password: "chl123123"
        },
        function(res) {
          _this.$notify({
            title: "系统提示",
            message: "自动登录成功！",
            type: "success"
          });
        },
        "JSON"
      );
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.el-breadcrumb {
  display: none;
}
.center {
  width: 1200px;
  margin: 0 auto;
}
</style>
