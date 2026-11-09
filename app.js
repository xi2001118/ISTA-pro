/* ============================================================
   ISTA Pro — Main Application Logic
   app.js v1.0
   ============================================================ */

'use strict';

// ============================================================
// DATA: ISTA Standards Database
// ============================================================
const ISTA_STANDARDS = [
  
  {
    id: 'ISTA-1A',
    code: 'ISTA 1A',
    series: 'series1',
    name: '非模拟运输完整性测试（轻型 ≤ 68 kg）',
    description: '评估包装件在常见运输挑战中的耐久性，适用于 ≤ 68 kg (150 lb) 的货物。跌落高度按重量分级：≤ 10 kg → 76 cm, > 10~19 kg → 61 cm, > 19~28 kg → 46 cm, > 28~45 kg → 31 cm, > 45~68 kg → 20 cm。测试不模拟特定运输环境。',
    weightLimit: '≤ 68 kg (150 lb)',
    specimens: 1,
    purpose: '确认包装可在运输中保护产品，不发生破损、渗漏或功能丧失',
    tests: ['drop', 'vib'],
    testDetails: {
      conditioning: '无',
      drop: '必选 — 按重量分级 (共 10 次跌落: 1 角 3 棱 6 面): ≤10kg→76cm, ≤19kg→61cm, ≤28kg→46cm, ≤45kg→31cm, ≤68kg→20cm',
      vibration: '必选 — 固定频率正弦振动 (以 1.1g 加速度振动 14,200 次或指定时间)',
      compression: '无',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '产品无破损、包装结构完整、无泄漏、不影响产品使用功能',
    dropHeights: [
      { maxKg: 10, height_cm: 76.0 }, // ≤ 10 kg (21 lb) → 760 mm (30 in)
      { maxKg: 19, height_cm: 61.0 }, // > 10～19 kg (21～41 lb) → 610 mm (24 in)
      { maxKg: 28, height_cm: 46.0 }, // > 19～28 kg (41～61 lb) → 460 mm (18 in)
      { maxKg: 45, height_cm: 31.0 }, // > 28～45 kg (61～100 lb) → 310 mm (12 in)
      { maxKg: 68, height_cm: 20.0 }, // > 45～68 kg (100～150 lb) → 200 mm (8 in)
    ],
    tags: ['轻型', '散货', '基础测试'],
  },
  {
    id: 'ISTA-1B',
    code: 'ISTA 1B',
    series: 'series1',
    name: '非模拟运输完整性测试（重型 > 68 kg）',
    description: '适用于重量大于 68 kg (150 lb) 的重型货物，评估包装与产品在装卸及运输过程中的结构完整性。',
    weightLimit: '> 68 kg (150 lb)',
    specimens: 1,
    purpose: '确认重型包装件在装卸及运输过程中结构完整',
    tests: ['drop', 'vib'],
    testDetails: {
      conditioning: '无',
      drop: '必选 — 15.2 cm (6 in) 自由跌落 + 20.3 cm (8 in) 旋转棱跌落',
      vibration: '必选 — 固定频率正弦振动',
      compression: '无',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '产品无破损，包装无结构性失效，功能正常',
    dropHeights: [
      { maxKg: 150, height_cm: 15.2, label: '> 68 kg' },
    ],
    tags: ['重型', '散货', '装卸测试'],
  },
  {
    id: 'ISTA-1C',
    code: 'ISTA 1C',
    series: 'series1',
    name: '非模拟运输完整性测试（独立包装产品）',
    description: '针对单件独立包装产品的筛选测试。跌落高度取决于总重量，共执行 10 次跌落（1 角、3 棱、6 面）。',
    weightLimit: '≤ 68 kg (150 lb)',
    specimens: 1,
    purpose: '验证包装件在运输过程中的保护性能',
    tests: ['drop', 'vib'],
    testDetails: {
      conditioning: '无',
      drop: '必选 — 按重量分级 (10 次跌落: 1 次角、3 次边、6 次面): ≤10kg→76cm, ≤19kg→61cm, ≤28kg→46cm, ≤45kg→31cm, ≤68kg→20cm',
      vibration: '必选 — 固定频率正弦振动',
      compression: '无',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '产品无破损，包装外观允许轻微磨损，功能完整',
    dropHeights: [
      { maxKg: 10, height_cm: 76.0 },
      { maxKg: 19, height_cm: 61.0 },
      { maxKg: 28, height_cm: 46.0 },
      { maxKg: 45, height_cm: 31.0 },
      { maxKg: 68, height_cm: 20.0 },
    ],
    tags: ['非模拟', '独立包装', '分级跌落'],
  },
  {
    id: 'ISTA-1G',
    code: 'ISTA 1G',
    series: 'series1',
    name: '非模拟运输完整性测试（重型 > 68 kg — 随机振动）',
    description: 'ISTA 1B 的升级版，面向 > 68 kg 重型货物。使用随机振动替代固定频率振动，更真实反映运输环境。',
    weightLimit: '> 68 kg (150 lb)',
    specimens: 1,
    purpose: '重型货物基础完整性筛选，使用随机振动更贴近真实运输条件',
    tests: ['drop', 'vib'],
    testDetails: {
      conditioning: '无',
      drop: '必选 — 固定 15.2 cm (6 in) 自由跌落 + 20.3 cm (8 in) 旋转棱跌落',
      vibration: '必选 — 随机振动 (替代 ISTA 1B 的固定频率振动，整体加速度约 0.53 Grms)',
      compression: '无',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '产品无破损，包装结构完整',
    dropHeights: [
      { maxKg: 150, height_cm: 15.2, label: '> 68 kg' },
    ],
    tags: ['重型', '随机振动', '升级版', '散货'],
  },
  {
    id: 'ISTA-1H',
    code: 'ISTA 1H',
    series: 'series1',
    name: '非模拟运输完整性测试（轻型 ≤ 68 kg — 随机振动）',
    description: 'ISTA 1A 的升级版，面向 ≤ 68 kg (150 lb) 货物。用随机振动替代固定频率正弦振动，跌落高度按重量阶梯划分。适用于电商跨境运输快速筛选。',
    weightLimit: '≤ 68 kg (150 lb)',
    specimens: 1,
    purpose: '快速筛选 ≤ 68 kg 货物的包装完整性，以随机振动反映真实运输环境',
    tests: ['drop', 'vib'],
    testDetails: {
      conditioning: '无',
      drop: '必选 — 按重量分级 (按磅数精密换算): ≤9kg(21lb)→76.2cm, ≤14kg(30lb)→61.0cm, ≤18kg(40lb)→45.7cm, ≤23kg(50lb)→35.6cm, ≤28kg(60lb)→30.5cm, ≤36kg(80lb)→25.4cm, ≤45kg(100lb)→20.3cm, ≤68kg(150lb)→15.2cm',
      vibration: '必选 — 随机振动 (替代 ISTA 1A 的固定频率，Grms 约 0.53)',
      compression: '无',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '产品无破损、包装结构完整、功能正常',
    dropHeights: [
      { maxKg: 9, height_cm: 76.2 },  // ≤ 21 lb (9.5 kg)
      { maxKg: 14, height_cm: 61.0 }, // ≤ 30 lb (13.6 kg)
      { maxKg: 18, height_cm: 45.7 }, // ≤ 40 lb (18.1 kg)
      { maxKg: 23, height_cm: 35.6 }, // ≤ 50 lb (22.7 kg)
      { maxKg: 28, height_cm: 30.5 }, // ≤ 60 lb (27.2 kg)
      { maxKg: 36, height_cm: 25.4 }, // ≤ 80 lb (36.3 kg)
      { maxKg: 45, height_cm: 20.3 }, // ≤ 100 lb (45.4 kg)
      { maxKg: 68, height_cm: 15.2 }, // ≤ 150 lb (68.0 kg)
    ],
    tags: ['轻型', '随机振动', '升级版', '电商'],
  },
  {
    id: 'ISTA-2A',
    code: 'ISTA 2A',
    series: 'series2',
    name: '部分模拟运输测试（全尺寸包装 ≤ 68 kg）',
    description: '部分模拟实际运输环境，包含环境调质、正弦振动/扫频与斜面冲击。跌落高度按重量分级：97cm(≤10kg)→81cm(≤19kg)→66cm(≤28kg)→51cm(≤45kg)→31cm(≤68kg)。',
    weightLimit: '≤ 68 kg (150 lb)',
    specimens: 1,
    purpose: '模拟从生产到零售商全程运输中的典型应力环境',
    tests: ['cond', 'drop', 'vib', 'impact'],
    testDetails: {
      conditioning: '必选 — 温湿度调质 (预调质 + 标准大气或极端环境)',
      drop: '必选 — 按重量分级跌落 (10 次: 1 角 3 棱 6 面), 高度 97~31 cm',
      vibration: '必选 — 固定频率正弦振动或共振搜索与驻留',
      compression: '可选 — 静载荷压力测试',
      impact: '必选 — 斜面冲击或水平冲击',
      altitude: '无',
    },
    passFailCriteria: '产品完整无损，包装主结构完整，允许轻微外观损伤但不影响内容物',
    dropHeights: [
      { maxKg: 10, height_cm: 97.0 },
      { maxKg: 19, height_cm: 81.0 },
      { maxKg: 28, height_cm: 66.0 },
      { maxKg: 45, height_cm: 51.0 },
      { maxKg: 68, height_cm: 31.0 },
    ],
    tags: ['部分模拟', '温湿度', '斜面冲击'],
  },
  {
    id: 'ISTA-2B',
    code: 'ISTA 2B',
    series: 'series2',
    name: '部分模拟运输测试（重型 > 68 kg）',
    description: '部分模拟测试，专为 > 68 kg 重型货物设计，包含环境预调质。跌落采用固定 15.2 cm 自由跌落 + 20.3 cm 旋转棱跌落。',
    weightLimit: '> 68 kg (150 lb)',
    specimens: 1,
    purpose: '评估重型货物在调质后运输环境中的抗损性',
    tests: ['cond', 'drop', 'vib'],
    testDetails: {
      conditioning: '必选 — 环境温湿度预调质',
      drop: '必选 — 15.2 cm (6 in) 自由跌落 + 旋转棱跌落 (20.3 cm)',
      vibration: '必选 — 正弦振动',
      compression: '可选 — 静载荷压力测试',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '结构完整，内容物无损，包装可维持防护能力',
    dropHeights: [
      { maxKg: 150, height_cm: 15.2, label: '> 68 kg' },
    ],
    tags: ['重型', '部分模拟', '温湿度'],
  },
  {
    id: 'ISTA-3A',
    code: 'ISTA 3A',
    series: 'series3',
    name: '全模拟运输测试（小件 ≤ 70 kg）— 4 种包装类型',
    description: '完全模拟 Parcel Delivery 快递包裹运输链（如 UPS/FedEx/Amazon）。包含温湿度调质、跌落（双序列共17次）、随机振动、压力等全套测试。定义 4 种包装类型：Standard(标准)、Small(小型)、Flat(扁平)、Elongated(细长)，各有独立跌落序列。',
    weightLimit: '≤ 70 kg (150 lb)',
    specimens: 1,
    purpose: '全面验证包装在小包裹配送全链路中的防护性能',
    tests: ['cond', 'drop', 'vib', 'comp', 'alt'],
    testDetails: {
      conditioning: '必选 — 依据产品特性选择温湿度预调质',
      drop: '必选 — 2档分级，双序列共17次跌落: < 32 kg → 46 cm (Face3 特殊面91 cm); 32~70 kg → 30 cm (Face3 特殊面60 cm)；小袋包装≤4.5 kg 固定 61 cm',
      vibration: '必选 — 随机振动 (带顶部载荷模拟卡车与堆码振动)',
      compression: '必选 — 动态/静态堆码载荷计算与试验',
      impact: '无',
      altitude: '可选 — 低气压模拟 (针对空运包裹)',
    },
    passFailCriteria: '无产品破损、无功能丧失、无泄漏；包装内容物在整个测试序列后仍受良好保护',
    // ISTA 3A 最新版：2档分级，< 32 kg / 32~70 kg
    // Drop #8 (Face 3) 使用双倍高度
    dropHeights: [
      { maxKg: 32, height_cm: 46.0, note: 'Drop #8 (Face3) 用 91 cm (double height)' },
      { maxKg: 70, height_cm: 30.0, note: 'Drop #8 (Face3) 用 60 cm (double height)' },
    ],
    packageTypes: {
      standard: {
        desc: '标准包装 (体积≤0.17m³ 且 重量≤70 kg)',
        dropHeights: [
          { maxKg: 32, height_cm: 46.0, face3Height_cm: 91.0 },
          { maxKg: 70, height_cm: 30.0, face3Height_cm: 60.0 },
        ],
      },
      small: {
        desc: '小袋包装（Bag，重量≤4.5 kg）— 固定跌落高度',
        dropHeights: [
          { maxKg: 4.5, height_cm: 61.0 }, // 610 mm / 24 in，固定高度
        ],
      },
      flat: {
        desc: '扁平包装 (最短边≤76 mm 或长宽比≥3:1)',
        dropHeights: [
          { maxKg: 32, height_cm: 46.0, face3Height_cm: 91.0 },
          { maxKg: 70, height_cm: 30.0, face3Height_cm: 60.0 },
        ],
      },
      elongated: {
        desc: '细长包装 (最长边≥914 mm 且 其余两边 ≤ 最长边 20%)',
        dropHeights: [
          { maxKg: 32, height_cm: 46.0, face3Height_cm: 91.0 },
          { maxKg: 70, height_cm: 30.0, face3Height_cm: 60.0 },
        ],
      },
    },
    tags: ['全模拟', '电商', '随机振动', '完整序列'],
  },
  {
    id: 'ISTA-3B',
    code: 'ISTA 3B',
    series: 'series3',
    name: '全模拟 LTL 零担运输测试（重型）',
    description: '针对零担 (LTL) 机械搬运与大货卡车运输的全模拟方案。跌落按重量分级：≤18kg→30.5cm, ≤36kg→25cm, ≤45kg→20cm, ≤91kg→18cm, >91kg→旋转棱跌落 23cm。',
    weightLimit: '不限 (通常适用 > 68 kg)',
    specimens: 1,
    purpose: '验证重型包装在 LTL 及 FTL 运输链路中的完整性',
    tests: ['cond', 'drop', 'vib', 'comp'],
    testDetails: {
      conditioning: '必选 — 环境调质',
      drop: '必选 — 按重量分级: ≤91kg 自由跌落 (18~30.5cm), >91kg 旋转棱跌落 (23cm)',
      vibration: '必选 — 托盘级随机振动谱 (Grms 约 0.54)',
      compression: '必选 — 堆码与抗压模拟',
      impact: '可选 — 水平冲击/铲车搬运模拟',
      altitude: '无',
    },
    passFailCriteria: '产品无破损，包装可维持防护功能，托盘结构完整',
    dropHeights: [
      { maxKg: 18, height_cm: 30.5 },
      { maxKg: 36, height_cm: 25.0 },
      { maxKg: 45, height_cm: 20.0 },
      { maxKg: 91, height_cm: 18.0 },
      { maxKg: 230, height_cm: 23.0 },
    ],
    tags: ['重型', '托盘', 'LTL', '全模拟'],
  },
  {
    id: 'ISTA-3E',
    code: 'ISTA 3E',
    series: 'series3',
    name: '单元化货物全模拟运输测试',
    description: '专为同种产品的托盘单元化货物 (Unitized Loads) 设计，模拟干线卡车运输、仓储堆码与机械叉车搬运的综合应力。',
    weightLimit: '托盘单元/集合包装',
    specimens: 1,
    purpose: '验证托盘化货物在整体供应链中的完整性',
    tests: ['cond', 'drop', 'vib', 'comp'],
    testDetails: {
      conditioning: '必选 — 环境调质',
      drop: '必选 — 旋转棱跌落: ≤230kg→23cm; >230kg→15cm',
      vibration: '必选 — 托盘级随机振动',
      compression: '必选 — 顶部堆码模拟',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '托盘结构完整，货物无倾倒倒塌，内容物无损',
    dropHeights: [
      { maxKg: 230, height_cm: 23.0 },
      { maxKg: 500, height_cm: 15.0 },
    ],
    tags: ['托盘', '单元化', '堆码', '仓储'],
  },
  {
    id: 'ISTA-3H',
    code: 'ISTA 3H',
    series: 'series3',
    name: '大型家用电子产品全模拟运输测试',
    description: '专为大型家用电子设备（电视、冰箱、洗衣机、空调等）设计的全模拟测试，模拟整柜/整车 (FTL) 运输链路。跌落测试区分平面跌落与旋转棱跌落。',
    weightLimit: '≥ 45 kg (100 lb)',
    specimens: 1,
    purpose: '验证大型家电包装在整柜/整车运输中对冲击、振动及压力的综合防护能力',
    tests: ['cond', 'drop', 'vib', 'comp'],
    testDetails: {
      conditioning: '必选 — 温湿度调质 (24h / 38°C±2°C / 85%±5% RH)',
      drop: '必选 — 根据重量与包装方向: 平面跌落 7.6~30.5cm, 旋转棱跌落 15.2~30.5cm',
      vibration: '必选 — 随机振动 (卡车谱, Grms ~0.54)',
      compression: '必选 — 高堆码载荷模拟',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '产品功能正常、无结构性损伤、包装保持完整性',
    dropHeights: [
      { maxKg: 68, height_cm: 30.5 },
      { maxKg: 136, height_cm: 20.3 },
      { maxKg: 500, height_cm: 15.2 },
    ],
    tags: ['大型家电', '全模拟', '集装箱', '电子设备'],
  },
  {
    id: 'ISTA-3K',
    code: 'ISTA 3K',
    series: 'series3',
    name: '快速消费品/连锁零售供应链全模拟测试',
    description: '专为便利店、快餐店等连锁零售从中央配送中心 (DC) 到门店的运输链路设计。模拟堆码、侧向冲击、振动等多重应力。',
    weightLimit: '≤ 45 kg (按单件包装计)',
    specimens: 3,
    purpose: '验证快速消费品多件组合包装在集中配送链路中的耐久性',
    tests: ['cond', 'drop', 'vib', 'comp', 'impact'],
    testDetails: {
      conditioning: '必选 — 环境调质',
      drop: '必选 — 自由跌落，高度依据重量分级',
      vibration: '必选 — 随机振动 (卡车谱)',
      compression: '必选 — 动态堆码压缩',
      impact: '必选 — 侧向/水平冲击 (模拟卡车紧急制动与碰撞)',
      altitude: '无',
    },
    passFailCriteria: '产品无破损、包装结构无失效、产品可正常上架销售',
    dropHeights: [
      { maxKg: 9.1, height_cm: 76.0 },
      { maxKg: 18.2, height_cm: 61.0 },
      { maxKg: 27.3, height_cm: 46.0 },
      { maxKg: 45.0, height_cm: 38.0 },
    ],
    tags: ['连锁零售', '快消品', '多件测试', '便利店'],
  },
  {
    id: 'ISTA-6-AMAZON-SIOC',
    code: 'ISTA 6-AMAZON SIOC',
    series: 'series6',
    name: 'Amazon Ships In Own Container (SIOC) — Type A',
    description: '亚马逊 FFP/SIOC 认证（Type A: 轻于 23kg 标准小包裹）。无需亚马逊外箱，产品直接以自带包装发货。标准跌落 46cm (18in)，面 3 危险跌落 91cm (36in)。',
    weightLimit: '≤ 23 kg (50 lb)',
    specimens: 1,
    purpose: '验证产品可在无需二次包装的情况下通过亚马逊完整配送网络',
    tests: ['cond', 'drop', 'vib', 'comp'],
    testDetails: {
      conditioning: '必选 — 温湿度预调质 (通常 72h / 38°C / 85% RH)',
      drop: '必选 — 标准跌落 46cm (18in), 面 3 危险高跌落 91cm (36in)；总共 17 次跌落',
      vibration: '必选 — Amazon 专有随机振动谱 (Grms 0.53/0.46)',
      compression: '必选 — 静态堆码抗压测试',
      impact: '无',
      altitude: '可选',
    },
    passFailCriteria: '产品功能完整，无渗漏，外包装不得有影响最终消费者体验的结构性损伤',
    dropHeights: [
      { maxKg: 23, height_cm: 46.0 },
    ],
    tags: ['Amazon', 'SIOC', 'FFP', '电商', '免外箱'],
  },
  {
    id: 'ISTA-6-AMAZON-PREP',
    code: 'ISTA 6-AMAZON OVERBOX',
    series: 'series6',
    name: 'Amazon Overbox (需加装二次外箱)',
    description: '适用于在亚马逊物流中心需要加装 Overbox 外箱配送的产品（如液体、易碎品或小型单品）。',
    weightLimit: '≤ 23 kg (50 lb)',
    specimens: 1,
    purpose: '验证加套外箱后的产品在亚马逊网络配送中的防护效果',
    tests: ['cond', 'drop', 'vib'],
    testDetails: {
      conditioning: '必选 — 环境预调质',
      drop: '必选 — 包含外箱跌落序列（标准跌落 46cm，高跌 91cm）',
      vibration: '必选 — Amazon 专用随机振动谱',
      compression: '可选',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '产品完整，内包装防护有效，外箱结构允许损坏但不影响内容物',
    dropHeights: [
      { maxKg: 23, height_cm: 46.0 },
    ],
    tags: ['Amazon', '外箱', '二次包装'],
  },
  {
    id: 'ISTA-6-WALMART',
    code: 'ISTA 6-WALMART',
    series: 'series6',
    name: 'Walmart 运输测试',
    description: '沃尔玛供应商包装认证，评估从供应商到配送中心及门店全程防护性能。',
    weightLimit: '≤ 68 kg (150 lb)',
    specimens: 1,
    purpose: '满足 Walmart 供应链对包装耐久性与成本效益的双重要求',
    tests: ['cond', 'drop', 'vib', 'comp'],
    testDetails: {
      conditioning: '必选 — 温湿度预调质',
      drop: '必选 — 按重量分级跌落: ≤9kg→76.2cm, ≤18kg→61cm, ≤27kg→45.7cm, ≤45kg→30.5cm, ≤68kg→20.3cm',
      vibration: '必选 — Walmart 专属随机振动谱',
      compression: '必选 — 堆码抗压测试',
      impact: '可选',
      altitude: '无',
    },
    passFailCriteria: '产品无损，外箱无严重塌陷，堆码载荷下结构无失效',
    dropHeights: [
      { maxKg: 9, height_cm: 76.2 },
      { maxKg: 18, height_cm: 61.0 },
      { maxKg: 27, height_cm: 45.7 },
      { maxKg: 45, height_cm: 30.5 },
      { maxKg: 68, height_cm: 20.3 },
    ],
    tags: ['Walmart', '零售商', '供应链'],
  },
  {
    id: 'ISTA-6-SAMSCLUB',
    code: 'ISTA 6-SAMSCLUB',
    series: 'series6',
    name: "Sam's Club 会员店运输测试",
    description: "山姆会员店专项认证。评估包装在仓储式会员店环境下的耐用性（往往涉及托盘直接上架展示）。",
    weightLimit: '≤ 68 kg (150 lb)',
    specimens: 1,
    purpose: "满足 Sam's Club 大容量仓储式展示与运输的防护需求",
    tests: ['cond', 'drop', 'vib', 'comp'],
    testDetails: {
      conditioning: '必选 — 预调质',
      drop: '必选 — 国际线路: 底面跌落 46cm, 最大 81cm; 含旋转棱跌落与危险物冲击',
      vibration: '必选 — 随机振动',
      compression: '必选 — 高堆码层数抗压',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '结构完整，产品可正常售卖，外观满足陈列展示要求',
    dropHeights: [
      { maxKg: 68, height_cm: 46.0 },
    ],
    tags: ["Sam's Club", '会员店', '托盘展示'],
  },
  {
    id: 'ISTA-6-TARGET',
    code: 'ISTA 6-TARGET',
    series: 'series6',
    name: 'Target 零售商运输测试',
    description: 'Target 百货供应商包装认证，覆盖配送中心中转与门店补货全程防护验证。',
    weightLimit: '≤ 45 kg (100 lb)',
    specimens: 1,
    purpose: 'Target 供应链全程包装防护认证',
    tests: ['cond', 'drop', 'vib', 'comp'],
    testDetails: {
      conditioning: '必选 — 环境预调质',
      drop: '必选 — 按重量分级: 9kg→76.2cm, 18kg→61cm, 27kg→45.7cm, 45kg→30.5cm',
      vibration: '必选 — 随机振动',
      compression: '必选 — 静载荷压力测试',
      impact: '可选',
      altitude: '无',
    },
    passFailCriteria: '产品完整，包装满足上架展示标准',
    dropHeights: [
      { maxKg: 9, height_cm: 76.2 },
      { maxKg: 18, height_cm: 61.0 },
      { maxKg: 27, height_cm: 45.7 },
      { maxKg: 45, height_cm: 30.5 },
    ],
    tags: ['Target', '零售商', '门店'],
  },
  {
    id: 'ISTA-6-FEDEX',
    code: 'ISTA 6-FEDEX',
    series: 'series6',
    name: 'FedEx 联邦快递运输测试 (ISTA 6-FEDEX)',
    description: 'FedEx 包裹运输专项认证，模拟联邦快递分拣中心、航空/陆运枢纽及末端配送的机械冲击。',
    weightLimit: 'A类: ≤23 kg (50 lb) / B类: 23~68 kg (50~150 lb)',
    specimens: 1,
    purpose: '验证包装在 FedEx 全球配送网络中能承受高强度机械应力与自动化分拣冲击',
    tests: ['cond', 'drop', 'vib', 'impact'],
    testDetails: {
      conditioning: '必选 — 温湿度预调质',
      drop: '必选 — 固定 78.7 cm (31 in) 高度自由跌落 + 旋转棱跌落',
      vibration: '必选 — FedEx 专属随机振动谱 (Grms ~0.53)',
      compression: '可选',
      impact: '必选 — 斜面冲击 / 危险物冲击 (46cm / 38cm)',
      altitude: '可选 — 高海拔空运模拟',
    },
    passFailCriteria: '产品无损、包装结构完整、无泄漏、内容物不脱出',
    dropHeights: [
      { maxKg: 68, height_cm: 78.7 },
    ],
    tags: ['FedEx', '快递', '航空', '分拣中心'],
  },
  {
    id: 'ISTA-6-UPS',
    code: 'ISTA 6-UPS',
    series: 'series6',
    name: 'UPS 联合包裹运输测试',
    description: 'UPS 包裹运输专项，模拟 UPS 自动化分拣枢纽的多重跌落与运输振动环境。',
    weightLimit: '≤ 68 kg (150 lb)',
    specimens: 1,
    purpose: '验证包装在 UPS 全球分拣网络中经历多级跌落后的完整性',
    tests: ['cond', 'drop', 'vib'],
    testDetails: {
      conditioning: '可选 — 环境调质',
      drop: '必选 — 10 步标准跌落序列，高度按重量阶梯划分',
      vibration: '必选 — UPS 专属随机振动谱',
      compression: '可选',
      impact: '可选',
      altitude: '无',
    },
    passFailCriteria: '产品无损、包装完整、条形码/标签可正常识读',
    dropHeights: [
      { maxKg: 9, height_cm: 76.2 },
      { maxKg: 18, height_cm: 61.0 },
      { maxKg: 27, height_cm: 45.7 },
      { maxKg: 45, height_cm: 30.5 },
      { maxKg: 68, height_cm: 20.3 },
    ],
    tags: ['UPS', '快递', '分拣', '多级跌落'],
  },
  {
    id: 'ISTA-7D',
    code: 'ISTA 7D',
    series: 'series7',
    name: '温控运输包装热力测试 (Thermal Controlled Transport)',
    description: '评估温控包装（冷链/热链）在预设外包温度 profile 下的保温/保冷性能。广泛用于药品、生物制品和生鲜食品的包装验证。',
    weightLimit: '不限',
    specimens: 1,
    purpose: '验证温控包装在指定环境温度波动下能否保持内部温度在产品要求的 Tmin~Tmax 范围内',
    tests: ['cond'],
    testDetails: {
      conditioning: '必选 — 高低温梯度循环（例如 -20°C 至 +40°C 动态变化环境），内部布设多通道温度数据记录仪',
      drop: '可选 — 热力测试前/后增加机械性能评估',
      vibration: '可选',
      compression: '无',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '内部温度在规定时长（如 48h/72h/96h）内持续维持在要求的温度阈值范围内',
    dropHeights: [],
    tags: ['冷链', '温控', '药品', '生鲜', '保温'],
  },
  {
    id: 'ISTA-7E',
    code: 'ISTA 7E',
    series: 'series7',
    name: '温控运输包装热力测试 (外包物流/退货)',
    description: '基于真实外部气象数据（如夏季/冬季典型曲线）评估冷链包装，包含对反向物流或中转延误场景的补充验证。',
    weightLimit: '不限',
    specimens: 1,
    purpose: '验证温控包装在完整供应链及可能发生的逆向物流过程中的热防护能力',
    tests: ['cond'],
    testDetails: {
      conditioning: '必选 — 包含复杂环境温度突变与中转等待模拟',
      drop: '可选',
      vibration: '可选',
      compression: '无',
      impact: '无',
      altitude: '无',
    },
    passFailCriteria: '全程（含返程/延误）内部温度保持在安全限值以内',
    dropHeights: [],
    tags: ['冷链', '反向物流', '退货', '温控'],
  },

];

// ============================================================
// DATA: Drop Test Sequences
// ============================================================
const DROP_SEQUENCE = [
  { step: 1, type: 'corner', label: '角 1', desc: '最突出棱角', face: 0, color: '#fc8181' },
  { step: 2, type: 'edge', label: '棱 1', desc: '最短棱 (底)', face: 1, color: '#fbd38d' },
  { step: 3, type: 'edge', label: '棱 2', desc: '次长棱 (侧底)', face: 2, color: '#fbd38d' },
  { step: 4, type: 'edge', label: '棱 3', desc: '最长棱 (底侧)', face: 3, color: '#fbd38d' },
  { step: 5, type: 'face', label: '面 1', desc: '底面', face: 4, color: '#63b3ed' },
  { step: 6, type: 'face', label: '面 2', desc: '顶面', face: 5, color: '#63b3ed' },
  { step: 7, type: 'face', label: '面 3', desc: '前面 (最大面)', face: 6, color: '#63b3ed' },
  { step: 8, type: 'face', label: '面 4', desc: '后面', face: 7, color: '#63b3ed' },
  { step: 9, type: 'face', label: '面 5', desc: '左侧面', face: 8, color: '#63b3ed' },
  { step: 10, type: 'face', label: '面 6', desc: '右侧面', face: 9, color: '#63b3ed' },
];

// ============================================================
// DATA: Vibration Parameters
// ============================================================
const VIB_PARAMS = {
  ISTA1A: {
    type: '固定频率正弦振动',
    frequency: '3 Hz',
    amplitude: '25.4 mm (1 in) peak',
    duration: '60 分钟',
    axis: '垂直轴',
    grms: 'N/A',
  },
  ISTA2A: {
    type: '固定频率正弦振动 + 扫频',
    frequency: '3 ~ 100 Hz 扫频',
    amplitude: '依频率查表',
    duration: '60 分钟',
    axis: '垂直轴',
    grms: '约 0.52 Grms',
  },
  ISTA3A: {
    type: '随机振动 (PSD)',
    frequency: '3 ~ 200 Hz',
    amplitude: 'PSD 表格 (依重量分组)',
    duration: '60 分钟',
    axis: '垂直轴',
    grms: '0.52 ~ 0.54 Grms (典型值)',
  },
  AMAZON_SIOC: {
    type: '随机振动 — Amazon 专有谱',
    frequency: '3 ~ 200 Hz',
    amplitude: 'APASS PSD Level A/B',
    duration: '60 分钟',
    axis: '垂直轴',
    grms: '0.58 Grms (≤9kg) / 0.44 Grms (>9kg)',
  },
  WALMART: {
    type: '随机振动 — Walmart 专有谱',
    frequency: '3 ~ 150 Hz',
    amplitude: 'Walmart PSD 规格',
    duration: '60 分钟',
    axis: '垂直轴',
    grms: '约 0.52 Grms',
  },
  FEDEX: {
    type: '随机振动 — FedEx 专有谱',
    frequency: '3 ~ 200 Hz',
    amplitude: 'FedEx PSD 规格',
    duration: '60 分钟',
    axis: '垂直轴',
    grms: '约 0.53 Grms',
  },
  ISTA1G: {
    type: '随机振动',
    frequency: '3 ~ 200 Hz',
    amplitude: 'PSD 表格',
    duration: '60 分钟',
    axis: '垂直轴',
    grms: '约 0.52 Grms',
  },
  ISTA1H: {
    type: '随机振动',
    frequency: '3 ~ 200 Hz',
    amplitude: 'PSD 表格',
    duration: '60 分钟',
    axis: '垂直轴',
    grms: '约 0.52 Grms',
  },
  ISTA3H: {
    type: '随机振动 — 卡车谱',
    frequency: '3 ~ 200 Hz',
    amplitude: 'PSD 表格 (多轴可选)',
    duration: '60 分钟/轴',
    axis: '垂直 + 水平 (可选)',
    grms: '约 0.54 Grms',
  },
};

// ============================================================
// DATA: JSON Schema
// ============================================================
const REPORT_SCHEMA = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "ista-test-report/v1.0",
  "title": "ISTA Packaging Test Report",
  "description": "Standard data schema for ISTA packaging test results — compatible with n8n automation workflows",
  "type": "object",
  "required": ["reportId", "testStandard", "packageInfo", "testResults", "verdict"],
  "properties": {
    "reportId": {
      "type": "string",
      "description": "Unique report identifier (UUID v4)",
      "example": "rpt_2026-0720-001-ISTA3A"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp of report creation"
    },
    "lab": {
      "type": "object",
      "properties": {
        "name": { "type": "string", "example": "Shenzhen Packaging Lab" },
        "istaLabId": { "type": "string", "example": "LAB-0042" },
        "certificationExp": { "type": "string", "format": "date" },
        "engineer": { "type": "string" },
        "reviewer": { "type": "string" }
      }
    },
    "testStandard": {
      "type": "object",
      "required": ["code", "version"],
      "properties": {
        "code": {
          "type": "string",
          "enum": ["ISTA-1A","ISTA-1B","ISTA-1C","ISTA-1G","ISTA-1H","ISTA-2A","ISTA-2B","ISTA-3A","ISTA-3B","ISTA-3E","ISTA-3H","ISTA-3K","ISTA-6-AMAZON-SIOC","ISTA-6-AMAZON-OVERBOX","ISTA-6-WALMART","ISTA-6-SAMSCLUB","ISTA-6-TARGET","ISTA-6-FEDEX","ISTA-6-UPS","ISTA-7D","ISTA-7E"],
          "description": "ISTA standard code"
        },
        "version": { "type": "string", "example": "2022" },
        "retailerChannel": {
          "type": "string",
          "description": "Specific retail fulfillment channel if applicable",
          "example": "Amazon.com SIOC"
        }
      }
    },
    "packageInfo": {
      "type": "object",
      "required": ["sku", "weight", "dimensions"],
      "properties": {
        "sku": { "type": "string", "description": "Product SKU or Item ID" },
        "productName": { "type": "string" },
        "weight": {
          "type": "object",
          "properties": {
            "gross_kg": { "type": "number", "minimum": 0 },
            "net_kg": { "type": "number", "minimum": 0 }
          }
        },
        "dimensions": {
          "type": "object",
          "properties": {
            "length_mm": { "type": "integer" },
            "width_mm": { "type": "integer" },
            "height_mm": { "type": "integer" }
          }
        },
        "packageType": {
          "type": "string",
          "enum": ["corrugated_box", "poly_mailer", "padded_mailer", "clamshell", "blister", "wooden_crate", "pallet"],
          "description": "Primary packaging material type"
        },
        "packaging_material": {
          "type": "object",
          "properties": {
            "outer": { "type": "string", "example": "RSC B-flute corrugated, 32 ECT" },
            "inner": { "type": "string", "example": "Expanded PE foam, 50g/L" },
            "fill": { "type": "string", "example": "Air pillows" }
          }
        },
        "batchInfo": {
          "type": "object",
          "properties": {
            "lotNumber": { "type": "string" },
            "manufactureDate": { "type": "string", "format": "date" },
            "sampleCount": { "type": "integer" }
          }
        }
      }
    },
    "conditioning": {
      "type": "object",
      "description": "Pre-conditioning environment results",
      "properties": {
        "method": { "type": "string", "enum": ["TAPPI_T402","ASTM_D4169","ISTA_Annex"] },
        "temperature_C": { "type": "number" },
        "humidity_RH": { "type": "number", "minimum": 0, "maximum": 100 },
        "duration_hours": { "type": "number" },
        "completed": { "type": "boolean" }
      }
    },
    "testResults": {
      "type": "object",
      "description": "Individual test results",
      "properties": {
        "dropTest": {
          "type": "object",
          "properties": {
            "height_cm": { "type": "number" },
            "sequence": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "step": { "type": "integer" },
                  "dropType": { "type": "string", "enum": ["corner","edge","face"] },
                  "orientation": { "type": "string" },
                  "result": { "type": "string", "enum": ["pass","fail","marginal"] },
                  "observations": { "type": "string" }
                }
              }
            },
            "overallResult": { "type": "string", "enum": ["pass","fail"] }
          }
        },
        "vibrationTest": {
          "type": "object",
          "properties": {
            "type": { "type": "string", "enum": ["fixed_frequency","swept_sine","random_psd"] },
            "frequency_range_hz": {
              "type": "object",
              "properties": {
                "min": { "type": "number" },
                "max": { "type": "number" }
              }
            },
            "grms": { "type": "number" },
            "duration_min": { "type": "number" },
            "psd_table_ref": { "type": "string" },
            "result": { "type": "string", "enum": ["pass","fail"] },
            "peak_acceleration_g": { "type": "number" }
          }
        },
        "compressionTest": {
          "type": "object",
          "properties": {
            "testLoad_N": { "type": "number" },
            "calculatedLoad_formula": { "type": "string", "example": "W × (n-1) × SF" },
            "stackLayers": { "type": "integer" },
            "safetyFactor": { "type": "number" },
            "duration_hours": { "type": "number" },
            "maxDeflection_mm": { "type": "number" },
            "result": { "type": "string", "enum": ["pass","fail"] }
          }
        },
        "inclineImpact": {
          "type": "object",
          "properties": {
            "velocity_ms": { "type": "number" },
            "orientation": { "type": "string" },
            "result": { "type": "string", "enum": ["pass","fail"] }
          }
        },
        "altitudeTest": {
          "type": "object",
          "properties": {
            "altitude_m": { "type": "number", "default": 4572 },
            "pressure_kpa": { "type": "number" },
            "duration_hours": { "type": "number" },
            "result": { "type": "string", "enum": ["pass","fail","not_required"] }
          }
        }
      }
    },
    "verdict": {
      "type": "object",
      "required": ["status"],
      "properties": {
        "status": {
          "type": "string",
          "enum": ["PASS","FAIL","CONDITIONAL_PASS","PENDING"],
          "description": "Overall certification verdict"
        },
        "failureMode": {
          "type": "string",
          "description": "Primary failure description if status is FAIL"
        },
        "recommendations": {
          "type": "array",
          "items": { "type": "string" }
        },
        "certificationExpiry": {
          "type": "string",
          "format": "date",
          "description": "Date when certification expires (typically 2 years)"
        }
      }
    },
    "attachments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": { "type": "string", "enum": ["photo","video","raw_data","certificate"] },
          "filename": { "type": "string" },
          "url": { "type": "string", "format": "uri" },
          "uploadedAt": { "type": "string", "format": "date-time" }
        }
      }
    },
    "_n8n_meta": {
      "type": "object",
      "description": "n8n workflow automation metadata",
      "properties": {
        "webhookId": { "type": "string" },
        "workflowId": { "type": "string" },
        "syncStatus": { "type": "string", "enum": ["pending","synced","failed"] },
        "syncedAt": { "type": "string", "format": "date-time" },
        "targetDatabase": { "type": "string", "example": "PostgreSQL/packaging_tests" },
        "notificationsSent": {
          "type": "array",
          "items": { "type": "string", "enum": ["email","slack","teams","airtable"] }
        }
      }
    }
  }
};

// ============================================================
// DATA: Matrix Table Rows
// ============================================================
const MATRIX_DATA = [
  {
    code: 'ISTA 1A',
    type: '≤68 kg 小件',
    cond: false,
    drop: true,
    vib: '固定频率',
    impact: false,
    comp: false,
    alt: false,
    pass: '无产品破损，功能正常',
  },
  {
    code: 'ISTA 1B',
    type: '> 68 kg 重型',
    cond: false,
    drop: true,
    vib: '固定频率',
    impact: false,
    comp: false,
    alt: false,
    pass: '结构完整，产品无损',
  },
  {
    code: 'ISTA 1C',
    type: '≤68 kg 独立包装',
    cond: false,
    drop: true,
    vib: '固定频率/随机',
    impact: false,
    comp: false,
    alt: false,
    pass: '产品无破损，功能完整',
  },
  {
    code: 'ISTA 2A',
    type: '≤68 kg 全尺寸',
    cond: '温湿度调质',
    drop: true,
    vib: '固定频率+扫频',
    impact: '斜面冲击',
    comp: '可选',
    alt: false,
    pass: '主结构完整，无内容物损伤',
  },
  {
    code: 'ISTA 2B',
    type: '> 68 kg 重型',
    cond: '温湿度调质',
    drop: true,
    vib: '固定频率+扫频',
    impact: false,
    comp: '可选',
    alt: false,
    pass: '结构完整，内容物无损',
  },
  {
    code: 'ISTA 3A',
    type: '≤70 kg 全模拟',
    cond: '多场景调质',
    drop: true,
    vib: '随机 PSD',
    impact: '斜面冲击',
    comp: '静载荷',
    alt: '可选',
    pass: '全链路无损，功能完整',
  },
  {
    code: 'ISTA 3B',
    type: '≤230 kg LTL 零担',
    cond: '温湿度调质',
    drop: true,
    vib: '托盘 PSD',
    impact: '可选',
    comp: '静载荷',
    alt: false,
    pass: '托盘结构完整，内容物无损',
  },
  {
    code: 'ISTA 3E',
    type: '托盘单元化',
    cond: '必选',
    drop: '旋转棱跌落2次',
    vib: '托盘随机振动',
    impact: false,
    comp: '堆码模拟',
    alt: false,
    pass: '托盘结构完整，货物无位移',
  },
  {
    code: 'ISTA 3H',
    type: '≥45 kg 家电',
    cond: '必选',
    drop: '平面+旋转棱',
    vib: '卡车随机谱',
    impact: false,
    comp: '高堆码',
    alt: false,
    pass: '产品功能正常，包装完整',
  },
  {
    code: 'ISTA 3K',
    type: '≤45 kg 快消品',
    cond: '必选',
    drop: '依重量分级',
    vib: '卡车随机谱',
    impact: '侧向冲击',
    comp: '动态堆码',
    alt: false,
    pass: '产品可上架销售，包装无失效',
  },
  {
    code: 'ISTA 6-AMAZON SIOC',
    type: '≤23 kg 电商直发',
    cond: '72h/38°C/85%RH',
    drop: '46cm+91cm高跌',
    vib: 'Amazon 专有谱',
    impact: false,
    comp: '静载荷',
    alt: '可选',
    pass: '产品完整，外箱可售状态',
  },
  {
    code: 'ISTA 6-WALMART',
    type: '≤68 kg 供应商',
    cond: '必选',
    drop: true,
    vib: 'Walmart 专有谱',
    impact: '可选',
    comp: '静载荷',
    alt: false,
    pass: '无退货损伤，堆码完整',
  },
  {
    code: "ISTA 6-SAMSCLUB",
    type: '≤68 kg 仓储展示',
    cond: '必选',
    drop: '46cm/最大81cm',
    vib: "Sam's 振动谱",
    impact: false,
    comp: '高层堆码',
    alt: false,
    pass: '产品可售，展示完好',
  },
  {
    code: 'ISTA 6-TARGET',
    type: '≤45 kg 零售商',
    cond: '必选',
    drop: true,
    vib: 'Target 振动谱',
    impact: '可选',
    comp: '静载荷',
    alt: false,
    pass: '满足上架展示标准',
  },

  {
    code: 'ISTA 6-FEDEX',
    type: '≤68 kg 快递',
    cond: '必选',
    drop: '固定 78.7cm',
    vib: 'FedEx 专属谱',
    impact: '斜面+危险物',
    comp: '可选',
    alt: '可选',
    pass: '产品无损，无泄漏，标签可读',
  },
  {
    code: 'ISTA 7D',
    type: '温控包装',
    cond: '温度曲线',
    drop: '可选',
    vib: '可选',
    impact: false,
    comp: false,
    alt: false,
    pass: 'Tmin~Tmax持续≥规定时长',
  },
];

// ============================================================
// STATE
// ============================================================
let state = {
  activeStep: -1,
  currentDropHeight: 0,
  currentStandard: null,
  unit: 'kg',
  animFrame: null,
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderStandardsGrid();
  renderMatrix();
  renderSchema();
  setupUnitToggle();
  setupFilterChips();
  setupSearchInput();
  setupCustomSF();
  setupVibStandard();
  setupCanvasInteraction();
});

// ============================================================
// NAVIGATION
// ============================================================
function initNav() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNavLink();
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const offset = section.getBoundingClientRect().top;
    if (offset <= 90) current = section.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

// ============================================================
// STANDARDS GRID
// ============================================================
function renderStandardsGrid(filter = 'all', query = '') {
  const grid = document.getElementById('standardsGrid');
  const filtered = ISTA_STANDARDS.filter(s => {
    const matchFilter = filter === 'all' || s.series === filter;
    const q = query.toLowerCase();
    const matchQuery = !q ||
      s.code.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q)) ||
      s.description.toLowerCase().includes(q);
    return matchFilter && matchQuery;
  });

  grid.innerHTML = filtered.map(s => {
    const seriesLabel = { series1: 'Series 1', series2: 'Series 2', series3: 'Series 3', series6: 'Series 6', series7: 'Series 7' }[s.series];
    const testBadges = s.tests.map(t => ({
      drop: '<span class="test-badge test-drop">跌落</span>',
      vib: '<span class="test-badge test-vib">振动</span>',
      comp: '<span class="test-badge test-comp">堆码压力</span>',
      cond: '<span class="test-badge test-cond">环境调质</span>',
      impact: '<span class="test-badge test-impact">斜面冲击</span>',
      alt: '<span class="test-badge test-alt">低气压</span>',
      thermal: '<span class="test-badge test-thermal">热力测试</span>',
    }[t])).filter(Boolean).join('');

    return `
      <div class="standard-card" onclick="openStandardModal('${s.id}')">
        <div class="card-series ${s.series}">${seriesLabel}</div>
        <div class="card-code">${s.code}</div>
        <div class="card-name">${s.name}</div>
        <div class="card-meta">
          <span class="meta-tag">样品数: ${s.specimens}件</span>
          <span class="meta-tag">${s.weightLimit}</span>
        </div>
        <div class="card-tests">${testBadges}</div>
      </div>
    `;
  }).join('');

  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
      <p style="font-size:32px;margin-bottom:12px;">🔍</p>
      <p>未找到匹配的标准，请尝试其他关键词</p>
    </div>`;
  }
}

function setupFilterChips() {
  document.getElementById('filterChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip-active'));
    chip.classList.add('chip-active');
    renderStandardsGrid(chip.dataset.filter, document.getElementById('standardSearch').value);
  });
}

function setupSearchInput() {
  document.getElementById('standardSearch').addEventListener('input', e => {
    const activeFilter = document.querySelector('.chip-active')?.dataset.filter || 'all';
    renderStandardsGrid(activeFilter, e.target.value);
  });
}

// ============================================================
// MODAL
// ============================================================
function openStandardModal(id) {
  const std = ISTA_STANDARDS.find(s => s.id === id);
  if (!std) return;

  const seriesLabel = { series1: 'Series 1', series2: 'Series 2', series3: 'Series 3', series6: 'Series 6', series7: 'Series 7' }[std.series];

  const dropTable = std.dropHeights.length
    ? `<table style="width:100%;font-size:12px;border-collapse:collapse;margin-top:8px;">
        <tr style="border-bottom:1px solid var(--border);">
          <th style="text-align:left;padding:6px 8px;color:var(--text-muted);font-size:10px;text-transform:uppercase;">重量范围</th>
          <th style="text-align:right;padding:6px 8px;color:var(--text-muted);font-size:10px;text-transform:uppercase;">跌落高度</th>
        </tr>
        ${std.dropHeights.map(d => `
          <tr style="border-bottom:1px solid rgba(255,255,255,0.03);">
            <td style="padding:7px 8px;color:var(--text-secondary);">${d.label ? d.label : `≤ ${d.maxKg}`} kg</td>
            <td style="padding:7px 8px;text-align:right;font-family:var(--font-mono);font-weight:600;color:var(--accent-green);">${d.height_cm} cm (${(d.height_cm / 2.54).toFixed(1)} in)</td>
          </tr>
        `).join('')}
      </table>`
    : '<p style="font-size:13px;color:var(--text-muted);">请参阅原版测试文件中的重型件跌落要求</p>';

  const modalHtml = `
    <div class="modal-overlay active" id="stdModal" onclick="closeModal(event)">
      <div class="modal">
        <div class="modal-header">
          <div>
            <div class="card-series ${std.series}" style="margin-bottom:8px;">${seriesLabel}</div>
            <h2 style="font-size:22px;font-weight:800;margin-bottom:4px;">${std.code}</h2>
            <p style="font-size:14px;color:var(--text-secondary);">${std.name}</p>
          </div>
          <button class="modal-close" onclick="document.getElementById('stdModal').remove()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <div class="modal-section-title">测试概述</div>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.7;">${std.description}</p>
          </div>
          <div class="modal-section">
            <div class="modal-section-title">基本参数</div>
            <div class="modal-field"><span class="field-label">重量限制</span><span class="field-value">${std.weightLimit}</span></div>
            <div class="modal-field"><span class="field-label">样品数量</span><span class="field-value">${std.specimens} 件</span></div>
            <div class="modal-field"><span class="field-label">测试目的</span><span class="field-value" style="max-width:340px;text-align:right;">${std.purpose}</span></div>
          </div>
          <div class="modal-section">
            <div class="modal-section-title">测试项目明细</div>
            ${Object.entries(std.testDetails).map(([k, v]) => {
              const labels = { conditioning:'环境调质', drop:'跌落测试', vibration:'振动测试', compression:'堆码压力', impact:'斜面冲击', altitude:'低气压测试', thermal:'热力测试 (温控)' };
              const isFalse = v === '无' || v === false;
              return `<div class="modal-field">
                <span class="field-label">${labels[k] || k}</span>
                <span class="field-value" style="color:${isFalse ? 'var(--text-muted)' : 'var(--text-primary)'}">${v === false ? '不要求' : v}</span>
              </div>`;
            }).join('')}
          </div>
          <div class="modal-section">
            <div class="modal-section-title">跌落高度速查</div>
            ${dropTable}
          </div>
          <div class="modal-section">
            <div class="modal-section-title">Pass / Fail 判定标准</div>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.7;">${std.passFailCriteria}</p>
          </div>
          <div style="margin-top:8px;">
            <button class="btn btn-primary" style="width:100%;" onclick="loadStandardToCalc('${std.id}'); document.getElementById('stdModal').remove();">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              在跌落计算器中使用此标准
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeModal(event) {
  if (event.target.id === 'stdModal') {
    event.target.remove();
  }
}

function loadStandardToCalc(id) {
  const std = ISTA_STANDARDS.find(s => s.id === id);
  if (!std) return;
  const selectEl = document.getElementById('standardSelect');
  const map = {
    'ISTA-1A': '1A', 'ISTA-1B': '1B', 'ISTA-1C': '1C',
    'ISTA-2A': '2A', 'ISTA-2B': '2B',
    'ISTA-3A': '3A', 'ISTA-3B': '3B',
    'ISTA-6-AMAZON-SIOC': '6-AMAZON-SIOC',
    'ISTA-6-AMAZON-PREP': '6-AMAZON-PREP',
    'ISTA-6-WALMART': '6-WALMART',
    'ISTA-6-SAMSCLUB': '6-SAMSCLUB',
    'ISTA-6-TARGET': '6-TARGET',
    'ISTA-6-FEDEX': '6-FEDEX',
    'ISTA-6-UPS': '6-UPS',
    'ISTA-3H': '3H',
    'ISTA-3K': '3K',
    'ISTA-7D': '7D',
    'ISTA-7E': '7E',
    'ISTA-1G': '1G',
    'ISTA-1H': '1H',
  };
  if (map[id]) selectEl.value = map[id];
  document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
}

// ============================================================
// UNIT TOGGLE
// ============================================================
function setupUnitToggle() {
  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newUnit = btn.dataset.unit;
      if (newUnit === state.unit) return;

      const weightInput = document.getElementById('weightInput');
      const currentVal = parseFloat(weightInput.value);

      if (!isNaN(currentVal)) {
        weightInput.value = newUnit === 'lb'
          ? (currentVal * 2.20462).toFixed(2)
          : (currentVal / 2.20462).toFixed(2);
      }

      document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('unit-active'));
      btn.classList.add('unit-active');
      state.unit = newUnit;
    });
  });
}

// ============================================================
// DROP CALCULATOR
// ============================================================
// Lookup table: <select> value → ISTA_STANDARDS id
const STANDARD_VALUE_MAP = {
  '1A': 'ISTA-1A', '1B': 'ISTA-1B', '1C': 'ISTA-1C',
  '2A': 'ISTA-2A', '2B': 'ISTA-2B',
  '3A': 'ISTA-3A', '3B': 'ISTA-3B', '3E': 'ISTA-3E',
  '6-AMAZON-SIOC': 'ISTA-6-AMAZON-SIOC',
  '6-AMAZON-PREP': 'ISTA-6-AMAZON-PREP',
  '6-WALMART': 'ISTA-6-WALMART',
  '6-SAMSCLUB': 'ISTA-6-SAMSCLUB',
  '6-TARGET': 'ISTA-6-TARGET',
  '6-FEDEX': 'ISTA-6-FEDEX',
  '6-UPS': 'ISTA-6-UPS',
  '3H': 'ISTA-3H',
  '3K': 'ISTA-3K',
  '7D': 'ISTA-7D',
  '7E': 'ISTA-7E',
  '1G': 'ISTA-1G',
  '1H': 'ISTA-1H',
};

function getDropHeight(standard, weightKg) {
  const stdId = STANDARD_VALUE_MAP[standard];
  const std = stdId ? ISTA_STANDARDS.find(s => s.id === stdId) : null;

  if (!std || !std.dropHeights.length) {
    // Fallback ISTA generic table
    const generic = [
      { maxKg: 9, height_cm: 76.2 },
      { maxKg: 18, height_cm: 61 },
      { maxKg: 27, height_cm: 45.7 },
      { maxKg: 45, height_cm: 30.5 },
      { maxKg: 68, height_cm: 20.3 },
    ];
    for (const row of generic) {
      if (weightKg <= row.maxKg) return row.height_cm;
    }
    return 10.2;
  }

  for (const row of std.dropHeights) {
    if (weightKg <= row.maxKg) return row.height_cm;
  }
  return std.dropHeights[std.dropHeights.length - 1].height_cm;
}

function calculateDrop() {
  const weightRaw = parseFloat(document.getElementById('weightInput').value);
  const standard = document.getElementById('standardSelect').value;

  if (!weightRaw || weightRaw <= 0) {
    alert('请输入有效的包装件重量');
    return;
  }
  if (!standard) {
    alert('请选择测试标准');
    return;
  }

  const weightKg = state.unit === 'lb' ? weightRaw / 2.20462 : weightRaw;
  const heightCm = getDropHeight(standard, weightKg);
  const heightIn = (heightCm / 2.54).toFixed(1);

  state.currentDropHeight = heightCm;
  state.currentStandard = standard;

  // Show results
  const resultPanel = document.getElementById('resultPanel');
  const resultItems = document.getElementById('resultItems');

  resultItems.innerHTML = `
    <div class="result-item">
      <span class="result-key">包装重量</span>
      <span class="result-val">${weightKg.toFixed(2)} kg (${(weightKg * 2.20462).toFixed(1)} lb)</span>
    </div>
    <div class="result-item">
      <span class="result-key">适用标准</span>
      <span class="result-val">ISTA ${standard}</span>
    </div>
    <div class="result-item">
      <span class="result-key">法定跌落高度</span>
      <span class="result-val">${heightCm} cm (${heightIn} in)</span>
    </div>
    <div class="result-item">
      <span class="result-key">跌落次数</span>
      <span class="result-val">10 次</span>
    </div>
    <div class="result-item">
      <span class="result-key">跌落顺序</span>
      <span class="result-val">角→棱→面</span>
    </div>
  `;
  resultPanel.style.display = 'block';

  // Draw canvas
  drawBox(0);

  // Show sequence
  renderDropSequence();
}

// ============================================================
// CANVAS 3D BOX — INTERACTIVE (Drag Rotate + Scroll Zoom)
// ============================================================

// Orbit state
let orbitX = 0.6;   // horizontal rotation (radians, ~35° default for isometric look)
let orbitY = 0.55;  // vertical rotation (radians)
let viewZoom = 1.0;
let dragActive = false;
let dragPrev = { x: 0, y: 0 };

// Auto-play state
let autoPlayInterval = null;
let autoPlayStep = 0;
let isAutoPlaying = false;

function setupCanvasInteraction() {
  const canvas = document.getElementById('boxCanvas');
  const wrapper = canvas.parentElement;

  // Mouse drag → orbit
  canvas.addEventListener('mousedown', (e) => {
    dragActive = true;
    dragPrev = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = 'grabbing';
    stopAutoPlay();
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragActive) return;
    const dx = e.clientX - dragPrev.x;
    const dy = e.clientY - dragPrev.y;
    orbitX += dx * 0.008;
    orbitY = Math.max(-0.8, Math.min(1.2, orbitY - dy * 0.008));
    dragPrev = { x: e.clientX, y: e.clientY };
    if (state.currentDropHeight > 0) drawBox(state.activeStep >= 0 ? state.activeStep : 0);
  });

  window.addEventListener('mouseup', () => {
    dragActive = false;
    const canvas = document.getElementById('boxCanvas');
    if (canvas) canvas.style.cursor = 'grab';
  });

  // Scroll → zoom
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    viewZoom = Math.max(0.4, Math.min(2.5, viewZoom - e.deltaY * 0.001));
    if (state.currentDropHeight > 0) drawBox(state.activeStep >= 0 ? state.activeStep : 0);
  });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      dragActive = true;
      dragPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      stopAutoPlay();
    }
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    if (!dragActive || e.touches.length !== 1) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - dragPrev.x;
    const dy = e.touches[0].clientY - dragPrev.y;
    orbitX += dx * 0.008;
    orbitY = Math.max(-0.8, Math.min(1.2, orbitY - dy * 0.008));
    dragPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (state.currentDropHeight > 0) drawBox(state.activeStep >= 0 ? state.activeStep : 0);
  }, { passive: false });

  canvas.addEventListener('touchend', () => { dragActive = false; });

  // Reset view on double-click
  canvas.addEventListener('dblclick', () => {
    orbitX = 0.6; orbitY = 0.55; viewZoom = 1.0;
    if (state.currentDropHeight > 0) drawBox(state.activeStep >= 0 ? state.activeStep : 0);
  });
}

// 3D rotation helper: apply orbit rotation to a point
function rotatePoint(x, y, z) {
  // Rotate around Y axis (horizontal orbit)
  const cosY = Math.cos(orbitX);
  const sinY = Math.sin(orbitX);
  const rx = x * cosY - z * sinY;
  const rz = x * sinY + z * cosY;
  // Rotate around X axis (vertical orbit)
  const cosX = Math.cos(orbitY);
  const sinX = Math.sin(orbitY);
  const ry = y * cosX - rz * sinX;
  const rz2 = y * sinX + rz * cosX;
  return { x: rx, y: ry, z: rz2 };
}

function drawBox(activeStep) {
  const canvas = document.getElementById('boxCanvas');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width / dpr;
  const H = canvas.height / dpr;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(dpr, dpr);

  // Dark background with subtle gradient
  const bgGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.7);
  bgGrad.addColorStop(0, '#1a2035');
  bgGrad.addColorStop(1, '#0f1420');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Draw grid floor
  ctx.strokeStyle = 'rgba(99,179,237,0.06)';
  ctx.lineWidth = 1;
  const gridSize = 30;
  for (let x = 0; x < W; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Box geometry
  const cx = W / 2;
  const cy = H / 2 - 20;
  const scale = viewZoom * 1.0;
  const bw = 140 * scale;
  const bh = 110 * scale;
  const bd = 100 * scale;

  // Build rotated vertices
  const rawVerts = [
    [0, 0, 0], [bw, 0, 0], [bw, bh, 0], [0, bh, 0],       // front: 0-3
    [0, 0, bd], [bw, 0, bd], [bw, bh, bd], [0, bh, bd],    // back: 4-7
  ];
  const rotated = rawVerts.map(v => rotatePoint(v[0] - bw/2, v[1], v[2] - bd/2));
  // Project: orthographic-ish onto 2D
  const verts = rotated.map(r => ({
    x: cx + r.x,
    y: cy + r.y * 0.45 - r.z * 0.85,
    zDepth: r.z, // for basic z-sorting
  }));

  // Face definitions with face indices (from original vertex indices)
  const faces = {
    front: [0, 1, 2, 3],
    right: [1, 5, 6, 2],
    top:  [3, 2, 6, 7],
    back: [4, 5, 6, 7],
    left: [0, 4, 7, 3],
    bottom: [0, 1, 5, 4],
  };

  // Active highlight
  const stepData = DROP_SEQUENCE[activeStep];

  // Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 40 * scale;
  ctx.shadowOffsetY = 20 * scale;

  // Draw a single face
  const drawFace = (vIdxs, baseColor, label, highlightColor) => {
    const pts = vIdxs.map(i => verts[i]);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();

    if (highlightColor) {
      const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[2].x, pts[2].y);
      grad.addColorStop(0, highlightColor + 'cc');
      grad.addColorStop(1, highlightColor + '88');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = baseColor;
    }
    ctx.fill();

    ctx.strokeStyle = highlightColor ? highlightColor : 'rgba(99,179,237,0.3)';
    ctx.lineWidth = highlightColor ? 2.5 : 1;
    ctx.stroke();

    // Face label
    if (label) {
      const cx2 = pts.reduce((s, p) => s + p.x, 0) / pts.length;
      const cy2 = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      ctx.restore();
      ctx.save();
      ctx.font = `${highlightColor ? 700 : 600} ${highlightColor ? 14 : 11}px Inter, sans-serif`;
      ctx.fillStyle = highlightColor ? '#fff' : 'rgba(255,255,255,0.4)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, cx2, cy2);
      ctx.restore();
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 40;
    }
  };

  // Determine face/edge/corner highlights
  let faceHL = {}; // map face name → color
  let cornerHL = null;
  let edgeHL = null;

  if (stepData) {
    if (stepData.type === 'corner') {
      cornerHL = stepData.color;
    } else if (stepData.type === 'edge') {
      edgeHL = stepData.step;
    } else if (stepData.type === 'face') {
      // Map step to face
      const faceMap = { 5: 'bottom', 6: 'top', 7: 'front', 8: 'back', 9: 'left', 10: 'right' };
      if (faceMap[stepData.step]) faceHL[faceMap[stepData.step]] = stepData.color;
    }
  }

  // Draw all 6 faces (with z-sorting for basic correctness)
  drawFace(faces.back,  'rgba(18,28,50,0.9)',  null, faceHL['back']);
  drawFace(faces.left,  'rgba(14,22,42,0.9)',  null, faceHL['left']);
  drawFace(faces.bottom,'rgba(10,18,35,0.9)',  null, faceHL['bottom']);
  drawFace(faces.right, 'rgba(22,35,58,0.9)',  '5/6', faceHL['right']);
  drawFace(faces.front, 'rgba(30,45,72,0.9)',  '3/4', faceHL['front']);
  drawFace(faces.top,   'rgba(38,58,88,0.9)',  '1/2', faceHL['top']);

  ctx.restore();

  // Edge highlights
  if (edgeHL) {
    const edgeColor = '#fbd38d';
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.shadowColor = edgeColor;
    ctx.shadowBlur = 10;

    // Edge definitions (vertex index pairs)
    const edges = {
      2: [0, 4],  // edge 1: shortest (front-bottom-left to back-bottom-left)
      3: [0, 1],  // edge 2: medium (front-bottom-left to front-bottom-right)
      4: [0, 3],  // edge 3: longest (front-bottom-left to front-top-left)
    };
    const edge = edges[edgeHL];
    if (edge) {
      ctx.beginPath();
      ctx.moveTo(verts[edge[0]].x, verts[edge[0]].y);
      ctx.lineTo(verts[edge[1]].x, verts[edge[1]].y);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }

  // Corner highlight (pulsing)
  if (cornerHL) {
    ctx.save();
    ctx.shadowColor = cornerHL;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    const pulse = 1 + 0.15 * Math.sin(Date.now() * 0.005);
    ctx.arc(verts[0].x, verts[0].y, 10 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = cornerHL;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  // Vertex dots
  verts.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(v.x, v.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(99,179,237,0.5)';
    ctx.fill();
  });

  // Drop height indicator
  const dropH = state.currentDropHeight;
  if (dropH > 0) {
    ctx.save();
    const topOfBox = Math.min(...[2,3,6,7].map(i => verts[i].y));
    const bottomOfBox = Math.max(...[0,1,4,5].map(i => verts[i].y));
    const floorY = bottomOfBox + 60 * scale;

    // Arrow line
    ctx.strokeStyle = 'rgba(252,129,129,0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(W - 50, floorY);
    ctx.lineTo(W - 50, topOfBox - 10);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrow heads
    ctx.fillStyle = 'rgba(252,129,129,0.8)';
    ctx.beginPath();
    ctx.moveTo(W - 50, topOfBox - 10);
    ctx.lineTo(W - 54, topOfBox);
    ctx.lineTo(W - 46, topOfBox);
    ctx.closePath(); ctx.fill();

    // Label
    ctx.fillStyle = '#fc8181';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${dropH} cm`, W - 50, (floorY + topOfBox) / 2);
    ctx.font = '9px Inter';
    ctx.fillStyle = 'rgba(252,129,129,0.6)';
    ctx.fillText('跌落高度', W - 50, (floorY + topOfBox) / 2 + 14);
    ctx.restore();
  }

  // Legend
  if (activeStep >= 0 && stepData) {
    ctx.save();
    const lgx = 16, lgy = H - 60;
    ctx.fillStyle = 'rgba(20,25,40,0.9)';
    ctx.strokeStyle = stepData.color;
    ctx.lineWidth = 1.5;
    roundRect(ctx, lgx, lgy, 190, 46, 8);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = stepData.color;
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`步骤 ${stepData.step}/10 — ${stepData.label}`, lgx + 10, lgy + 16);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '11px Inter';
    ctx.fillText(stepData.desc, lgx + 10, lgy + 34);
    ctx.restore();
  }

  // Interaction hint (shown briefly)
  if (state.currentDropHeight > 0) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '10px Inter';
    ctx.textAlign = 'right';
    ctx.fillText('🖱 拖拽旋转 · 滚轮缩放 · 双击重置', W - 16, 22);
    ctx.restore();
  }

  // Hide overlay
  document.getElementById('canvasOverlay').classList.add('hidden');

  ctx.restore();
}

// Coroutine-based animation frame for corner pulse
let cornerPulseFrame = null;
function startCornerPulse() {
  if (cornerPulseFrame) return;
  function pulse() {
    if (state.activeStep >= 0 && DROP_SEQUENCE[state.activeStep]?.type === 'corner') {
      drawBox(state.activeStep);
    }
    cornerPulseFrame = requestAnimationFrame(pulse);
  }
  cornerPulseFrame = requestAnimationFrame(pulse);
}
function stopCornerPulse() {
  if (cornerPulseFrame) { cancelAnimationFrame(cornerPulseFrame); cornerPulseFrame = null; }
}

// Auto-play
function startAutoPlay() {
  stopAutoPlay();
  isAutoPlaying = true;
  autoPlayStep = 0;
  highlightStep(0);
  startCornerPulse();

  autoPlayInterval = setInterval(() => {
    autoPlayStep = (autoPlayStep + 1) % 10;
    highlightStep(autoPlayStep);
  }, 1200);

  const btn = document.getElementById('autoPlayBtn');
  if (btn) { btn.innerHTML = '⏸ 停止'; btn.classList.add('playing'); }
}

function stopAutoPlay() {
  if (autoPlayInterval) { clearInterval(autoPlayInterval); autoPlayInterval = null; }
  isAutoPlaying = false;
  stopCornerPulse();
  const btn = document.getElementById('autoPlayBtn');
  if (btn) { btn.innerHTML = '▶ 自动播放'; btn.classList.remove('playing'); }
}

function toggleAutoPlay() {
  if (isAutoPlaying) stopAutoPlay(); else startAutoPlay();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ============================================================
// DROP SEQUENCE STEPS
// ============================================================
function renderDropSequence() {
  const container = document.getElementById('dropSequence');
  const steps = document.getElementById('sequenceSteps');

  steps.innerHTML = DROP_SEQUENCE.map(s => `
    <div class="seq-step seq-type-${s.type}" id="step-${s.step}" onclick="highlightStep(${s.step - 1})">
      <div class="seq-num">${s.step}</div>
      <div class="seq-info">
        <div class="seq-label">${s.label}</div>
        <div class="seq-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');

  container.style.display = 'block';
}

function highlightStep(idx) {
  state.activeStep = idx;
  document.querySelectorAll('.seq-step').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
  drawBox(idx);
  // Start corner pulse animation if viewing the corner step
  if (DROP_SEQUENCE[idx]?.type === 'corner') {
    startCornerPulse();
  } else {
    stopCornerPulse();
  }
}

// ============================================================
// COMPRESSION CALCULATOR
// ============================================================
function calculateCompression() {
  const weight = parseFloat(document.getElementById('stackWeight').value);
  const layers = parseInt(document.getElementById('stackHeight').value);
  const sfSelect = document.getElementById('safetyFactor').value;
  const sf = sfSelect === 'custom'
    ? parseFloat(document.getElementById('customSF').value)
    : parseFloat(sfSelect);
  const boxLen = parseFloat(document.getElementById('boxLength').value);
  const boxWid = parseFloat(document.getElementById('boxWidth').value);

  if (!weight || !layers || !sf) {
    alert('请填写完整的计算参数');
    return;
  }

  // Formula: Load = Weight × (n - 1) × SF
  const requiredLoad_kg = weight * (layers - 1) * sf;
  const requiredLoad_N = requiredLoad_kg * 9.81;
  const requiredLoad_lbf = requiredLoad_kg * 2.20462;

  let pressureStr = '';
  if (boxLen && boxWid) {
    const areaMm2 = boxLen * boxWid;
    const areaCm2 = areaMm2 / 100;
    const pressureKPa = (requiredLoad_N / (areaMm2 / 1e6)) / 1000;
    pressureStr = `
      <div class="result-item">
        <span class="result-key">底面积</span>
        <span class="result-val">${areaCm2.toFixed(0)} cm²</span>
      </div>
      <div class="result-item">
        <span class="result-key">表面压强</span>
        <span class="result-val">${pressureKPa.toFixed(2)} kPa</span>
      </div>
    `;
  }

  const resultEl = document.getElementById('compressionResult');
  resultEl.innerHTML = `
    <div class="result-header">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 11l3 3L22 4"/>
      </svg>
      堆码载荷计算结果
    </div>
    <div class="result-items">
      <div class="result-item">
        <span class="result-key">单件重量 × 层数</span>
        <span class="result-val">${weight} kg × ${layers - 1} 层 × SF ${sf}</span>
      </div>
      <div class="result-item">
        <span class="result-key">所需压缩载荷</span>
        <span class="result-val">${requiredLoad_kg.toFixed(1)} kg</span>
      </div>
      <div class="result-item">
        <span class="result-key">换算 (牛顿)</span>
        <span class="result-val">${requiredLoad_N.toFixed(0)} N</span>
      </div>
      <div class="result-item">
        <span class="result-key">换算 (磅力)</span>
        <span class="result-val">${requiredLoad_lbf.toFixed(1)} lbf</span>
      </div>
      ${pressureStr}
      <div class="result-item">
        <span class="result-key">持续时间</span>
        <span class="result-val">≥ 1 小时</span>
      </div>
    </div>
    <p style="font-size:11px;color:var(--text-muted);margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.05);">
      公式: F = W × (n−1) × SF｜W=单件重量 n=堆码层数 SF=安全系数
    </p>
  `;
  resultEl.style.display = 'block';
}

function setupCustomSF() {
  document.getElementById('safetyFactor').addEventListener('change', e => {
    document.getElementById('customSFGroup').style.display = e.target.value === 'custom' ? 'block' : 'none';
  });
}

// ============================================================
// VIBRATION PARAMS
// ============================================================
function setupVibStandard() {
  document.getElementById('vibStandard').addEventListener('change', showVibParams);
}

function showVibParams() {
  const key = document.getElementById('vibStandard').value;
  const weightKg = parseFloat(document.getElementById('vibWeight2').value) || null;
  const params = VIB_PARAMS[key];
  const container = document.getElementById('vibParams');

  if (!params || !key) {
    container.style.display = 'none';
    return;
  }

  const grmsNote = (key === 'AMAZON_SIOC' && weightKg)
    ? (weightKg <= 9 ? '0.58 Grms (≤9kg 适用)' : '0.44 Grms (>9kg 适用)')
    : params.grms;

  container.innerHTML = `
    <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent-purple);margin-bottom:8px;">振动测试参数</div>
    <div class="vib-param-row"><span class="vib-param-label">测试类型</span><span class="vib-param-value">${params.type}</span></div>
    <div class="vib-param-row"><span class="vib-param-label">频率范围</span><span class="vib-param-value">${params.frequency}</span></div>
    <div class="vib-param-row"><span class="vib-param-label">振幅/强度</span><span class="vib-param-value">${params.amplitude}</span></div>
    <div class="vib-param-row"><span class="vib-param-label">测试时长</span><span class="vib-param-value">${params.duration}</span></div>
    <div class="vib-param-row"><span class="vib-param-label">振动轴向</span><span class="vib-param-value">${params.axis}</span></div>
    <div class="vib-param-row"><span class="vib-param-label">Grms 值</span><span class="vib-param-value">${grmsNote}</span></div>
  `;
  container.style.display = 'flex';
}

// ============================================================
// MATRIX TABLE
// ============================================================
function renderMatrix() {
  const cellCheck = (val) => {
    if (val === false || val === '无') return `<span class="cell-check check-no">— 不要求</span>`;
    if (val === true) return `<span class="cell-check check-yes">✓ 必选</span>`;
    if (typeof val === 'string' && val.includes('可选')) return `<span class="cell-check check-opt">△ ${val}</span>`;
    if (typeof val === 'string') return `<span class="cell-check check-yes">✓ ${val}</span>`;
    return `<span class="cell-check check-no">—</span>`;
  };

  document.getElementById('matrixBody').innerHTML = MATRIX_DATA.map(row => `
    <tr>
      <td class="td-sticky">${row.code}</td>
      <td style="color:var(--text-primary);">${row.type}</td>
      <td>${cellCheck(row.cond)}</td>
      <td>${cellCheck(row.drop)}</td>
      <td>${cellCheck(row.vib)}</td>
      <td>${cellCheck(row.impact)}</td>
      <td>${cellCheck(row.comp)}</td>
      <td>${cellCheck(row.alt)}</td>
      <td style="max-width:200px;white-space:normal;font-size:12px;color:var(--text-secondary);">${row.pass}</td>
    </tr>
  `).join('');
}

// ============================================================
// JSON SCHEMA RENDER
// ============================================================
function renderSchema() {
  const raw = JSON.stringify(REPORT_SCHEMA, null, 2);
  const highlighted = syntaxHighlight(raw);
  document.getElementById('schemaCode').innerHTML = highlighted;
}

function syntaxHighlight(json) {
  return json
    .replace(/("(?:[^"\\]|\\.)*")\s*:/g, (m, key) => `<span class="json-key">${key}</span>:`)
    .replace(/:\s*("(?:[^"\\]|\\.)*")/g, (m, str) => `: <span class="json-str">${str}</span>`)
    .replace(/:\s*(-?\d+\.?\d*)/g, (m, num) => `: <span class="json-num">${num}</span>`)
    .replace(/:\s*(true|false)/g, (m, bool) => `: <span class="json-bool">${bool}</span>`)
    .replace(/:\s*(null)/g, (m, n) => `: <span class="json-null">${n}</span>`);
}

function copySchema() {
  const text = JSON.stringify(REPORT_SCHEMA, null, 2);
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copySchemaBtnTop');
    const orig = btn.innerHTML;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> 已复制`;
    btn.style.color = 'var(--accent-green)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
  });
}

function downloadSchema() {
  const blob = new Blob([JSON.stringify(REPORT_SCHEMA, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ista_test_report.schema.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.standard-card, .vib-card, .schema-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Re-observe after grid re-render
const gridObserver = new MutationObserver(() => {
  document.querySelectorAll('#standardsGrid .standard-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    // Trigger reflow
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
});

gridObserver.observe(document.getElementById('standardsGrid'), { childList: true });

// ============================================================
// CANVAS RESIZE
// ============================================================
function resizeCanvas() {
  const canvas = document.getElementById('boxCanvas');
  const wrapper = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const w = Math.min(wrapper.clientWidth - 2, 540);
  const h = Math.round(w * 0.9);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  if (state.currentDropHeight > 0) drawBox(state.activeStep >= 0 ? state.activeStep : 0);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ============================================================
// TEST REPORT GENERATOR
// ============================================================
function generateReport() {
  const weight = parseFloat(document.getElementById('weightInput').value);
  const standard = document.getElementById('standardSelect').value;
  const transport = document.querySelector('input[name="transport"]:checked')?.value || 'parcel';

  if (!weight || !standard) {
    alert('请先在跌落计算器中输入参数并计算');
    return;
  }

  const weightKg = state.unit === 'lb' ? weight / 2.20462 : weight;
  const heightCm = getDropHeight(standard, weightKg);
  const stdId = STANDARD_VALUE_MAP[standard];
  const stdData = ISTA_STANDARDS.find(s => s.id === stdId);
  const now = new Date();
  const dateStr = now.toLocaleDateString('zh-CN');
  const reportId = 'RPT-' + now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0') + '-' + Math.floor(Math.random()*9000+1000);

  const transportLabel = { parcel: '小包裹/快递', ltl: 'LTL 零担运输', air: '航空运输' }[transport];

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>ISTA 测试规划报告 — ${reportId}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; color: #1a202c; padding: 40px; }
  .page { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.1); overflow: hidden; }
  .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 32px 40px; }
  .header h1 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
  .header p { font-size: 13px; opacity: 0.8; }
  .badge { display: inline-block; background: rgba(255,255,255,0.2); border-radius: 20px;
           padding: 4px 12px; font-size: 11px; font-weight: 700; margin-top: 8px; }
  .body { padding: 32px 40px; }
  .section { margin-bottom: 28px; }
  .section-title { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
                   color: #667eea; border-bottom: 2px solid #667eea22; padding-bottom: 6px; margin-bottom: 14px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .field { background: #f8fafc; border-radius: 8px; padding: 12px; }
  .field-label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #718096; margin-bottom: 4px; }
  .field-value { font-size: 15px; font-weight: 700; color: #1a202c; }
  .field-value.highlight { color: #667eea; font-size: 20px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { background: #667eea; color: white; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; }
  td { padding: 9px 12px; border-bottom: 1px solid #edf2f7; }
  tr:nth-child(even) td { background: #f8fafc; }
  .step-corner { color: #e53e3e; font-weight: 700; }
  .step-edge { color: #d69e2e; font-weight: 700; }
  .step-face { color: #3182ce; font-weight: 700; }
  .footer { background: #f8fafc; border-top: 1px solid #edf2f7; padding: 16px 40px;
            font-size: 11px; color: #a0aec0; display: flex; justify-content: space-between; }
  .warn { background: #fff5f5; border: 1px solid #fed7d7; border-radius: 8px; padding: 12px 16px;
          font-size: 12px; color: #c53030; margin-top: 12px; }
  @media print { body { padding: 0; background: white; } .page { box-shadow: none; border-radius: 0; } }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <h1>📦 ISTA 测试规划报告</h1>
    <p>自动生成 — ISTA Pro 数字化管理平台</p>
    <div class="badge">报告编号: ${reportId}</div>
    <div class="badge" style="margin-left:8px;">生成日期: ${dateStr}</div>
  </div>
  <div class="body">
    <div class="section">
      <div class="section-title">基本信息</div>
      <div class="grid">
        <div class="field"><div class="field-label">适用标准</div><div class="field-value">ISTA ${standard}</div></div>
        <div class="field"><div class="field-label">运输方式</div><div class="field-value">${transportLabel}</div></div>
        <div class="field"><div class="field-label">包装件重量</div><div class="field-value">${weightKg.toFixed(2)} kg (${(weightKg*2.20462).toFixed(1)} lb)</div></div>
        <div class="field"><div class="field-label">样品需求数量</div><div class="field-value">${stdData ? stdData.specimens : 'N/A'} 件</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">跌落测试参数</div>
      <div class="grid">
        <div class="field"><div class="field-label">法定跌落高度</div><div class="field-value highlight">${heightCm} cm</div></div>
        <div class="field"><div class="field-label">英制换算</div><div class="field-value highlight">${(heightCm/2.54).toFixed(1)} inch</div></div>
        <div class="field"><div class="field-label">跌落总次数</div><div class="field-value">10 次</div></div>
        <div class="field"><div class="field-label">跌落顺序原则</div><div class="field-value">角 → 棱 → 面</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">10步跌落序列</div>
      <table>
        <thead>
          <tr><th>步骤</th><th>类型</th><th>部位</th><th>说明</th></tr>
        </thead>
        <tbody>
          ${DROP_SEQUENCE.map(s => `
          <tr>
            <td><strong>Step ${s.step}</strong></td>
            <td class="step-${s.type}">${s.type === 'corner' ? '角' : s.type === 'edge' ? '棱' : '面'}</td>
            <td>${s.label}</td>
            <td>${s.desc}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    ${stdData ? `
    <div class="section">
      <div class="section-title">测试项目清单</div>
      <table>
        <thead><tr><th>测试项目</th><th>要求</th></tr></thead>
        <tbody>
          ${Object.entries(stdData.testDetails).map(([k,v]) => {
            const labels = {conditioning:'环境调质',drop:'跌落测试',vibration:'振动测试',compression:'堆码压力',impact:'斜面冲击',altitude:'低气压测试'};
            return `<tr><td>${labels[k]||k}</td><td style="color:${v==='无'?'#a0aec0':'#1a202c'};">${v===false?'不要求':v}</td></tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    <div class="section">
      <div class="section-title">Pass / Fail 判定标准</div>
      <p style="font-size:14px;color:#4a5568;line-height:1.7;">${stdData ? stdData.passFailCriteria : '请参阅 ISTA 官方标准文件'}</p>
    </div>

    <div class="warn">
      ⚠️ 本报告由 ISTA Pro 平台自动生成，仅供规划参考。正式认证测试必须由 ISTA 授权实验室依据原版标准文件执行。
    </div>
  </div>
  <div class="footer">
    <span>ISTA Pro 包装测试数字化平台 · ${dateStr}</span>
    <span>报告编号: ${reportId}</span>
  </div>
</div>
</body>
</html>`;

  const w = window.open('', '_blank');
  w.document.write(html);
  w.document.close();
  setTimeout(() => w.print(), 500);
}

// Expose to global for HTML onclick usage
window.generateReport = generateReport;
window.calculateDrop = calculateDrop;
window.calculateCompression = calculateCompression;
window.showVibParams = showVibParams;
window.openStandardModal = openStandardModal;
window.closeModal = closeModal;
window.loadStandardToCalc = loadStandardToCalc;
window.highlightStep = highlightStep;
window.copySchema = copySchema;
window.downloadSchema = downloadSchema;
window.toggleAutoPlay = toggleAutoPlay;
window.startAutoPlay = startAutoPlay;
window.stopAutoPlay = stopAutoPlay;
