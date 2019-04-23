const suffix = [{
    "id": "0",
    "value": "不限"
  },
  {
    "id": "1",
    "value": ".com"
  },
  {
    "id": "2",
    "value": ".cn"
  },
  {
    "id": "3",
    "value": ".com.cn"
  },
  {
    "id": "4",
    "value": ".cc"
  },
  {
    "id": "5",
    "value": ".net"
  },
  {
    "id": "6",
    "value": ".org"
  },
  {
    "id": "7",
    "value": ".info"
  },
  {
    "id": "8",
    "value": ".co"
  },
  {
    "id": "9",
    "value": ".asia"
  },
  {
    "id": "10",
    "value": ".tv"
  },
  {
    "id": "11",
    "value": ".mobi"
  },
  {
    "id": "12",
    "value": ".me"
  },
  {
    "id": "13",
    "value": ".biz"
  },
  {
    "id": "14",
    "value": ".net.cn"
  },
  {
    "id": "15",
    "value": ".org.cn"
  },
  {
    "id": "16",
    "value": ".wang"
  },
  {
    "id": "17",
    "value": ".vip"
  },
  {
    "id": "18",
    "value": ".store"
  },
  {
    "id": "19",
    "value": ".ltd"
  },
  {
    "id": "20",
    "value": ".shop"
  },
  {
    "id": "21",
    "value": ".news"
  },
  {
    "id": "22",
    "value": ".live"
  },
  {
    "id": "23",
    "value": ".中国"
  },
  {
    "id": "24",
    "value": ".公司"
  },
  {
    "id": "25",
    "value": ".网络"
  },
  {
    "id": "26",
    "value": ".study"
  },
  {
    "id": "27",
    "value": ".courses"
  },
  {
    "id": "28",
    "value": ".link"
  },
  {
    "id": "29",
    "value": ".audio"
  },
  {
    "id": "30",
    "value": ".game"
  },
  {
    "id": "31",
    "value": ".club"
  },
  {
    "id": "32",
    "value": ".group"
  },
  {
    "id": "33",
    "value": ".pub"
  },
  {
    "id": "34",
    "value": ".ws"
  },
  {
    "id": "35",
    "value": ".vc"
  }
]
const assort = [{
    "id": "0",
    "value": "不限"
  },
  {
    "id": "1",
    "value": "纯数字",
    "data": [{
      "id": "0",
      "value": ""
    }, {
      "id": "20",
      "value": "含AA"
    }, {
      "id": "21",
      "value": "含AAA"
    }, {
      "id": "22",
      "value": "含AAAA"
    }, {
      "id": "23",
      "value": "含AAAAA"
    }, {
      "id": "24",
      "value": "含AAAAAA"
    }, {
      "id": "25",
      "value": "含AABB"
    }, {
      "id": "26",
      "value": "含AAABBB"
    }, {
      "id": "27",
      "value": "含ABAB"
    }, {
      "id": "28",
      "value": "含ABABAB"
    }]
  },
  {
    "id": "2",
    "value": "单数字"
  },
  {
    "id": "3",
    "value": "双数字"
  },
  {
    "id": "4",
    "value": "三数字",
    "data": [{
      "id": "101",
      "value": "无4非0开"
    }, {
      "id": "102",
      "value": "无04"
    }, {
      "id": "103",
      "value": "无04且8开"
    }, {
      "id": "104",
      "value": "无04且8尾"
    }, {
      "id": "105",
      "value": "无04且88开"
    }, {
      "id": "106",
      "value": "无04且88尾"
    }, {
      "id": "107",
      "value": "无04且8开8尾"
    }, {
      "id": "307",
      "value": "AAA"
    }, {
      "id": "308",
      "value": "ABA"
    }, {
      "id": "309",
      "value": "ABB"
    }, {
      "id": "310",
      "value": "AAB"
    }]
  },
  {
    "id": "5",
    "value": "四数字",
    "data": [{
      "id": "101",
      "value": "无4非0开"
    }, {
      "id": "102",
      "value": "无04"
    }, {
      "id": "103",
      "value": "无04且8开"
    }, {
      "id": "104",
      "value": "无04且8尾"
    }, {
      "id": "105",
      "value": "无04且88开"
    }, {
      "id": "106",
      "value": "无04且88尾"
    }, {
      "id": "107",
      "value": "无04且8开8尾"
    }, {
      "id": "401",
      "value": "AAAA"
    }, {
      "id": "402",
      "value": "AAAB"
    }, {
      "id": "403",
      "value": "AABB"
    }, {
      "id": "404",
      "value": "ABBB"
    }, {
      "id": "405",
      "value": "ABAB"
    }, {
      "id": "406",
      "value": "ABBA"
    }, {
      "id": "407",
      "value": "ABAA"
    }, {
      "id": "408",
      "value": "AABA"
    }, {
      "id": "409",
      "value": "AABC"
    }, {
      "id": "410",
      "value": "ABBC"
    }, {
      "id": "411",
      "value": "ABCC"
    }, {
      "id": "412",
      "value": "ABAC"
    }, {
      "id": "413",
      "value": "ABCB"
    }, {
      "id": "414",
      "value": "ABCA"
    }]
  },
  {
    "id": "6",
    "value": "五数字",
    "data": [{
      "id": "101",
      "value": "无4非0开"
    }, {
      "id": "102",
      "value": "无04"
    }, {
      "id": "103",
      "value": "无04且8开"
    }, {
      "id": "104",
      "value": "无04且8尾"
    }, {
      "id": "105",
      "value": "无04且88开"
    }, {
      "id": "106",
      "value": "无04且88尾"
    }, {
      "id": "107",
      "value": "无04且8开8尾"
    }, {
      "id": "501",
      "value": "AAAAA"
    }, {
      "id": "502",
      "value": "AAAAB"
    }, {
      "id": "503",
      "value": "ABBBB"
    }, {
      "id": "504",
      "value": "AAABB"
    }, {
      "id": "505",
      "value": "AABBB"
    }, {
      "id": "506",
      "value": "AABBA"
    }, {
      "id": "507",
      "value": "ABBAA"
    }, {
      "id": "508",
      "value": "AABAA"
    }, {
      "id": "509",
      "value": "ABBBA"
    }, {
      "id": "510",
      "value": "ABABA"
    }, {
      "id": "511",
      "value": "AAABA"
    }, {
      "id": "512",
      "value": "ABAAA"
    }, {
      "id": "513",
      "value": "AABAB"
    }, {
      "id": "514",
      "value": "ABAAB"
    }, {
      "id": "515",
      "value": "ABABB"
    }, {
      "id": "516",
      "value": "ABBAB"
    }, {
      "id": "517",
      "value": "AAABC"
    }, {
      "id": "518",
      "value": "ABBBC"
    }, {
      "id": "519",
      "value": "ABCCC"
    }, {
      "id": "520",
      "value": "AABBC"
    }, {
      "id": "521",
      "value": "ABBCC"
    }, {
      "id": "522",
      "value": "AABCC"
    }, {
      "id": "523",
      "value": "ABCBA"
    }, {
      "id": "524",
      "value": "AABAC"
    }, {
      "id": "525",
      "value": "AABCA"
    }, {
      "id": "526",
      "value": "AABCB"
    }, {
      "id": "527",
      "value": "ABACC"
    }, {
      "id": "528",
      "value": "ABCAA"
    }, {
      "id": "529",
      "value": "ABCBB"
    }, {
      "id": "530",
      "value": "ABAAC"
    }, {
      "id": "531",
      "value": "ABBAC"
    }, {
      "id": "532",
      "value": "ABBCA"
    }, {
      "id": "533",
      "value": "ABBCB"
    }, {
      "id": "534",
      "value": "ABCCA"
    }, {
      "id": "535",
      "value": "ABCCB"
    }, {
      "id": "536",
      "value": "ABABC"
    }, {
      "id": "537",
      "value": "ABACA"
    }, {
      "id": "538",
      "value": "ABACB"
    }, {
      "id": "539",
      "value": "ABCAB"
    }, {
      "id": "540",
      "value": "ABCAC"
    }, {
      "id": "541",
      "value": "ABCBC"
    }]
  },
  {
    "id": "32",
    "value": "六数字",
    "data": [{
      "id": "101",
      "value": "无4非0开"
    }, {
      "id": "102",
      "value": "无04"
    }, {
      "id": "103",
      "value": "无04且8开"
    }, {
      "id": "104",
      "value": "无04且8尾"
    }, {
      "id": "105",
      "value": "无04且88开"
    }, {
      "id": "106",
      "value": "无04且88尾"
    }, {
      "id": "107",
      "value": "无04且8开8尾"
    }, {
      "id": "601",
      "value": "AAAAAA"
    }, {
      "id": "602",
      "value": "AAAAAB"
    }, {
      "id": "603",
      "value": "ABBBBB"
    }, {
      "id": "604",
      "value": "AAAABB"
    }, {
      "id": "605",
      "value": "AABBBB"
    }, {
      "id": "606",
      "value": "ABBBBA"
    }, {
      "id": "607",
      "value": "ABAAAA"
    }, {
      "id": "608",
      "value": "AAABBB"
    }, {
      "id": "640",
      "value": "AAAABA"
    }, {
      "id": "641",
      "value": "AAABBA"
    }, {
      "id": "609",
      "value": "AABBAA"
    }, {
      "id": "610",
      "value": "AABAAB"
    }, {
      "id": "611",
      "value": "ABBABB"
    }, {
      "id": "612",
      "value": "ABAABA"
    }, {
      "id": "613",
      "value": "ABABAB"
    }, {
      "id": "614",
      "value": "AAABAA"
    }, {
      "id": "615",
      "value": "AAABAB"
    }, {
      "id": "616",
      "value": "AABAAA"
    }, {
      "id": "617",
      "value": "AABBBA"
    }, {
      "id": "618",
      "value": "ABAAAB"
    }, {
      "id": "619",
      "value": "ABABBB"
    }, {
      "id": "620",
      "value": "ABBAAA"
    }, {
      "id": "621",
      "value": "ABBBAA"
    }, {
      "id": "622",
      "value": "ABBBAB"
    }, {
      "id": "623",
      "value": "AABABA"
    }, {
      "id": "624",
      "value": "AABABB"
    }, {
      "id": "625",
      "value": "AABBAB"
    }, {
      "id": "626",
      "value": "ABAABB"
    }, {
      "id": "627",
      "value": "ABABAA"
    }, {
      "id": "628",
      "value": "ABABBA"
    }, {
      "id": "629",
      "value": "ABBAAB"
    }, {
      "id": "630",
      "value": "ABBABA"
    }, {
      "id": "631",
      "value": "AAAABC"
    }, {
      "id": "632",
      "value": "ABBBBC"
    }, {
      "id": "633",
      "value": "ABCCCC"
    }, {
      "id": "634",
      "value": "AAABBC"
    }, {
      "id": "635",
      "value": "AABBBC"
    }, {
      "id": "636",
      "value": "ABBCCC"
    }, {
      "id": "637",
      "value": "AABBCC"
    }, {
      "id": "638",
      "value": "ABCCBA"
    }, {
      "id": "639",
      "value": "ABCABC"
    }]
  },
  {
    "id": "49",
    "value": "七数字",
    "data": [{
      "id": "101",
      "value": "无4非0开"
    }, {
      "id": "102",
      "value": "无04"
    }, {
      "id": "103",
      "value": "无04且8开"
    }, {
      "id": "104",
      "value": "无04且8尾"
    }, {
      "id": "105",
      "value": "无04且88开"
    }, {
      "id": "106",
      "value": "无04且88尾"
    }, {
      "id": "107",
      "value": "无04且8开8尾"
    }]
  },
  {
    "id": "50",
    "value": "八数字",
    "data": [{
      "id": "101",
      "value": "无4非0开"
    }, {
      "id": "102",
      "value": "无04"
    }, {
      "id": "103",
      "value": "无04且8开"
    }, {
      "id": "104",
      "value": "无04且8尾"
    }, {
      "id": "105",
      "value": "无04且88开"
    }, {
      "id": "106",
      "value": "无04且88尾"
    }, {
      "id": "107",
      "value": "无04且8开8尾"
    }, {
      "id": "801",
      "value": "AAAAAAAA"
    }, {
      "id": "802",
      "value": "AAAAAAAB"
    }, {
      "id": "803",
      "value": "AAAAAABB"
    }, {
      "id": "804",
      "value": "AAAAABBB"
    }, {
      "id": "805",
      "value": "AAAABBBB"
    }, {
      "id": "806",
      "value": "AAABBBBB"
    }, {
      "id": "807",
      "value": "AABBBBBB"
    }, {
      "id": "808",
      "value": "ABBBBBBB"
    }, {
      "id": "809",
      "value": "AAAABBCC"
    }, {
      "id": "810",
      "value": "AABBBBCC"
    }, {
      "id": "811",
      "value": "AABBCCCC"
    }, {
      "id": "812",
      "value": "AABBCCDD"
    }]
  },
  {
    "id": "51",
    "value": "九数字",
    "data": [{
      "id": "101",
      "value": "无4非0开"
    }, {
      "id": "102",
      "value": "无04"
    }, {
      "id": "103",
      "value": "无04且8开"
    }, {
      "id": "104",
      "value": "无04且8尾"
    }, {
      "id": "105",
      "value": "无04且88开"
    }, {
      "id": "106",
      "value": "无04且88尾"
    }, {
      "id": "107",
      "value": "无04且8开8尾"
    }]
  },
  {
    "id": "7",
    "value": "纯字母"
  },
  {
    "id": "8",
    "value": "单字母"
  },
  {
    "id": "9",
    "value": "双字母"
  },
  {
    "id": "10",
    "value": "三字母",
    "data": [{
      "id": "0",
      "value": ""
    }, {
      "id": "32",
      "value": "声母"
    }, {
      "id": "99",
      "value": "非声母"
    }, {
      "id": "3001",
      "value": "AAA"
    }, {
      "id": "3002",
      "value": "AAB"
    }, {
      "id": "3003",
      "value": "ABB"
    }, {
      "id": "3004",
      "value": "ABA"
    }]
  },
  {
    "id": "11",
    "value": "四字母",
    "data": [{
      "id": "0",
      "value": ""
    }, {
      "id": "32",
      "value": "声母"
    }, {
      "id": "41",
      "value": "省市开声母"
    }, {
      "id": "99",
      "value": "非声母"
    }, {
      "id": "42",
      "value": "CVCV"
    }, {
      "id": "4001",
      "value": "AAAA"
    }, {
      "id": "4002",
      "value": "AAAB"
    }, {
      "id": "4003",
      "value": "AABB"
    }, {
      "id": "4004",
      "value": "ABBB"
    }, {
      "id": "4005",
      "value": "ABAB"
    }, {
      "id": "4006",
      "value": "ABBA"
    }, {
      "id": "4007",
      "value": "ABAA"
    }, {
      "id": "4008",
      "value": "AABA"
    }]
  },
  {
    "id": "12",
    "value": "五字母",
    "data": [{
      "id": "32",
      "value": "声母"
    }, {
      "id": "51",
      "value": "省市开声母"
    }, {
      "id": "52",
      "value": "w结尾声母"
    }, {
      "id": "99",
      "value": "非声母"
    }, {
      "id": "5001",
      "value": "AAAAA"
    }, {
      "id": "5002",
      "value": "AAAAB"
    }, {
      "id": "5003",
      "value": "ABBBB"
    }, {
      "id": "5004",
      "value": "AAABB"
    }, {
      "id": "5005",
      "value": "AABBB"
    }, {
      "id": "5006",
      "value": "AABBA"
    }, {
      "id": "5007",
      "value": "ABBAA"
    }, {
      "id": "5008",
      "value": "AABAA"
    }, {
      "id": "5009",
      "value": "ABBBA"
    }, {
      "id": "5010",
      "value": "ABABA"
    }, {
      "id": "5011",
      "value": "AAABA"
    }, {
      "id": "5012",
      "value": "ABAAA"
    }, {
      "id": "5013",
      "value": "AABAB"
    }, {
      "id": "5014",
      "value": "ABAAB"
    }, {
      "id": "5015",
      "value": "ABABB"
    }, {
      "id": "5016",
      "value": "ABBAB"
    }, {
      "id": "5017",
      "value": "AAABC"
    }, {
      "id": "5018",
      "value": "ABBBC"
    }, {
      "id": "5019",
      "value": "ABCCC"
    }, {
      "id": "5020",
      "value": "AABBC"
    }, {
      "id": "5021",
      "value": "ABBCC"
    }, {
      "id": "5022",
      "value": "AABCC"
    }, {
      "id": "5023",
      "value": "ABCBA"
    }, {
      "id": "5024",
      "value": "AABAC"
    }, {
      "id": "5025",
      "value": "AABCA"
    }, {
      "id": "5026",
      "value": "AABCB"
    }, {
      "id": "5027",
      "value": "ABACC"
    }, {
      "id": "5028",
      "value": "ABCAA"
    }, {
      "id": "5029",
      "value": "ABCBB"
    }, {
      "id": "5030",
      "value": "ABAAC"
    }, {
      "id": "5031",
      "value": "ABBAC"
    }, {
      "id": "5032",
      "value": "ABBCA"
    }, {
      "id": "5033",
      "value": "ABBCB"
    }, {
      "id": "5034",
      "value": "ABCCA"
    }, {
      "id": "5035",
      "value": "ABCCB"
    }, {
      "id": "5036",
      "value": "ABABC"
    }, {
      "id": "5037",
      "value": "ABACA"
    }, {
      "id": "5038",
      "value": "ABACB"
    }, {
      "id": "5039",
      "value": "ABCAB"
    }, {
      "id": "5040",
      "value": "ABCAC"
    }, {
      "id": "5041",
      "value": "ABCBC"
    }]
  },
  {
    "id": "16",
    "value": "单拼"
  },
  {
    "id": "17",
    "value": "双拼"
  },
  {
    "id": "18",
    "value": "三拼"
  },
  {
    "id": "60",
    "value": "叠拼"
  },
  {
    "id": "13",
    "value": "杂米"
  },
  {
    "id": "14",
    "value": "两杂"
  },
  {
    "id": "15",
    "value": "三杂",
    "data": [{
      "id": "301",
      "value": "NNL"
    }, {
      "id": "302",
      "value": "LNN"
    }, {
      "id": "303",
      "value": "LLN"
    }, {
      "id": "304",
      "value": "NLL"
    }, {
      "id": "305",
      "value": "LNL"
    }, {
      "id": "306",
      "value": "NLN"
    }]
  },
  {
    "id": "19",
    "value": "中文"
  }
]
const expireTime = [{
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
]
const source = [{
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
]
const endTime = [{
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
]
const saleType= [
  {
    id: "0",
    value: "所有类型"
  },
  {
    id: "2",
    value: "一口价"
  }
]
const switchs=[
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
]
module.exports = {
  suffix: suffix,
  assort: assort,
  expireTime: expireTime,
  source: source,
  endTime: endTime,
  saleType:saleType,
  switchs:switchs
}
