// Gemini AI Integration
const GEMINI_API_KEY = 'AIzaSyDXFW0fdQRnFMC7jIAtHIqJFREF6sp7nMc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

class GeminiAI {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.baseUrl = GEMINI_API_URL;
  }

  async generateContent(prompt, context = '') {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: context ? `${context}\n\n${prompt}` : prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Falha ao conectar com o mentor IA. Tente novamente.');
    }
  }

  // Analyze resource with AI
  async analyzeResource(resource) {
    const prompt = `
    Você é um mentor especialista em carreiras de tecnologia. Analise este recurso de estudo:

    Título: ${resource.title}
    Tipo: ${resource.type}
    Provedor: ${resource.provider}
    URL: ${resource.url}

    Forneça uma análise detalhada em português brasileiro seguindo este formato:

    🎯 **Relevância:** [0-100]% - [Explicação breve]
    📊 **Dificuldade:** [Iniciante/Intermediário/Avançado]
    ⏱️ **Tempo estimado:** [horas/dias/semanas]
    💡 **Melhor momento:** [Quando usar na trilha]
    🔍 **Por que é valioso:** [Explicação detalhada]
    ⚠️ **Pontos de atenção:** [Limitações ou cuidados]
    🚀 **Próximos passos:** [O que fazer após completar]

    Mantenha o tom motivador e focado em preparação para Big Tech.
    `;

    return await this.generateContent(prompt);
  }

  // Explain concept simply
  async explainConcept(topic, userLevel = 'iniciante') {
    const prompt = `
    Você é um mentor IA especializado em ensinar conceitos técnicos de forma clara e didática.

    Explique o conceito "${topic}" para alguém de nível ${userLevel} em português brasileiro.

    Use o método "Como se eu tivesse 10 anos":
    - Linguagem simples e clara
    - Analogias do dia a dia
    - Exemplos práticos
    - Evite jargões técnicos
    - Seja encorajador e motivador

    Estruture a resposta assim:
    
    🧠 **O que é:**
    [Explicação simples]

    🏠 **Analogia:**
    [Comparação com algo familiar]

    💡 **Exemplo prático:**
    [Situação real onde isso é usado]

    🎯 **Por que é importante:**
    [Relevância para carreira em tech]

    📚 **Próximo passo:**
    [O que estudar/praticar depois]
    `;

    return await this.generateContent(prompt);
  }

  // Generate quiz
  async generateQuiz(topic, difficulty = 'iniciante', questionCount = 5) {
    const prompt = `
    Você é um mentor IA especializado em criar avaliações para carreiras em tecnologia.

    Crie um quiz de ${questionCount} perguntas sobre "${topic}" para nível ${difficulty}.

    Formato JSON:
    {
      "title": "Quiz: [Nome do Tópico]",
      "description": "Teste seus conhecimentos sobre [tópico]",
      "questions": [
        {
          "id": 1,
          "question": "Pergunta aqui",
          "options": ["A) opção", "B) opção", "C) opção", "D) opção"],
          "correct": 1,
          "explanation": "Explicação detalhada da resposta correta"
        }
      ]
    }

    Perguntas devem ser:
    - Práticas e relevantes para Big Tech
    - Progressivas em dificuldade
    - Com explicações educativas
    - Focadas em aplicação real
    `;

    return await this.generateContent(prompt);
  }

  // Generate flashcards
  async generateFlashcards(topic, count = 10) {
    const prompt = `
    Você é um mentor IA especializado em técnicas de memorização para carreiras técnicas.

    Crie ${count} flashcards sobre "${topic}" em português brasileiro.

    Formato JSON:
    {
      "title": "Flashcards: ${topic}",
      "cards": [
        {
          "id": 1,
          "front": "Pergunta ou conceito",
          "back": "Resposta detalhada",
          "category": "Categoria",
          "difficulty": "iniciante/intermediário/avançado"
        }
      ]
    }

    Flashcards devem ser:
    - Conceitos-chave para memorização
    - Definições precisas
    - Exemplos práticos
    - Progressão lógica de dificuldade
    `;

    return await this.generateContent(prompt);
  }

  // Generate project ideas
  async generateProjectIdeas(userLevel, technologies, careerGoal) {
    const prompt = `
    Você é um mentor de carreira especializado em Big Tech.

    Gere 3 ideias de projetos para portfólio considerando:
    - Nível: ${userLevel}
    - Tecnologias: ${technologies.join(', ')}
    - Objetivo: ${careerGoal}

    Formato JSON:
    {
      "projects": [
        {
          "id": 1,
          "title": "Nome do Projeto",
          "description": "Descrição detalhada",
          "technologies": ["tech1", "tech2"],
          "difficulty": "iniciante/intermediário/avançado",
          "timeEstimate": "X semanas",
          "learningGoals": ["objetivo1", "objetivo2"],
          "deliverables": ["entregável1", "entregável2"],
          "githubIdeas": "Como estruturar no GitHub",
          "interviewValue": "Por que impressiona recrutadores"
        }
      ]
    }

    Projetos devem ser:
    - Relevantes para Big Tech
    - Escaláveis em complexidade
    - Com valor prático demonstrável
    - Diferenciados no mercado
    `;

    return await this.generateContent(prompt);
  }

  // Interview simulation
  async generateInterviewQuestions(role, company = 'Big Tech', questionType = 'mix') {
    const prompt = `
    Você é um entrevistador experiente de ${company} para a posição de ${role}.

    Gere 5 perguntas de entrevista (${questionType}) em português brasileiro.

    Formato JSON:
    {
      "role": "${role}",
      "company": "${company}",
      "questions": [
        {
          "id": 1,
          "type": "técnica/comportamental/caso",
          "question": "Pergunta da entrevista",
          "hints": ["dica1", "dica2"],
          "goodAnswerExample": "Exemplo de boa resposta",
          "evaluationCriteria": ["critério1", "critério2"],
          "followUpQuestions": ["pergunta de follow-up"]
        }
      ]
    }

    Perguntas devem ser:
    - Realistas para o nível da posição
    - Baseadas em entrevistas reais
    - Com critérios de avaliação claros
    - Focadas em soft e hard skills
    `;

    return await this.generateContent(prompt);
  }

  // Career path guidance
  async getCareerGuidance(currentLevel, targetRole, timeframe) {
    const prompt = `
    Você é um mentor de carreira especializado em Big Tech.

    Situação:
    - Nível atual: ${currentLevel}
    - Objetivo: ${targetRole}
    - Prazo: ${timeframe}

    Crie um plano de carreira personalizado:

    🎯 **Análise da lacuna:**
    [Diferença entre atual e objetivo]

    📚 **Prioridades de estudo:**
    [Top 3 áreas críticas]

    🗓️ **Cronograma realista:**
    [Marcos por mês/trimestre]

    💼 **Estratégias de networking:**
    [Como se conectar com pessoas certas]

    🎤 **Preparação para entrevistas:**
    [Plano específico de prática]

    🚀 **Dicas de diferenciação:**
    [Como se destacar dos concorrentes]

    ⚠️ **Armadilhas comuns:**
    [Erros a evitar]

    📈 **Métricas de progresso:**
    [Como saber se está no caminho certo]

    Seja específico, prático e motivador.
    `;

    return await this.generateContent(prompt);
  }
}

// Initialize Gemini AI
const geminiAI = new GeminiAI();

// Export functions for use in other modules
export {
  geminiAI,
  GeminiAI
};

// Global access for backward compatibility
if (typeof window !== 'undefined') {
  window.geminiAI = geminiAI;
}

export default geminiAI;
