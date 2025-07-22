/**
 * TESTE DIRETO - BUGS CRÍTICOS EM PRODUÇÃO
 * Executa diretamente no console do browser de produção
 */

console.log('🚨 DIAGNÓSTICO DIRETO - BUGS CRÍTICOS');
console.log('=====================================');

// Resultados dos testes
const bugReport = {
  tarefasIA: { tested: false, bugs: [] },
  mentorIA: { tested: false, bugs: [] },
  quizIA: { tested: false, bugs: [] },
  analisarRecursos: { tested: false, bugs: [] }
};

// Função helper para aguardar elemento
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }
    
    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });
    
    observer.observe(document, {
      childList: true,
      subtree: true
    });
    
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Elemento ${selector} não encontrado`));
    }, timeout);
  });
}

// TESTE 1: Tarefas IA
async function testTarefasIA() {
  console.log('\n🎯 TESTE 1: TAREFAS IA');
  
  try {
    // Verificar se card existe
    const card = document.querySelector('[data-card="ai-task"]');
    if (!card) {
      bugReport.tarefasIA.bugs.push('Card Tarefas IA não encontrado');
      return;
    }
    
    console.log('✅ Card encontrado, clicando...');
    card.click();
    
    // Aguardar modal aparecer
    const modal = await waitForElement('.modal, #questionModal', 8000);
    console.log('✅ Modal aberto');
    
    // Capturar pergunta atual
    const questionEl = modal.querySelector('.question-text, h3, .modal-body h3');
    const question1 = questionEl ? questionEl.textContent.trim() : '';
    console.log(`📋 Pergunta capturada: ${question1.substring(0, 50)}...`);
    
    // Testar seleção de alternativas
    const alternatives = modal.querySelectorAll('.option, input[type="radio"], .alternative');
    console.log(`📋 Alternativas encontradas: ${alternatives.length}`);
    
    if (alternatives.length > 0) {
      console.log('🔄 Testando seleção da primeira alternativa...');
      alternatives[0].click();
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar seleção visual
      const isSelected = alternatives[0].checked || 
                        alternatives[0].classList.contains('selected') ||
                        alternatives[0].parentElement.classList.contains('selected');
                        
      if (!isSelected) {
        bugReport.tarefasIA.bugs.push('Alternativa não fica selecionada visualmente');
        console.log('❌ BUG: Seleção visual não funciona');
      } else {
        console.log('✅ Seleção visual funcionando');
      }
    }
    
    // Fechar modal e testar repetição
    const closeBtn = modal.querySelector('.close, .modal-close, button[onclick*="close"]');
    if (closeBtn) {
      closeBtn.click();
      console.log('✅ Modal fechado');
      
      // Aguardar e clicar novamente para testar repetição
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('🔄 Testando repetição de perguntas...');
      
      card.click();
      const modal2 = await waitForElement('.modal, #questionModal', 8000);
      const questionEl2 = modal2.querySelector('.question-text, h3, .modal-body h3');
      const question2 = questionEl2 ? questionEl2.textContent.trim() : '';
      
      if (question1 === question2) {
        bugReport.tarefasIA.bugs.push('Perguntas sempre iguais - não há variedade');
        console.log('❌ BUG: Perguntas repetidas');
      } else {
        console.log('✅ Perguntas são diferentes');
      }
      
      // Fechar modal
      const closeBtn2 = modal2.querySelector('.close, .modal-close, button[onclick*="close"]');
      if (closeBtn2) closeBtn2.click();
    }
    
    bugReport.tarefasIA.tested = true;
    
  } catch (error) {
    console.log(`❌ Erro no teste Tarefas IA: ${error.message}`);
    bugReport.tarefasIA.bugs.push(`Erro: ${error.message}`);
  }
}

// TESTE 2: Mentor IA
async function testMentorIA() {
  console.log('\n🧠 TESTE 2: MENTOR IA');
  
  try {
    const card = document.querySelector('[data-card="ai-mentor"]');
    if (!card) {
      bugReport.mentorIA.bugs.push('Card Mentor IA não encontrado');
      return;
    }
    
    console.log('✅ Card encontrado, clicando...');
    card.click();
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verificar se apareceu modal customizado
    const inputModal = document.querySelector('.input-modal, #inputModal');
    
    if (inputModal) {
      console.log('✅ Modal customizado encontrado');
      
      // Verificar botão fechar
      const closeBtn = inputModal.querySelector('.close, .modal-close, button[onclick*="close"]');
      if (!closeBtn) {
        bugReport.mentorIA.bugs.push('Modal sem botão fechar');
        console.log('❌ BUG: Modal sem botão fechar');
      } else {
        console.log('🔄 Testando fechamento...');
        closeBtn.click();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const stillOpen = document.querySelector('.input-modal, #inputModal');
        if (stillOpen && stillOpen.style.display !== 'none') {
          bugReport.mentorIA.bugs.push('Modal não fecha ao clicar no botão');
          console.log('❌ BUG: Modal não fecha');
        } else {
          console.log('✅ Modal fecha corretamente');
        }
      }
    } else {
      bugReport.mentorIA.bugs.push('Usando prompt() nativo - não pode ser fechado facilmente');
      console.log('❌ BUG: Usando prompt() nativo');
    }
    
    bugReport.mentorIA.tested = true;
    
  } catch (error) {
    console.log(`❌ Erro no teste Mentor IA: ${error.message}`);
    bugReport.mentorIA.bugs.push(`Erro: ${error.message}`);
  }
}

// TESTE 3: Quiz IA
async function testQuizIA() {
  console.log('\n🧠 TESTE 3: QUIZ IA');
  
  try {
    const card = document.querySelector('[data-card="ai-quiz"]');
    if (!card) {
      bugReport.quizIA.bugs.push('Card Quiz IA não encontrado');
      return;
    }
    
    console.log('✅ Card encontrado, clicando...');
    card.click();
    
    // Aguardar resposta
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Verificar se apareceu erro
    const bodyText = document.body.textContent;
    const hasError = bodyText.includes('Não foi possível gerar o quiz');
    
    if (hasError) {
      bugReport.quizIA.bugs.push('Retorna erro de conexão');
      console.log('❌ BUG: Quiz IA com erro de conexão');
    } else {
      console.log('✅ Quiz IA funcionando');
    }
    
    bugReport.quizIA.tested = true;
    
  } catch (error) {
    console.log(`❌ Erro no teste Quiz IA: ${error.message}`);
    bugReport.quizIA.bugs.push(`Erro: ${error.message}`);
  }
}

// TESTE 4: Analisar Recursos
async function testAnalisarRecursos() {
  console.log('\n🔍 TESTE 4: ANALISAR RECURSOS');
  
  try {
    const card = document.querySelector('[data-card="ai-analyze"]');
    if (!card) {
      bugReport.analisarRecursos.bugs.push('Card Analisar não encontrado');
      return;
    }
    
    console.log('✅ Card encontrado, clicando...');
    card.click();
    
    // Aguardar resposta
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Verificar se apareceu erro
    const bodyText = document.body.textContent;
    const hasError = bodyText.includes('Não foi possível analisar o recurso');
    
    if (hasError) {
      bugReport.analisarRecursos.bugs.push('Retorna erro de conexão');
      console.log('❌ BUG: Analisar com erro de conexão');
    } else {
      console.log('✅ Analisar funcionando');
    }
    
    bugReport.analisarRecursos.tested = true;
    
  } catch (error) {
    console.log(`❌ Erro no teste Analisar: ${error.message}`);
    bugReport.analisarRecursos.bugs.push(`Erro: ${error.message}`);
  }
}

// EXECUTAR TODOS OS TESTES
async function runAllTests() {
  console.log('🚀 EXECUTANDO TODOS OS TESTES...\n');
  
  await testTarefasIA();
  await testMentorIA();
  await testQuizIA();  
  await testAnalisarRecursos();
  
  // RELATÓRIO FINAL
  console.log('\n' + '='.repeat(50));
  console.log('📊 RELATÓRIO FINAL - BUGS ENCONTRADOS');
  console.log('='.repeat(50));
  
  let totalBugs = 0;
  
  Object.keys(bugReport).forEach(test => {
    const result = bugReport[test];
    const status = result.tested ? (result.bugs.length === 0 ? '✅' : '❌') : '⏭️';
    
    console.log(`\n${status} ${test.toUpperCase()}:`);
    
    if (result.bugs.length > 0) {
      result.bugs.forEach(bug => {
        console.log(`   🔸 ${bug}`);
        totalBugs++;
      });
    } else if (result.tested) {
      console.log('   ✅ Funcionando corretamente');
    } else {
      console.log('   ⏭️ Não testado');
    }
  });
  
  console.log(`\n📈 TOTAL DE BUGS ENCONTRADOS: ${totalBugs}`);
  
  if (totalBugs === 0) {
    console.log('🎉 NENHUM BUG ENCONTRADO! Sistema funcionando.');
  } else {
    console.log('⚠️ BUGS ENCONTRADOS! Necessário correção.');
  }
  
  return bugReport;
}

// Auto-executar quando script for carregado
runAllTests();
