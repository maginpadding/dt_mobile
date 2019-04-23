<template>
  <div>
    <!-- 搜索类型 -->
    <div class="domain-category center">
      <el-row>
        <el-col :span="4">
          <label class="cate-label">域名：</label>
          <el-input v-model="operate.keyword" placeholder="请输入内容" class="cate-input"></el-input>
        </el-col>
        <el-col :span="4" class="domain-list">
          <el-checkbox-group v-model="operate.checkRule">
            <el-checkbox label="开头" value="true"></el-checkbox>
            <el-checkbox label="结尾" value="true"></el-checkbox>
            <el-checkbox label="简介" value="true"></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="4">
          <label for class="cate-label">类型：</label>
          <el-select v-model="operate.saleType" placeholder="请选择" class="cate-input">
            <el-option
              v-for="item in defaultData.saleType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <label for class="cate-label">结束时间：</label>
          <el-select v-model="operate.endTime" placeholder="请选择" class="cate-input">
            <el-option
              v-for="item in defaultData.endTime"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label class="cate-label">价格：</label>
          <el-input v-model="operate.minPrice" class="cate-input short-input"></el-input>
          <span class="line-span">&nbsp;&nbsp;—&nbsp;&nbsp;</span>
          <el-input v-model="operate.maxPrice" class="cate-input short-input"></el-input>
          <span class="line-span">&nbsp;&nbsp;元</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <label class="cate-label">排除：</label>
          <el-input v-model="operate.exclude" placeholder="可用，分隔" class="cate-input"></el-input>
        </el-col>
        <el-col :span="3" class="domain-list domain-filter">
          <el-checkbox-group v-model="operate.filterRule">
            <el-checkbox label="开头"></el-checkbox>
            <el-checkbox label="结尾"></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="1" class="domain-list domain-list2">
          <i
            :class="excludeTwoShow?'el-icon-minus':'el-icon-plus'"
            @click="excludeTwoShow=!excludeTwoShow"
          ></i>
        </el-col>
        <el-col :span="4">
          <label for class="cate-label">来源：</label>
          <el-select v-model="operate.source" placeholder="请选择" class="cate-input">
            <el-option
              v-for="item in defaultData.source"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <label for class="cate-label">过期时间：</label>
          <el-select v-model="operate.expireTime" placeholder="请选择" class="cate-input">
            <el-option
              v-for="item in defaultData.expireTime"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label class="cate-label">长度：</label>
          <el-input v-model="operate.minLength" class="cate-input short-input"></el-input>
          <span class="line-span">&nbsp;&nbsp;—&nbsp;&nbsp;</span>
          <el-input v-model="operate.maxLength" class="cate-input short-input"></el-input>
          <span class="line-span">&nbsp;&nbsp;个</span>
        </el-col>
      </el-row>
      <el-row v-if="excludeTwoShow">
        <el-col :span="4">
          <label class="cate-label">排除：</label>
          <el-input v-model="operate.exclude2" placeholder="可用，分隔" class="cate-input"></el-input>
        </el-col>
        <el-col :span="4" class="domain-list domain-filter">
          <el-checkbox-group v-model="operate.filterRule2">
            <el-checkbox label="开头"></el-checkbox>
            <el-checkbox label="结尾"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <!-- 后缀 -->
      <div class="classify-row classify-self">
        <label for class="cate-label">后缀：</label>
        <el-row>
          <el-col :span="1" v-for="(item, index) in defaultData.suffix" :key="index">
            <label
              for
              class="cate-classify"
              :class="operate.suffix==item.id?'active':''"
              @click="changeActive('suffix',item.id)"
            >{{item.value}}</label>
          </el-col>
        </el-row>
      </div>
      <!-- 分类 -->
      <div class="classify-row classify-self">
        <label for class="cate-label">分类：</label>
        <el-row>
          <el-col :span="1" v-for="(item, index) in defaultData.assort" :key="index">
            <el-popover
              placement="bottom-start"
              title
              width="auto"
              trigger="click"
              v-if="item.data"
              class="detail-popover"
            >
              <!-- 具体列表 -->
              <el-row class="detail-classify">
                <el-col :span="1.5" v-for="(child, i) in item.data" :key="i">
                  <el-button
                    size="mini"
                    @click="selectDetail(child)"
                    :class="operate.structureType==child.id?'active':''"
                  >{{child.value}}</el-button>
                </el-col>
              </el-row>
              <el-row class="detail-classify detail-btn">
                <el-col :span="24">
                  <el-button size="mini" round @click="ajaxSubmit">确定</el-button>
                  <el-button size="mini" round @click="resetForm">重置</el-button>
                </el-col>
              </el-row>
              <label
                slot="reference"
                for
                class="cate-classify"
                :class="operate.assort==item.id?'active':''"
                @click="changeActive('assort',item.id)"
              >{{item.value}}</label>
            </el-popover>
            <label
              for
              class="cate-classify"
              :class="operate.assort==item.id?'active':''"
              @click="changeActive('assort',item.id)"
              v-else
            >{{item.value}}</label>
          </el-col>
        </el-row>
      </div>
      <el-row class="search-btn classify">
        <el-col :span="24">
          <el-button size="mini" @click="ajaxSubmit" round>确定</el-button>
          <el-button size="mini" @click="resetForm" round>重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import rules from "../../../style/js/pc/domain/rules.js";
export default {
  data() {
    return {
      // 默认数据
      excludeTwoShow: false,
      defaultData: {
        saleType: [
          {
            id: "0",
            value: "所有类型"
          },
          {
            id: "2",
            value: "一口价"
          }
        ],
        endTime: [
          {
            id: "-1",
            value: "全部"
          },
          {
            id: "0",
            value: "今天"
          },
          {
            id: "1",
            value: "明天"
          },
          {
            id: "2",
            value: "后天"
          }
        ],
        source: [
          {
            id: "0",
            value: "全部"
          },
          {
            id: "1",
            value: "自有域名"
          },
          {
            id: "2",
            value: "爱名网"
          },
          {
            id: "3",
            value: "其他注册商"
          }
        ],
        expireTime: [
          {
            id: "-1",
            value: "全部"
          },
          {
            id: "30",
            value: ">30天"
          },
          {
            id: "60",
            value: ">60天"
          },
          {
            id: "90",
            value: ">90天"
          },
          {
            id: "180",
            value: ">180天"
          },
          {
            id: "300",
            value: ">300天"
          }
        ],
        suffix: rules.suffix,
        assort: rules.assort
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
      }
    };
  },
  methods: {
    changeActive: function(type, item) {
      this.operate[type] = item;
    },
    //选择详细分类
    //reg 判断是否存在汉字
    //关键字 无 且 开 非 尾
    selectDetail: function(item) {
      var reg = /[\u4e00-\u9fa5]/;
      this.operate.structureType = item.id;
      if (reg.test(item.value)) {
        var arr = item.value.split("");
        var no = arr.indexOf("无");
        var and = arr.indexOf("且");
        var open = arr.indexOf("开");
        var non = arr.indexOf("非");
        var tail = arr.indexOf("尾");
        this.operate.checkRule = [];
        this.operate.filterRule1 = [];
        this.operate.filterRule2 = [];
        //无4非0开
        if (no != -1) {
          var one = arr[no + 1];
          var two = arr[no + 2];
          this.operate.exclude = one;
          if (two && !reg.test(two)) {
            this.operate.exclude = one + "," + two;
          }
        }
        if (non != -1) {
          this.excludeTwoShow = true;
          var one = arr[non + 1];
          var two = arr[non + 2];
          this.operate.exclude2 = one;
          if (two && !reg.test(two)) {
            this.operate.exclude2 = one + "," + two;
          }
        } else {
          this.excludeTwoShow = false;
        }

        if (open != -1) {
          var one = arr[open - 1];
          var two = arr[open - 2];
          if (non != -1) {
            this.operate.filterRule2.push("开头");
          } else {
            this.operate.checkRule.push("开头");
          }
        }
        if (tail != -1) {
          var one = arr[tail - 1];
          var two = arr[tail - 2];
          if (non != -1) {
            this.operate.filterRule2.push("结尾");
          } else {
            this.operate.checkRule.push("结尾");
          }
        }
        //
        if (and != -1) {
          var one = arr[and + 1];
          var two = arr[and + 2];
          this.operate.keyword = one;
          if (two && !reg.test(two)) {
            this.operate.keyword = one + two;
          }
        }

        //由于高度会变化 需要动态修改悬浮框的top值
        setTimeout(function() {
          var $_tooltip = $('div[role="tooltip"][aria-hidden="false"]');
          var tooltipTop = $_tooltip.offset().top;
          if ($_tooltip.length != 0) {
            tooltipTop =
              $(".cate-classify.active", $(".classify-self").eq(1)).offset()
                .top + 24;
            $_tooltip.css("top", tooltipTop + "px");
          }
        }, 1);
      }
    },
    ajaxSubmit: function() {
      $('div[role="tooltip"]').prop("aria-hidden", true);
      $('div[role="tooltip"]').remove();
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
      _this.$emit("listenAjaxSubmit", data);
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
    }
  }
};
</script>
<style lang="less">
label {
  outline: none;
}
.classify {
  clear: both;
  overflow: hidden;
}
.domain-category {
  background: #f3f9fd;
  padding: 18px 32px;
  border: solid 1px #e6e6e6;
  margin-bottom: 20px;
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    // text-align: center;
    &.domain-list {
      text-align: left;
    }
  }
  .domain-list2 {
    margin-left: -30px;
    margin-right: 30px;
  }
}
.cate-classify {
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  padding: 4px 5px;
  border-radius: 4px;
  height: 24px;
  line-height: 16px;
  &.active {
    color: #fff;
    background: #e2383a;
    &:hover {
      color: #fff;
    }
  }
  &:hover {
    color: #e2383a;
  }
}
.cate-label {
  color: #666;
  font-size: 14px;
}
.cate-input {
  width: 120px;
  height: 32px;
  input {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
  }
  .el-input__icon {
    line-height: 32px;
  }
  &.short-input {
    width: 80px;
  }
}

.domain-list {
  line-height: 32px;

  .el-checkbox__label {
    padding-left: 5px;
  }
  .el-checkbox {
    margin-right: 10px;
  }
}
.line-span {
  color: #999;
  font-size: 14px;
}
.classify-row {
  height: 24px;
  line-height: 24px;
  .el-col {
    line-height: 24px;
  }
}
.detail-popover {
  max-width: 500px;
}
.detail-classify {
  max-width: 500px;
  margin-bottom: 10px;
  text-align: center;
  .el-col {
    margin-bottom: 10px;
  }
  &.detail-btn {
    margin-bottom: 0;
  }
  .el-button {
    margin: 0 5px;
    &.active {
      background: #fff;
      color: #e2383a;
      border: 1px solid #dcdfe6;
    }
    // &:hover{
    //     background: #fff;
    //     color: #e2383a;
    //     border: 1px solid #DCDFE6;
    // }
    // &:link{
    //     background: #fff;
    //     color: #e2383a;
    //     border: 1px solid #DCDFE6;
    // }
    // &:active{
    //     background: #fff;
    //     color: #e2383a;
    //     border: 1px solid #DCDFE6;
    // }
    // &:focus{
    //     background: #fff;
    //     color: #666;
    //     border: 1px solid #DCDFE6;
    // }
  }
}
.search-btn {
  text-align: center;
  margin-bottom: 0;
}

.classify-self {
  margin-bottom: 10px;
  height: auto;
  overflow: hidden;
  .cate-label {
    float: left;
    width: auto;
  }
  .el-row {
    width: auto;
    padding-left: 42px;
    margin-bottom: 0;
    .el-col {
      text-align: left;
      width: 60px;
      .cate-classify {
        font-size: 13px;
      }
    }
  }
}
</style>