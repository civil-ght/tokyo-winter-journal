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
