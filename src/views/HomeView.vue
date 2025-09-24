<template>
  <div class="home-container">
    <div class="header">
      <h1 class="title">星绘之语</h1>
      <p class="subtitle">塔罗牌占卜</p>
    </div>
    
    <div class="cards-container">
      <div 
        class="fortune-card" 
        @click="navigateTo('anime')"
      >
        <div class="card-icon">✨</div>
        <h2 class="card-title">二次元占卜</h2>
        <p class="card-description">在幻想世界中寻找答案</p>
      </div>
      
      <div 
        class="fortune-card" 
        @click="navigateTo('pet')"
      >
        <div class="card-icon">🐾</div>
        <h2 class="card-title">宠物占卜</h2>
        <p class="card-description">通过萌宠视角解读命运</p>
      </div>
      
      <div 
        class="fortune-card" 
        @click="navigateTo('general')"
      >
        <div class="card-icon">🔮</div>
        <h2 class="card-title">大众占卜</h2>
        <p class="card-description">探索普遍的人生指引</p>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2023 星绘之语 - 塔罗牌占卜</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  setup() {
    const router = useRouter()
    
    const navigateTo = (type) => {
      router.push({ name: 'fortune', params: { type } })
    }
    
    return {
      navigateTo
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f0ff 0%, #e6d9ff 100%);
  background-attachment: fixed;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3.5rem;
  color: #6a0dad;
  margin-bottom: 0.5rem;
  text-shadow: 3px 3px 0px rgba(173, 127, 255, 0.5);
  font-weight: 700;
}

.subtitle {
  font-size: 1.5rem;
  color: #9370db;
  font-weight: 300;
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
}

.fortune-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  width: 300px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(173, 127, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(173, 127, 255, 0.3);
}

.fortune-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 15px 40px rgba(173, 127, 255, 0.3);
}

.fortune-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(173, 127, 255, 0.1) 70%);
  transform: rotate(30deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fortune-card:hover::before {
  opacity: 1;
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.8rem;
  color: #6a0dad;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.card-description {
  font-size: 1rem;
  color: #7a67ee;
  line-height: 1.5;
}

.footer {
  text-align: center;
  padding: 2rem 0;
  color: #9370db;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .fortune-card {
    width: 260px;
    padding: 2rem;
  }
  
  .cards-container {
    gap: 1.5rem;
  }
}
</style>