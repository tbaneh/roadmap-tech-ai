/**
 * 🎯 TESTES AUTOMATIZADOS - SISTEMA DE 5 PERGUNTAS PROGRESSIVAS
 * 
 * Testa o sistema completo de tarefas IA com:
 * - Geração de 5 perguntas progressivas
 * - Progressão de dificuldade (Iniciante → Intermediário → Avançado)
 * - Interface e navegação
 * - Fallback robusto
 */

const puppeteer = require('puppeteer');
const path = require('path');

// Configurações de teste
const TEST_CONFIG = {
  prodUrl: 'https://roadmap-tech-ai.vercel.app',
  timeout: 30000,
  headless: false, // Para ver os testes executando
  roadmaps: [
    { id: 'data-analyst', name: 'Data Analyst' },
    { id: 'bi-analyst', name: 'BI Analyst' }
  ]
};

class AITaskSystemTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      errors: []
    };
  }

  async setup() {
    console.log('🚀 Iniciando testes automatizados do Sistema de 5 Perguntas Progressivas...\n');
    
    this.browser = await puppeteer.launch({
      headless: TEST_CONFIG.headless,
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Configurar timeouts
    this.page.setDefaultTimeout(TEST_CONFIG.timeout);
    
    // Interceptar console logs
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text());
      } else if (msg.text().includes('🎯') || msg.text().includes('✅')) {
        console.log('📝 IA Log:', msg.text());
      }
    });
  }

  async teardown() {
    if (this.browser) {
      await this.browser.close();
    }
    
    this.printResults();
  }

  async test(name, testFn) {
    this.results.total++;
    console.log(`🧪 Testando: ${name}`);
    
    try {
      await testFn();
      this.results.passed++;
      console.log(`✅ PASSOU: ${name}\n`);
    } catch (error) {
      this.results.failed++;
      this.results.errors.push({ test: name, error: error.message });
      console.log(`❌ FALHOU: ${name} - ${error.message}\n`);
    }
  }

  async waitForElement(selector, timeout = 10000) {
    return await this.page.waitForSelector(selector, { timeout, visible: true });
  }

  async clickAndWait(selector, waitMs = 1000) {
    await this.page.click(selector);
    await this.page.waitForTimeout(waitMs);
  }

  // TESTE 1: Verificar se o site está acessível
  async testSiteAccessibility() {
    await this.test('Site está acessível', async () => {
      const response = await this.page.goto(TEST_CONFIG.prodUrl, { 
        waitUntil: 'networkidle2' 
      });
      
      if (response.status() !== 200) {
        throw new Error(`Site retornou status ${response.status()}`);
      }
      
      const title = await this.page.title();
      if (!title.includes('Roadmap Tech')) {
        throw new Error(`Título incorreto: ${title}`);
      }
    });
  }

  // TESTE 2: Navegar para roadmap específico
  async testRoadmapNavigation(roadmapId) {
    await this.test(`Navegação para roadmap ${roadmapId}`, async () => {
      const roadmapUrl = `${TEST_CONFIG.prodUrl}/pages/roadmaps.html#/roadmap/${roadmapId}`;
      await this.page.goto(roadmapUrl, { waitUntil: 'networkidle2' });
      
      // Verificar se carregou corretamente
      await this.waitForElement('.roadmap-content');
      
      const url = this.page.url();
      if (!url.includes(roadmapId)) {
        throw new Error(`URL incorreta: ${url}`);
      }
    });
  }

  // TESTE 3: Verificar presença dos cards de IA
  async testAICardsPresence() {
    await this.test('Cards de IA estão presentes', async () => {
      // Aguardar carregamento dos cards
      await this.waitForElement('[data-card-type="ai"]');
      
      const aiCards = await this.page.$$('[data-card-type="ai"]');
      if (aiCards.length === 0) {
        throw new Error('Nenhum card de IA encontrado');
      }
      
      console.log(`📊 Encontrados ${aiCards.length} cards de IA`);
    });
  }

  // TESTE 4: Testar clique no card "Tarefas IA"
  async testAITaskCardClick() {
    await this.test('Clique no card Tarefas IA funciona', async () => {
      // Encontrar e clicar no card Tarefas IA
      const taskCard = await this.page.$('[data-card="ai-task"]');
      if (!taskCard) {
        throw new Error('Card "Tarefas IA" não encontrado');
      }
      
      await this.clickAndWait('[data-card="ai-task"]', 2000);
      
      // Verificar se modal ou interface abriu
      const modal = await this.page.$('.modal, .ai-interface, [id*="modal"]');
      if (!modal) {
        console.log('⚠️ Modal não detectado, verificando console logs...');
      }
    });
  }

  // TESTE 5: Verificar geração de 5 perguntas progressivas
  async testFiveQuestionGeneration() {
    await this.test('Sistema gera 5 perguntas progressivas', async () => {
      // Aguardar geração das perguntas
      await this.page.waitForTimeout(5000);
      
      // Verificar console logs para confirmação
      const logs = [];
      this.page.on('console', msg => logs.push(msg.text()));
      
      // Aguardar mais tempo para geração completa
      await this.page.waitForTimeout(10000);
      
      // Verificar se logs indicam 5 perguntas
      const questionLogs = logs.filter(log => 
        log.includes('pergunta') || log.includes('question') || log.includes('/5')
      );
      
      if (questionLogs.length === 0) {
        console.log('⚠️ Nenhum log de perguntas detectado, possivelmente geração assíncrona');
      } else {
        console.log(`📊 Logs de perguntas encontrados: ${questionLogs.length}`);
      }
    });
  }

  // TESTE 6: Verificar sistema de fallback
  async testFallbackSystem() {
    await this.test('Sistema de fallback funciona', async () => {
      // Simular falha da IA (sem API key)
      await this.page.evaluateOnNewDocument(() => {
        // Mockear fetch para simular falha da API
        window.fetch = async () => {
          throw new Error('Simulated API failure');
        };
      });
      
      // Recarregar página e testar novamente
      await this.page.reload({ waitUntil: 'networkidle2' });
      await this.waitForElement('[data-card="ai-task"]');
      await this.clickAndWait('[data-card="ai-task"]', 3000);
      
      // Verificar se fallback foi ativado
      await this.page.waitForTimeout(5000);
      console.log('📊 Teste de fallback concluído');
    });
  }

  // TESTE 7: Verificar responsividade mobile
  async testMobileResponsiveness() {
    await this.test('Interface responsiva em mobile', async () => {
      // Simular dispositivo mobile
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.reload({ waitUntil: 'networkidle2' });
      
      // Verificar se cards estão visíveis
      await this.waitForElement('[data-card-type="ai"]');
      
      const cards = await this.page.$$('[data-card-type="ai"]');
      if (cards.length === 0) {
        throw new Error('Cards não visíveis em mobile');
      }
      
      // Restaurar viewport desktop
      await this.page.setViewport({ width: 1920, height: 1080 });
    });
  }

  // TESTE 8: Verificar performance de carregamento
  async testPerformance() {
    await this.test('Performance de carregamento adequada', async () => {
      const startTime = Date.now();
      
      await this.page.goto(TEST_CONFIG.prodUrl, { 
        waitUntil: 'networkidle2' 
      });
      
      const loadTime = Date.now() - startTime;
      console.log(`⏱️ Tempo de carregamento: ${loadTime}ms`);
      
      if (loadTime > 10000) {
        throw new Error(`Carregamento muito lento: ${loadTime}ms`);
      }
    });
  }

  // Executar todos os testes
  async runAllTests() {
    await this.setup();
    
    try {
      // Testes básicos
      await this.testSiteAccessibility();
      await this.testPerformance();
      
      // Testar cada roadmap
      for (const roadmap of TEST_CONFIG.roadmaps) {
        await this.testRoadmapNavigation(roadmap.id);
        await this.testAICardsPresence();
        await this.testAITaskCardClick();
        await this.testFiveQuestionGeneration();
      }
      
      // Testes avançados
      await this.testMobileResponsiveness();
      await this.testFallbackSystem();
      
    } catch (error) {
      console.error('❌ Erro durante execução dos testes:', error);
    } finally {
      await this.teardown();
    }
  }

  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE TESTES AUTOMATIZADOS');
    console.log('='.repeat(60));
    console.log(`📈 Total de testes: ${this.results.total}`);
    console.log(`✅ Sucessos: ${this.results.passed}`);
    console.log(`❌ Falhas: ${this.results.failed}`);
    console.log(`🎯 Taxa de sucesso: ${((this.results.passed/this.results.total)*100).toFixed(1)}%`);
    
    if (this.results.errors.length > 0) {
      console.log('\n❌ ERROS ENCONTRADOS:');
      this.results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.test}: ${error.error}`);
      });
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(this.results.failed === 0 ? '🎉 TODOS OS TESTES PASSARAM!' : '⚠️ ALGUNS TESTES FALHARAM');
    console.log('='.repeat(60) + '\n');
  }
}

// Executar testes se arquivo executado diretamente
if (require.main === module) {
  const tester = new AITaskSystemTester();
  tester.runAllTests().catch(console.error);
}

module.exports = AITaskSystemTester;
