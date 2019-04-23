const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码
const result = true // 返回的状态码

// 随机生成文章数据
const postData = req => {


  let list = [] // 用于存放文章数据的数组

  for (let i = 0; i < 10; i++) {
    let data = {
      name: Random.cname(), // 随机生成域名
      introduction: Random.csentence(10, 25),
      source_name: Random.csentence(10, 25), // 随机生成长度为10-25的标题
      sale_type_name: "一口价",
      init_price: Random.cname(), // 随机生成价格
      remaining_time: Random.date() + ' ' + Random.time(), // 随机生成年月日 + 时间
      expire_day: Random.date() + ' ' + Random.time(), // 随机生成年月日 + 时间
    }
    list.push(data)
  }
  // 返回状态码和文章数据posts
  return {
    result: true,
    code,
    data:{
        list,
        curPage:1,
        total:10,
    },
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/posts`, 'get', postData);
