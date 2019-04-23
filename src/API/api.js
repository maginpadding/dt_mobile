/**
 * DT_LIST            域名列表
 * DT_DETAIL          域名详情
 * DT_LIKE            猜你喜欢
 * DT_CONTACTS        域名模板
 * DT_PUBLISH_LIST    可发布域名
 * DT_PUBLISH         发布域名
 * LOGIN              登录
 * LOGIN_CHECK        检测登录状态
 */
const API = {
  "DT_LIST": "/apis/ymjy/dt/list",
  "DT_DETAIL": "/apis/ymjy/dt/info",
  "DT_LIKE": "/apis/ymjy/dt/mayLike",
  "DT_CONTACTS": "/apis/ymjy/domain/contacts",
  "DT_PUBLISH_LIST": "/apis/ymjy/publish/domains",
  "DT_PUBLISH": "/apis/ymjy/publish",
  "LOGIN": "/apis/login",
  "LOGIN_CHECK": "/apis?m=api&c=user&a=status&jsoncallback=?",
  "DT_CHECK": "/apis/ymjy/domain/checkAttribution"
}
module.exports = API;
