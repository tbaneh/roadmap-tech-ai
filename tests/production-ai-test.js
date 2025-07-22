/**
 * TESTE AUTOMATIZADO REAL - SISTEMA DE PRODUÇÃO
 * Testa funcionalidades de IA diretamente no ambiente de produção
 * SEM MOCKS - Interação real com DOM e APIs
 */

console.log('🚨 INICIANDO TESTES REAIS DE PRODUÇÃO - FUNCIONALIDADES IA');
console.log('===============================================');

// Função para aguardar elemento aparecer no DOM
function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    function check() {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Elemento ${selector} não encontrado após ${timeout}ms`));
      } else {
        setTimeout(check, 100);
      }
    }
    
    check();
  });
}

// Função para aguardar texto específico aparecer
function waitForText(selector, expectedText, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    function check() {
      const element = document.querySelector(selector);
      if (element && element.textContent.includes(expectedText)) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Texto "${expectedText}" em ${selector} não encontrado após ${timeout}ms`));
      } else {
        setTimeout(check, 100);
      }
    }
    
    check();
  });
}

// Armazenar dados para análise
let testResults = {
  tarefasIA: { status: 'pending', errors: [], perguntas: [], respostasCorretas: [] },
  mentorIA: { status: 'pending', errors: [], promptAberto: false },
  quizIA: { status: 'pending', errors: [], mensagemErro: null },
  analisarRecursos: { status : 'pending', errors: [], mensagemErro: null }
};

/**
 * TESTE 1: TAREFAS IA - Verificar respostas incorretas e repetição
 */
async function testTarefasIAReal() {
  console.log('\n🎯 TESTE 1: TAREFAS IA (REAL)');
  console.log('- Testando geração real de perguntas e respostas...');
  
  try {
    // Procurar card de Tarefas IA
    const tarefasCard = await waitForElement('[data-card="ai-task"], .ai-card:contains("Tarefas IA")', 5000);
    console.log('✅ Card Tarefas IA encontrado');
    
    // Clicar no card para gerar primeira pergunta
    console.log('🔄 Clicando para gerar primeira pergunta...');
    tarefasCard.click();
    
    // Aguardar modal de pergunta aparecer
    const modal = await waitForElement('.modal, .question-modal, #questionModal', 10000);
    console.log('✅ Modal de pergunta aberto');
    
    // Capturar primeira pergunta
    const perguntaElement = document.querySelector('.question-text, .modal .question, h3');
    const pergunta1 = perguntaElement ? perguntaElement.textContent.trim() : 'N/A';
    console.log(`📋 Pergunta 1 capturada: ${pergunta1.substring(0, 50)}...`);
    testResults.tarefasIA.perguntas.push(pergunta1);
    
    // Capturar alternativas
    const alternativas = document.querySelectorAll('.option, .alternative, input[type="radio"]');
    console.log(`📋 ${alternativas.length} alternativas encontradas`);
    
    // Selecionar primeira alternativa (para teste)
    if (alternativas.length > 0) {
      console.log('🔄 Selecionando primeira alternativa...');
      alternativas[0].click();
      
      // Aguardar um momento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar se alternativa ficou selecionada visualmente
      const isSelected = alternativas[0].checked || alternativas[0].classList.contains('selected');
      console.log(`📋 Alternativa selecionada: ${isSelected ? 'SIM' : 'NÃO'}`);
      
      if (!isSelected) {
        testResults.tarefasIA.errors.push('Alternativa não fica selecionada visualmente');
      }
    }
    
    // Tentar avançar para próxima pergunta
    const nextButton = document.querySelector('.next-question, .continue, button:contains("Próxima")');
    if (nextButton) {
      console.log('🔄 Clicando para próxima pergunta...');
      nextButton.click();
      
      // Aguardar nova pergunta
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Capturar segunda pergunta
      const pergunta2Element = document.querySelector('.question-text, .modal .question, h3');
      const pergunta2 = pergunta2Element ? pergunta2Element.textContent.trim() : 'N/A';
      console.log(`📋 Pergunta 2 capturada: ${pergunta2.substring(0, 50)}...`);
      testResults.tarefasIA.perguntas.push(pergunta2);
      
      // Verificar se perguntas são diferentes
      if (pergunta1 === pergunta2) {
        testResults.tarefasIA.errors.push('Perguntas repetidas - sempre iguais');
        console.log('❌ BUG CONFIRMADO: Perguntas repetidas');
      } else {
        console.log('✅ Perguntas são diferentes');
      }
    }
    
    // Fechar modal
    const closeButton = document.querySelector('.close, .modal-close, button:contains("Fechar")');
    if (closeButton) {
      closeButton.click();
    }
    
    testResults.tarefasIA.status = testResults.tarefasIA.errors.length === 0 ? 'passed' : 'failed';
    
  } catch (error) {
    console.log(`❌ Erro no teste Tarefas IA: ${error.message}`);
    testResults.tarefasIA.status = 'failed';
    testResults.tarefasIA.errors.push(error.message);
  }
}

/**
 * TESTE 2: MENTOR IA - Verificar prompt que não fecha
 */
async function testMentorIAReal() {
  console.log('\n🧠 TESTE 2: MENTOR IA (REAL)');
  console.log('- Testando prompt que não fecha...');
  
  try {
    // Aguardar um momento antes de testar
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Procurar card de Mentor IA
    const mentorCard = await waitForElement('[data-card="ai-mentor"], .ai-card:contains("Mentor IA")', 5000);
    console.log('✅ Card Mentor IA encontrado');
    
    // Clicar no card
    console.log('🔄 Clicando no Mentor IA...');
    mentorCard.click();
    
    // Aguardar prompt aparecer
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar se prompt() nativo apareceu (não pode ser detectado diretamente)
    // Mas podemos verificar se modal customizado apareceu
    const inputModal = document.querySelector('.input-modal, .prompt-modal, #inputModal');
    
    if (inputModal) {
      console.log('✅ Modal customizado encontrado (substituiu prompt)');
      testResults.mentorIA.promptAberto = true;
      
      // Tentar fechar modal
      const closeBtn = inputModal.querySelector('.close, .modal-close, button[onclick*="close"]');
      if (closeBtn) {
        console.log('🔄 Tentando fechar modal...');
        closeBtn.click();
        
        // Verificar se fechou
        await new Promise(resolve => setTimeout(resolve, 1000));
        const modalAindaAberto = document.querySelector('.input-modal, .prompt-modal, #inputModal');
        
        if (modalAindaAberto && modalAindaAberto.style.display !== 'none') {
          testResults.mentorIA.errors.push('Modal não fecha ao clicar no botão fechar');
          console.log('❌ BUG CONFIRMADO: Modal não fecha');
        } else {
          console.log('✅ Modal fecha corretamente');
        }
      } else {
        testResults.mentorIA.errors.push('Modal não tem botão de fechar');
        console.log('❌ BUG CONFIRMADO: Modal sem botão fechar');
      }
    } else {
      console.log('⚠️ Modal customizado não encontrado - pode estar usando prompt() nativo');
      testResults.mentorIA.errors.push('Usando prompt() nativo em vez de modal customizado');
    }
    
    testResults.mentorIA.status = testResults.mentorIA.errors.length === 0 ? 'passed' : 'failed';
    
  } catch (error) {
    console.log(`❌ Erro no teste Mentor IA: ${error.message}`);
    testResults.mentorIA.status = 'failed';
    testResults.mentorIA.errors.push(error.message);
  }
}

/**
 * TESTE 3: QUIZ IA - Verificar erro de conexão
 */
async function testQuizIAReal() {
  console.log('\n🧠 TESTE 3: QUIZ IA (REAL)');
  console.log('- Testando erro de conexão...');
  
  try {
    // Aguardar um momento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Procurar card de Quiz IA
    const quizCard = await waitForElement('[data-card="ai-quiz"], .ai-card:contains("Quiz IA")', 5000);
    console.log('✅ Card Quiz IA encontrado');
    
    // Clicar no card
    console.log('🔄 Clicando no Quiz IA...');
    quizCard.click();
    
    // Aguardar resposta (sucesso ou erro)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Verificar se apareceu erro de conexão
    const errorText = 'Não foi possível gerar o quiz. Verifique sua conexão e tente novamente.';
    const errorElements = document.querySelectorAll('*');
    let errorFound = false;
    
    for (let element of errorElements) {
      if (element.textContent && element.textContent.includes(errorText)) {
        errorFound = true;
        testResults.quizIA.mensagemErro = element.textContent.trim();
        break;
      }
    }
    
    if (errorFound) {
      console.log('❌ BUG CONFIRMADO: Quiz IA retorna erro de conexão');
      testResults.quizIA.errors.push('Quiz IA retorna erro de conexão');
    } else {
      console.log('✅ Quiz IA não retornou erro de conexão');
    }
    
    testResults.quizIA.status = testResults.quizIA.errors.length === 0 ? 'passed' : 'failed';
    
  } catch (error) {
    console.log(`❌ Erro no teste Quiz IA: ${error.message}`);
    testResults.quizIA.status = 'failed';
    testResults.quizIA.errors.push(error.message);
  }
}

/**
 * TESTE 4: ANALISAR RECURSOS - Verificar erro de conexão
 */
async function testAnalisarRecursosReal() {
  console.log('\n🔍 TESTE 4: ANALISAR RECURSOS (REAL)');
  console.log('- Testando erro de conexão...');
  
  try {
    // Aguardar um momento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Procurar card de Analisar Recursos
    const analisarCard = await waitForElement('[data-card="ai-analyze"], .ai-card:contains("Analisar"), button:contains("Analisar")', 5000);
    console.log('✅ Card Analisar Recursos encontrado');
    
    // Clicar no card
    console.log('🔄 Clicando no Analisar Recursos...');
    analisarCard.click();
    
    // Aguardar resposta (sucesso ou erro)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Verificar se apareceu erro de conexão
    const errorText = 'Não foi possível analisar o recurso. Verifique sua conexão e tente novamente.';
    const errorElements = document.querySelectorAll('*');
    let errorFound = false;
    
    for (let element of errorElements) {
      if (element.textContent && element.textContent.includes(errorText)) {
        errorFound = true;
        testResults.analisarRecursos.mensagemErro = element.textContent.trim();
        break;
      }
    }
    
    if (errorFound) {
      console.log('❌ BUG CONFIRMADO: Analisar Recursos retorna erro de conexão');
      testResults.analisarRecursos.errors.push('Analisar Recursos retorna erro de conexão');
    } else {
      console.log('✅ Analisar Recursos não retornou erro de conexão');
    }
    
    testResults.analisarRecursos.status = testResults.analisarRecursos.errors.length === 0 ? 'passed' : 'failed';
    
  } catch (error) {
    console.log(`❌ Erro no teste Analisar Recursos: ${error.message}`);
    testResults.analisarRecursos.status = 'failed';
    testResults.analisarRecursos.errors.push(error.message);
  }
}

/**
 * EXECUTAR TODOS OS TESTES REAIS
 */
async function runAllProductionTests() {
  console.log('🚀 EXECUTANDO TODOS OS TESTES DE PRODUÇÃO...\n');
  
  // Aguardar página carregar completamente
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Executar testes sequencialmente
  await testTarefasIAReal();
  await testMentorIAReal();
  await testQuizIAReal();
  await testAnalisarRecursosReal();
  
  // Relatório final
  console.log('\n==================================================');
  console.log('📊 RELATÓRIO FINAL DOS TESTES DE PRODUÇÃO');
  console.log('==================================================');
  
  Object.keys(testResults).forEach(test => {
    const result = testResults[test];
    const status = result.status === 'passed' ? '✅' : '❌';
    console.log(`${status} ${test}: ${result.status.toUpperCase()}`);
    
    if (result.errors.length > 0) {
      result.errors.forEach(error => {
        console.log(`   🔸 Erro: ${error}`);
      });
    }
  });
  
  const totalTests = Object.keys(testResults).length;
  const passedTests = Object.values(testResults).filter(r => r.status === 'passed').length;
  const successRate = Math.round((passedTests / totalTests) * 100);
  
  console.log(`\n📈 RESULTADO GERAL:`);
  console.log(`✅ Testes aprovados: ${passedTests}/${totalTests}`);
  console.log(`❌ Testes falharam: ${totalTests - passedTests}/${totalTests}`);
  console.log(`📊 Taxa de sucesso: ${successRate}%`);
  
  if (passedTests === totalTests) {
    console.log(`\n🎉 TODOS OS TESTES PASSARAM! Sistema funcionando corretamente.`);
  } else {
    console.log(`\n⚠️ ALGUNS TESTES FALHARAM! Corrija os problemas antes do deploy.`);
  }
  
  return testResults;
}

// Executar testes quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runAllProductionTests);
} else {
  runAllProductionTests();
}
