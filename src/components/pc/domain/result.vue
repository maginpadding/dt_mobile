<template>
  <div>
    <!-- 所有域名 打包域名 -->
    <div
      class="center search-list"
      id="search-list"
      :class="activeTab==14?'bale-domain':''"
      v-if="activeTab==2||activeTab==14"
    >
      <el-table
        :data="resData"
        style="width: 100%"
        @sort-change="sortChange"
        :default-sort="tableAttribute.sortMethod"
        v-loading="vLoading"
      >
        <el-table-column prop="name" label="域名" width="180">
          <template slot-scope="scope">
            <div class="domain-wrap" v-if="activeTab==14">
              <!-- 打包域名暂时找不到ID -->
              <a
                href="javascript:;"
                target="_blank"
                rel="noopener noreferrer"
                class="domain-name"
                v-for="(item, index) in scope.row.name.split(',')"
                @click="goTo(scope.row.id,'detail')"
                :key="index"
                v-show="index>3?false:true"
              >{{item}}</a>
            </div>
            <div
              class="domain-icon el-icon-goods"
              v-if="activeTab==14"
              @click="showMoreDomain(scope.row.name.split(','),scope.row.remaining_time)"
            ></div>
            <a
              href="javascript:;"
              rel="noopener noreferrer"
              class="domain-name"
              v-if="activeTab!=14"
              @click="goTo(scope.row.id,'detail')"
            >{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="简介" width="250"></el-table-column>
        <el-table-column prop="source_name" label="域名来源" width="120"></el-table-column>
        <el-table-column prop="sale_type_name" label="交易类型" width="100"></el-table-column>
        <el-table-column
          prop="init_price"
          label="价格"
          width="150"
          sortable="custom"
          :sort-orders="tableAttribute.sortOrders"
        >
          <template slot-scope="scope">
            <span class="domain-price">￥{{ scope.row.init_price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remaining_time"
          label="剩余时间"
          width="150"
          sortable="custom"
          :sort-orders="tableAttribute.sortOrders"
        >
          <template slot-scope="scope">
            <span class="domain-remainTime">{{ scope.row.remaining_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expire_day" label="过期时间" width="150"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" class="domain-buy" @click="goTo(scope.row.id,'order')">购买</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 不能复用的不要分出出来组件 -->
    <!-- 推荐域名 平价域名 卡片视图 -->
    <!-- 推荐域名 -->
    <div class="doamin-recommend center" v-else v-loading="vLoading">
      <el-row class="domain-sort cf">
        <el-col>
          <span @click="domainSort()">默认排序</span>
        </el-col>
        <el-col>
          <span @click="domainSort('priceSort')">
            按价格排序
            <i
              :class="filter.price==1?'el-icon-caret-bottom':'el-icon-caret-top'"
              v-if="filter.price!=0"
            ></i>
          </span>
        </el-col>
        <el-col>
          <span @click="domainSort('saleEndTimeSort')">
            按剩余时间排序
            <i
              :class="filter.saleEndTimeSort==1?'el-icon-caret-bottom':'el-icon-caret-top'"
              v-if="filter.saleEndTimeSort!=0"
            ></i>
          </span>
        </el-col>
      </el-row>
      <!-- 卡片列表 -->
      <el-row class="recommend-list">
        <el-col :span="4" v-for="(item, index) in resData" :key="index">
          <el-card class="box-card" shadow="hover">
            <a
              href="javascript:;"
              target="_blank"
              rel="noopener noreferrer"
              class="domain-name"
              @click="goTo(item.id,'detail')"
            >{{item.name}}</a>
            <div class="card-info cf">{{item.introduction}}</div>
            <div class="card-price cf">
              <span class="c-price">￥{{ item.init_price }}</span>
              <span class="c-time">{{item.remaining_time}}</span>
            </div>
          </el-card>
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
export default {
  data() {
    return {
      //表格的排序 价格 剩余时间 倒序 升序 正常
      tableAttribute: {
        sortMethod: { prop: "price", order: "descending" },
        sortOrders: ["ascending", "descending", null]
      },
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
      }
    };
  },
  props: {
    //接收父组件的参数
    activeTab: String,
    required: true,
    resData: Array,
    vLoading: Boolean
  },
  methods: {
    /**
     * 表格的升序降序 价格 剩余时间
     * ascending  升序
     * descending 降序
     */
    sortChange: function(param) {
      var data = {};
      if (!param.prop) {
        data.priceSort = 0;
        this.$emit("listenAjaxSubmit", data);
        return false;
      }
      if (param.prop == "init_price") {
        data.priceSort = param.order == "ascending" ? 2 : 1;
      }
      if (param.prop == "remaining_time") {
        data.saleEndTimeSort = param.order == "ascending" ? 2 : 1;
      }
      this.$emit("listenAjaxSubmit", data);
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
      data.priceSort = 0;
      data.saleEndTimeSort = 0;
      this.filter = data;
      if (type) {
        this.filter[type] = this.filter[type] == 1 ? 2 : 1;
        data[type] = this.filter[type];
      }
      console.log("data :", data);
      this.$emit("listenAjaxSubmit", data);
    }
  }
};
</script>
<style lang="less">
// 自定义表格样式
.search-list {
  td,
  th {
    padding-left: 15px;
    text-align: left;
  }
  th {
    font-weight: bold;
    font-size: 16px;
    color: #666;
    background: #f5f5f5;
  }
  .el-table__header-wrapper {
    border-left: solid 1px #e6e6e6;
    border-right: solid 1px #e6e6e6;
    border-top: solid 1px #e6e6e6;
  }
  .el-table__body-wrapper {
    border-left: solid 1px #e6e6e6;
    border-right: solid 1px #e6e6e6;
    // border-bottom: solid 1px #e6e6e6;
  }
  .is-sortable {
    color: #fe8431;
    .sort-caret.descending {
      display: inline-block;
    }
  }
  .is-sortable.ascending {
    color: #fe8431;
    .sort-caret.ascending {
      display: inline-block;
    }
    .sort-caret.descending {
      display: none;
    }
  }
  .is-sortable.descending {
    color: #fe8431;
    .sort-caret.descending {
      display: inline-block;
    }
  }
  .sort-caret {
    display: none;
  }
  .domain-name {
    font-weight: bold;
    font-size: 14px;
    color: #5c92fa;
  }
  .domain-price {
    color: #e2383a;
  }
  // 打包域名
  .domain-wrap {
    width: 75%;
    display: inline-block;
    vertical-align: middle;
    .domain-name {
      display: block;
      text-align: left;
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
  // 修改背景色
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #fffbea;
    .domain-name {
      color: #fe8431;
    }
    .domain-buy {
      background: #e2383a;
      color: #fff;
      border-color: #e2383a;
    }
  }
}
// 推荐域名 平价好名 卡片视图
.doamin-recommend {
  border-bottom: none;
  border-right: none;
  .domain-sort {
    height: 50px;
    background: #f5f5f5;
    padding-top: 10px;
    padding-bottom: 10px;
    border: solid 1px #e6e6e6;
    .el-col {
      width: auto;
      padding: 0 20px;
      border-right: solid 1px #e6e6e6;
      span {
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #666;
        display: inline-block;
        line-height: 30px;
        height: 30px;
        cursor: pointer;
      }
      &:last-child {
        border-right: none;
      }
    }
  }

  .recommend-list {
    // margin-left: -1px;
    background-color: #ebeef5;
    .el-card__body {
      padding: 20px 10px;
      .domain-name {
        font-weight: bold;
        font-size: 18px;
        color: #5c92fa;
        line-height: 24px;
        margin-bottom: 5px;
        display: inline-block;
        text-align: left;
      }
      .card-info {
        // height: 50px;
        text-align: left;
        font-size: 12px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 40px;
        margin-bottom: 10px;
      }
      .card-price {
        line-height: 28px;
        .c-price {
          float: left;
          color: #e2383a;
        }
        .c-time {
          font-size: 14px;
          color: #333;
          float: right;
        }
      }
    }
    .el-card {
      // border-color: transparent;
      cursor: pointer;
      &:hover {
        //鼠标移入有抖动的问题 暂时没想到解决方案
        // TODO
        // border: none;
        transform: scale(1.05);
        transition: all 0.1s;
        // border: 0;
        .domain-name {
          color: #fe8431;
        }
      }
    }
  }
}
@media screen and(min-width: 1200px) {
  .recommend-list {
    .el-col {
      width: 20%;
      height: 148px;
    }
  }
}
@media screen and(max-width: 1200px) {
  .recommend-list {
    .el-col {
      width: auto;
      height: 130px;
    }
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
