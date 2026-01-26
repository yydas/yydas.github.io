import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Shield, Users, Clock, Search, AlertTriangle, 
  Zap, Activity, Database, Power
} from 'lucide-react';

// --- 数据定义 ---
const ACTS = [
  {
    id: "01",
    title: "第一幕｜空间被确立",
    narrative: "每一个项目，都是一块需要被守护的空间。区域不是地理概念，而是秩序生效的范围。",
    mapping: ["项目立项", "合同管理", "组织结构", "网点规划"],
    icon: <Shield size={32} />,
    color: "bg-white"
  },
  {
    id: "02",
    title: "第二幕｜人员进入系统",
    narrative: "人员不是数据，是秩序被执行的证明。他们出现的那一刻，系统开始判断“是否完整”。",
    mapping: ["人员档案", "项目编制", "多项目归属", "主项目关系"],
    icon: <Users size={32} />,
    color: "bg-white"
  },
  {
    id: "03",
    title: "第三幕｜时间开始推动一切",
    narrative: "时间不被记录，它被持续验证。每一次打卡，都是对秩序的一次确认。",
    mapping: ["考勤计划", "打卡记录", "出勤汇总", "考勤调整"],
    icon: <Clock size={32} />,
    color: "bg-white"
  },
  {
    id: "04",
    title: "第四幕｜系统自检",
    narrative: "巡检不是任务，是系统对自己的确认。是否遗漏，是否偏离，是否仍在轨道上。",
    mapping: ["巡检计划", "巡检任务", "巡检内容", "异常上报"],
    icon: <Search size={32} />,
    color: "bg-white"
  },
  {
    id: "05",
    title: "第五幕｜异常与警报",
    narrative: "系统不会忽视任何一次失衡。当秩序出现裂隙，系统会率先感知到不安。",
    mapping: ["风险监测", "趋势判断", "联网报警", "实时告警"],
    icon: <AlertTriangle size={32} className="text-orange-600" />,
    color: "bg-orange-50",
    isAlert: true
  },
  {
    id: "06",
    title: "第六幕｜指挥介入",
    narrative: "秩序不会自动恢复，它需要被重新校准。指挥，是一次明确的干预。",
    mapping: ["事件处置", "调度指挥", "工单流转", "升级/转单"],
    icon: <Zap size={32} />,
    color: "bg-white"
  },
  {
    id: "07",
    title: "第七幕｜能量回流",
    narrative: "秩序需要被持续供养。付出，必须被正确回应。",
    mapping: ["出勤汇总", "工资计算", "社保公积金", "财务对接"],
    icon: <Activity size={32} />,
    color: "bg-green-50"
  },
  {
    id: "08",
    title: "第八幕｜系统沉淀",
    narrative: "没有结束，只有下一次判断。系统从不休眠，它只是等待。",
    mapping: ["数据分析", "趋势判断", "管理决策", "持续运营"],
    icon: <Database size={32} />,
    color: "bg-white"
  }
];

// --- 子组件：新粗犷主义卡片 ---
const ActCard = ({ act }) => {
  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`border-4 border-black p-8 ${act.color} shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-200 cursor-default mb-20`}
    >
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-xl font-bold bg-black text-white px-3 py-1">{act.id}</span>
        {act.icon}
      </div>
      <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">{act.title}</h3>
      <p className="text-xl text-black/70 mb-8 leading-relaxed font-medium">
        {act.narrative}
      </p>
      <div className="grid grid-cols-2 gap-4 border-t-2 border-black pt-6">
        {act.mapping.map((item, i) => (
          <div key={i} className="flex items-center gap-2 font-mono text-sm font-bold">
            <div className="w-2 h-2 bg-orange-500" />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function OrderInMotion() {
  const [isAwake, setIsAwake] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#F0F0F0] min-h-screen text-black font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* 进度条 */}
      <motion.div className="fixed top-0 left-0 right-0 h-4 bg-orange-500 z-[100] origin-left" style={{ scaleX }} />

      {/* 序章：系统苏醒 */}
      <AnimatePresence>
        {!isAwake && (
          <motion.section 
            exit={{ y: -1000 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center text-white p-6"
          >
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8"
            >
              <Power size={80} className="text-orange-500" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-center">秩序正在运行</h1>
            <p className="font-mono text-orange-500 mb-12 tracking-[0.2em]">SYSTEM_INITIALIZATION_REQUIRED</p>
            <button 
              onClick={() => setIsAwake(true)}
              className="border-2 border-white px-10 py-4 font-bold hover:bg-white hover:text-black transition-all text-xl tracking-widest uppercase"
            >
              点击初始化系统
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 主内容区 */}
      <main className={`max-w-7xl mx-auto px-6 py-24 transition-opacity duration-1000 ${isAwake ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Header */}
        <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block bg-orange-500 text-white font-mono px-4 py-1 mb-6 font-bold"
            >
              STATUS: OPERATIONAL
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
              没有人发出指令。<br/>系统已经感知。
            </h2>
          </div>
          <div className="flex flex-col items-end font-mono text-sm opacity-50">
            <span>TIMESTAMP: {new Date().toLocaleTimeString()}</span>
            <span>LATENCY: 12ms</span>
            <span>ORDER_STABILITY: 99.9%</span>
          </div>
        </header>

        {/* 叙事流 */}
        <section className="relative">
          {/* 背景中轴线 */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-black/10 -translate-x-1/2 hidden md:block" />

          {ACTS.map((act, index) => (
            <div key={act.id} className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'} relative w-full`}>
              <div className="w-full md:w-[45%]">
                <ActCard act={act} />
              </div>
            </div>
          ))}
        </section>

        {/* 尾声 */}
        <footer className="mt-32 border-t-8 border-black pt-16 pb-32">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-5xl font-black mb-8 tracking-tighter uppercase italic">安全不是结果，<br/>是一个正在发生的过程。</h2>
              <div className="font-mono text-black/50">
                <p>© 2024 ORDER_SYSTEM. ALL RIGHTS OBSERVED.</p>
                <p>DESIGNED FOR HUMAN-SYSTEM SYNERGY.</p>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-12 py-6 text-2xl font-black shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]"
              >
                立即接入秩序
              </motion.button>
            </div>
          </div>
        </footer>
      </main>

      {/* 背景网格装饰 */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]" 
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}