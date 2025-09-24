// 模拟AI聊天服务
export async function generateChatResponse(userMessage, reading, cards) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
  
  // 根据用户问题生成回复
  return getMockResponse(userMessage, reading, cards)
}

function getMockResponse(userMessage, reading, cards) {
  const lowerMessage = userMessage.toLowerCase()
  
  // 基础上下文信息
  const contextInfo = {
    pastCard: cards[0],
    presentCard: cards[1],
    futureCard: cards[2],
    readingSummary: {
      past: reading.past,
      present: reading.present,
      future: reading.future,
      conclusion: reading.conclusion
    }
  }
  
  // 根据关键词生成不同的回复
  if (containsKeywords(lowerMessage, ['过去', '之前', '以前', '曾经'])) {
    return generatePastResponse(contextInfo)
  }
  
  if (containsKeywords(lowerMessage, ['现在', '当前', '最近', '现状'])) {
    return generatePresentResponse(contextInfo)
  }
  
  if (containsKeywords(lowerMessage, ['未来', '以后', '将来', '预测'])) {
    return generateFutureResponse(contextInfo)
  }
  
  if (containsKeywords(lowerMessage, ['牌', '卡片', '塔罗牌', '解释'])) {
    return generateCardExplanationResponse(contextInfo, lowerMessage)
  }
  
  if (containsKeywords(lowerMessage, ['建议', '怎么做', '应该', '如何', '怎么办'])) {
    return generateAdviceResponse(contextInfo)
  }
  
  if (containsKeywords(lowerMessage, ['爱情', '感情', '恋爱', '关系'])) {
    return generateLoveResponse(contextInfo)
  }
  
  if (containsKeywords(lowerMessage, ['事业', '工作', '职业', '财运'])) {
    return generateCareerResponse(contextInfo)
  }
  
  // 默认回复
  return generateDefaultResponse(contextInfo)
}

function containsKeywords(text, keywords) {
  return keywords.some(keyword => text.includes(keyword))
}

function generatePastResponse(context) {
  const responses = [
    `关于您的过去，${context.readingSummary.past} 这张${context.pastCard.name}牌的出现，暗示着过去的经历正在以某种方式影响着您的现在。您是否愿意分享更多关于过去的具体情况，让我为您提供更深入的分析？`,
    `${context.pastCard.name}在过去位置代表了您曾经经历的重要阶段。根据解读，${context.readingSummary.past} 这些过去的经验为您现在的生活奠定了基础，您可以从中汲取力量，更好地面对当前的挑战。`,
    `过去的${context.pastCard.name}牌揭示了您之前的思维模式和行为方式。${context.readingSummary.past} 理解这些过去的模式，可以帮助您在现在做出更明智的选择，避免重复过去的错误。`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

function generatePresentResponse(context) {
  const responses = [
    `当前的${context.presentCard.name}牌反映了您现在的生活状态。${context.readingSummary.present} 这是一个关键的时刻，您的选择将直接影响未来的发展方向。您现在面临的主要挑战是什么？`,
    `现在的${context.presentCard.name}牌告诉我们，${context.readingSummary.present} 这是一个充满可能性的阶段，您有能力塑造自己的现实。关注当下，珍惜现在拥有的一切。`,
    `当前的${context.presentCard.name}牌揭示了您的内心状态和外部环境。${context.readingSummary.present} 这是一个反思和行动的好时机，您可以利用当前的资源创造更好的未来。`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

function generateFutureResponse(context) {
  const responses = [
    `关于未来，${context.futureCard.name}牌预示着${context.readingSummary.future} 这并不是固定的命运，而是基于当前能量的一种可能性。您的选择和行动可以改变未来的走向。`,
    `未来的${context.futureCard.name}牌显示了潜在的发展方向：${context.readingSummary.future} 为了实现更理想的未来，建议您保持开放的心态，积极迎接新的机会。`,
    `${context.futureCard.name}在未来位置暗示着${context.readingSummary.future} 这是一个可以通过您的努力和决定来塑造的未来。您准备好迎接即将到来的变化了吗？`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

function generateCardExplanationResponse(context, message) {
  // 检查用户是否询问了特定牌的解释
  if (message.includes('过去') || message.includes('第一张')) {
    return `过去位置的${context.pastCard.name}牌：${context.pastCard.meaning} 这张牌在您的解读中特别强调了${context.readingSummary.past} 如果您想了解更多关于这张牌的象征意义，我可以为您提供更详细的解释。`
  }
  
  if (message.includes('现在') || message.includes('第二张')) {
    return `现在位置的${context.presentCard.name}牌：${context.presentCard.meaning} 这张牌在当前情境下代表了${context.readingSummary.present} 理解这张牌的信息可以帮助您更好地应对当前的挑战。`
  }
  
  if (message.includes('未来') || message.includes('第三张')) {
    return `未来位置的${context.futureCard.name}牌：${context.futureCard.meaning} 这张牌预示着${context.readingSummary.future} 记住，未来是流动的，您的选择可以改变它的走向。`
  }
  
  // 一般性的牌解释
  return `在这次解读中，我们使用了三张牌代表过去、现在和未来。每张牌都有其独特的象征意义，并与您的个人情境相结合。${context.readingSummary.conclusion} 如果您对某张特定的牌感兴趣，我可以为您提供更深入的解释。`
}

function generateAdviceResponse(context) {
  const responses = [
    `根据您的牌阵，我建议您：${context.readingSummary.conclusion} 特别关注现在的${context.presentCard.name}牌，它提供了关于当前应该采取什么行动的重要线索。您觉得目前最需要采取行动的领域是什么？`,
    `从您的解读中，我看到的关键建议是：${context.readingSummary.conclusion} 过去的经验（${context.pastCard.name}）为您提供了宝贵的教训，未来的可能性（${context.futureCard.name}）为您指明了方向，但最重要的是当下的选择。`,
    `基于这副牌的信息，我的建议是：${context.readingSummary.conclusion} 请记住，塔罗牌是引导而非决定，最终的选择和行动掌握在您自己手中。`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

function generateLoveResponse(context) {
  const responses = [
    `关于感情方面，从您的牌阵中我看到：${context.readingSummary.conclusion} 特别是现在的${context.presentCard.name}牌，它揭示了您当前感情关系的状态。如果您愿意分享更多关于您感情生活的具体情况，我可以提供更有针对性的见解。`,
    `在爱情领域，这副牌告诉我们：${context.readingSummary.conclusion} 过去的${context.pastCard.name}牌反映了您过去的感情模式，而未来的${context.futureCard.name}牌则暗示了可能的发展方向。`,
    `关于您的感情生活，牌阵显示：${context.readingSummary.conclusion} 重要的是要记住，感情是双方的事情，您的态度和行动将对关系的发展产生重要影响。`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

function generateCareerResponse(context) {
  const responses = [
    `在事业和财运方面，您的牌阵显示：${context.readingSummary.conclusion} 现在的${context.presentCard.name}牌特别重要，它揭示了您当前职业状况的关键信息。您对自己的事业发展有什么具体的目标或担忧吗？`,
    `关于工作和财务，这副牌告诉我们：${context.readingSummary.conclusion} 过去的经验（${context.pastCard.name}）为您的职业发展奠定了基础，而未来的可能性（${context.futureCard.name}）则暗示了潜在的机会或挑战。`,
    `在事业领域，我从您的牌阵中看到：${context.readingSummary.conclusion} 保持开放的心态，积极寻找新的机会，同时也要注意从过去的经验中学习。`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

function generateDefaultResponse(context) {
  const responses = [
    `${context.readingSummary.conclusion} 如果您对本次解读有任何具体的问题，或者想了解更多关于某方面的信息（如爱情、事业、健康等），请随时告诉我，我很乐意为您提供更深入的分析。`,
    `感谢您的提问！从您的牌阵中，我看到了很多有价值的信息：${context.readingSummary.conclusion} 您是否想针对某个特定的方面（如过去、现在、未来或某张特定的牌）获得更详细的解释？`,
    `这是一个非常有洞察力的问题。结合您的整个牌阵来看：${context.readingSummary.conclusion} 如果您能提供更多关于您当前情况的细节，我可以为您提供更加个性化的解读。`,
    `我理解您的疑惑。让我从另一个角度来解读您的牌阵：${context.readingSummary.past}（过去）、${context.readingSummary.present}（现在）、${context.readingSummary.future}（未来）。综合来看，${context.readingSummary.conclusion} 您还有其他想了解的方面吗？`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}