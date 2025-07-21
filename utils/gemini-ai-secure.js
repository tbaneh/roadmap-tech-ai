// Secure Gemini AI Implementation using Firebase AI Logic
// Following Google's best practices for production apps

import { aiLogic } from './firebase-config.js';

class SecureGeminiAI {
  constructor() {
    this.aiLogic = aiLogic;
    this.isInitialized = false;
    this.model = null;
    this.init();
  }

  async init() {
    try {
      // Initialize Gemini model through Firebase AI Logic
      this.model = this.aiLogic.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Você é um mentor especialista em carreiras de tecnologia. Forneça respostas práticas, motivadoras e detalhadas em português brasileiro."
      });
      
      this.isInitialized = true;
      console.log('🚀 Gemini AI inicializado com segurança via Firebase AI Logic');
    } catch (error) {
      console.error('❌ Erro ao inicializar Gemini AI:', error);
      this.isInitialized = false;
    }
  }

  async generateContent(prompt, context = '') {
    if (!this.isInitialized) {
      throw new Error('Gemini AI não foi inicializado corretamente');
    }

    try {
      const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('❌ Erro ao gerar conteúdo:', error);
      throw new Error('Não foi possível conectar com o mentor IA. Tente novamente.');
    }
  }

  // Análise inteligente de recursos
  async analyzeResource(resource) {
    const prompt = `
    Analise este recurso de estudo e forneça insights valiosos:

    **Recurso:**
    - Título: ${resource.title}
    - Tipo: ${resource.type}
    - Provedor: ${resource.provider || 'Não especificado'}
    - URL: ${resource.url}

    **Forneça uma análise estruturada:**

    ## 📊 **Análise Inteligente**
    
    **🎯 Relevância:** [Nota de 1-10 e justificativa]
    
    **⏱️ Tempo Estimado:** [Tempo necessário para completar]
    
    **📚 Nível de Dificuldade:** [Iniciante/Intermediário/Avançado + explicação]
    
    **🚀 Pontos Fortes:**
    - [3-5 pontos principais]
    
    **💡 Dicas para Aproveitamento:**
    - [3-5 dicas práticas]
    
    **🔗 Conecta com:**
    - [Outros tópicos relacionados]
    
    **📈 Impacto na Carreira:**
    [Como este recurso contribui para o crescimento profissional]
    `;

    return await this.generateContent(prompt);
  }

  // Gerar quiz personalizado
  async generateQuiz(topic, difficulty = 'intermediate', questionCount = 5) {
    const prompt = `
    Crie um quiz prático sobre: ${topic}
    
    **Configurações:**
    - Dificuldade: ${difficulty}
    - Número de questões: ${questionCount}
    - Foco: Aplicação prática e conhecimento real
    
    **Formato da resposta:**
    
    ## 🧠 **Quiz: ${topic}**
    
    **Questão 1:**
    [Pergunta clara e prática]
    
    a) [Opção A]
    b) [Opção B]
    c) [Opção C]
    d) [Opção D]
    
    **Resposta:** [Letra correta]
    **Explicação:** [Explicação detalhada]
    
    [Repetir formato para todas as questões]
    
    ## 📈 **Próximos Passos:**
    - [3 recomendações de estudo]
    `;

    return await this.generateContent(prompt);
  }

  // Mentor virtual personalizado
  async getMentorAdvice(question, userContext = '') {
    const prompt = `
    **Contexto do usuário:** ${userContext}
    
    **Pergunta:** ${question}
    
    Como mentor especialista em tecnologia, forneça um conselho personalizado e prático.
    
    **Estrutura da resposta:**
    
    ## 🎯 **Resposta Direta**
    [Resposta clara e objetiva]
    
    ## 📚 **Contexto e Fundamentos**
    [Explicação mais detalhada]
    
    ## 🚀 **Plano de Ação**
    1. [Passo 1 - específico e acionável]
    2. [Passo 2 - específico e acionável]
    3. [Passo 3 - específico e acionável]
    
    ## 🔗 **Recursos Recomendados**
    - [Recurso 1 com justificativa]
    - [Recurso 2 com justificativa]
    - [Recurso 3 com justificativa]
    
    ## 💡 **Dica Extra**
    [Insight adicional ou motivação]
    `;

    return await this.generateContent(prompt);
  }

  // Gerar flashcards para estudo
  async generateFlashcards(topic, count = 10) {
    const prompt = `
    Crie ${count} flashcards sobre: ${topic}
    
    **Formato:**
    
    ## 🎴 **Flashcards: ${topic}**
    
    **Card 1:**
    **Frente:** [Pergunta ou conceito]
    **Verso:** [Resposta ou explicação]
    
    **Card 2:**
    **Frente:** [Pergunta ou conceito]
    **Verso:** [Resposta ou explicação]
    
    [Continuar para todos os cards]
    
    ## 📚 **Dicas de Estudo:**
    - [3 dicas para usar os flashcards efetivamente]
    `;

    return await this.generateContent(prompt);
  }

  // Simulador de entrevista
  async simulateInterview(role, experience = 'intermediate') {
    const prompt = `
    Simule uma entrevista para a posição: ${role}
    Nível de experiência: ${experience}
    
    **Gere 5 perguntas de entrevista realistas:**
    
    ## 🎤 **Simulação de Entrevista: ${role}**
    
    **Pergunta 1:**
    [Pergunta técnica relevante]
    
    **Dicas para responder:**
    - [Dica 1]
    - [Dica 2]
    
    **Exemplo de resposta:**
    [Exemplo estruturado]
    
    ---
    
    [Repetir para 5 perguntas]
    
    ## 📈 **Preparação Adicional:**
    - [3 áreas para focar no estudo]
    `;

    return await this.generateContent(prompt);
  }
}

// Singleton instance
let geminiAI = null;

export const getGeminiAI = () => {
  if (!geminiAI) {
    geminiAI = new SecureGeminiAI();
  }
  return geminiAI;
};

export default SecureGeminiAI;
