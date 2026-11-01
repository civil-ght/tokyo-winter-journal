# 东京冬日旅行手册

静态旅行网页，直接打开 index.html 或启用 GitHub Pages。

行程为原计划摘要，班次、价格、营业待出行前确认。不含预订号、PIN 或账户。打卡只保存在浏览器。

本地预览：`python3 -m http.server 8765`。

## 详细版（2026-11-01）

- guide.js：五日详解、16个摄影建议、官方来源与核验范围。
- enhance.js：摄影筛选、小红书搜索入口、关键词复制和来源页。
- 搜索入口不是具体笔记推荐；搜索无法读取时，不编造笔记链接。
- 摄影站位与时间分配为编辑建议，未实地踩点。
- 不上传用户打卡，不新增个人资料。
- 只更新GitHub Pages版本，原Sites版本保留。

## 顶部路线地图（2026-11-01）

- route-map.js：独立SVG概略路线图，全程／市区切换，按天高亮和行程跳转。
- 不调用地图瓦片、定位、路由或付费API；点地名才打开Google地点搜索。
- 线条不是实际行车轨迹，地理位置概略、两个视图不同尺度；不用于导航。
- 设计参考：TREK（https://github.com/liketrek/TREK，15281 Star）和TRIP（https://github.com/itskovacs/trip，1957 Star），数值于2026-11-01经GitHub API核对。未复制代码或截图。
- 原始页面修改前备份在项目根目录outputs/tokyo-map-before-update。

## 逐站顺序图（v4）

- route-steps.js：5天共48个计划步骤，含时间、地点、注意事项与下一段交通。
- 默认展示每日编号顺序图，保留全程／市区位置示意；点编号、上一站／下一站查看对应信息。
- 顺序图不按地理坐标绘制，不代表已确认班次。箱根运营与河口湖天气替代顺序仍需当天判断。
- 日期选择与下方每日攻略同步；不新增定位、追踪或个人凭证。

## Google导航链接（v5）

- google-routes.js：按天步行串点、逐段公交/步行、当前站到下一站、复制全天顺序。
- 遵循Google Maps URLs格式，最多3个中间途经点；公共交通只传起终点，不生成全天驾车替代线。
- 不调用定位、付费API，不登录或修改Google账户；打开链接才把行程地点发送Google，非实时位置。
- 链接不指定未来出发时间，用户需在Google中调整旅行日期、时间，并核对地点匹配。
- 官方文档：https://developers.google.com/maps/documentation/urls/get-started 、 https://support.google.com/maps/answer/144339?hl=en 。
