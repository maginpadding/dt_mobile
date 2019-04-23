<template>
  <div>
    <!-- 独立发布域名 -->
    <div class="inde-release center" v-if="domainOperate=='release'">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="domain" label="域名">
          <!-- <template slot-scope="scope">
            <div class="cell" v-for="(item, index) in scope.row.name" :key="index">{{item}}</div>
          </template>-->
        </el-table-column>
        <el-table-column prop="endTimeType" label="交易结束时间">
          <template slot-scope="scope">
            <div class="el-tr-input">
              <template v-if="scope.row.batch">
                <el-select
                  v-model="scope.row.endTimeType"
                  placeholder="请选择交易结束时间"
                  @change="batchEdit('endTimeType',scope.row.endTimeType)"
                >
                  <el-option v-for="item in endTime" :key="item" :label="item+'天'" :value="item"></el-option>
                </el-select>
              </template>
              <template v-else>
                <el-select v-model="scope.row.endTimeType" placeholder="请选择交易结束时间">
                  <el-option v-for="item in endTime" :key="item" :label="item+'天'" :value="item"></el-option>
                </el-select>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <div class="el-tr-input">
              <template v-if="scope.row.batch">
                <el-input
                  v-model="scope.row.price"
                  placeholder="请输入售价，不填为议价"
                  @change="batchEdit('price',scope.row.price)"
                ></el-input>
              </template>
              <template v-else>
                <el-input v-model="scope.row.price" placeholder="请输入售价，不填为议价"></el-input>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="简介">
          <template slot-scope="scope">
            <div class="el-tr-input">
              <template v-if="scope.row.batch">
                <el-input
                  v-model="scope.row.introduction"
                  placeholder="请输入域名简介"
                  @change="batchEdit('introduction',scope.row.introduction)"
                ></el-input>
              </template>
              <template v-else>
                <el-input v-model="scope.row.introduction" placeholder="请输入域名简介"></el-input>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="佣金">
          <template slot-scope="scope">
            <div class="el-tr-number">
              <template v-if="scope.row.batch">
                <el-input-number
                  v-model="scope.row.rate"
                  @change="batchEdit('rate',scope.row.rate)"
                  :min="1"
                  :max="10"
                  label="请设置佣金"
                ></el-input-number>
              </template>
              <template v-else>
                <el-input-number v-model="scope.row.rate" :min="1" :max="10" label="请设置佣金"></el-input-number>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-button-box">
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button type="primary" @click="goBack('import')">导入域名</el-button>
        <el-button type="primary" @click="goBack('release')">独立发布</el-button>
        <el-button type="primary" @click="goBack('package')">打包发布</el-button>
        <el-button type="primary" @click="goBack('/domain/index')">域名交易列表</el-button>
        <el-button type="primary" @click="goBack('/domain/detail')">域名交易详情</el-button>
      </div>
    </div>
    <!-- 打包发布 -->
    <div class="inde-release center" v-if="domainOperate=='package'">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="name" label="域名">
          <template slot-scope="scope">
            <div class="cell" v-for="(item, index) in scope.row.name" :key="index">{{item}}</div>
          </template>
        </el-table-column>

        <el-table-column prop="endTime" label="交易结束时间">
          <template slot-scope="scope">
            <div class="el-tr-input">
              <template v-if="scope.row.batch">
                <el-select
                  v-model="scope.row.endTime"
                  placeholder="请选择交易结束时间"
                  @change="batchEdit('endTime',scope.row.endTime)"
                >
                  <el-option v-for="item in endTime" :key="item" :label="item+'天'" :value="item"></el-option>
                </el-select>
              </template>
              <template v-else>
                <el-select v-model="scope.row.endTime" placeholder="请选择交易结束时间">
                  <el-option v-for="item in endTime" :key="item" :label="item+'天'" :value="item"></el-option>
                </el-select>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="init_price" label="价格">
          <template slot-scope="scope">
            <div class="el-tr-input">
              <template v-if="scope.row.batch">
                <el-input
                  v-model="scope.row.init_price"
                  placeholder="请输入售价，不填为议价"
                  @change="batchEdit('init_price',scope.row.init_price)"
                ></el-input>
              </template>
              <template v-else>
                <el-input v-model="scope.row.init_price" placeholder="请输入售价，不填为议价"></el-input>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="简介">
          <template slot-scope="scope">
            <div class="el-tr-input">
              <template v-if="scope.row.batch">
                <el-input
                  v-model="scope.row.introduction"
                  placeholder="请输入域名简介"
                  @change="batchEdit('introduction',scope.row.introduction)"
                ></el-input>
              </template>
              <template v-else>
                <el-input v-model="scope.row.introduction" placeholder="请输入域名简介"></el-input>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="commission" label="佣金">
          <template slot-scope="scope">
            <div class="el-tr-number">
              <template v-if="scope.row.batch">
                <el-input-number
                  v-model="scope.row.commission"
                  @change="batchEdit('commission',scope.row.commission)"
                  :min="1"
                  :max="10"
                  label="请设置佣金"
                ></el-input-number>
              </template>
              <template v-else>
                <el-input-number v-model="scope.row.commission" :min="1" :max="10" label="请设置佣金"></el-input-number>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-button-box">
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button type="primary" @click="goBack('import')">导入域名</el-button>
        <el-button type="primary" @click="goBack('release')">独立发布</el-button>
        <el-button type="primary" @click="goBack('package')">打包发布</el-button>
        <el-button type="primary" @click="goBack('/domain/index')">域名交易列表</el-button>
        <el-button type="primary" @click="goBack('/domain/detail')">域名交易详情</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          endTimeType: "",
          id: "315",
          price: "",
          rate: "",
          bargain: "",
          domain: "批量设置",
          introduction: "",
          batch: true
        }
      ],
      endTime: ["2", "3", "10", "60", "90", "180"],
      submitData: [],
    };
  },
  props: {
    domainOperate: String,
    required: true,
    releaseList: Array
  },
  created: function() {
    var arr = [
      {
        endTimeType: "",
        id: "",
        price: "",
        rate: "",
        bargain: "",
        domain: "批量设置",
        introduction: "",
        batch: true
      }
    ];
    var data = this.releaseList;
    for (var index = 0; index < data.length; index++) {
      var element = data[index];
      var obj = {
        domain: "", //string 域名交易的域名集合
        id: "",
        endTimeType: "", //string
        bargain: "", //int
        price: "", //float
        introduction: "", //string
        rate: "" //int
      };
      obj.domain = element.strdomain;
      obj.id = element.id;
      arr.push(obj);
    }
    this.tableData = arr;
  },
  methods: {
    //批量修改
    batchEdit: function(type, params) {
      var data = this.tableData;
      for (var index = 0; index < data.length; index++) {
        var element = data[index];

        element[type] = params;
      }
    },
    /**
     * 发布域名交易
     * onSubmit
     */
    onSubmit: function(params) {
      var data = {};
      data.publishType = 1;
      data.list = [];
      var list = this.coppyArray(this.tableData).splice(1);
      axios
        .get("/apis/ymjy/publish", {
          params: data
        })
        .then(function(res) {
          this.$alert(res.text, '系统提示', {
            confirmButtonText: '确定',
            callback: action => {
              
            }
          });
        })
    },
    //返回导入页面 返回独立发布页面 打包发布页面
    goBack: function(params) {
      this.$emit("listenStatus", params);
    },
    handleSelectionChange: function(val) {
      this.submitData = val;
    },
    //数组对象深度复制
    coppyArray: function(arr) {
      return arr.map(e => {
        if (typeof e === "object") {
          return Object.assign({}, e);
        } else {
          return e;
        }
      });
    }
  }
};
</script>

<style lang="less">
.inde-release {
  margin-top: 30px;
  margin-bottom: 30px;
  .el-button {
    padding: 8px 15px;
  }
  .el-radio-box {
    margin-top: 20px;
    margin-right: 0;
    span {
      color: #4c4c4c;
      font-size: 12px;
      display: inline-block;
      margin-right: 0;
    }
    .el-radio__label {
      padding-left: 5px;
    }
  }
  .el-button-box {
    margin-top: 20px;
  }
  .el-radio-box .red {
    color: #e2383a;
  }
  .el-table {
    th {
      background: #f5f9fa;
    }
    td,
    th {
      padding: 8px 0;
    }
    .el-tr-input {
      .el-input {
        .el-input__inner {
          width: 170px;
          height: 32px;
          line-height: 32px;
          padding-left: 8px;
          font-size: 12px;
        }
      }

      .el-select {
        width: 170px;
        .el-input {
          .el-input__inner {
            width: 170px;
            font-size: 12px;
          }
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
    }
    .el-tr-number {
      .el-input-number {
        width: 160px;
        line-height: 30px;
        height: 32px;
      }
      .el-input-number__decrease,
      .el-input-number__increase {
        height: 28px;
        line-height: 28px;
      }
      .el-input-number .el-input {
        height: 30px;
      }
      .el-input-number .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>