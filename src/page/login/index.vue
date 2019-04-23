<template>
  <div>
    <div class="center login">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: 13732283164,
        password: "chl123123"
      }
    };
  },
  methods: {
    submitLogin: function(val) {
      var _this = this;
      $.post(
        "/apis/login",
        {
          username: _this.form.username,
          password: _this.form.password
        },
        function(res) {
          _this.$alert("登录成功", "系统提示", {
            confirmButtonText: "confirm",
            callback: action => {}
          });
        },
        "JSON"
      );
    }
  }
};
</script>

<style lang="less" scoped>
.login{
    margin-top: 20px;
}
</style>