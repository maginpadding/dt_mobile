<template>
  <div>
    <div class="detail-domain center">
      <div class="detail-left">
        <div class="dlt">
          <el-row class="dlt-top" type="flex" justify="center">
            <el-col :span="12" class="dlt-name">
              <a href="http://" target="_blank" rel="noopener noreferrer" v-if="batch">{{list[0]}}</a>
              <a href="http://" target="_blank" rel="noopener noreferrer" v-else>{{domain.name}}</a>
            </el-col>
            <el-col :span="12" class="dlt-search">
              <span>
                <a href="http://" class="whois">whois</a>
              </span>
              <span>
                <a href="https://www.baidu.com" class="baidu">百度</a>
              </span>
              <span>
                <a href="https://www.google.com" class="google">google</a>
              </span>
            </el-col>
          </el-row>
          <div class="dlt-info dlt-batch" v-if="batch">
            <div class="dlt-tl">
              <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                  <th>序号</th>
                  <th>域名</th>
                  <th>过期时间</th>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in list" :key="index" v-if="index<3">
                    <td>{{index}}</td>
                    <td>{{item}}</td>
                    <td>{{domain.expire_at?domain.expire_at.split(' ')[0]:'--'}}</td>
                  </tr>
                  <tr
                    class="dlt-toggle"
                    @click="showMoreDomain(list,domain.sale_end_at.split(' ')[0])"
                  >
                    <td colspan="3">展开</td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="dlt-toggle">展开</div> -->
            </div>
            <ul class="dlt-list">
              <li>
                <label>价格：</label>
                <span class="dlt-price" v-if="domain.sale_type==2">议价</span>
                <span class="dlt-price" v-else>{{domain.price}}元</span>
              </li>
              <li>
                <label>注册商：</label>
                <span>{{domain.registrant?domain.registrant:'--'}}</span>
              </li>
              <li>
                <label>出售周期：</label>
                <span>{{domain.sale_start_at}} - {{domain.sale_end_at}}</span>
              </li>
              <li>
                <label>剩余时间：</label>
                <span class="dlt-time">{{domain.sale_end_at?domain.sale_end_at:'--'}}</span>
              </li>
              <li>
                <label>域名介绍：</label>
                <span>{{domain.introduction?domain.introduction:'--'}}</span>
              </li>
              <!-- <li>
                <label>过期时间：</label>
                <span>{{domain.expire_at?domain.expire_at:'--'}}</span>
              </li>-->
            </ul>
            <!-- <div class="dlt-ir">
              <div class="dlt-ir-gg">{{domain.introduction}}</div>
            </div>-->
          </div>
          <div class="dlt-info" v-else>
            <ul class="dlt-list">
              <li>
                <label>价格：</label>
                <span class="dlt-price" v-if="domain.sale_type==2">议价</span>
                <span class="dlt-price" v-else>{{domain.price}}元</span>
              </li>
              <li>
                <label>注册商：</label>
                <span>{{domain.registrant?domain.registrant:'--'}}</span>
              </li>
              <li>
                <label>出售周期：</label>
                <span>{{domain.sale_start_at}} - {{domain.sale_end_at}}</span>
              </li>
              <li>
                <label>剩余时间：</label>
                <span class="dlt-time">{{domain.sale_end_at?domain.sale_end_at:'--'}}</span>
              </li>
              <li>
                <label>注册时间：</label>
                <span>{{domain.registration_at?domain.registration_at:'--'}}</span>
              </li>
              <li>
                <label>过期时间：</label>
                <span>{{domain.expire_at?domain.expire_at:'--'}}</span>
              </li>
            </ul>
            <div class="dlt-ir">
              <div class="dlt-ir-gg">{{domain.introduction}}</div>
            </div>
          </div>
        </div>
        <div class="dl-btn clearfix">
          <el-col :span="24">
            <el-button size="small" @click="goToOrder(id)">立即购买</el-button>
            <el-button size="small">咨询客服</el-button>
          </el-col>
        </div>
        <!-- 购买流程 -->
        <div class="dlc">
          <el-row class="dlc-title">
            <el-col :span="24">
              <span>购买流程</span>
            </el-col>
          </el-row>
          <div class="dlc-process"></div>
        </div>
        <!-- 温馨提示 -->
        <div class="dlb">
          <el-row class="dlb-title">
            <el-col :span="24">
              <span>温馨提示</span>
            </el-col>
          </el-row>
          <ul class="dlb-list">
            <li>1、域名介绍仅供参考，价值请自行判断；</li>
            <li>2、域名是否被国家防火墙、杀毒软件、微信等第三方机构或者软件拦截访问，是否进入各级管局备案黑名单无法正常备案，请自行查询、判断。域名一经售出，本网站不承担任何经济以及法律责任；</li>
            <li>3、普通一口价域名买家支付费用后，域名通常可立即完成购买；</li>
            <li>4、合作方一口价域名将为“处理中”状态，通常15天左右完成购买，请耐心等待。</li>
          </ul>
        </div>
      </div>
      <!-- 浏览记录 推荐 -->
      <div class="detail-right">
        <div class="dr-history">
          <el-row class="dr-title">
            <el-col :span="12" class="drt-l">浏览记录</el-col>
            <!-- <el-col :span="12" class="drt-r">换一批</el-col> -->
          </el-row>
          <div class="dr-list">
            <div class="dr-li" v-for="(item, index) in 3" :key="index">
              <div class="dr-l">
                <a href="http://" target="_blank" rel="noopener noreferrer">百投网，百度一下</a>
                <a href="http://" target="_blank" rel="noopener noreferrer">百投网，百度一下</a>
                <span>百投网，百度一下</span>
              </div>
              <div class="dr-r">¥8,888</div>
            </div>
          </div>
        </div>
        <div class="dr-like">
          <el-row class="dr-title">
            <el-col :span="12" class="drt-l">猜你喜欢</el-col>
            <el-col :span="12" class="drt-r" @click.native="mayLikeList">换一批</el-col>
          </el-row>
          <div class="dr-list" v-loading="mayLikeLoading">
            <div class="dr-li" v-for="(item, index) in likeList" :key="index">
              <div class="dr-l">
                <a
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{item.name.split(',')[0]}}</a>
                <!-- <a href="http://" target="_blank" rel="noopener noreferrer">{{item.name}}</a> -->
                <span>{{item.introduction}}</span>
              </div>
              <div class="dr-r">{{item.sale_type==2?'议价':'--'}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-alert title="获取详情错误" type="error" :description="errorText" show-icon v-show="showError"></el-alert>
    <!-- 打包域名显示 -->
    <div class="package-table">
      <el-dialog :visible.sync="packageDialog" width="420px">
        <div class="package-table-close el-icon-circle-close-outline" @click="packageDialog=false"></div>
        <el-table :data="packageData" height="300px">
          <el-table-column property="index" label="序号" width="110"></el-table-column>
          <el-table-column property="name" label="域名" width="150"></el-table-column>
          <el-table-column property="expire_day" label="过期时间" width="160"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import API from "../../../API/api";

export default {
  data() {
    return {
      domain: {
        name: "puqing.cc", // 域名名称
        introduction: "", // 简介
        source: "2", // 来源
        registrant: "hzamcctv", // 注册商
        sale_type: "2", // 交易类型
        registration_at: "2015-09-14 09:19:32", // 注册时间
        expire_at: "2020-09-14 09:19:32", // 域名过期时间
        sale_start_at: "2016-11-04 11:01:44", // 域名交易开始时间
        sale_end_at: "2020-09-13 09:19:32" // 域名交易结束时间
      },
      showError: false,
      errorText: "",
      mayLikeLoading: false,
      likeList: [],
      id: 0,
      batch: false, //是否为批量打包
      list: [],
      packageDialog: false,
      packageData: [
        {
          index: 1,
          name: "22.cn",
          expire_day: "2019-4-19"
        }
      ]
    };
  },
  created: function() {
    this.id = this.$route.params.id;
    this.searchDetail(this.id);
    this.mayLikeList(this.id);
    //获取到对应ID 查询详情页
  },
  methods: {
    searchDetail: function(params) {
      var _this = this;
      $.get(
        API.DT_DETAIL,
        {
          id: params
        },
        function(res) {
          if (res.result) {
            _this.domain = res.data;
            if (res.data.name.indexOf(",") != -1) {
              _this.batch = true;
              _this.list = res.data.name.split(",");
            }
          } else {
            _this.$alert(res.text, "系统提示", {
              confirmButtonText: "确定"
            });
          }
        },
        "JSON"
      );
    },
    mayLikeList: function(params) {
      var _this = this;
      _this.mayLikeLoading = true;
      $.get(
        API.DT_LIKE,
        {
          id: _this.id
        },
        function(res) {
          _this.mayLikeLoading = false;
          if (res.result) {
            _this.likeList = res.data;
          } else {
            _this.$alert(res.text, "系统提示", {
              confirmButtonText: "确定"
            });
          }
        },
        "JSON"
      );
    },
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
      this.packageData = brr;
      this.packageDialog = true;
    },
    //跳转订单页
    goToOrder: function(id) {
      this.$router.push({
        path: `/domain/order/${id}`
      });
    },

  }
};
</script>

<style lang="less">
@import "../../../style/css/base.less";
@import "../../../style/css/global.less";
@import "../../../style/less/pc/domain/detail.less";
</style>

<style>
* {
  box-sizing: border-box;
}
</style>
