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
          placeholder="请输入商标"
          v-model="render.keyword"
        >
        <button type="button" class="search-btn" @click="filterSearch('click')">查询商标</button>
      </div>
      <!-- 选择条件 -->
      <div class="choice-condition bg-fff">
        <!-- 搜索示例 -->
        <div class="mt-example">
          <span class="mt-et">搜索：</span>
          <span>数字</span>
          <span>单拼</span>
          <span>双拼</span>
          <span>中文</span>
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
        <!-- 产品分类 -->
        <div class="product-cate">
          <mt-cell title="产品分类" is-link @click.native="productShowFunc"></mt-cell>
          <!-- 产品列表 -->
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in condition.classType"
              :key="index"
              v-show="index<6||status.classShow"
              @click="selectClick('classType',item.id)"
            >{{item.id}}-{{item.value}}</li>
          </ul>
        </div>
        <!-- 商标类型 -->
        <div class="product-cate">
          <mt-cell title="商标类型"></mt-cell>
          <!-- 类型列表 -->
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in condition.tradeType"
              :key="index"
              @click="selectClick('tradeType',item.id)"
              :class="render['tradeType']==item.id?'active':''"
            >{{item.value}}</li>
          </ul>
        </div>
        <!-- 商标价格 -->
        <div class="product-cate">
          <mt-cell title="商标价格"></mt-cell>
          <!-- 商标价格 -->
          <div class="product-price-self">
            <input class="product-input" v-model="render.priceStart" placeholder="最低价（元）">
            <div class="product-line">——</div>
            <input class="product-input" v-model="render.priceEnd" placeholder="最高价（元）">
          </div>
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in condition.price"
              :key="index"
              :class="render['price']==item.id?'active':''"
              @click="selectClick('price',item.id)"
            >{{item.value}}</li>
          </ul>
        </div>
        <!-- 注册年限 -->
        <div class="product-cate">
          <mt-cell title="注册年限"></mt-cell>
          <!-- 注册年限 -->
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in condition.year"
              :key="index"
              :class="render['year']==item.id?'active':''"
              @click="selectClick('year',item.id)"
            >{{item.value}}</li>
          </ul>
        </div>
        <!-- 交易类型 -->
        <div class="product-cate">
          <mt-cell title="交易类型"></mt-cell>
          <!-- 交易类型 -->
          <ul class="product-list">
            <li
              class="product-list-li"
              v-for="(item, index) in condition.buyType"
              :key="index"
              :class="render['buyType']==item.id?'active':''"
              @click="selectClick('buyType',item.id)"
            >{{item.value}}</li>
          </ul>
        </div>
      </div>
      <div class="mt-button-wrap">
        <div class="mt-button">
          <mt-button type="default" class="reset-button" @click="resetForm">重置</mt-button>
          <mt-button type="primary" class="submit-button" @click="locationHref">确认</mt-button>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="mt-result">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">所有域名</mt-tab-item>
        <mt-tab-item id="2">推荐域名</mt-tab-item>
        <mt-tab-item id="3">打包域名</mt-tab-item>
        <mt-tab-item id="4">平价好名</mt-tab-item>
      </mt-navbar>
      <!-- 域名总量 -->
      <div class="mt-total">
        <div class="mt-l">
          当前共有
          <b>974668</b>个域名
        </div>
        <div class="mt-r">
          <a href class="mt-rb">发布域名</a>
        </div>
      </div>
      <div class="tab-con">
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1" class="switch-tab-1">
            <table class="mt-table">
              <thead>
                <tr>
                  <th>域名</th>
                  <th>价格</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tr>
                <td>
                  <p>
                    <a href>eggtoken.cn</a>
                  </p>
                  <p>大火的区块链糖果盒...</p>
                </td>
                <td>
                  <span class="mt-price">¥8,988</span>
                </td>
                <td>
                  <a href="http://" target="_blank" rel="noopener noreferrer" class="a-button">购买</a>
                </td>
              </tr>
            </table>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
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
              <li>
                <a
                  href="http://100tou.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="domain-name"
                >100tou.com</a>
                <div class="card-info cf">百投网，百度一下</div>
                <div class="card-price cf">
                  <span class="c-price">¥8,888</span>
                  <span class="c-time">11时37份</span>
                </div>
              </li>
              <li>
                <a
                  href="http://100tou.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="domain-name"
                >100tou.com</a>
                <div class="card-info cf">百投网，百度一下</div>
                <div class="card-price cf">
                  <span class="c-price">¥8,888</span>
                  <span class="c-time">11时37份</span>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="3" class="switch-tab-3">
            <!-- 打包域名 -->
            <table class="mt-table">
              <thead>
                <tr>
                  <th>域名</th>
                  <th>价格</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tr>
                <td>
                  <div class="domain-wrap">
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="domain-name"
                    >bale.com</a>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="domain-name"
                    >bale.com</a>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="domain-name"
                    >bale.com</a>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="domain-name"
                    >bale.com</a>
                  </div>
                  <div class="domain-icon"></div>
                </td>
                <td>
                  <span class="mt-price">¥8,988</span>
                </td>
                <td>
                  <a href="http://" target="_blank" rel="noopener noreferrer" class="a-button">购买</a>
                </td>
              </tr>
            </table>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <!-- 平价好名 -->
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
              <li>
                <a
                  href="http://100tou.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="domain-name"
                >100tou.com</a>
                <div class="card-info cf">百投网，百度一下</div>
                <div class="card-price cf">
                  <span class="c-price">¥8,888</span>
                  <span class="c-time">11时37份</span>
                </div>
              </li>
              <li>
                <a
                  href="http://100tou.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="domain-name"
                >100tou.com</a>
                <div class="card-info cf">百投网，百度一下</div>
                <div class="card-price cf">
                  <span class="c-price">¥8,888</span>
                  <span class="c-time">11时37份</span>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "1",
      // 弹层里的筛选条件
      condition: {
        classType: [
          { id: "01", value: "化学原料" },
          { id: "02", value: "颜料油漆" },
          { id: "03", value: "日化用品" },
          { id: "04", value: "燃料油脂" },
          { id: "05", value: "医药卫生" },
          { id: "06", value: "五金金属" },
          { id: "07", value: "机械设备" },
          { id: "08", value: "手工器械" },
          { id: "09", value: "科学仪器" },
          { id: "10", value: "医疗器械" },
          { id: "11", value: "家用电器" },
          { id: "12", value: "运输工具" },
          { id: "13", value: "军用烟花" },
          { id: "14", value: "珠宝钟表" },
          { id: "15", value: "乐器" },
          { id: "16", value: "文化用品" },
          { id: "17", value: "橡胶制品" },
          { id: "18", value: "皮革皮具" },
          { id: "19", value: "建筑材料" },
          { id: "20", value: "家具" },
          { id: "21", value: "家用器具" },
          { id: "22", value: "绳网袋篷" },
          { id: "23", value: "纺织纱线" },
          { id: "24", value: "床单布料" },
          { id: "25", value: "服装鞋帽" },
          { id: "26", value: "花边拉链" },
          { id: "27", value: "地毯席垫" },
          { id: "28", value: "体育玩具" },
          { id: "29", value: "食品罐头" },
          { id: "30", value: "调味茶糖" },
          { id: "31", value: "水果花木" },
          { id: "32", value: "啤酒饮料" },
          { id: "33", value: "酒" },
          { id: "34", value: "烟草烟具" },
          { id: "35", value: "广告贸易" },
          { id: "36", value: "金融物管" },
          { id: "37", value: "建筑修理" },
          { id: "38", value: "通讯电信" },
          { id: "39", value: "运输旅行" },
          { id: "40", value: "材料处理" },
          { id: "41", value: "教育娱乐" },
          { id: "42", value: "科研服务" },
          { id: "43", value: "餐饮酒店" },
          { id: "44", value: "医疗园艺" },
          { id: "45", value: "社会法律" }
        ],
        tradeType: [
          // { id: 0, value: "不限" },
          { id: 8, value: "纯图片" },
          { id: 4, value: "纯数字" },
          { id: 1, value: "纯中文" },
          { id: 2, value: "纯字母" },
          { id: 3, value: "中文+字母" },
          { id: 5, value: "字母+数字" },
          { id: 6, value: "中文+数字" },
          { id: 7, value: "中文+字母+数字" }
        ],
        price: [
          { id: 1, value: "1万以下" },
          { id: 2, value: "1-5万" },
          { id: 3, value: "5-10万" },
          { id: 4, value: "10万以上" }
        ],
        year: [
          // { id: 0, value: "不限" },
          { id: 1, value: "满一年" },
          { id: 2, value: "满两年" },
          { id: 3, value: "满三年" }
        ],
        buyType: [
          // { id: -1, value: "不限" },
          { id: 0, value: "一口价" },
          { id: 1, value: "议价" }
        ]
      },
      // 弹层里的 状态信息
      status: {
        classShow: false,
        typeShow: false,
        priceShow: false
      },
      // 弹层是否显示
      selectModal: false,
      extensionState: false,
      temporary: false,
      render: {
        classType: [],
        tradeType: 0,
        price: "",
        priceStart: "",
        priceEnd: "",
        year: 0,
        buyType: -1, //交易类型
        extension: 0, //是否续展
        keyword: "", //关键词
        numberBytes: 0, //商标名字节数
        orderby: "", //排序类型
        orderbyType: "" //排序规则 低到高 高到底
      },
      // 页面数据 排序列表
      sortType: [
        {
          flex: 1,
          className: "slot",
          values: [
            {
              name: "综合排序",
              orderby: "",
              orderbyType: ""
            },
            {
              name: "时间升序",
              orderby: "time",
              orderbyType: "asc"
            },
            {
              name: "时间降序",
              orderby: "time",
              orderbyType: "desc"
            },
            {
              name: "价格升序",
              orderby: "price",
              orderbyType: "asc"
            },
            {
              name: "价格降序",
              orderby: "price",
              orderbyType: "desc"
            }
          ]
        }
      ],
      mtSelect: {
        currentTags: "",
        popupVisible: false
      }
    };
  },
  watch: {
    selectModal: function(newValue, oldValue) {
      try {
        if (newValue) {
          $("#header_top").css("z-index", "10");
        } else {
          $("#header_top").css("z-index", "1000");
        }
      } catch (error) {}
    }
  },
  methods: {
    // 是否续展
    extensionFunc: function(param) {
      this.render.extension == 1
        ? (this.render.extension = 0)
        : (this.render.extension = 1);
      this.render.extension == 1
        ? (this.extensionState = true)
        : (this.extensionState = false);
      this.locationHref();
    },
    // 显示所有商标分类
    productShowFunc: function(type) {
      this.status.classShow = !this.status.classShow;
    },
    // 选中标记
    selectClick: function(type, id) {
      var data = this.condition[type];
      var found = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          found = data[i];
          break;
        }
      }
      // var found = this.condition[type].map(function (obj) {
      //     return obj.id == id;
      // });
      if (type == "price") {
        this.render.price = id;
        if (id == 0) {
          this.render.priceStart = 0;
          this.render.priceEnd = 0;
        }
        if (id == 1) {
          this.render.priceStart = 1;
          this.render.priceEnd = 10000;
        }
        if (id == 2) {
          this.render.priceStart = 10000;
          this.render.priceEnd = 50000;
        }
        if (id == 3) {
          this.render.priceStart = 50000;
          this.render.priceEnd = 100000;
        }
        if (id == 4) {
          this.render.priceStart = 100000;
          this.render.priceEnd = 0;
        }
        return;
      }
      if (type == "selfPrice") {
        if (
          !this.isNumber(this.render.priceStart) ||
          !this.isNumber(this.render.priceEnd)
        ) {
          this.render.priceStart = 0;
          this.render.priceEnd = 0;
        }
        return;
      }
      if (type == "classType") {
        this.render[type].push(found.id);
      } else {
        this.render[type] = found.id;
      }
    },
    // 重置表单
    resetForm: function() {
      this.render = {
        classType: [],
        tradeType: 0,
        price: "",
        priceStart: 0,
        priceEnd: 0,
        year: 0,
        buyType: -1, //交易类型
        extension: 0, //是否续展
        keyword: "", //关键词
        numberBytes: 0, //商标名字节数
        orderby: "", //排序类型
        orderbyType: "" //排序规则 低到高 高到底
      };
      this.status = {
        classShow: false,
        typeShow: false,
        priceShow: false
      };
    },
    /*获取网址参数*/
    getURL: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = decodeURI(window.location.search)
        .substr(1)
        .match(reg);
      if (r != null) return r[2];
      return null;
    },
    /*获取全部url参数,并转换成json对象*/
    getUrlAllParams: function(url) {
      var url = url ? url : window.location.href;
      var _pa = url.substring(url.indexOf("?") + 1),
        _arrS = _pa.split("&"),
        _rs = {};
      for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf("=");
        if (pos == -1) {
          continue;
        }
        var name = _arrS[i].substring(0, pos),
          value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
      }
      return _rs;
    },
    onSelectChange: function(picker, values) {
      if (this.mtSelect.currentTags.name != values[0].name) {
        // 判断是否有参数 如果有,第一次按照url里的参数来
        if (!this.temporary) {
          this.mtSelect.currentTags = values[0];
        }
        this.temporary = false;
        this.render.orderby = this.mtSelect.currentTags.orderby;
        this.render.orderbyType = this.mtSelect.currentTags.orderbyType;
        // this.locationHref();
        // this.popupVisible = false;
      }
    },
    // 提交商标求购需求
    submitRequest: function(formName) {
      var _this = this;
      var data = {
        type: "3",
        cls: _this.form.type,
        UserName: _this.form.name,
        tel: _this.form.mobile,
        Content: _this.form.description
      };
      // EP.loading();
      $.ajax({
        type: "POST",
        url: "/build/demand_save",
        data: data,
        dataType: "JSON",
        success: function(res) {
          // EP.close()
          if (res.result) {
            _this.requestStatus = true;
            // EP.success(res.text, {
            //   yes: function () {
            //     location.reload()
            //   }
            // })
          } else {
            EP.error(res.text);
          }
        }
      });
    },
    // 搜索关键字
    filterSearch: function(type, e) {
      if (type == "click") {
        location.href =
          "/trademark/jiaoyilists/?keyword=" + this.render.keyword;
      }
      if (type == "keyup") {
        if (e.keyCode == 13 && e.key == "Enter") {
          location.href =
            "/trademark/jiaoyilists/?keyword=" + this.render.keyword;
        }
      }
    },
    // 验证 输入的价格
    isNumber: function(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    locationHref: function() {
      // 需要提交的数据
      if (this.render.orderby && this.render.orderbyType) {
        window.location.href =
          "/trademark/jiaoyilists/?p1=" +
          this.render.priceStart +
          "&p2=" +
          this.render.priceEnd +
          "&type=" +
          this.render.tradeType +
          "&buytype=" +
          this.render.buyType +
          "&years=" +
          this.render.year +
          "&classes=" +
          this.render.classType.join(",") +
          "&keyword=" +
          encodeURIComponent(this.render.keyword) +
          "&extension=" +
          this.render.extension +
          "&orderby=" +
          this.render.orderby +
          "&orderbytype=" +
          this.render.orderbyType;
      } else {
        window.location.href =
          "/trademark/jiaoyilists/?p1=" +
          this.render.priceStart +
          "&p2=" +
          this.render.priceEnd +
          "&type=" +
          this.render.tradeType +
          "&buytype=" +
          this.render.buyType +
          "&years=" +
          this.render.year +
          "&classes=" +
          this.render.classType.join(",") +
          "&keyword=" +
          encodeURIComponent(this.render.keyword) +
          "&extension=" +
          this.render.extension;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../../style/css/base.less";
@import "../../../style/css/global.less";
@import "../../../style/less/mobile/domain/index.less";
</style>