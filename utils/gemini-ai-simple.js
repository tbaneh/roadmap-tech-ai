// Simple and Secure Gemini AI Implementation
// Compatible with local development without external dependencies

class SimpleGeminiAI {
  constructor() {
    this.apiKey = 'AIzaSyDXFW0fdQRnFMC7jIAtHIqJFREF6sp7nMc'; // Note: In production, use environment variables
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    this.isInitialized = true;
    console.log('🤖 Simple Gemini AI inicializado com sucesso (modelo: gemini-1.5-flash)');
  }

  async generateContent(prompt, context = '') {
    if (!this.isInitialized) {
      throw new Error('Gemini AI não foi inicializado corretamente');
    }

    try {
      const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
      
      console.log('🔍 Iniciando chamada para API Gemini...');
      console.log('📝 Prompt:', fullPrompt.substring(0, 100) + '...');
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }]
        })
      });

      console.log('📡 Resposta HTTP status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro HTTP detalhado:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('📦 Dados recebidos:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const result = data.candidates[0].content.parts[0].text;
        console.log('✅ Resposta gerada com sucesso!');
        return result;
      } else {
        console.error('❌ Estrutura de resposta inválida:', data);
        throw new Error('Resposta inválida da API');
      }
    } catch (error) {
      console.error('❌ Erro detalhado ao gerar conteúdo:', error);
      console.error('❌ Stack trace:', error.stack);
      throw new Error(`Erro da IA: ${error.message}`);
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

  // Gerar quiz personalizado (mantido para compatibilidade)
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

  // Gerar tarefa interativa com múltipla escolha
  async generateTask(topic, difficulty = 'intermediate') {
    const prompt = `
    Crie uma tarefa prática sobre: ${topic}
    
    **Configurações:**
    - Dificuldade: ${difficulty}
    - Tipo: Múltipla escolha com 4 alternativas
    - Foco: Aplicação prática no mercado de trabalho
    
    **IMPORTANTE: Responda APENAS com um JSON válido no formato exato abaixo:**
    
    {
      "question": "[Pergunta clara e prática sobre ${topic}]",
      "alternatives": [
        "[Opção A - clara e específica]",
        "[Opção B - clara e específica]", 
        "[Opção C - clara e específica]",
        "[Opção D - clara e específica]"
      ],
      "correct": [índice da resposta correta: 0, 1, 2 ou 3],
      "explanation": "[Explicação detalhada de por que a resposta está correta, incluindo contexto prático e aplicação no mercado de trabalho]"
    }
    
    **Exemplo de contexto para ${topic}:**
    - Use cenários reais de trabalho
    - Inclua ferramentas específicas da área
    - Foque em situações práticas que um profissional enfrentaria
    - Torne as alternativas plausíveis mas com apenas uma correta
    
    **RESPONDA APENAS COM O JSON - NÃO ADICIONE TEXTO EXTRA**
    `;

    try {
      const response = await this.generateContent(prompt);
      
      // Clean response and try to parse JSON
      let cleanResponse = response.trim();
      
      // Remove any markdown code blocks if present
      cleanResponse = cleanResponse.replace(/```json\s*|```\s*/g, '');
      
      // Try to find JSON content
      const jsonMatch = cleanResponse.match(/\{[^}]*"question"[^}]*\}/s);
      if (jsonMatch) {
        cleanResponse = jsonMatch[0];
      }
      
      // Parse and validate JSON
      const taskData = JSON.parse(cleanResponse);
      
      // Validate required fields
      if (!taskData.question || !taskData.alternatives || !Array.isArray(taskData.alternatives) || 
          taskData.alternatives.length !== 4 || typeof taskData.correct !== 'number' || 
          taskData.correct < 0 || taskData.correct > 3 || !taskData.explanation) {
        throw new Error('JSON structure invalid');
      }
      
      console.log('✅ Tarefa gerada com sucesso:', taskData);
      return taskData;
      
    } catch (error) {
      console.warn('⚠️ Erro ao parsear JSON, usando fallback:', error);
      
      // Fallback with a sample task
      return {
        question: `Qual é a principal aplicação de ${topic} no mercado de trabalho atual?`,
        alternatives: [
          `${topic} é usado principalmente para análise de dados`,
          `${topic} é focado apenas em desenvolvimento web`,
          `${topic} serve exclusivamente para mobile`,
          `${topic} é usado somente em inteligência artificial`
        ],
        correct: 0,
        explanation: `${topic} tem aplicações diversas, mas sua principal força está na análise e manipulação de dados, sendo amplamente usado em empresas para extrair insights valiosos e tomar decisões baseadas em dados.`
      };
    }
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

export const getSimpleGeminiAI = () => {
  if (!geminiAI) {
    geminiAI = new SimpleGeminiAI();
  }
  return geminiAI;
};

// Global export for non-module usage
window.getSimpleGeminiAI = getSimpleGeminiAI;

export default SimpleGeminiAI;
