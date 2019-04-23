<template>
  <div>
    <!-- 域名详情 -->
    <div class="d-detail">
      <div class="dt">
        <div class="dt-tc">
          <div class="dt-t">
            <div class="dt-tl">
              <a
                href="javascript:;"
                target="_blank"
                rel="noopener noreferrer"
                v-if="batch"
              >{{list[0]}}</a>
              <a
                href="javascript:;"
                target="_blank"
                rel="noopener noreferrer"
                v-else
              >{{domain.name}}</a>
            </div>
            <div class="dt-tr">
              <a href="http://" target="_blank" rel="noopener noreferrer">whois</a>
            </div>
          </div>
          <div class="dt-c">
            <table class="dt-table" v-if="batch">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>域名</th>
                  <th>过期时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" v-if="index<3">
                  <td>{{index}}</td>
                  <td>{{item}}</td>
                  <td>{{domain.expire_at?domain.expire_at.split(' ')[0]:'--'}}</td>
                </tr>
                <tr class="expand" @click="showMoreDomain(list,domain.sale_end_at.split(' ')[0])">
                  <td colspan="3">展开</td>
                </tr>
              </tbody>
            </table>
            <ul class="info-list">
              <li>
                <span class="b-left">价格：</span>
                <span class="b-right">
                  <span class="dlt-price" v-if="domain.sale_type==2">议价</span>
                  <span class="dlt-price" v-else>{{domain.price}}元</span>
                </span>
              </li>
              <li>
                <span class="b-left">注册商：</span>
                <span class="b-right">{{domain.registrant?domain.registrant:'--'}}</span>
              </li>
               <li>
                <span class="b-left">出售周期：</span>
                <span class="b-right">{{domain.sale_start_at}} - {{domain.sale_end_at}}</span>
              </li>
              <li>
                <span class="b-left">剩余时间：</span>
                <span  class="b-right">{{domain.sale_end_at?domain.sale_end_at:'--'}}</span>
              </li>
              <li>
                <span class="b-left">域名介绍：</span>
                <span class="b-right">{{domain.introduction?domain.introduction:'--'}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="dt-b">
          <a  @click="goToOrder(id)">立即购买</a>
          <a  @click="goToOrder(id)">咨询客服</a>
        </div>
      </div>
      <!-- 交易流程 -->
      <div class="dc">
        <div class="dc-t">交易流程</div>
        <div class="dc-img"></div>
      </div>
      <!-- 温馨提示 -->
      <div class="db">
        <div class="db-t">温馨提示</div>
        <div class="db-c">
          1、域名介绍仅供参考，价值请自行判断；
          <br>2、域名是否被国家防火墙、杀毒软件、微信等第三方机构或者软件拦截访问，是否进入各级管局备案黑名单无法正常备案，请自行查询、判断。域名一经售出，本网站不承担任何经济以及法律责任；
          <br>3、普通一口价域名买家支付费用后，域名通常可立即完成购买；
          <br>4、合作方一口价域名将为“处理中”状态，通常15天左右完成购买，请耐心等待。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../API/api";

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
    }
  }
};
</script>

<style lang="less">
@import "../../style/css/base.less";
@import "../../style/css/global.less";
@import "../../style/less/domain/detail.less";
</style>