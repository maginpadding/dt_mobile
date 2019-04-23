<template>
  <div>
    <div class="domain-banner">
      
    </div>
    <div class="dommain-content">
      <!-- 域名分类 -->
      <el-row class="domain-type center">
        <el-col
          :span="3"
          class="switch-tab"
          :class="activeTab==item.id?'active':''"
          v-for="item in switchs"
          :key="item.id"
        >
          <span @click="switchClick(item.id)">{{item.value}}</span>
        </el-col>
        <el-col :span="4" class="el-domain-name" :offset="5">
          当前共有
          <span class="color-red">{{page.totalNum}}</span>个域名
        </el-col>
        <el-col :span="2" class="el-domain-publish">
          <el-button type="plain" @click="go">发布域名</el-button>
        </el-col>
      </el-row>
      <!-- 筛选条件 -->
      <category v-on:listenAjaxSubmit="ajaxSubmit" ref="domainCategory"></category>
      <!-- 搜索结果 -->
      <result
        :activeTab="activeTab"
        :resData="result.resData"
        :vLoading="result.vLoading"
        v-on:listenAjaxSubmit="ajaxSubmit"
      ></result>
      <!-- 分页 -->
      <div class="el-result-page center">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[20, 40, 80, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalNum"
          background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../../API/api";
export default {
  data() {
    return {
      //TAB 切换
      activeTab: "2",
      switchs: [
        {
          id: "2",
          value: "所有域名"
        },
        {
          id: "11",
          value: "推荐域名"
        },
        {
          id: "14",
          value: "打包域名"
        },
        {
          id: "3",
          value: "平价好名"
        }
      ],
      //搜索结果数据
      result: {
        resData: [],
        vLoading: true
      },
      page: {
        currentPage: 0,
        pageSize: 0,
        totalNum: 0
      },
      //提交数据 存储一下方便分页变化时更新数据
      submitData: {}
    };
  },
  created: function() {
    //初次加载默认域名数据
    this.ajaxSubmit();
  },
  components: {
    //组件懒加载
    category: resolve =>
      require(["../../../components/pc/domain/category.vue"], resolve),
    result: resolve =>
      require(["../../../components/pc/domain/result.vue"], resolve)
  },
  methods: {
    //跳转发布页
    go: function(params) {
      this.$router.push({ path: "/domain/publish/" });
    },
    /**
     * 切换类型 所有域名 推荐域名  打包域名  平价好名
     */
    switchClick: function(id) {
      this.activeTab = id;
      //所有域名 detailsType 不传值
      var obj = {
        detailsType: id
      };
      //detailsType 等于2的时候不传值
      if (id == 2) {
        obj = {};
      }
      //切换的时候重置表单
      this.result.resData = [];
      this.$refs.domainCategory.resetForm();
      this.ajaxSubmit(obj);
    },
    //渲染数据 结束loading
    changeResult: function(res) {
      if (res.result) {
        this.result.resData = res.data.list;
        this.page.currentPage = res.data.curPage;
        this.page.totalNum = parseInt(res.data.total);
        this.result.vLoading = false;
      }
    },
    // 搜索域名
    // data 传入数据
    ajaxSubmit: function(data) {
      var _this = this;
      this.result.vLoading = true;
      if (data) {
        $.extend(_this.submitData, data);
      }
      $.ajax({
        type: "get",
        url: API.DT_LIST,
        data: _this.submitData,
        dataType: "json",
        success: function(res) {
          _this.changeResult(res);
        }
      });
    },
    //分页变化更新数据
    sizeChange: function(value) {
      var obj = {
        pageSize: value
      };
      this.ajaxSubmit(obj);
    },
    currentChange: function(value) {
      var obj = {
        pageIndex: value
      };
      this.ajaxSubmit(obj);
    }
  }
};
</script>
<style lang="less">
@import "../../../style/css/base.less";
@import "../../../style/css/global.less";
@import "../../../style/less/pc/domain/index.less";
</style>

<style>
* {
  box-sizing: border-box;
}
.el-result-page {
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: right;
  overflow: hidden;
}
</style>
