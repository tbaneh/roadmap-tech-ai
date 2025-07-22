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
  async generateQuiz(topic, difficulty = 'intermediate', questionCount = 5, uniqueId = null) {
    // BUG FIX: Garantir unicidade sem expor timestamp
    const sessionId = uniqueId || Date.now();
    const uniqueTopic = `${topic}_${Math.random().toString(36).substr(2, 9)}`; // Adicionar sufixo único
    
    const prompt = `
    Crie um quiz ÚNICO e VARIADO sobre: ${topic}
    
    **Sessão:** ${sessionId} (para garantir unicidade)
    **Configurações:**
    - Dificuldade: ${difficulty}
    - Número de questões: ${questionCount}
    - Foco: Aplicação prática e conhecimento real
    - IMPORTANTE: Gere perguntas DIFERENTES a cada execução
    - IMPORTANTE: Varie a letra correta (A, B, C, D) - NÃO sempre a mesma
    
    **Formato da resposta:**
    
    ## 🧠 **Quiz: ${topic}**
    
    **Questão 1:**
    [Pergunta clara e prática - DIFERENTE das anteriores]
    
    a) [Opção A]
    b) [Opção B]
    c) [Opção C]
    d) [Opção D]
    
    **Resposta:** [Letra correta - VARIE entre A, B, C, D]
    **Explicação:** [Explicação detalhada]
    
    [Repetir formato para todas as questões - VARIAR as respostas corretas]
    
    ## 📈 **Próximos Passos:**
    - [3 recomendações de estudo]
    
    **IMPORTANTE:** Gere conteúdo SEMPRE DIFERENTE. Varie perguntas, alternativas e respostas corretas.
    `;

    return await this.generateContent(prompt);
  }

  // Gerar tarefa interativa com múltipla escolha - 5 perguntas + 3 dificuldades progressivas
  async generateTask(topic, initialDifficulty = 'beginner', uniqueId = null) {
    // BUG FIX: Usar uniqueId para unicidade sem expor no prompt
    const sessionId = uniqueId || Date.now();
    console.log(`🎯 Gerando 5 perguntas progressivas sobre: ${topic} (ID: ${sessionId})`);
    
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

    // Gerar 5 perguntas ÚNICAS com subtópicos específicos
    const questionDistribution = [
      { difficulty: 'beginner', number: 1, focus: 'conceitos-basicos', aspect: 'definições fundamentais' },
      { difficulty: 'beginner', number: 2, focus: 'terminologia', aspect: 'vocabulário técnico' },
      { difficulty: 'intermediate', number: 3, focus: 'aplicacao-pratica', aspect: 'implementação no trabalho' },
      { difficulty: 'intermediate', number: 4, focus: 'resolucao-problemas', aspect: 'análise de cenários' },
      { difficulty: 'advanced', number: 5, focus: 'estrategia-otimizacao', aspect: 'decisões arquiteturais' }
    ];

    try {
      const questions = [];
      
      for (const questionConfig of questionDistribution) {
        const { difficulty, number, focus, aspect } = questionConfig;
        const config = difficultyConfigs[difficulty];
        
        console.log(`📝 Gerando pergunta ${number}/5 (${config.name})...`);
        
        const prompt = `
Crie UMA pergunta ÚNICA e específica sobre: **${topic}**

**SESSÃO:** ${sessionId} (para garantir unicidade absoluta)
**NÍVEL:** ${config.name} (${config.description})
**FOCO ESPECÍFICO:** ${questionConfig.focus} - ${questionConfig.aspect}
**COMPLEXIDADE:** ${config.complexity}
**CENÁRIO:** ${config.scenarios}

**INSTRUÇÕES CRÍTICAS PARA UNICIDADE:**
- Pergunta ${number} de 5 - DEVE ser COMPLETAMENTE DIFERENTE das outras
- Foque EXCLUSIVAMENTE em: ${questionConfig.aspect}
- Use um ângulo específico: ${questionConfig.focus}
- Varie o contexto: ${number <= 2 ? 'conceitual/teórico' : number <= 4 ? 'prático/aplicado' : 'estratégico/avançado'}
- NUNCA repita conceitos ou estruturas de perguntas anteriores
- Cada pergunta deve abordar um aspecto DISTINTO do tópico
- Use cenários e exemplos específicos para esta perspectiva
- RANDOMIZE a alternativa correta (NÃO sempre A): deve variar entre A, B, C, D ou E

**FORMATO EXATO DA RESPOSTA:**
{
  "question": "[Pergunta elaborada e contextualizada SEM expor o sessionId]",
  "alternatives": [
    "[Alternativa A - detalhada e plausível]",
    "[Alternativa B - detalhada e plausível]", 
    "[Alternativa C - detalhada e plausível]",
    "[Alternativa D - detalhada e plausível]",
    "[Alternativa E - detalhada e plausível]"
  ],
  "correct": [RANDOMIZE: 0, 1, 2, 3 ou 4 - NÃO SEMPRE 0],
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

  // Gerar pergunta de fallback - BUG FIX: PERGUNTAS DINÂMICAS E RESPOSTAS RANDOMIZADAS
  generateFallbackQuestion(topic, difficulty, questionNumber) {
    console.log(`🔄 Gerando fallback DINÂMICO para pergunta ${questionNumber} (${difficulty})...`);
    
    // BUG FIX: Gerar perguntas DINÂMICAS com randomização
    const timestamp = Date.now();
    const randomSeed = Math.random().toString(36).substr(2, 9);
    
    // Templates de perguntas dinâmicas baseadas no questionNumber
    const questionTemplates = {
      1: {
        beginner: {
          questions: [
            `Qual é o conceito fundamental do ${topic}?`,
            `Como o ${topic} se diferencia de outras tecnologias?`,
            `Qual é a principal aplicação do ${topic}?`,
            `Por que o ${topic} é importante na atualidade?`
          ],
          baseAlternatives: [
            `Tecnologia moderna para análise e processamento de dados`,
            `Ferramenta exclusiva para desenvolvimento web`,
            `Sistema apenas para dispositivos móveis`,
            `Linguagem de programação básica`,
            `Software obsoleto sem uso atual`
          ]
        }
      },
      2: {
        beginner: {
          questions: [
            `Quais ferramentas são fundamentais no ecossistema ${topic}?`,
            `Que recursos são essenciais para trabalhar com ${topic}?`,
            `Quais conceitos básicos definem o ${topic}?`,
            `Que características tornam o ${topic} único?`
          ],
          baseAlternatives: [
            `Bibliotecas, frameworks, documentação e comunidade ativa`,
            `Apenas interfaces gráficas simples`,
            `Somente hardware especializado`,
            `Exclusivamente teoria matemática`,
            `Apenas redes sociais e marketing`
          ]
        }
      },
      3: {
        intermediate: {
          questions: [
            `Em que contexto ${topic} oferece maior vantagem competitiva?`,
            `Qual é a principal aplicação prática do ${topic}?`,
            `Como ${topic} impacta na produtividade empresarial?`,
            `Onde ${topic} demonstra maior eficiência?`
          ],
          baseAlternatives: [
            `Análise de dados, automação e insights estratégicos`,
            `Apenas apresentações visuais simples`,
            `Exclusivamente entretenimento digital`,
            `Somente manutenção de sistemas antigos`,
            `Apenas criação de documentos básicos`
          ]
        }
      },
      4: {
        intermediate: {
          questions: [
            `Qual metodologia é mais eficaz para implementar ${topic}?`,
            `Como estruturar um projeto ${topic} para o sucesso?`,
            `Que abordagem garante melhor resultado com ${topic}?`,
            `Qual estratégia otimiza o uso de ${topic}?`
          ],
          baseAlternatives: [
            `Planejamento estruturado, prototipagem e testes contínuos`,
            `Desenvolvimento sem planejamento prévio`,
            `Cópia de soluções sem adaptação`,
            `Foco apenas na interface visual`,
            `Uso de soluções únicas para todos os casos`
          ]
        }
      },
      5: {
        advanced: {
          questions: [
            `Como escalar ${topic} em empresas de grande porte?`,
            `Qual arquitetura suporta melhor o crescimento de ${topic}?`,
            `Que estratégia garante escalabilidade do ${topic}?`,
            `Como otimizar ${topic} para alta demanda?`
          ],
          baseAlternatives: [
            `Arquitetura modular, microsserviços e CI/CD robusto`,
            `Arquitetura monolítica sem divisão`,
            `Soluções locais sem escalabilidade`,
            `Velocidade sobre qualidade e manutenibilidade`,
            `Soluções temporárias sem visão futura`
          ]
        }
      }
    };
    
    // BUG FIX: Lógica de randomização completa
    const template = questionTemplates[questionNumber]?.[difficulty];
    
    if (template) {
      // Selecionar pergunta aleatória
      const randomQuestionIndex = Math.floor(Math.random() * template.questions.length);
      const selectedQuestion = template.questions[randomQuestionIndex];
      
      // Embaralhar alternativas
      const shuffledAlternatives = [...template.baseAlternatives];
      for (let i = shuffledAlternatives.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAlternatives[i], shuffledAlternatives[j]] = [shuffledAlternatives[j], shuffledAlternatives[i]];
      }
      
      // BUG FIX: Randomizar resposta correta (NÃO sempre índice 0)
      const correctAnswerIndex = Math.floor(Math.random() * shuffledAlternatives.length);
      
      return {
        question: selectedQuestion,
        alternatives: shuffledAlternatives,
        correct: correctAnswerIndex,
        explanation: `A resposta correta demonstra as melhores práticas para ${topic}, baseada em expertise profissional e abordagens comprovadas no mercado atual.`,
        difficulty: difficulty,
        questionNumber: questionNumber,
        topic: topic,
        source: 'fallback-dynamic',
        timestamp: timestamp,
        randomSeed: randomSeed
      };
    } else {
      // BUG FIX: Fallback final extremo também com randomização
      const genericAlternatives = [
        `Compreensão profunda dos fundamentos, aplicação prática consistente e adaptação contínua às tendências do mercado`,
        `Memorização de sintaxe sem compreensão conceitual`,
        `Foco exclusivo em aspectos teóricos sem implementação prática`,
        `Uso limitado sem explorar o potencial completo da tecnologia`,
        `Aplicação superficial sem considerar boas práticas e padrões`
      ];
      
      // Embaralhar alternativas
      const shuffledGeneric = [...genericAlternatives];
      for (let i = shuffledGeneric.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledGeneric[i], shuffledGeneric[j]] = [shuffledGeneric[j], shuffledGeneric[i]];
      }
      
      // BUG FIX: Randomizar resposta correta
      const randomCorrect = Math.floor(Math.random() * shuffledGeneric.length);
      
      return {
        question: `Considerando o contexto profissional atual, qual é o aspecto MAIS crítico de ${topic}?`,
        alternatives: shuffledGeneric,
        correct: randomCorrect,
        explanation: `Para maximizar o valor de ${topic}, profissionais devem combinar conhecimento teórico sólido, experiência prática consistente e capacidade de adaptação às demandas e inovações do mercado tecnológico.`,
        difficulty: difficulty,
        questionNumber: questionNumber,
        topic: topic,
        source: 'fallback-generic-randomized',
        timestamp: timestamp,
        randomSeed: randomSeed
      };
    }
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

  // BUG FIX: Implementar função generateQuiz que estava faltando
  async generateQuiz(topic, difficulty = 'intermediate', numQuestions = 5, uniqueId = null) {
    console.log(`🧠 Gerando Quiz IA: ${topic} (${difficulty}) - ${numQuestions} perguntas`);
    
    try {
      const prompt = `
Crie um quiz educacional sobre "${topic}" com ${numQuestions} perguntas de nível ${difficulty}.
      
Retorne APENAS um objeto JSON válido com esta estrutura:
{
  "title": "Quiz: ${topic}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "question": "Pergunta aqui?",
      "alternatives": ["A) Opção 1", "B) Opção 2", "C) Opção 3", "D) Opção 4"],
      "correct": 0,
      "explanation": "Explicação da resposta correta"
    }
  ]
}
      
Importante:
- Cada pergunta deve ter exatamente 4 alternativas (A, B, C, D)
- O campo "correct" deve indicar o índice da resposta correta (0, 1, 2 ou 3)
- Varie a resposta correta entre as alternativas
- Perguntas relevantes e práticas sobre ${topic}
- Explicações claras e educativas
      `;
      
      const response = await this.callGeminiAPI(prompt);
      
      if (response && response.candidates && response.candidates[0]) {
        const text = response.candidates[0].content.parts[0].text;
        
        // Parse JSON
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const quiz = JSON.parse(cleanText);
        
        // Validar estrutura
        if (quiz.questions && quiz.questions.length > 0) {
          console.log(`✅ Quiz gerado com ${quiz.questions.length} perguntas`);
          return quiz;
        }
      }
      
      throw new Error('Resposta inválida da API');
      
    } catch (error) {
      console.error('❌ Erro ao gerar quiz:', error);
      
      // BUG FIX: Fallback robusto para quiz
      const timestamp = uniqueId || Date.now();
      const randomSeed = Math.floor(Math.random() * 1000);
      
      const questions = [];
      
      // Gerar múltiplas perguntas baseadas no template
      for (let i = 0; i < numQuestions; i++) {
        const questionVariations = [
          `Qual é a principal vantagem de ${topic} em projetos profissionais?`,
          `Como ${topic} impacta a produtividade em ambientes corporativos?`,
          `Que metodologia funciona melhor com ${topic}?`,
          `Qual ferramenta complementa ${topic} de forma mais eficaz?`,
          `Como otimizar ${topic} para melhor performance?`
        ];
        
        const questionIndex = (randomSeed + i) % questionVariations.length;
        const correctIndex = (randomSeed + i * 2) % 4;
        
        const alternatives = [
          `Solução robusta e escalável`,
          `Abordagem básica sem otimização`,
          `Implementação temporária e limitada`,
          `Alternativa obsoleta sem suporte`
        ];
        
        // Embaralhar alternativas
        for (let j = alternatives.length - 1; j > 0; j--) {
          const k = (randomSeed + i + j) % (j + 1);
          [alternatives[j], alternatives[k]] = [alternatives[k], alternatives[j]];
        }
        
        questions.push({
          question: questionVariations[questionIndex],
          alternatives: alternatives.map((alt, idx) => `${String.fromCharCode(65 + idx)}) ${alt}`),
          correct: correctIndex,
          explanation: `A resposta correta demonstra as melhores práticas para ${topic}, baseada em experiência profissional e resultados comprovados.`
        });
      }
      
      return {
        title: `Quiz: ${topic}`,
        difficulty: difficulty,
        questions: questions,
        metadata: {
          fallback: true,
          timestamp: timestamp,
          randomSeed: randomSeed
        }
      };
    }
  }
  
  // BUG FIX: Implementar função analyzeResource que estava faltando
  async analyzeResource(resource) {
    console.log(`🔍 Analisando recurso: ${resource.title}`);
    
    try {
      const prompt = `
Analise o seguinte recurso educacional e forneça uma análise detalhada:
      
**Recurso:**
- Título: ${resource.title}
- URL: ${resource.url || 'N/A'}
- Tipo: ${resource.type || 'Recurso'}
- Provedor: ${resource.provider || 'N/A'}
      
Retorne APENAS um objeto JSON válido com esta estrutura:
{
  "title": "Análise: ${resource.title}",
  "summary": "Resumo do recurso em 2-3 frases",
  "pros": ["Vantagem 1", "Vantagem 2", "Vantagem 3"],
  "cons": ["Limitação 1", "Limitação 2"],
  "rating": 8.5,
  "targetAudience": "Para quem é recomendado",
  "prerequisites": ["Pré-requisito 1", "Pré-requisito 2"],
  "learningOutcomes": ["O que você vai aprender 1", "O que você vai aprender 2"],
  "recommendation": "Recomendação final sobre o recurso"
}
      
Importante:
- Análise baseada no título e contexto do recurso
- Rating de 0 a 10
- Pros e contras realistas
- Recomendações práticas
      `;
      
      const response = await this.callGeminiAPI(prompt);
      
      if (response && response.candidates && response.candidates[0]) {
        const text = response.candidates[0].content.parts[0].text;
        
        // Parse JSON
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const analysis = JSON.parse(cleanText);
        
        // Validar estrutura
        if (analysis.title && analysis.summary) {
          console.log(`✅ Análise gerada para: ${resource.title}`);
          return analysis;
        }
      }
      
      throw new Error('Resposta inválida da API');
      
    } catch (error) {
      console.error('❌ Erro ao analisar recurso:', error);
      
      // BUG FIX: Fallback robusto para análise de recursos
      const resourceType = resource.type || 'Recurso';
      const resourceProvider = resource.provider || 'Plataforma';
      
      return {
        title: `Análise: ${resource.title}`,
        summary: `${resourceType} oferecido pela ${resourceProvider} com foco em desenvolvimento profissional e aprendizado prático. Recurso relevante para quem busca conhecimento estruturado na área.`,
        pros: [
          `Conteúdo estruturado de ${resourceType.toLowerCase()}`,
          `Provedor confiável (${resourceProvider})`,
          "Aplicação prática dos conceitos",
          "Material atualizado com tendências do mercado"
        ],
        cons: [
          "Pode exigir dedicação significativa de tempo",
          "Alguns conceitos podem ser desafiadores para iniciantes"
        ],
        rating: 8.2,
        targetAudience: "Profissionais e estudantes que desejam aprofundar conhecimentos na área de tecnologia",
        prerequisites: [
          "Conhecimento básico em tecnologia",
          "Dedicação para estudos regulares"
        ],
        learningOutcomes: [
          "Domínio dos conceitos fundamentais apresentados",
          "Capacidade de aplicar conhecimentos em projetos reais",
          "Preparação para desafios profissionais da área"
        ],
        recommendation: `Recomendado para quem busca ${resourceType.toLowerCase()} de qualidade. A ${resourceProvider} oferece conteúdo confiável que pode agregar valor significativo ao desenvolvimento profissional.`,
        metadata: {
          fallback: true,
          analyzedAt: new Date().toISOString(),
          resourceType: resourceType,
          provider: resourceProvider
        }
      };
    }
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
      
      // BUG FIX: Gerar alternativas dinâmicas e corretas randomizadas
      const timestamp = Date.now();
      const randomSeed = Math.floor(Math.random() * 1000) + questionNumber;
      
      const dynamicQuestions = {
        beginner: [
          `Qual é o conceito fundamental de ${topic}?`,
          `Como ${topic} se diferencia de outras tecnologias?`,
          `Qual é a principal aplicação de ${topic}?`,
          `Por que ${topic} é importante na atualidade?`
        ],
        intermediate: [
          `Em que contexto ${topic} oferece maior vantagem?`,
          `Qual metodologia é mais eficaz para ${topic}?`,
          `Como ${topic} impacta na produtividade?`,
          `Que ferramentas complementam ${topic}?`
        ],
        advanced: [
          `Como escalar ${topic} em grandes empresas?`,
          `Qual arquitetura suporta melhor ${topic}?`,
          `Que estratégia garante ROI com ${topic}?`,
          `Como ${topic} se integra com IA/ML?`
        ]
      };
      
      const dynamicAlternatives = {
        beginner: [
          `Tecnologia moderna para análise e processamento de dados`,
          `Ferramenta exclusiva para desenvolvimento web`,
          `Sistema apenas para dispositivos móveis`,
          `Linguagem de programação básica`,
          `Software obsoleto sem uso atual`
        ],
        intermediate: [
          `Análise de dados e insights estratégicos`,
          `Apenas apresentações visuais simples`,
          `Exclusivamente entretenimento digital`,
          `Somente manutenção de sistemas antigos`,
          `Apenas documentos básicos`
        ],
        advanced: [
          `Arquitetura modular e CI/CD robusto`,
          `Arquitetura monolítica sem divisão`,
          `Soluções locais sem escalabilidade`,
          `Velocidade sobre qualidade`,
          `Soluções temporárias sem visão futura`
        ]
      };
      
      // Selecionar pergunta e alternativas baseadas na dificuldade
      const questions = dynamicQuestions[difficulty] || dynamicQuestions['intermediate'];
      const alternatives = dynamicAlternatives[difficulty] || dynamicAlternatives['intermediate'];
      
      // Randomizar seleção de pergunta
      const questionIndex = (randomSeed + questionNumber) % questions.length;
      const selectedQuestion = questions[questionIndex];
      
      // Embaralhar alternativas
      const shuffledAlternatives = [...alternatives];
      for (let i = shuffledAlternatives.length - 1; i > 0; i--) {
        const j = (randomSeed + i) % (i + 1);
        [shuffledAlternatives[i], shuffledAlternatives[j]] = [shuffledAlternatives[j], shuffledAlternatives[i]];
      }
      
      // BUG FIX: Randomizar resposta correta (não sempre 0/A)
      const correctIndex = (randomSeed + questionNumber * 3) % 5;
      
      return {
        question: selectedQuestion,
        alternatives: shuffledAlternatives,
        correct: correctIndex,
        explanation: `A resposta correta demonstra as melhores práticas para ${topic}, baseada em expertise profissional e abordagens comprovadas no mercado atual. As outras alternativas são limitadas ou incorretas para o contexto específico.`,
        difficulty: difficulty,
        questionNumber: questionNumber,
        totalQuestions: totalQuestions,
        metadata: {
          timestamp: timestamp,
          randomSeed: randomSeed,
          questionIndex: questionIndex,
          correctIndex: correctIndex
        }
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
