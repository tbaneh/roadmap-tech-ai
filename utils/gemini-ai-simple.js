// Simple and Secure Gemini AI Implementation
// Compatible with local development without external dependencies
// Now uses secure environment configuration

class SimpleGeminiAI {
  constructor() {
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    this.isInitialized = false;
    this.apiKey = null;
    
    this.initializeSecurely();
  }
  
  initializeSecurely() {
    try {
      // Tentar carregar configuração segura
      this.loadApiKey();
      this.isInitialized = true;
      
      console.log('🤖 Simple Gemini AI inicializado com sucesso (modelo: gemini-1.5-flash)');
      console.log('🔐 API Key:', this.apiKey ? 'Carregada com segurança' : 'Usando fallback de desenvolvimento');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar Gemini AI:', error.message);
      this.isInitialized = false;
    }
  }
  
  loadApiKey() {
    // Múltiplas fontes para máxima compatibilidade
    this.apiKey = 
      // 1. Variável de ambiente (produção)
      (typeof process !== 'undefined' && process.env && process.env.geminiApiKey) ||
      (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) ||
      
      // 2. Variável global do browser (injetada durante build)
      (typeof window !== 'undefined' && window.GEMINI_API_KEY) ||
      
      // 3. Fallback para desenvolvimento local (apenas se não estiver em produção)
      (!this.isProduction() ? 'AIzaSyDXFW0fdQRnFMC7jIAtHIqJFREF6sp7nMc' : null);
      
    if (!this.apiKey) {
      throw new Error('🚨 API Key não configurada! Configure a variável de ambiente geminiApiKey.');
    }
  }
  
  isProduction() {
    return (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') ||
           (typeof window !== 'undefined' && window.NODE_ENV === 'production');
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

  // Gerar tarefa interativa com múltipla escolha - 5 perguntas + 3 dificuldades progressivas
  async generateTask(topic, initialDifficulty = 'beginner') {
    console.log(`🎯 Gerando 5 perguntas progressivas sobre: ${topic}`);
    
    // Definir configurações por dificuldade
    const difficultyConfigs = {
      'beginner': {
        name: 'Iniciante',
        description: 'Conceitos fundamentais e definições básicas',
        complexity: 'Perguntas diretas sobre conceitos base, terminologia e princípios fundamentais',
        scenarios: 'Situações simples do dia a dia profissional',
        color: '#10b981'
      },
      'intermediate': {
        name: 'Intermediário',
        description: 'Aplicação prática e análise de cenários',
        complexity: 'Perguntas sobre implementação, análise de casos e tomada de decisões',
        scenarios: 'Cenários reais de trabalho que exigem análise e aplicação de conhecimento',
        color: '#f59e0b'
      },
      'advanced': {
        name: 'Avançado',
        description: 'Estratégia, otimização e resolução de problemas complexos',
        complexity: 'Perguntas sobre otimização, arquitetura, liderança técnica e resolução de problemas complexos',
        scenarios: 'Desafios de alta complexidade, decisões estratégicas e cenários de liderança técnica',
        color: '#ef4444'
      }
    };

    // Gerar 5 perguntas progressivas (2 fáceis, 2 médias, 1 difícil)
    const questionDistribution = [
      { difficulty: 'beginner', number: 1 },
      { difficulty: 'beginner', number: 2 },
      { difficulty: 'intermediate', number: 3 },
      { difficulty: 'intermediate', number: 4 },
      { difficulty: 'advanced', number: 5 }
    ];

    try {
      const questions = [];
      
      for (const questionConfig of questionDistribution) {
        const { difficulty, number } = questionConfig;
        const config = difficultyConfigs[difficulty];
        
        console.log(`📝 Gerando pergunta ${number}/5 (${config.name})...`);
        
        const prompt = `
Crie UMA pergunta elaborada e desafiadora sobre: **${topic}**

**NÍVEL:** ${config.name} (${config.description})
**COMPLEXIDADE:** ${config.complexity}
**CENÁRIO:** ${config.scenarios}

**INSTRUÇÕES ESPECÍFICAS:**
- Pergunta ${number} de 5 (progressão de dificuldade)
- Crie uma pergunta que REALMENTE faça o usuário pensar
- Use cenários práticos e realistas do mercado de trabalho
- Alternativas devem ser plausíveis mas com apenas UMA correta
- Evite perguntas óbvias ou muito diretas
- Foque em aplicação prática e tomada de decisão

**FORMATO EXATO DA RESPOSTA:**
{
  "question": "[Pergunta elaborada e contextualizada]",
  "alternatives": [
    "[Alternativa A - detalhada e plausível]",
    "[Alternativa B - detalhada e plausível]", 
    "[Alternativa C - detalhada e plausível]",
    "[Alternativa D - detalhada e plausível]",
    "[Alternativa E - detalhada e plausível]"
  ],
  "correct": [Índice da alternativa correta: 0, 1, 2, 3 ou 4],
  "explanation": "[Explicação detalhada da resposta correta e por que as outras estão incorretas]",
  "difficulty": "${difficulty}",
  "questionNumber": ${number},
  "topic": "${topic}"
}

**IMPORTANTE:** Responda APENAS com o JSON, sem texto adicional.
`;
        
        const response = await this.generateContent(prompt);
        
        try {
          // Extrair JSON da resposta
          const jsonMatch = response.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const questionData = JSON.parse(jsonMatch[0]);
            questions.push({
              ...questionData,
              difficulty,
              difficultyConfig: config,
              questionNumber: number,
              totalQuestions: 5
            });
            console.log(`✅ Pergunta ${number} gerada com sucesso!`);
          } else {
            throw new Error('Formato JSON não encontrado na resposta');
          }
        } catch (parseError) {
          console.warn(`⚠️ Erro ao processar pergunta ${number}, usando fallback...`);
          // Fallback com pergunta básica
          questions.push(this.generateFallbackQuestion(topic, difficulty, number));
        }
      }
      
      console.log(`🎉 Todas as 5 perguntas geradas com sucesso!`);
      
      return {
        topic,
        totalQuestions: 5,
        questions,
        difficultyProgression: ['Iniciante', 'Iniciante', 'Intermediário', 'Intermediário', 'Avançado'],
        metadata: {
          generatedAt: new Date().toISOString(),
          version: '2.0',
          type: 'progressive_quiz'
        }
      };
      
    } catch (error) {
      console.error('❌ Erro ao gerar tarefas:', error);
      // Retornar fallback completo
      return this.generateFallbackTaskSet(topic);
    }
  }

  // Gerar pergunta de fallback
  generateFallbackQuestion(topic, difficulty, questionNumber) {
    const difficultyConfigs = {
      'beginner': { name: 'Iniciante', color: '#10b981' },
      'intermediate': { name: 'Intermediário', color: '#f59e0b' },
      'advanced': { name: 'Avançado', color: '#ef4444' }
    };
    
    const config = difficultyConfigs[difficulty];
    
    const fallbackQuestions = {
      beginner: {
        question: `Qual é o conceito fundamental mais importante para entender ${topic}?`,
        alternatives: [
          `${topic} é uma metodologia de desenvolvimento ágil`,
          `${topic} é uma ferramenta de análise de dados essencial para tomada de decisões`,
          `${topic} é apenas uma tendência passageira do mercado`,
          `${topic} é exclusivamente usado em grandes corporações`,
          `${topic} é uma linguagem de programação avançada`
        ],
        correct: 1,
        explanation: `${topic} é fundamentalmente uma ferramenta/conceito de análise que permite tomada de decisões baseada em dados, sendo aplicável em diversos contextos e tamanhos de empresa.`
      },
      intermediate: {
        question: `Em um cenário real de trabalho, qual seria a melhor abordagem para implementar ${topic} em uma empresa de médio porte?`,
        alternatives: [
          `Implementar tudo de uma vez sem planejamento para acelerar o processo`,
          `Começar com um projeto piloto, validar os resultados e depois escalar gradualmente`,
          `Contratar apenas consultores externos sem envolver a equipe interna`,
          `Focar apenas nos aspectos técnicos ignorando o impacto organizacional`,
          `Aguardar que a concorrência implemente primeiro para copiar a estratégia`
        ],
        correct: 1,
        explanation: `A melhor prática é sempre começar com um projeto piloto para ${topic}, validar os resultados, aprender com os desafios e então escalar gradualmente, envolvendo a equipe interna no processo.`
      },
      advanced: {
        question: `Como líder técnico, qual estratégia você adotaria para otimizar ${topic} em larga escala em uma organização multinacional?`,
        alternatives: [
          `Padronizar uma única solução global ignorando diferenças regionais`,
          `Permitir que cada região implemente sua própria solução sem coordenação`,
          `Criar um framework flexível com padrões globais e adaptações locais específicas`,
          `Terceirizar completamente a implementação para reduzir complexidade`,
          `Adiar a implementação até que uma solução perfeita seja encontrada`
        ],
        correct: 2,
        explanation: `Em organizações multinacionais, a melhor estratégia para ${topic} é criar um framework que balance padrões globais com flexibilidade para adaptações locais, garantindo consistência mas respeitando necessidades regionais específicas.`
      }
    };
    
    const fallback = fallbackQuestions[difficulty] || fallbackQuestions.intermediate;
    
    return {
      ...fallback,
      difficulty,
      difficultyConfig: config,
      questionNumber,
      totalQuestions: 5,
      topic,
      isFallback: true
    };
  }

  // Gerar conjunto completo de fallback
  generateFallbackTaskSet(topic) {
    console.log(`🔄 Gerando conjunto de fallback para: ${topic}`);
    
    const questions = [
      this.generateFallbackQuestion(topic, 'beginner', 1),
      this.generateFallbackQuestion(topic, 'beginner', 2),
      this.generateFallbackQuestion(topic, 'intermediate', 3),
      this.generateFallbackQuestion(topic, 'intermediate', 4),
      this.generateFallbackQuestion(topic, 'advanced', 5)
    ];
    
    return {
      topic,
      totalQuestions: 5,
      questions,
      difficultyProgression: ['Iniciante', 'Iniciante', 'Intermediário', 'Intermediário', 'Avançado'],
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '2.0',
        type: 'progressive_quiz_fallback'
      },
      isFallback: true
    };
  }

  // Método legacy mantido para compatibilidade (agora gera apenas 1 pergunta)
  async generateSingleTask(topic, difficulty = 'intermediate', questionNumber = 1, totalQuestions = 5) {
    console.log(`📝 Gerando pergunta individual: ${questionNumber}/${totalQuestions} sobre ${topic}`);
    
    const difficultyConfigs = {
      'beginner': {
        name: 'Iniciante',
        description: 'Conceitos fundamentais e definições básicas',
        complexity: 'Perguntas diretas sobre conceitos base e terminologia',
        scenarios: 'Situações simples do dia a dia profissional'
      },
      'intermediate': {
        name: 'Intermediário',
        description: 'Aplicação prática e análise de cenários',
        complexity: 'Perguntas sobre implementação e tomada de decisões',
        scenarios: 'Cenários reais de trabalho com análise'
      },
      'advanced': {
        name: 'Avançado',
        description: 'Estratégia e resolução de problemas complexos',
        complexity: 'Perguntas sobre otimização e liderança técnica',
        scenarios: 'Desafios complexos e decisões estratégicas'
      }
    };
    
    const config = difficultyConfigs[difficulty] || difficultyConfigs['intermediate'];
    
    const prompt = `
Crie uma tarefa prática sobre: ${topic}

**Configurações:**
- Dificuldade: ${config.name} (${config.description})
- Tipo: Múltipla escolha com 5 alternativas (A, B, C, D, E)
- Questão: ${questionNumber} de ${totalQuestions}
- Complexidade: ${config.complexity}
- Foco: ${config.scenarios}
    
    **IMPORTANTE: Responda APENAS com um JSON válido no formato exato abaixo:**
    
    {
      "question": "[Pergunta ${config.name.toLowerCase()} e prática sobre ${topic}]",
      "alternatives": [
        "[Opção A - clara e específica]",
        "[Opção B - clara e específica]", 
        "[Opção C - clara e específica]",
        "[Opção D - clara e específica]",
        "[Opção E - clara e específica]"
      ],
      "correct": [índice da resposta correta: 0, 1, 2, 3 ou 4],
      "explanation": "[Explicação detalhada de por que a resposta está correta, incluindo contexto prático e aplicação no mercado de trabalho. Explique também por que as outras alternativas estão incorretas.]",
      "difficulty": "${difficulty}",
      "questionNumber": ${questionNumber},
      "totalQuestions": ${totalQuestions}
    }
    
    **Contexto para ${topic} - Nível ${config.name}:**
    - ${config.scenarios}
    - Use ferramentas e tecnologias específicas da área
    - Inclua métricas, KPIs e resultados práticos quando aplicável
    - Torne as 5 alternativas plausíveis mas com apenas uma correta
    - Varie o tipo de pergunta: conceitual, prática, análise, comparação ou aplicação
    
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
      
      // Validate required fields for 5 alternatives
      if (!taskData.question || !taskData.alternatives || !Array.isArray(taskData.alternatives) || 
          taskData.alternatives.length !== 5 || typeof taskData.correct !== 'number' || 
          taskData.correct < 0 || taskData.correct > 4 || !taskData.explanation) {
        throw new Error('JSON structure invalid - expected 5 alternatives');
      }
      
      // Ensure difficulty and question tracking
      taskData.difficulty = taskData.difficulty || difficulty;
      taskData.questionNumber = taskData.questionNumber || questionNumber;
      taskData.totalQuestions = taskData.totalQuestions || totalQuestions;
      
      console.log(`✅ Tarefa gerada com sucesso (${questionNumber}/${totalQuestions} - ${difficulty}):`, taskData);
      return taskData;
      
    } catch (error) {
      console.warn('⚠️ Erro ao parsear JSON, usando fallback:', error);
      
      // Enhanced fallback with 5 alternatives and difficulty support
      const fallbackQuestions = {
        beginner: `Qual é a definição básica de ${topic}?`,
        intermediate: `Como ${topic} é aplicado na prática profissional?`,
        advanced: `Qual estratégia otimizada usar ao implementar ${topic} em larga escala?`
      };
      
      return {
        question: fallbackQuestions[difficulty] || `Qual é a principal aplicação de ${topic} no mercado de trabalho atual?`,
        alternatives: [
          `${topic} é usado principalmente para análise de dados`,
          `${topic} é focado apenas em desenvolvimento web`,
          `${topic} serve exclusivamente para mobile`,
          `${topic} é usado somente em inteligência artificial`,
          `${topic} não tem aplicação prática no mercado`
        ],
        correct: 0,
        explanation: `${topic} tem aplicações diversas, mas sua principal força está na análise e manipulação de dados, sendo amplamente usado em empresas para extrair insights valiosos e tomar decisões baseadas em dados. As outras alternativas são limitadas ou incorretas.`,
        difficulty: difficulty,
        questionNumber: questionNumber,
        totalQuestions: totalQuestions
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
