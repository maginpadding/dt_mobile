<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <div class="domain-publish center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/domain/index/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a @click="publish('import')">导入域名</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="domainOperate=='release'">
          <a @click="publish('release')">独立发布</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="domainOperate=='package'">
          <a @click="publish('package')">打包发布</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div
      class="domain-publish center"
      v-if="domainOperate=='import'"
      v-loading="vLoading"
      element-loading-text="正在验证域名是否可用"
      element-loading-spinner="el-icon-loading"
    >
      <!-- 操作按钮 -->
      <div class="dp-top">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="dialog.autoImport=true"
        >导入域名</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" class="el-button-refresh"></el-button>
        <span class="el-domain-info">
          <i>*</i>导入账号下域名
        </span>
      </div>
      <el-row class="dp-center">
        <el-col :span="12">
          <el-input
            type="textarea"
            placeholder="每行一个域名，格式为：域名,简单描述最多100个域名"
            v-model="domainTextarea"
            class="domainTextarea"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <div class="el-domain-info">
            共
            <i>{{domainData.length}}</i>个域名
          </div>
          <div class="el-domain-btn">
            <el-button type="primary" size="small" @click="publish('release')">独立发布</el-button>
          </div>
          <div class="el-domain-btn">
            <el-button type="primary" size="small" @click="publish('package')">打包发布</el-button>
          </div>
          <div class="el-domain-info">
            <i>*</i>发布打包交易，域名的类型和后缀必须相同
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 导入域名 -->
    <div class="el-dialog-form">
      <el-dialog
        title="选择域名"
        :visible.sync="dialog.autoImport"
        width="547px"
        :before-close="handleClose"
        class="el-dialog-domain"
        center
      >
        <div class="el-domain-list">
          <el-form :inline="true" :model="dialog" class="demo-form-inline">
            <el-form-item label="域名">
              <el-input v-model="dialog.user" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="后缀">
              <el-select v-model="dialog.domainSuffix" placeholder="所有后缀">
                <el-option
                  :label="item.value"
                  :value="item.value"
                  :key="item.value"
                  v-for="(item, index) in dialog.originSuffix"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-form-search">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="dialog.importData"
            style="width: 100%"
            border
            stripe
            v-loading="dialog.importLoading"
            height="250"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="66"></el-table-column>
            <el-table-column prop="strdomain" label="域名" width="200"></el-table-column>
            <el-table-column prop="end_time" label="到期时间" width="200"></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.autoImport = false">取 消</el-button>
          <el-button type="primary" @click="importDomain">添 加</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 独立发布 -->
    <releaseDomain
      :domainOperate="domainOperate"
      :releaseList="releaseList"
      v-on:listenStatus="changeStatus"
    ></releaseDomain>
  </div>
</template>

<script>
import rules from "../../../style/js/pc/domain/rules.js";
import API from "../../../API/api";
export default {
  data() {
    return {
      //导入域名 打包域名 发布域名
      //import  package  release
      vLoading: false,
      domainOperate: "import",
      domainTextarea: "",
      domainData: [],
      releaseList: [], //发布的域名
      dialog: {
        user: "",
        domainSuffix: "不限",
        autoImport: false,
        importData: [],
        originSuffix: rules.suffix,
        importLoading: false,
        suffix: [],
        domainList: [] //弹框选中的域名
      }
    };
  },
  watch: {
    domainTextarea(newValue, oldValue) {
      let _this = this;
      this.domainData = this.filter_array(
        _this.domainTextarea.split(/[(\r\n)\r\n]+/)
      );
    }
  },
  created: function() {
    var data = rules.suffix;
    var arr = [];
    for (var index = 0; index < data.length; index++) {
      var element = data[index];
      arr.push(element.value);
    }
    this.dialog.suffix = arr;
  },
  components: {
    releaseDomain: resolve =>
      require(["../../../components/pc/domain/releaseDomain.vue"], resolve)
  },
  methods: {
    /**
     * {
          "result": true,
          "text": "success",
          "data": {
              "域名ID": {
                  "id": "域名ID",
                  "strdomain": "域名名称",
                  "end_time": "域名到期时间"
              },
              "315": {
                  "id": "315",
                  "strdomain": "bcvfh.com",
                  "end_time": "2018-09-05 09:03:17"
              },
           }
        }
     */
    //下一步
    //独立发布 / 打包发布
    //首先验证格式是否正确
    //验证是否为该域名下的
    /**
     * 独立发布 / 打包发布
     * @param {function} publish 验证域名
     * @param {string}   params  跳转下一步
     */
    publish: function(params) {
      var _this = this,
        domain = _this.domainData,
        suffix = _this.dialog.suffix;
      for (var index = 0; index < domain.length; index++) {
        var element = domain[index];
        if (element.indexOf(".") == -1) {
          _this.$alert(
            element + "域名格式错误,正确示例：baidu.com",
            "系统提示",
            {
              confirmButtonText: "确认",
              callback: action => {}
            }
          );
          return false;
        }
      }
      var data = {};
      data.domains = domain.join(",");
      this.vLoading = true;
      // $.get(
      //   "/apis/ymjy/domain/checkAttribution",
      //   {
      //     domains: "baidu.com"
      //   },
      //   function(res) {
      //     console.log("res :", res);
      //   },
      //   "JSON"
      // );
      // 后端验证 此处跨域有问题 暂时无法验证
      axios
        .get(API.DT_CHECK, {
          params: data
        })
        .then(function(res) {
          _this.vLoading = false;
          if (res.result) {
            _this.changeStatus(params);
          } else {
            _this.$alert(res.text, "系统提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(function(error) {
          _this.vLoading = false;
          _this.$alert(error, "系统提示", {
            confirmButtonText: "确认",
            callback: action => {}
          });
        });
    },
    //改变
    changeStatus: function(params) {
      //独立发布之前需要验证域名是否合法
      if (params.indexOf("/") != -1) {
        this.$router.push({ path: params });
      } else {
        this.domainOperate = params;
      }
    },
    //导入域名
    handleClose: function(done) {
      this.dialog.autoImport = false;
    },
    //查询该账户下的域名
    onSubmit: function() {
      var _this = this;
      _this.dialog.importLoading = true;
      //查询该账户下的域名
      var data = {},
        keyword = _this.dialog.user,
        suffix = _this.dialog.domainSuffix;
      if (keyword) {
        data.keyword = keyword;
      }
      if (suffix && suffix != "不限") {
        data.suffix = suffix;
      }
      axios
        .get(API.DT_PUBLISH_LIST, {
          params: data
        })
        .then(function(res) {
          _this.dialog.importLoading = false;
          //返回过来的是对象 转成数组格式;
          var data = res.data.data,
            arr = [];
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              var element = data[key];
              arr.push(element);
            }
          }
          _this.dialog.importData = arr;
        });
    },
    importDomain: function(params) {
      //提取出对应的域名
      var data = this.dialog.domainList;
      var text = "";
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        text += element.strdomain + "\n";
      }
      this.domainTextarea = text;
      this.dialog.autoImport = false;
      this.releaseList = data;
    },
    /**
     * es6语法
     * 过滤JS数组中的空值,假值等(es6语法)
     * @param array 需要过滤的数组
     * @returns {Array} []
     */
    filter_array: function(array) {
      return array.filter(item => item);
    },
    handleSelectionChange: function(val) {
      this.dialog.domainList = val;
    }
  }
};
</script>

<style lang="less">
@import "../../../style/css/base.less";
@import "../../../style/css/global.less";
@import "./publish.less";
</style>