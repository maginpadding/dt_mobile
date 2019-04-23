<template>
  <div class="container">
    <!-- banner -->
    <div class="d-banner"></div>
    <!-- search -->
    <!-- 搜索 -->
    <div class="deal-search bg-fff">
      <!-- 输入框 -->
      <div class="search-inp">
        <input
          type="text"
          name="keywords"
          class="inp-text"
          placeholder="请输入关键词"
          v-model="operate.keyword"
        >
        <button type="button" class="search-btn" @click="dealWith">搜索域名</button>
      </div>
      <!-- 选择条件 -->
      <div class="choice-condition bg-fff">
        <!-- 搜索示例 -->
        <div class="mt-example">
          <span class="mt-et">搜索：</span>
          <span @click.native="changeActive('assort',1)">数字</span>
          <span @click.native="changeActive('assort',16)">单拼</span>
          <span @click.native="changeActive('assort',17)">双拼</span>
          <span @click.native="changeActive('assort',19)">中文</span>
        </div>
        <!-- mint-ui checklist 和 layer(PC版) 冲突 所以还是使用原生的单选框-->
        <div class="mt-filter">
          <span class="mt-span" @click="selectModal = true">高级搜索</span>
        </div>
      </div>
    </div>
    <!-- 自定义遮罩 -->
    <div class="self-mask" @click="selectModal=!selectModal" v-if="selectModal"></div>
    <!-- 选择条件 -->
    <div class="select-condition" v-if="selectModal">
      <div class="select-total-condition">
        <!-- 域名 -->
        <div class="product-cate el-domain-box">
          <mt-cell title="域名" is-link></mt-cell>
          <ul class="product-list">
            <el-col :span="8" class="el-col-input">
              <el-input v-model="operate.keyword" placeholder="请输入内容" class="cate-input"></el-input>
            </el-col>
            <el-col :span="12" class="domain-list el-col-checkbox">
              <el-checkbox-group v-model="operate.checkRule">
                <el-checkbox label="开头" value="true"></el-checkbox>
                <el-checkbox label="结尾" value="true"></el-checkbox>
                <el-checkbox label="简介" value="true"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </ul>
        </div>
        <!-- 排除 -->
        <div class="product-cate el-domain-box">
          <mt-cell title="排除" is-link></mt-cell>
          <ul class="product-list">
            <el-col :span="8" class="el-col-input">
              <el-input v-model="operate.exclude" placeholder="请输入内容" class="cate-input"></el-input>
            </el-col>
            <el-col :span="12" class="domain-list el-col-checkbox">
              <el-checkbox-group v-model="operate.filterRule">
                <el-checkbox label="开头" value="true"></el-checkbox>
                <el-checkbox label="结尾" value="true"></el-checkbox>
                <el-checkbox label="简介" value="true"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </ul>
        </div>
        <!-- 域名后缀 -->
        <div class="product-cate">
          <mt-cell title="后缀" is-link @click.native="productShowFunc('suffix')"></mt-cell>
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in defaultData.suffix"
              :key="index"
              :class="operate.suffix==item.id?'active':''"
              @click="changeActive('suffix',item.id)"
              v-show="index<6||status.suffix"
            >{{item.value}}</li>
          </ul>
        </div>
        <!-- 分类 手机端暂时不选择那么详细 -->
        <div class="product-cate">
          <mt-cell title="分类" is-link @click.native="productShowFunc('assort')"></mt-cell>
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in defaultData.assort"
              :key="index"
              :class="operate.assort==item.id?'active':''"
              v-show="index<6||status.assort"
              @click.native="changeActive('assort',item.id)"
            >{{item.value}}</li>
          </ul>
        </div>
        <!-- 价格类型 -->
        <div class="product-cate">
          <mt-cell title="类型"></mt-cell>
          <ul class="product-list">
            <li class="product-list-li" v-for="item in defaultData.saleType">{{item.value}}</li>
          </ul>
        </div>
        <!-- 来源 -->
        <div class="product-cate">
          <mt-cell title="来源"></mt-cell>
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in defaultData.source"
              :key="index"
            >{{item.value}}</li>
          </ul>
        </div>
        <!-- 价格 -->
        <div class="product-cate">
          <mt-cell title="价格"></mt-cell>
          <div class="product-price-self">
            <input class="product-input" v-model="operate.minPrice" placeholder="最低价（元）">
            <div class="product-line">——</div>
            <input class="product-input" v-model="operate.maxPrice" placeholder="最高价（元）">
          </div>
        </div>
        <!-- 长度 -->
        <div class="product-cate">
          <mt-cell title="长度"></mt-cell>
          <div class="product-price-self">
            <input class="product-input" v-model="operate.minLength" placeholder="最短（个）">
            <div class="product-line">——</div>
            <input class="product-input" v-model="operate.maxLength" placeholder="最长（个）">
          </div>
        </div>
        <!-- 结束时间 -->
        <div class="product-cate">
          <mt-cell title="结束时间"></mt-cell>
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in defaultData.endTime"
              :key="index"
            >{{item.value}}</li>
          </ul>
        </div>
        <!-- 过期时间 -->
        <div class="product-cate">
          <mt-cell title="过期时间"></mt-cell>
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in defaultData.expireTime"
              :key="index"
            >{{item.value}}</li>
          </ul>
        </div>
      </div>
      <div class="mt-button-wrap">
        <div class="mt-button">
          <mt-button type="default" class="reset-button" @click.native="resetForm">重置</mt-button>
          <mt-button type="primary" class="submit-button" @click.native="dealWith">确认</mt-button>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="mt-result">
      <mt-navbar v-model="activeTab">
        <mt-tab-item
          v-for="(item, index) in defaultData.switchs"
          :key="index"
          @click.native="switchClick(item.id)"
          :id="item.id"
        >{{item.value}}</mt-tab-item>
      </mt-navbar>
      <!-- 域名总量 -->
      <div class="mt-total">
        <div class="mt-l">
          当前共有
          <b>{{page.totalNum}}</b>个域名
        </div>
        <div class="mt-r">
          <a href="javascript:;" class="mt-rb" @click.native="go">发布域名</a>
        </div>
      </div>
      <div class="tab-con" v-loading="result.vLoading">
        <!-- tab-container -->
        <mt-tab-container v-model="activeTab">
          <mt-tab-container-item id="2" class="switch-tab-1">
            <table class="mt-table">
              <thead>
                <tr>
                  <th>域名</th>
                  <th>价格</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tr v-for="(item, index) in result.resData" :key="index">
                <td>
                  <p>
                    <a
                      href="javascript:;"
                      rel="noopener noreferrer"
                      class="domain-name"
                      v-if="activeTab!=14"
                      @click="goTo(item.id,'detail')"
                    >{{ item.name }}</a>
                  </p>
                  <p>{{item.introduction.length>30?(item.introduction.substr(0,22)+'...'):item.introduction}}</p>
                </td>
                <td>
                  <span class="mt-price">¥{{item.init_price}}</span>
                </td>
                <td>
                  <a
                    rel="noopener noreferrer"
                    class="a-button"
                    @click="goTo(item.id,'order')"
                  >购买</a>
                </td>
              </tr>
            </table>
          </mt-tab-container-item>
          <mt-tab-container-item id="11">
            <!-- 推荐域名 -->
            <table class="mt-table">
              <thead>
                <tr>
                  <th>默认排序</th>
                  <th>价格排序</th>
                  <th>剩余时间排序</th>
                </tr>
              </thead>
            </table>
            <ul class="mt-list">
              <li v-for="(item, index) in result.resData" :key="index">
                <a
                  href="javascript:;"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="domain-name"
                  @click.native="goTo(item.id,'detail')"
                >{{item.name}}</a>
                <div
                  class="card-info cf"
                >{{item.introduction.length>30?(item.introduction.substr(0,22)+'...'):item.introduction}}</div>
                <div class="card-price cf">
                  <span class="c-price">¥{{ item.init_price }}</span>
                  <span class="c-time">{{item.remaining_time}}</span>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="14" class="switch-tab-3">
            <!-- 打包域名 -->
            <table class="mt-table">
              <thead>
                <tr>
                  <th>域名</th>
                  <th>价格</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tr v-for="(item, index) in result.resData" :key="index">
                <td>
                  <div class="domain-wrap">
                    <a
                      href="javascript:;"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="domain-name"
                      v-for="(item, index) in item.name.split(',')"
                      @click.native="goTo(item.id,'detail')"
                      :key="index"
                      v-show="index>3?false:true"
                    >{{item}}</a>
                  </div>
                  <div
                    class="domain-icon el-icon-goods"
                    v-if="activeTab==14"
                    @click.native="showMoreDomain(item.name.split(','),item.remaining_time)"
                  ></div>
                </td>
                <td>
                  <span class="mt-price">¥{{item.init_price}}</span>
                </td>
                <td>
                  <a
                    href="javascript:;"
                    rel="noopener noreferrer"
                    class="a-button"
                    @click.native="goTo(item.id,'order')"
                  >购买</a>
                </td>
              </tr>
            </table>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <!-- 平价好名 -->
            <table class="mt-table">
              <thead>
                <tr>
                  <th>
                    <span @click.native="domainSort()">默认排序</span>
                  </th>
                  <th>
                    <span @click.native="domainSort('priceSort')">
                      按价格排序
                      <i
                        :class="filter.priceSort==1?'el-icon-caret-bottom':'el-icon-caret-top'"
                        v-if="filter.priceSort!=0"
                      ></i>
                    </span>
                  </th>
                  <th>
                    <span @click.native="domainSort('saleEndTimeSort')">
                      按剩余时间排序
                      <i
                        :class="filter.saleEndTimeSort==1?'el-icon-caret-bottom':'el-icon-caret-top'"
                        v-if="filter.saleEndTimeSort!=0"
                      ></i>
                    </span>
                  </th>
                </tr>
              </thead>
            </table>
            <ul class="mt-list">
              <li v-for="(item, index) in result.resData" :key="index">
                <a
                  href="javascript:;"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="domain-name"
                  @click.native="goTo(item.id,'detail')"
                >{{item.name}}</a>
                <div
                  class="card-info cf"
                >{{item.introduction.length>30?(item.introduction.substr(0,22)+'...'):item.introduction}}</div>
                <div class="card-price cf">
                  <span class="c-price">¥{{ item.init_price }}</span>
                  <span class="c-time">{{item.remaining_time}}</span>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <!-- 打包域名弹框 -->
    <div class="package-table" v-show="package.dialog">
      <el-dialog :visible.sync="package.dialog" width="420px">
        <div
          class="package-table-close el-icon-circle-close-outline"
          @click.native="package.dialog=false"
        ></div>
        <el-table :data="package.data" height="300px">
          <el-table-column property="index" label="序号" width="110"></el-table-column>
          <el-table-column property="name" label="域名" width="150"></el-table-column>
          <el-table-column property="expire_day" label="过期时间" width="160"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import rules from "../../style/js/domain/rules.js";
import API from "../../API/api";
export default {
  data() {
    return {
      // 搜索结果
      package: {
        dialog: false,
        data: [
          {
            index: 1,
            name: "22.cn",
            expire_day: "2019-4-19"
          }
        ]
      },
      //推荐域名 平价域名 参数
      filter: {
        priceSort: 0,
        saleEndTimeSort: 0
      },
      // tab切换
      activeTab: "2",

      //高级搜索弹框
      selectModal: false,
      //默认显示部分
      status: {
        suffix: false,
        assort: false
      },
      // excludeTwoShow: false,//另外的排除
      // 默认数据
      defaultData: {
        saleType: rules.saleType,
        endTime: rules.endTime,
        source: rules.source,
        expireTime: rules.expireTime,
        suffix: rules.suffix,
        assort: rules.assort,
        switchs: rules.switchs
      },
      operate: {
        keyword: "", //域名
        exclude: "",
        exclude2: "",
        checkRule: [],
        filterRule: [],
        filterRule2: [],
        saleType: "0",
        endTime: "-1",
        expireTime: "-1",
        source: "0",
        minPrice: 0,
        maxPrice: "",
        minLength: 0,
        maxLength: "",
        suffix: "0",
        assort: "0"
      },
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
  methods: {
    changeActive: function(type, item) {
      this.operate[type] = item;
      this.dealWith();
    },
    dealWith: function() {
      console.log("dealWith :", "dealWith");
      var _this = this;
      var checkRule = _this.operate.checkRule;
      var filterRule = _this.operate.filterRule;
      var filterRule2 = _this.operate.filterRule2;

      var keywordWithStart = checkRule.indexOf("开头") != -1 ? 1 : "";
      var keywordWithEnd = checkRule.indexOf("结尾") != -1 ? 1 : "";
      var keywordWithInfo = checkRule.indexOf("简介") != -1 ? 1 : "";

      var excludeWithStart = filterRule.indexOf("开头") != -1 ? 1 : "";
      var excludeWithEnd = filterRule.indexOf("结尾") != -1 ? 1 : "";

      var excludeWithStart2 = filterRule2.indexOf("开头") != -1 ? 1 : "";
      var excludeWithEnd2 = filterRule2.indexOf("结尾") != -1 ? 1 : "";

      var data = {
        keyword: _this.operate.keyword, //域名
        keywordWithStart: keywordWithStart, //域名
        keywordWithEnd: keywordWithEnd, //结尾
        keywordWithInfo: keywordWithInfo, //简介

        exclude: _this.operate.exclude, //排除
        excludeWithStart: excludeWithStart, //简介
        excludeWithEnd: excludeWithEnd, //简介

        exclude1: _this.operate.exclude2, //排除
        exclude1WithStart: excludeWithStart2, //简介
        exclude1WithEnd: excludeWithEnd2, //简介

        domainSuffix: _this.operate.suffix, //域名后缀
        source: _this.operate.source, //域名来源
        saleType: _this.operate.saleType, //价格类型 一口价/议价
        // detailsType: _this.operate.detailsType,//所有域名
        ddlClass: _this.operate.assort,
        structureType: _this.operate.structureType,

        minPrice: _this.operate.minPrice,
        maxPrice: _this.operate.maxPrice,
        minLength: _this.operate.minLength,
        maxLength: _this.operate.maxLength,
        endTime: _this.operate.endTime, //结束时间/剩余时间
        expireTime: _this.operate.expireTime //到期时间
      };
      // 调用父组件的方法 获取结果
      this.ajaxSubmit(data);
    },
    //重置表单
    resetForm: function() {
      this.operate = {
        keyword: "", //域名
        exclude: "",
        exclude2: "",
        checkRule: [],
        filterRule: [],
        filterRule2: [],
        saleType: "0",
        endTime: "-1",
        expireTime: "-1",
        source: "0",
        minPrice: 0,
        maxPrice: "",
        minLength: 0,
        maxLength: "",
        suffix: "0",
        assort: "0"
      };
    },
    productShowFunc: function(params) {
      this.status[params] = !this.status[params];
    },
    // 搜索相关
    //跳转发布页
    go: function(params) {
      this.$router.push({ path: "/domain/publish/" });
    },
    /**
     * 切换类型 所有域名 推荐域名  打包域名  平价好名
     */
    switchClick: function(id) {
      this.activeTab = id;
      console.log("id :", id);
      //所有域名 detailsType 不传值
      var obj = {
        detailsType: id
      };
      //detailsType 等于2的时候不传值
      if (id == 2) {
        obj = {
          detailsType: ""
        };
      }
      //切换的时候重置表单
      this.result.resData = [];
      this.resetForm();
      this.ajaxSubmit(obj);
    },
    //渲染数据 结束loading
    changeResult: function(res) {
      if (res.result) {
        this.result.resData = res.data.list;
        this.page.currentPage = res.data.curPage;
        this.page.totalNum = parseInt(res.data.total);
        this.result.vLoading = false;
        this.selectModal = false;
      } else {
        this.$alert(res.text, "系统提示", {
          confirmButtonText: "确定"
        });
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
    },
    /**
     * 表格的升序降序 价格 剩余时间
     * ascending  升序
     * descending 降序
     */
    sortChange: function(param) {
      var data = {};
      if (!param.prop) {
        data.priceSort = 0;
        this.ajaxSubmit(data);
        return false;
      }
      if (param.prop == "init_price") {
        data.priceSort = param.order == "ascending" ? 2 : 1;
      }
      if (param.prop == "remaining_time") {
        data.saleEndTimeSort = param.order == "ascending" ? 2 : 1;
      }
      this.ajaxSubmit(data);
    },
    //显示打包域名弹框  由于只有域名传入,转化一下数据
    showMoreDomain: function(arr, expire_day) {
      var brr = [];
      for (var index = 0; index < arr.length; index++) {
        var data = arr[index];
        var obj = {};
        obj.name = data;
        obj.index = index;
        obj.expire_day = expire_day;
        brr.push(obj);
      }
      this.package.data = brr;
      this.package.dialog = true;
    },
    //跳转页面 订单或者详情页
    //id   域名交易ID
    //type 页面类型
    goTo: function(id, type) {
      this.$router.push({
        path: `/domain/${type}/${id}`
      });
    },
    //搜索列表排序
    domainSort: function(type) {
      var data = {};
      if (!type) {
        this.filter.saleEndTimeSort = 0;
        this.filter.priceSort = 0;
        data = this.filter;
      }
      if (type == "priceSort") {
        this.filter.saleEndTimeSort = 0;
      }
      if (type == "saleEndTimeSort") {
        this.filter.priceSort = 0;
      }
      if (type) {
        this.filter[type] = this.filter[type] == 1 ? 2 : 1;
        data[type] = this.filter[type];
      }
      console.log("data :", data);
      this.ajaxSubmit(data);
    }
  }
};
</script>

<style lang="less">
@import "../../style/css/base.less";
@import "../../style/css/global.less";
@import "../../style/less/domain/index.less";

// 打包域名
.package-table {
  .package-table-close {
    width: 24px;
    height: 24px;
    display: block;
    font-size: 24px;
    position: absolute;
    right: 12px;
    z-index: 2;
    top: 16px;
    color: #999;
    cursor: pointer;
  }
  .el-table {
    th {
      background: #f7f7f7;
    }
    th,
    td {
      text-align: center;
    }
    .el-table__body {
      tr {
        border-bottom: 1px dashed #e6e6e6;
      }
    }
  }
}
.package-table .el-dialog__header {
  display: none;
}
.package-table .el-dialog__body {
  border: solid 6px #a3b7d8;
  padding: 0;
}
.mt-result {
  .tab-con {
    tr {
      padding: 0 5px;
    }
    td {
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 1px dashed #e6e6e6;
    }
  }
  .domain-icon {
    color: #fe8431;
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
    font-size: 32px;
    cursor: pointer;
  }
}
.mt-example {
  span {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>