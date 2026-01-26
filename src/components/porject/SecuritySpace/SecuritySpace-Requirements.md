# 安保系统可视化页面交互需求文档

## 项目概述

基于《秩序正在运行》故事线，构建沉浸式安保系统可视化体验页面。通过叙事化的交互设计，将复杂的安保系统功能转化为可感知的"秩序运行过程"。

---

## 核心设计理念

### 1. 叙事驱动交互
- 不展示功能列表，而是讲述"秩序如何运行"的故事
- 每个章节对应系统的一个运行阶段
- 用户通过滚动体验完整的系统生命周期

### 2. 视觉语言系统（多元素交互）

#### 基础元素定义
- **网格（Grid）**：秩序的基础框架，代表系统架构
- **点（Dots）**：数据节点、人员、事件的抽象表达
- **线（Lines）**：连接关系、数据流动、指令传递
- **面（Planes）**：区域边界、项目空间、风险范围
- **粒子（Particles）**：动态数据流、系统活力、异常信号
- **波纹（Waves）**：事件扩散、影响范围、时间推进
- **光束（Beams）**：扫描、巡检、聚焦注意力

#### 元素组合策略
每个章节使用2-3种元素组合，形成独特的视觉特征

### 3. 情绪节奏设计
```
平静 → 建立 → 活跃 → 验证 → 紧张 → 警报 → 干预 → 修复 → 回馈 → 沉淀
```

---

## 交互需求详解

### 一、滚动交互系统

#### 1.1 滚动进度映射
```javascript
// 滚动进度与章节的精确映射
scrollProgress: 0-9%   → 序章
scrollProgress: 10-18% → 第一幕
scrollProgress: 19-27% → 第二幕
...
scrollProgress: 91-100% → 尾声
```

#### 1.2 滚动体验优化
- **平滑过渡**：章节切换时粒子系统渐变（1-1.5秒）
- **视差效果**：文字层与粒子层不同速度移动
- **锚点定位**：支持点击侧边导航直接跳转到对应章节
- **滚动提示**：首屏显示向下滚动提示（3秒后淡出）

### 二、粒子场交互

#### 2.1 章节视觉元素组合

| 章节 | 主元素 | 辅助元素 | 视觉特征 | 交互行为 | 颜色 |
|------|--------|----------|----------|----------|------|
| **序章·系统苏醒** | 网格 | 点 | 网格线条从中心向外扩展，交叉点缓慢闪烁 | 鼠标移动时网格扭曲变形 | #1e293b |
| **第一幕·空间确立** | 面 | 线 | 多个半透明多边形区域浮现，边界线条清晰 | 悬停区域高亮，显示项目信息 | #059669 |
| **第二幕·人员进入** | 点 | 线 | 光点从边缘进入，自动连接形成网络 | 点击光点显示人员信息，连线动态生长 | #3b82f6 |
| **第三幕·时间推动** | 波纹 | 粒子 | 横向时间轴，定期发出同心圆波纹 | 滚动触发波纹，粒子随波纹流动 | #6366f1 |
| **第四幕·系统自检** | 光束 | 网格 | 扫描光束横向移动，照亮网格节点 | 光束跟随鼠标，照亮区域显示检查状态 | #06b6d4 |
| **第五幕·异常浮现** | 粒子 | 面 | 粒子在区域边界抖动，面开始变形 | 鼠标靠近时粒子加速逃离 | #f59e0b |
| **第六幕·警报触发** | 波纹 | 粒子 | 中心爆发式波纹扩散，粒子四散 | 点击任意位置触发新的警报波纹 | #ef4444 |
| **第七幕·指挥介入** | 线 | 点 | 从中心发出指令线条，连接各个节点 | 线条跟随鼠标绘制，点击节点发送指令 | #8b5cf6 |
| **第八幕·秩序修复** | 线 | 面 | 线条重新连接，破碎的面逐渐愈合 | 悬停显示修复轨迹，面的透明度恢复 | #10b981 |
| **第九幕·能量回流** | 粒子 | 线 | 粒子沿线条向节点汇聚，节点发光 | 粒子跟随鼠标路径流动 | #facc15 |
| **第十幕·系统沉淀** | 网格 | 点 | 网格呼吸式缩放，点位稳定闪烁 | 整体缓慢旋转，鼠标移动产生轻微涟漪 | #475569 |

#### 2.2 详细元素交互设计

##### A. 网格（Grid）交互
```javascript
// 序章、第十幕使用
Grid: {
  结构: "六边形/正方形网格，线宽1px"
  动画: {
    生成: "从中心向外逐格绘制（0.05s/格）"
    呼吸: "整体透明度 0.1 ↔ 0.3 循环（3s）"
    扭曲: "鼠标移动时，周围网格节点偏移（150px影响半径）"
  }
  交互: {
    hover: "悬停网格交叉点，显示坐标信息"
    click: "点击交叉点，从该点发出涟漪"
  }
  性能: "仅绘制视口内网格，超出部分裁剪"
}
```

##### B. 点（Dots）交互
```javascript
// 第二幕、第七幕、第十幕使用
Dots: {
  类型: {
    人员节点: "实心圆，半径4-8px，带光晕"
    数据节点: "空心圆，半径2-4px"
    事件节点: "闪烁圆，半径6-12px"
  }
  动画: {
    进入: "从边缘淡入 + 缩放（0.8→1.0）"
    连接: "自动寻找最近3个节点连线"
    脉冲: "周期性放大缩小（1.0→1.2→1.0，2s）"
  }
  交互: {
    hover: "放大1.5倍 + 显示信息卡片 + 高亮所有连线"
    click: "触发连接动画，向周围节点发送信号波"
    drag: "可拖拽节点，连线实时跟随"
  }
  状态: {
    正常: "蓝色稳定"
    警告: "橙色闪烁"
    异常: "红色快速闪烁"
  }
}
```

##### C. 线（Lines）交互
```javascript
// 第二幕、第七幕、第八幕使用
Lines: {
  类型: {
    连接线: "实线，连接两个节点"
    数据流线: "虚线 + 流动粒子"
    指令线: "渐变线 + 箭头"
  }
  动画: {
    生长: "从起点到终点绘制（0.3s）"
    流动: "沿线条移动的光点（速度可变）"
    消失: "从两端向中心收缩"
  }
  交互: {
    hover: "线条加粗 + 显示数据流量/指令内容"
    click: "触发数据包动画，沿线条传输"
  }
  样式: {
    正常: "细线（1px），透明度50%"
    激活: "粗线（3px），透明度100%，带光晕"
    断开: "虚线闪烁，红色"
  }
}
```

##### D. 面（Planes）交互
```javascript
// 第一幕、第五幕、第八幕使用
Planes: {
  形状: "不规则多边形（4-8边），代表项目区域"
  动画: {
    浮现: "从中心点扩展成多边形（0.8s）"
    呼吸: "边界线条明暗变化"
    变形: "顶点位置缓慢漂移（Perlin噪声）"
    破碎: "异常时边界断裂，碎片飘散"
    愈合: "修复时碎片归位，边界重连"
  }
  交互: {
    hover: "区域高亮 + 显示项目名称/状态"
    click: "展开详细信息 + 区域放大"
    drag: "可拖拽调整区域位置"
  }
  层次: {
    背景层: "填充色，透明度5-10%"
    边界层: "描边，透明度30-50%"
    高亮层: "悬停时，透明度提升到20%"
  }
}
```

##### E. 波纹（Waves）交互
```javascript
// 第三幕、第六幕使用
Waves: {
  类型: {
    时间波: "横向推进的波纹，代表时间流逝"
    事件波: "同心圆扩散，代表事件影响"
    警报波: "快速扩散 + 闪烁边缘"
  }
  动画: {
    扩散: "从中心向外，半径增长（速度可变）"
    衰减: "透明度随半径增大而降低"
    叠加: "多个波纹相遇时产生干涉图案"
  }
  交互: {
    click: "点击任意位置触发新波纹"
    scroll: "滚动触发时间波推进"
  }
  参数: {
    正常: "扩散速度200px/s，透明度0.3→0"
    警报: "扩散速度800px/s，透明度0.8→0，红色"
  }
}
```

##### F. 光束（Beams）交互
```javascript
// 第四幕使用
Beams: {
  形状: "渐变矩形光带，宽度50-100px"
  动画: {
    扫描: "从左到右匀速移动（5s/次）"
    聚焦: "光束收窄并加速移动到目标"
    照亮: "扫过的区域短暂高亮（0.5s残留）"
  }
  交互: {
    mouseMove: "光束跟随鼠标X轴位置"
    hover节点: "光束自动聚焦到该节点"
  }
  效果: {
    光晕: "边缘模糊（blur 20px）"
    粒子: "光束内部有细小粒子流动"
  }
}
```

##### G. 粒子（Particles）增强
```javascript
// 所有章节辅助使用
Particles: {
  类型: {
    环境粒子: "背景装饰，缓慢漂移"
    数据粒子: "沿线条流动"
    异常粒子: "快速抖动，颜色异常"
    能量粒子: "向节点汇聚"
  }
  交互: {
    鼠标排斥: "距离<100px时被推开"
    鼠标吸引: "按住Shift时被吸引"
    点击爆发: "点击位置粒子四散"
  }
  物理: {
    重力: "可选向下微弱重力"
    碰撞: "粒子间轻微排斥"
    边界: "碰到边缘反弹"
  }
}
```

### 三、侧边导航交互

#### 3.1 进度指示器
- **当前章节**：白色长线（48px）+ 章节名称显示
- **其他章节**：灰色短线（16px）+ 透明度20%
- **已完成章节**：渐变色标记
- **悬停效果**：显示完整章节标题

#### 3.2 点击跳转
```javascript
onClick: {
  - 平滑滚动到目标章节（duration: 1.2s, easing: easeInOutCubic）
  - 粒子场提前0.3秒开始过渡
  - 目标章节文字淡入动画
}
```

### 四、章节内容交互

#### 4.1 文字动画
```javascript
// 进入视口时触发
animation: {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' }
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
  duration: 1s
  easing: easeOut
}

// 视口触发区域
viewport: {
  margin: "-20% 0px -20% 0px"  // 提前触发
}
```

#### 4.2 功能标签交互
```javascript
// 功能标签悬停
onHover: {
  - 下划线加粗
  - 颜色从40%透明度变为80%
  - 显示功能详细说明（Tooltip）
  - 周围粒子聚集形成"数据流"
}

// 点击标签
onClick: {
  - 展开该功能的详细信息卡片
  - 或跳转到功能演示页面
}
```

### 五、特殊章节交互

#### 5.1 序章（系统苏醒）
```javascript
元素组合: 网格 + 点
特殊效果: {
  0-2s: "黑屏，中心出现第一个光点"
  2-4s: "网格从中心向外扩展，每条线0.05s"
  4-6s: "网格交叉点逐个点亮"
  6s+: "进入呼吸状态，等待用户滚动"
}
交互: {
  鼠标移动: "网格扭曲变形，形成空间感"
  点击网格: "从点击位置发出涟漪"
}
```

#### 5.2 第一幕（空间被确立）
```javascript
元素组合: 面 + 线
特殊效果: {
  进入: "3-5个多边形区域从小到大浮现"
  状态: "区域缓慢漂移，保持间距"
  边界: "边界线条流光效果"
}
交互: {
  hover区域: "高亮 + 显示项目信息卡片"
  click区域: "区域放大到全屏，展示详情"
  drag区域: "可拖拽调整位置"
}
```

#### 5.3 第二幕（人员进入系统）
```javascript
元素组合: 点 + 线
特殊效果: {
  进入: "光点从四周边缘进入"
  连接: "自动寻找最近节点连线"
  网络: "形成动态人员关系网络"
}
交互: {
  hover节点: "放大 + 显示人员信息 + 高亮所有连线"
  click节点: "发送信号波到连接的节点"
  drag节点: "拖拽重新布局，连线实时跟随"
}
数据映射: {
  节点大小: "代表人员权限/重要性"
  连线粗细: "代表协作频率"
  节点颜色: "代表部门/角色"
}
```

#### 5.4 第三幕（时间开始推动一切）
```javascript
元素组合: 波纹 + 粒子
特殊效果: {
  时间轴: "横向时间线从左到右推进"
  波纹: "每隔2s从时间轴发出横向波纹"
  粒子: "随波纹流动，代表打卡事件"
}
交互: {
  scroll: "滚动触发波纹加速"
  click时间轴: "在点击位置触发波纹"
  hover粒子: "显示打卡时间/人员信息"
}
```

#### 5.5 第四幕（系统自检）
```javascript
元素组合: 光束 + 网格
特殊效果: {
  扫描: "光束从左到右扫描"
  照亮: "扫过的网格节点短暂高亮"
  检测: "发现异常节点时光束停顿并聚焦"
}
交互: {
  mouseMove: "光束跟随鼠标X轴"
  hover节点: "光束自动聚焦，显示检查结果"
  click: "手动触发扫描"
}
```

#### 5.6 第五幕（异常开始浮现）
```javascript
元素组合: 粒子 + 面
特殊效果: {
  区域: "项目区域边界开始抖动"
  粒子: "异常粒子在边界聚集"
  变形: "区域形状开始不规则变化"
}
交互: {
  鼠标靠近: "粒子加速逃离"
  hover区域: "显示异常详情"
  click: "触发预警动画"
}
```

#### 5.7 第六幕（警报触发）
```javascript
元素组合: 波纹 + 粒子
特殊效果: {
  爆发: "中心点爆发式波纹扩散"
  闪烁: "屏幕边缘红色闪烁（0.3s间隔）"
  粒子: "粒子四散，速度极快"
  震动: "移动端触发震动反馈"
}
交互: {
  click任意位置: "触发新的警报波纹"
  多次点击: "波纹叠加产生干涉图案"
}
音效: "警报声（可选）"
```

#### 5.8 第七幕（指挥介入）
```javascript
元素组合: 线 + 点
特殊效果: {
  指令线: "从中心发出多条指令线"
  连接: "线条连接到各个节点"
  信号: "沿线条传输指令信号"
}
交互: {
  click节点: "发送指令到该节点"
  线条动画: "指令沿线条传输，到达后节点闪烁"
  hover线条: "显示指令内容"
}
```

#### 5.9 第八幕（秩序修复中）
```javascript
元素组合: 线 + 面
特殊效果: {
  重连: "断开的线条重新连接"
  愈合: "破碎的区域边界逐渐愈合"
  轨迹: "修复路径留下淡淡轨迹"
}
交互: {
  hover: "显示修复进度"
  click: "加速修复动画"
}
```

#### 5.10 第九幕（能量回流）
```javascript
元素组合: 粒子 + 线
特殊效果: {
  回流: "粒子沿线条向节点汇聚"
  充能: "节点接收粒子后发光增强"
  循环: "形成能量循环流动"
}
交互: {
  mouseMove: "粒子跟随鼠标路径流动"
  click节点: "触发能量爆发，向外发送粒子"
}
```

#### 5.11 第十幕（系统沉淀）
```javascript
元素组合: 网格 + 点
特殊效果: {
  呼吸: "网格整体缩放（0.95↔1.05，5s）"
  旋转: "整体缓慢旋转（0.1°/s）"
  稳定: "节点稳定闪烁"
}
交互: {
  mouseMove: "产生轻微涟漪"
  静止3s: "自动进入深度呼吸模式"
}
```

#### 5.12 尾声（秩序仍在运行）
```javascript
元素组合: 所有元素融合
特殊效果: {
  汇聚: "所有元素向中心汇聚"
  文字: "ORDER ACTIVE 呼吸动画"
  按钮: "进入系统按钮周围粒子环绕"
}
交互: {
  hover按钮: "粒子聚集形成光环"
  click按钮: {
    1. "所有元素向中心收束（1s）"
    2. "白屏过渡（0.5s）"
    3. "跳转到系统主页"
  }
}
```

### 六、响应式交互适配

#### 6.1 移动端优化
```javascript
mobile: {
  - 粒子数量减半（性能优化）
  - 侧边导航改为底部进度条
  - 文字大小自适应（4xl → 2xl）
  - 触摸滑动优化（防止误触）
  - 禁用鼠标跟随效果
}
```

#### 6.2 平板端适配
```javascript
tablet: {
  - 保持完整粒子效果
  - 侧边导航缩小但保留
  - 支持触摸和鼠标双模式
}
```

### 七、性能优化需求

#### 7.1 Canvas优化
- 使用`requestAnimationFrame`控制帧率
- 粒子超出视口时停止计算
- 章节切换时复用粒子对象
- 低性能设备自动降级（减少粒子数）

#### 7.2 懒加载策略
- 章节内容进入视口前0.5屏开始加载
- 图片/资源按需加载
- 音效文件预加载（可选）

### 八、可访问性需求

#### 8.1 键盘导航
```javascript
keyboard: {
  ArrowDown/Space: 滚动到下一章节
  ArrowUp: 滚动到上一章节
  Home: 返回序章
  End: 跳转到尾声
  1-9: 直接跳转到对应章节
}
```

#### 8.2 屏幕阅读器支持
- 为每个章节添加`aria-label`
- 粒子场添加`aria-hidden="true"`
- 提供"跳过动画"选项

### 九、数据埋点需求

```javascript
tracking: {
  - 用户滚动到每个章节的时间戳
  - 章节停留时长
  - 侧边导航点击率
  - 功能标签点击率
  - "进入系统"按钮转化率
  - 页面完整浏览率
}
```

---

## 技术实现建议

### 技术栈
- **框架**：React 18 + Framer Motion
- **Canvas**：原生Canvas API（多层Canvas架构）
- **滚动**：Framer Motion `useScroll`
- **样式**：Tailwind CSS + 自定义动画
- **几何计算**：自定义工具函数（向量、碰撞检测）

### Canvas分层架构
```javascript
Canvas层级设计: {
  Layer 1 (背景层): "网格、面，低频更新（30fps）"
  Layer 2 (元素层): "点、线，中频更新（60fps）"
  Layer 3 (粒子层): "粒子、波纹，高频更新（60fps）"
  Layer 4 (交互层): "鼠标效果、临时动画，按需更新"
}

优势: {
  - 分层渲染，避免全局重绘
  - 静态元素缓存，减少计算
  - 独立控制每层帧率
}
```

### 核心类设计

#### 1. 网格系统
```javascript
class GridSystem {
  constructor(type, size, color) {
    this.type = type; // 'hex' | 'square'
    this.size = size;
    this.nodes = [];
    this.distortionMap = new Map();
  }
  
  generate() {
    // 生成网格节点坐标
  }
  
  distort(mouseX, mouseY, radius) {
    // 鼠标影响下的网格扭曲
  }
  
  draw(ctx) {
    // 绘制网格
  }
}
```

#### 2. 节点系统
```javascript
class Node {
  constructor(x, y, type, data) {
    this.x = x;
    this.y = y;
    this.type = type; // 'person' | 'data' | 'event'
    this.connections = [];
    this.state = 'normal'; // 'normal' | 'warning' | 'error'
  }
  
  connect(targetNode) {
    // 创建连接线
  }
  
  sendSignal(targetNode) {
    // 发送信号动画
  }
  
  update(deltaTime) {
    // 更新节点状态
  }
}
```

#### 3. 区域系统
```javascript
class Zone {
  constructor(vertices, color, data) {
    this.vertices = vertices; // 多边形顶点
    this.originalVertices = [...vertices];
    this.color = color;
    this.state = 'stable'; // 'stable' | 'distorted' | 'broken'
  }
  
  morph(noiseOffset) {
    // Perlin噪声驱动的形变
  }
  
  break() {
    // 破碎动画
  }
  
  heal() {
    // 愈合动画
  }
  
  contains(x, y) {
    // 点是否在区域内（射线法）
  }
}
```

#### 4. 波纹系统
```javascript
class Wave {
  constructor(x, y, type, speed) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 1000;
    this.speed = speed;
    this.opacity = 1;
  }
  
  update(deltaTime) {
    this.radius += this.speed * deltaTime;
    this.opacity = 1 - (this.radius / this.maxRadius);
  }
  
  draw(ctx) {
    // 绘制同心圆波纹
  }
  
  isFinished() {
    return this.radius >= this.maxRadius;
  }
}
```

#### 5. 光束系统
```javascript
class Beam {
  constructor(width, color) {
    this.x = 0;
    this.width = width;
    this.targetX = null;
    this.speed = 200; // px/s
  }
  
  scan() {
    // 自动扫描动画
  }
  
  focusOn(targetX) {
    // 聚焦到目标位置
  }
  
  illuminate(objects) {
    // 返回被照亮的对象列表
  }
}
```

#### 6. 粒子系统（增强版）
```javascript
class ParticleSystem {
  constructor(count, behavior) {
    this.particles = [];
    this.behavior = behavior; // 'ambient' | 'flow' | 'chaos' | 'converge'
    this.forces = []; // 力场数组
  }
  
  addForce(type, x, y, strength) {
    // 添加力场（吸引/排斥）
  }
  
  update(deltaTime) {
    this.particles.forEach(p => {
      // 应用所有力场
      this.forces.forEach(force => {
        p.applyForce(force);
      });
      p.update(deltaTime);
    });
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.life = 1.0;
  }
  
  applyForce(force) {
    // 计算力的影响
  }
}
```

### 关键算法

#### 1. 自动连线算法
```javascript
// Delaunay三角剖分 或 最近邻算法
function autoConnect(nodes, maxDistance, maxConnections) {
  nodes.forEach(node => {
    const nearest = findNearestNodes(node, nodes, maxConnections);
    nearest.forEach(target => {
      if (distance(node, target) < maxDistance) {
        node.connect(target);
      }
    });
  });
}
```

#### 2. 网格扭曲算法
```javascript
// 基于距离的影响力衰减
function distortGrid(grid, mouseX, mouseY, radius, strength) {
  grid.nodes.forEach(node => {
    const dist = distance(node, {x: mouseX, y: mouseY});
    if (dist < radius) {
      const force = (1 - dist / radius) * strength;
      const angle = Math.atan2(node.y - mouseY, node.x - mouseX);
      node.offsetX = Math.cos(angle) * force;
      node.offsetY = Math.sin(angle) * force;
    }
  });
}
```

#### 3. 波纹干涉算法
```javascript
// 多个波纹叠加产生干涉图案
function calculateInterference(waves, x, y) {
  let amplitude = 0;
  waves.forEach(wave => {
    const dist = distance(wave, {x, y});
    if (dist < wave.radius) {
      const phase = (dist - wave.radius) * 0.1;
      amplitude += Math.sin(phase) * wave.opacity;
    }
  });
  return amplitude;
}
```

#### 4. 区域形变算法
```javascript
// Perlin噪声驱动的自然形变
function morphZone(zone, time, noiseScale) {
  zone.vertices.forEach((vertex, i) => {
    const noise = perlinNoise(
      vertex.x * noiseScale,
      vertex.y * noiseScale,
      time
    );
    const original = zone.originalVertices[i];
    vertex.x = original.x + noise * 20;
    vertex.y = original.y + noise * 20;
  });
}
```

### 性能优化策略

#### 1. 对象池
```javascript
class ObjectPool {
  constructor(createFn, resetFn, initialSize) {
    this.pool = [];
    this.createFn = createFn;
    this.resetFn = resetFn;
    
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(createFn());
    }
  }
  
  acquire() {
    return this.pool.pop() || this.createFn();
  }
  
  release(obj) {
    this.resetFn(obj);
    this.pool.push(obj);
  }
}

// 使用示例
const wavePool = new ObjectPool(
  () => new Wave(0, 0, 'normal', 200),
  (wave) => { wave.radius = 0; wave.opacity = 1; },
  20
);
```

#### 2. 空间分区
```javascript
// 四叉树加速碰撞检测和查询
class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.objects = [];
    this.divided = false;
  }
  
  insert(object) {
    // 插入对象
  }
  
  query(range) {
    // 查询范围内的对象
  }
}
```

#### 3. 帧率自适应
```javascript
class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frameTime = 16.67;
  }
  
  update(deltaTime) {
    this.fps = 1000 / deltaTime;
    
    // 根据帧率调整质量
    if (this.fps < 30) {
      this.reduceQuality();
    } else if (this.fps > 55) {
      this.increaseQuality();
    }
  }
  
  reduceQuality() {
    // 减少粒子数、降低更新频率
  }
}
```

### 工具函数库

```javascript
// 向量运算
const Vector = {
  add: (v1, v2) => ({x: v1.x + v2.x, y: v1.y + v2.y}),
  sub: (v1, v2) => ({x: v1.x - v2.x, y: v1.y - v2.y}),
  mult: (v, scalar) => ({x: v.x * scalar, y: v.y * scalar}),
  mag: (v) => Math.sqrt(v.x * v.x + v.y * v.y),
  normalize: (v) => {
    const m = Vector.mag(v);
    return m > 0 ? Vector.mult(v, 1/m) : {x: 0, y: 0};
  }
};

// 缓动函数
const Easing = {
  easeInOut: (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t,
  easeOut: (t) => t * (2 - t),
  elastic: (t) => Math.sin(-13 * (t + 1) * Math.PI/2) * Math.pow(2, -10*t) + 1
};

// 颜色插值
function lerpColor(color1, color2, t) {
  const r1 = parseInt(color1.slice(1,3), 16);
  const g1 = parseInt(color1.slice(3,5), 16);
  const b1 = parseInt(color1.slice(5,7), 16);
  
  const r2 = parseInt(color2.slice(1,3), 16);
  const g2 = parseInt(color2.slice(3,5), 16);
  const b2 = parseInt(color2.slice(5,7), 16);
  
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}
```

---

## 验收标准

### 视觉验收
- [ ] 去掉所有文字，仅通过粒子场能判断当前章节
- [ ] 章节过渡流畅，无卡顿（60fps）
- [ ] 颜色过渡自然，符合情绪曲线
- [ ] 移动端体验流畅

### 交互验收
- [ ] 滚动响应灵敏，无延迟
- [ ] 侧边导航点击跳转准确
- [ ] 鼠标交互反馈明显
- [ ] 键盘导航完整可用

### 性能验收
- [ ] 首屏加载时间 < 2s
- [ ] 滚动帧率稳定在 55fps+
- [ ] 移动端内存占用 < 100MB
- [ ] Lighthouse性能分数 > 90

---

## 后续扩展方向

### 1. 音效系统
- 每个章节配备环境音效
- 警报章节触发警报声
- 背景白噪音增强沉浸感

### 2. 数据可视化
- 接入真实系统数据
- 实时显示当前系统状态
- 历史数据回放功能

### 3. 交互式演示
- 点击功能标签进入详细演示
- 模拟系统操作流程
- 提供沙盒测试环境

### 4. 多语言支持
- 中英文切换
- 保持叙事节奏一致

---

## 附录：情绪色彩映射表

| 情绪状态 | 主色调 | 辅助色 | 粒子密度 | 运动特征 |
|---------|--------|--------|----------|----------|
| 平静 | #1e293b | #334155 | 低 | 缓慢漂移 |
| 建立 | #059669 | #10b981 | 中 | 有序聚集 |
| 活跃 | #3b82f6 | #60a5fa | 高 | 快速连接 |
| 验证 | #6366f1 | #818cf8 | 中高 | 脉冲波动 |
| 紧张 | #f59e0b | #fbbf24 | 高 | 不规则抖动 |
| 警报 | #ef4444 | #f87171 | 极高 | 爆发扩散 |
| 干预 | #8b5cf6 | #a78bfa | 中高 | 收束归位 |
| 修复 | #10b981 | #34d399 | 中 | 轨迹残留 |
| 回馈 | #facc15 | #fde047 | 中高 | 向心聚集 |
| 沉淀 | #475569 | #64748b | 低 | 呼吸节奏 |

---

**文档版本**：v1.0  
**最后更新**：2026-01-27  
**负责人**：产品设计团队
