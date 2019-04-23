<template>
  <div>
    <!-- 下单 -->
    <div class="domain-order center">
      <label for>订单信息</label>
      <el-table :data="domain" border style="width: 100%">
        <el-table-column prop="name" label="域名" width="300">
          <template slot-scope="scope">
            <template v-if="package.packageStatus">
              {{package.packageList[0]}}
              <el-button
                type="text"
                @click="showMoreDomain(package.packageList,scope.row.remaining_time)"
              >展开</el-button>
            </template>
            <template v-else>{{scope.row.name}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="template" label="选择模板" width="400">
          <template slot-scope="scope">
            <el-select v-model="checkedTemplate" placeholder="请选择">
              <el-option v-for="item in scope.row.options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">{{scope.row.sale_type==2?'议价':scope.row.price}}</template>
        </el-table-column>
      </el-table>
      <el-row class="domain-order-select">
        <el-col :span="24">
          <label for class="order-coupon-label">选择优惠券：</label>
          <el-select v-model="coupons.coupon" placeholder="请选择优惠券">
            <el-option
              v-for="item in coupons.records"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="domain-order-price">
        <el-col :span="24">
          应付款金额：
          <b>￥{{totalPrice}}元</b>
        </el-col>
      </el-row>
      <el-row class="domain-order-btn">
        <el-col :span="24">
          <el-button type="primary" size="small">立即购买</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 打包域名弹框 -->
    <div class="package-table" v-show="package.dialog">
      <el-dialog :visible.sync="package.dialog" width="420px">
        <div class="package-table-close el-icon-circle-close-outline" @click="package.dialog=false"></div>
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
import API from "../../../API/api";
export default {
  data() {
    return {
      domain: [
        {
          name: "",
          price: ""
        }
      ],
      checkedTemplate: "",
      coupons: {
        coupon: "",
        records: []
      },
      totalPrice: 300,
      package: {
        packageStatus: false,
        packageList: [],
        dialog: false,
        data: [
          {
            index: 1,
            name: "22.cn",
            expire_day: "2019-4-19"
          }
        ]
      }
    };
  },
  created: function() {
    //获取模板 返回为空值 可能是因为跨域的问题
    this.getTemplate(this.$route.params.id);
    //获取域名详细信息 name
    this.getDetail(this.$route.params.id);
    //获取域名价格和优惠券
    this.getPrice(this.$route.params.id);
  },
  methods: {
    getDetail: function(params) {
      var _this = this;
      $.get(
        API.DT_DETAIL,
        {
          id: params
        },
        function(res) {
          if (res.result) {
            _this.domain[0].name = res.data.name;
            _this.domain[0].remaining_time = res.data.expire_at
              ? res.data.expire_at.split(" ")[0]
              : "--";
            if (res.data.name.indexOf(",") != -1) {
              _this.package.packageStatus = true;
              _this.package.packageList = res.data.name.split(",");
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
    getTemplate: function(params) {
      var _this = this;
      $.get(
        API.DT_CONTACTS,
        function(res) {
          if (res.result) {
            _this.domain[0].options = res.data;
          } else {
            _this.$alert(res.text, "系统提示", {
              confirmButtonText: "确定"
            });
          }
        },
        "JSON"
      );
    },
    getPrice: function() {
      this.domain[0].price = 300;
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
    }
  }
};
</script>

<style>
body {
  background: #f5f5f5;
}
.el-table td,
.el-table th {
  text-align: center;
}
.el-table th {
  background: #f3f9fd;
}
.domain-order .cell {
  color: #666;
  font-size: 14px;
}
</style>

<style lang="less" scoped>
.center {
  margin: 0 auto;
  margin-top: 20px;
  width: 1200px;
}
.domain-order {
  background: #fff;
  padding: 30px 40px;
  padding-top: 20px;
  label {
    color: #666666;
    font-size: 24px;
    line-height: 64px;
    font-weight: normal;
  }
  .el-table {
    width: 1110px;
    margin: 0 auto;
  }
  .el-input__inner {
    height: 36px;
    line-height: 36px;
  }
}

.domain-order-btn {
  text-align: right;
  font-size: 18px;
  color: #fff;
  .el-button {
    padding: 8px 50px;
    background: #e2383a;
    border-color: #e2383a;
  }
}
.domain-order-select {
  text-align: right;
  margin-top: 30px;
  color: #666666;
  font-size: 12px;
  .order-coupon-label {
    color: #666666;
    font-size: 16px;
    line-height: 24px;
  }
  b {
    font-weight: bold;
    color: #e2383a;
  }
}
.domain-order-price {
  text-align: right;
  font-size: 18px;
  line-height: 56px;
  color: #666666;
  b {
    font-weight: bold;
    color: #e2383a;
  }
}

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
</style>
