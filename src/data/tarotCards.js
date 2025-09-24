// 大阿卡那牌列表
export const majorArcana = [
  {
    id: 0,
    name: '愚人',
    upright: '新的开始、自由、冒险、纯真、直觉',
    reversed: '鲁莽、冒险过度、失序、幼稚、缺乏方向'
  },
  {
    id: 1,
    name: '魔术师',
    upright: '创造力、技能、意志力、自信、开始',
    reversed: '操纵、过度自信、缺乏方向、技能不足'
  },
  {
    id: 2,
    name: '女祭司',
    upright: '直觉、潜意识、神秘、智慧、内省',
    reversed: '缺乏直觉、表面、过度理性、隐藏'
  },
  {
    id: 3,
    name: '女皇',
    upright: '丰饶、母性、创造力、自然、富足',
    reversed: '依赖、缺乏自律、过度放纵、不切实际'
  },
  {
    id: 4,
    name: '皇帝',
    upright: '权威、结构、控制、领导力、保护',
    reversed: '专制、刚性、缺乏灵活性、控制欲过强'
  },
  {
    id: 5,
    name: '教皇',
    upright: '传统、精神指导、宗教、社区、价值观',
    reversed: '教条、盲目遵从、缺乏独立、反叛'
  },
  {
    id: 6,
    name: '恋人',
    upright: '爱、关系、选择、和谐、结合',
    reversed: '不和谐、分离、错误选择、冲突'
  },
  {
    id: 7,
    name: '战车',
    upright: '胜利、控制、决心、勇气、竞争',
    reversed: '缺乏控制、冲突、挫败、犹豫不决'
  },
  {
    id: 8,
    name: '力量',
    upright: '勇气、内在力量、耐心、控制、韧性',
    reversed: '软弱、自我怀疑、缺乏控制、滥用力量'
  },
  {
    id: 9,
    name: '隐者',
    upright: '内省、独处、智慧、寻找答案、指引',
    reversed: '孤独、孤立、过度思考、缺乏方向'
  },
  {
    id: 10,
    name: '命运之轮',
    upright: '变化、命运、运气、循环、机遇',
    reversed: '抗拒变化、坏运气、停滞、混乱'
  },
  {
    id: 11,
    name: '正义',
    upright: '正义、公平、平衡、真相、因果',
    reversed: '不公平、偏见、不平衡、逃避责任'
  },
  {
    id: 12,
    name: '倒吊人',
    upright: '牺牲、等待、新视角、智慧、耐心',
    reversed: '不必要的牺牲、拖延、不满、不合作'
  },
  {
    id: 13,
    name: '死神',
    upright: '结束、转变、重生、释放、变革',
    reversed: '抗拒变化、停滞、恐惧结束、死亡焦虑'
  },
  {
    id: 14,
    name: '节制',
    upright: '平衡、调和、中庸、耐心、融合',
    reversed: '不平衡、极端、过度、缺乏耐心'
  },
  {
    id: 15,
    name: '恶魔',
    upright: '诱惑、束缚、欲望、物质主义、成瘾',
    reversed: '摆脱束缚、克服欲望、解放、觉醒'
  },
  {
    id: 16,
    name: '塔',
    upright: '突然变化、破坏、觉醒、释放、崩溃',
    reversed: '延迟崩溃、抵抗变化、避免灾难'
  },
  {
    id: 17,
    name: '星星',
    upright: '希望、灵感、精神指引、乐观、平静',
    reversed: '绝望、缺乏信心、幻灭、迷茫'
  },
  {
    id: 18,
    name: '月亮',
    upright: '潜意识、直觉、恐惧、幻觉、神秘',
    reversed: '困惑、焦虑、误解、不安'
  },
  {
    id: 19,
    name: '太阳',
    upright: '成功、喜悦、活力、乐观、自信',
    reversed: '缺乏活力、悲观、不快乐、失败'
  },
  {
    id: 20,
    name: '审判',
    upright: '重生、觉醒、评估、决定、召唤',
    reversed: '自我怀疑、拒绝改变、后悔、延迟'
  },
  {
    id: 21,
    name: '世界',
    upright: '完成、圆满、成功、旅行、统一',
    reversed: '未完成、不满足、停滞、孤立'
  }
]

// 获取随机的三张塔罗牌（包含正逆位信息）
export const getRandomCards = () => {
  // 创建牌的副本以避免修改原始数据
  const cardsCopy = [...majorArcana]
  const drawnCards = []
  
  // 随机抽取3张不同的牌
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * cardsCopy.length)
    const card = {...cardsCopy[randomIndex]}
    
    // 随机决定正逆位（70%正位，30%逆位的概率）
    card.isReversed = Math.random() < 0.3
    
    drawnCards.push(card)
    cardsCopy.splice(randomIndex, 1) // 从副本中移除已抽取的牌
  }
  
  return drawnCards
}

// 获取占卜类型的配置信息
export const getFortuneTypeConfig = (type) => {
  const configs = {
    anime: {
      title: '二次元占卜',
      subtitle: '在幻想世界中寻找命运的轨迹',
      color: '#ff69b4',
      icon: '✨',
      aiPromptPrefix: '请以乙女游戏角色的口吻，用温柔可爱的二次元风格解读以下塔罗牌组合：'
    },
    pet: {
      title: '宠物占卜',
      subtitle: '通过萌宠的视角解读你的命运',
      color: '#ffd700',
      icon: '🐾',
      aiPromptPrefix: '请以可爱萌宠的视角，用拟人化的语气解读以下塔罗牌组合：'
    },
    general: {
      title: '大众占卜',
      subtitle: '探索普遍的人生指引',
      color: '#9370db',
      icon: '🔮',
      aiPromptPrefix: '请以专业塔罗师的身份，用温暖而富有洞察力的语言解读以下塔罗牌组合：'
    }
  }
  
  return configs[type] || configs.general
}