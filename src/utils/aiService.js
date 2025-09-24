// AI服务 - 用于处理塔罗牌解读的生成

// 模拟AI模型调用，生成塔罗牌解读
export const generateTarotReading = async (cards, type, config) => {
  // 在实际应用中，这里会调用真实的AI API（如Claude 3.5或GPT-4o）
  // 由于是模拟环境，我们使用预定义的模板和随机生成的解读内容
  
  // 等待一段时间，模拟API调用的延迟
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 构建牌阵信息
  const pastCard = cards[0]
  const presentCard = cards[1]
  const futureCard = cards[2]
  
  // 根据不同的占卜类型生成不同风格的解读
  switch (type) {
    case 'anime':
      return generateAnimeStyleReading(pastCard, presentCard, futureCard)
    case 'pet':
      return generatePetStyleReading(pastCard, presentCard, futureCard)
    case 'general':
    default:
      return generateGeneralStyleReading(pastCard, presentCard, futureCard)
  }
}

// 生成二次元风格的解读
const generateAnimeStyleReading = (pastCard, presentCard, futureCard) => {
  const templates = [
    {
      past: [
        `在过去，${pastCard.isReversed ? '似乎有一些让你感到困惑的事情呢' : '你一定经历了一段美好的时光' }。${pastCard.name}的${pastCard.isReversed ? '逆位' : '正位'}代表着${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。`,
        `回想起过去，${pastCard.isReversed ? '可能有一些小挫折' : '那些温暖的回忆'}依然历历在目。${pastCard.name}的${pastCard.isReversed ? '逆位' : '正位'}告诉你${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。`
      ],
      present: [
        `现在的你，${presentCard.isReversed ? '也许正面临一些挑战' : '正散发着耀眼的光芒'}。${presentCard.name}的${presentCard.isReversed ? '逆位' : '正位'}意味着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。`,
        `此刻的你，${presentCard.isReversed ? '需要稍微调整一下方向' : '正走在正确的道路上'}。${presentCard.name}的${presentCard.isReversed ? '逆位' : '正位'}象征着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。`
      ],
      future: [
        `未来的道路上，${futureCard.isReversed ? '可能会有一些小波折' : '将会有美好的事情等待着你'}。${futureCard.name}的${futureCard.isReversed ? '逆位' : '正位'}预示着${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。`,
        `展望未来，${futureCard.isReversed ? '需要保持警惕' : '充满了希望和可能性'}。${futureCard.name}的${futureCard.isReversed ? '逆位' : '正位'}代表着${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。`
      ],
      conclusion: [
        `请相信自己的内心，勇敢地向前走吧！你的故事才刚刚开始哦~ 💖`,
        `无论遇到什么困难，都要记得你是最棒的！加油哦~ 🌟`
      ]
    },
    {
      past: [
        `过去的时光里，${pastCard.isReversed ? '或许有些遗憾' : '那些珍贵的回忆'}成为了你成长的养分。${pastCard.name}的${pastCard.isReversed ? '逆位' : '正位'}象征着${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。`,
        `回想起过去，${pastCard.isReversed ? '那些未说出口的话' : '那些温暖的瞬间'}仿佛还在眼前。${pastCard.name}的${pastCard.isReversed ? '逆位' : '正位'}代表着${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。`
      ],
      present: [
        `现在的你，${presentCard.isReversed ? '可能有些迷茫' : '正绽放着独特的魅力'}。${presentCard.name}的${presentCard.isReversed ? '逆位' : '正位'}意味着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。`,
        `此刻的你，${presentCard.isReversed ? '需要一点勇气' : '正朝着梦想前进'}。${presentCard.name}的${presentCard.isReversed ? '逆位' : '正位'}象征着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。`
      ],
      future: [
        `未来的篇章中，${futureCard.isReversed ? '可能会有一些挑战' : '将会有惊喜等待着你'}。${futureCard.name}的${futureCard.isReversed ? '逆位' : '正位'}预示着${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。`,
        `展望未来，${futureCard.isReversed ? '需要保持耐心' : '充满了无限可能'}。${futureCard.name}的${futureCard.isReversed ? '逆位' : '正位'}代表着${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。`
      ],
      conclusion: [
        `请保持你的笑容，因为你就是这个世界上最独特的存在呀~ ✨`,
        `无论何时，都要相信自己的力量！你一定可以的~ 💕`
      ]
    }
  ]
  
  const template = templates[Math.floor(Math.random() * templates.length)]
  
  return {
    title: '✨ 命运的指引 ✨',
    past: template.past[Math.floor(Math.random() * template.past.length)],
    present: template.present[Math.floor(Math.random() * template.present.length)],
    future: template.future[Math.floor(Math.random() * template.future.length)],
    conclusion: template.conclusion[Math.floor(Math.random() * template.conclusion.length)],
    style: 'anime'
  }
}

// 生成宠物风格的解读
const generatePetStyleReading = (pastCard, presentCard, futureCard) => {
  const templates = [
    {
      past: [
        `汪~ 过去的日子里，${pastCard.isReversed ? '小主人好像有一些不开心的事' : '小主人一定过得很开心'}。${pastCard.name}牌牌${pastCard.isReversed ? '倒过来' : '正正的'}说${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。`,
        `喵~ 回想过去，${pastCard.isReversed ? '小主人可能遇到了一些小麻烦' : '那些快乐的时光'}让尾巴都摇起来了。${pastCard.name}牌牌${pastCard.isReversed ? '倒过来' : '正正的'}代表${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。`
      ],
      present: [
        `汪~ 现在的小主人，${presentCard.isReversed ? '可能有点迷茫' : '看起来精神满满'}。${presentCard.name}牌牌${presentCard.isReversed ? '倒过来' : '正正的'}意味着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。`,
        `喵~ 此刻的小主人，${presentCard.isReversed ? '需要一点鼓励' : '正散发着温暖的光芒'}。${presentCard.name}牌牌${presentCard.isReversed ? '倒过来' : '正正的'}象征${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。`
      ],
      future: [
        `汪~ 未来的路上，${futureCard.isReversed ? '可能会有一些小阻碍' : '会有好多好玩的事情'}等着小主人。${futureCard.name}牌牌${futureCard.isReversed ? '倒过来' : '正正的'}预示${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。`,
        `喵~ 看向前方，${futureCard.isReversed ? '小主人要小心一点' : '充满了美味的零食和温暖的抱抱'}。${futureCard.name}牌牌${futureCard.isReversed ? '倒过来' : '正正的'}代表${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。`
      ],
      conclusion: [
        `汪！不管发生什么，小主人都是最棒的！要记得摸摸我的头哦~ 🐶`,
        `喵~ 小主人，我会一直陪伴着你，一起走过每一段旅程~ 🐱`
      ]
    },
    {
      past: [
        `汪~ 过去的时光里，${pastCard.isReversed ? '小主人可能错过了一些美好' : '那些快乐的回忆'}就像最爱的骨头一样珍贵。${pastCard.name}牌牌${pastCard.isReversed ? '倒过来' : '正正的'}说${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。`,
        `喵~ 回想起过去，${pastCard.isReversed ? '那些小遗憾' : '那些温暖的瞬间'}让我忍不住蹭蹭小主人。${pastCard.name}牌牌${pastCard.isReversed ? '倒过来' : '正正的'}代表${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。`
      ],
      present: [
        `汪~ 现在的小主人，${presentCard.isReversed ? '需要一点时间思考' : '正朝着目标前进'}。${presentCard.name}牌牌${presentCard.isReversed ? '倒过来' : '正正的'}意味着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。`,
        `喵~ 此刻的小主人，${presentCard.isReversed ? '可能有些不安' : '散发着迷人的魅力'}。${presentCard.name}牌牌${presentCard.isReversed ? '倒过来' : '正正的'}象征${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。`
      ],
      future: [
        `汪~ 未来的日子里，${futureCard.isReversed ? '可能会有一些挑战' : '会有好多惊喜'}在等着小主人。${futureCard.name}牌牌${futureCard.isReversed ? '倒过来' : '正正的'}预示${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。`,
        `喵~ 展望未来，${futureCard.isReversed ? '小主人要保持警惕' : '充满了无限可能'}。${futureCard.name}牌牌${futureCard.isReversed ? '倒过来' : '正正的'}代表${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。`
      ],
      conclusion: [
        `汪！小主人，不管你去哪里，我都会跟着你，永远爱你哦~ 🐾`,
        `喵~ 小主人是全世界最好的主人！让我们一起创造更多美好的回忆吧~ 😸`
      ]
    }
  ]
  
  const template = templates[Math.floor(Math.random() * templates.length)]
  
  return {
    title: '🐾 萌宠的预言 🐾',
    past: template.past[Math.floor(Math.random() * template.past.length)],
    present: template.present[Math.floor(Math.random() * template.present.length)],
    future: template.future[Math.floor(Math.random() * template.future.length)],
    conclusion: template.conclusion[Math.floor(Math.random() * template.conclusion.length)],
    style: 'pet'
  }
}

// 生成大众风格的解读
const generateGeneralStyleReading = (pastCard, presentCard, futureCard) => {
  const templates = [
    {
      past: [
        `回顾过去，${pastCard.isReversed ? '你可能经历了一些挑战或困惑' : '你积累了宝贵的经验和智慧'}。${pastCard.name}的${pastCard.isReversed ? '逆位' : '正位'}代表着${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。这段经历塑造了今天的你，为你的成长奠定了基础。`,
        `在过去的时光里，${pastCard.isReversed ? '或许有一些未完成的事情或未解决的情绪' : '你经历了重要的成长和转变'}。${pastCard.name}的${pastCard.isReversed ? '逆位' : '正位'}象征着${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。这些经历都是你人生旅程中不可或缺的一部分。`
      ],
      present: [
        `立足当下，${presentCard.isReversed ? '你可能正面临一些需要调整或重新评估的情况' : '你正处于一个充满机会和可能性的阶段'}。${presentCard.name}的${presentCard.isReversed ? '逆位' : '正位'}意味着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。现在是审视自己内心需求和外在环境的好时机。`,
        `此刻的你，${presentCard.isReversed ? '可能需要重新考虑某些决定或方向' : '正走在符合你内心真实需求的道路上'}。${presentCard.name}的${presentCard.isReversed ? '逆位' : '正位'}代表着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。倾听内心的声音，它会为你指引方向。`
      ],
      future: [
        `展望未来，${futureCard.isReversed ? '你可能需要做好准备应对一些变化或挑战' : '充满了希望和新的可能性'}。${futureCard.name}的${futureCard.isReversed ? '逆位' : '正位'}预示着${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。保持开放的心态，勇敢地迎接即将到来的一切。`,
        `未来的道路上，${futureCard.isReversed ? '可能会有一些阻碍需要你去克服' : '将会有新的机遇和成长等待着你'}。${futureCard.name}的${futureCard.isReversed ? '逆位' : '正位'}象征着${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。相信自己的能力，你已经做好了准备。`
      ],
      conclusion: [
        `记住，塔罗牌不是命运的枷锁，而是照亮你内心的镜子。最终的决定权始终在你手中。相信自己，勇敢前行。`,
        `每一张牌都代表着不同的可能性，而你的选择和行动将决定最终的结果。保持积极的心态，你将创造属于自己的美好未来。`
      ]
    },
    {
      past: [
        `过去的经历中，${pastCard.isReversed ? '你可能遇到了一些让你感到迷茫或挫败的事情' : '你培养了重要的技能和品质'}。${pastCard.name}的${pastCard.isReversed ? '逆位' : '正位'}代表着${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。这些经历虽然可能痛苦，但它们为你提供了宝贵的学习机会。`,
        `回顾往昔，${pastCard.isReversed ? '或许有些事情没有按照你的期望发展' : '你走过了一段重要的旅程'}。${pastCard.name}的${pastCard.isReversed ? '逆位' : '正位'}象征着${pastCard.isReversed ? pastCard.reversed : pastCard.upright}。现在是时候放下过去的包袱，轻装上阵了。`
      ],
      present: [
        `着眼现在，${presentCard.isReversed ? '你可能需要重新评估自己的目标和优先级' : '你正处于一个能够做出积极改变的位置'}。${presentCard.name}的${presentCard.isReversed ? '逆位' : '正位'}意味着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。关注当下，充分利用现有的资源和机会。`,
        `此刻，${presentCard.isReversed ? '你可能感到有些压力或不确定' : '你正朝着正确的方向前进'}。${presentCard.name}的${presentCard.isReversed ? '逆位' : '正位'}代表着${presentCard.isReversed ? presentCard.reversed : presentCard.upright}。给自己一些时间和空间，你会找到清晰的答案。`
      ],
      future: [
        `展望未来，${futureCard.isReversed ? '你可能需要面对一些挑战或转变' : '将会有新的开始和机遇'}。${futureCard.name}的${futureCard.isReversed ? '逆位' : '正位'}预示着${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。保持灵活和适应性，你将能够应对任何情况。`,
        `未来在向你招手，${futureCard.isReversed ? '可能会有一些意想不到的事情发生' : '充满了希望和可能性'}。${futureCard.name}的${futureCard.isReversed ? '逆位' : '正位'}象征着${futureCard.isReversed ? futureCard.reversed : futureCard.upright}。相信自己的直觉和判断，你会做出最适合自己的选择。`
      ],
      conclusion: [
        `塔罗牌为你提供了一个不同的视角来看待自己的生活。请记住，你有能力创造自己想要的未来。相信自己，勇敢地迈出下一步。`,
        `无论前方有什么挑战，你都有足够的力量和智慧去面对。保持开放的心态，接纳生活中的每一个礼物，你将收获丰富而充实的人生。`
      ]
    }
  ]
  
  const template = templates[Math.floor(Math.random() * templates.length)]
  
  return {
    title: '🔮 塔罗智慧指引 🔮',
    past: template.past[Math.floor(Math.random() * template.past.length)],
    present: template.present[Math.floor(Math.random() * template.present.length)],
    future: template.future[Math.floor(Math.random() * template.future.length)],
    conclusion: template.conclusion[Math.floor(Math.random() * template.conclusion.length)],
    style: 'general'
  }
}