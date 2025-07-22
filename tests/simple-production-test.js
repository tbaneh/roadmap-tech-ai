// TESTE AUTOMATIZADO SIMPLES - PRODUÇÃO REAL
// Executar diretamente no console do browser de produção

console.log('🚨 TESTE PRODUÇÃO - BUGS CRÍTICOS');
console.log('================================');

async function testBugsCriticos() {
  const results = {};
  
  // TESTE 1: Verificar se cards existem
  console.log('\n1️⃣ VERIFICANDO CARDS DE IA...');
  const tarefasCard = document.querySelector('[data-card="ai-task"]');
  const mentorCard = document.querySelector('[data-card="ai-mentor"]');
  const quizCard = document.querySelector('[data-card="ai-quiz"]');
  const analisarCard = document.querySelector('[data-card="ai-analyze"]');
  
  console.log(`📋 Tarefas IA: ${tarefasCard ? '✅ ENCONTRADO' : '❌ NÃO ENCONTRADO'}`);
  console.log(`🧠 Mentor IA: ${mentorCard ? '✅ ENCONTRADO' : '❌ NÃO ENCONTRADO'}`);
  console.log(`🧠 Quiz IA: ${quizCard ? '✅ ENCONTRADO' : '❌ NÃO ENCONTRADO'}`);
  console.log(`🔍 Analisar: ${analisarCard ? '✅ ENCONTRADO' : '❌ NÃO ENCONTRADO'}`);
  
  // TESTE 2: Testar Tarefas IA - Problema de respostas corretas
  if (tarefasCard) {
    console.log('\n2️⃣ TESTANDO TAREFAS IA...');
    console.log('🔄 Clicando em Tarefas IA...');
    
    tarefasCard.click();
    
    // Aguiarda modal aparecer
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const modal = document.querySelector('.modal, #questionModal');
    if (modal) {
      console.log('✅ Modal de pergunta aberto');
      
      // Capturar pergunta
      const questionElement = modal.querySelector('.question-text, h3, .modal-body h3');
      const question = questionElement ? questionElement.textContent.trim() : 'N/A';
      console.log(`📋 Pergunta: ${question.substring(0, 60)}...`);
      
      // Capturar alternativas
      const alternatives = modal.querySelectorAll('.option, input[type="radio"], .alternative');
      console.log(`📋 Alternativas encontradas: ${alternatives.length}`);
      
      if (alternatives.length > 0) {
        // Selecionar primeira alternativa
        console.log('🔄 Selecionando primeira alternativa...');
        alternatives[0].click();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar seleção visual
        const isSelected = alternatives[0].checked || alternatives[0].classList.contains('selected');
        console.log(`📋 Seleção visual: ${isSelected ? '✅ FUNCIONANDO' : '❌ BUG CONFIRMADO'}`);
        results.selecaoVisual = isSelected;
      }
      
      // Fechar modal
      const closeBtn = modal.querySelector('.close, .modal-close, button[onclick*="close"]');
      if (closeBtn) {
        closeBtn.click();
      }
    } else {
      console.log('❌ Modal de pergunta NÃO abriu');
      results.modalTarefas = false;
    }
  }
  
  // TESTE 3: Testar Mentor IA - Problema do prompt que não fecha
  if (mentorCard) {
    console.log('\n3️⃣ TESTANDO MENTOR IA...');
    console.log('🔄 Clicando em Mentor IA...');
    
    mentorCard.click();
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verificar se modal customizado apareceu
    const inputModal = document.querySelector('.input-modal, #inputModal');
    if (inputModal) {
      console.log('✅ Modal customizado encontrado');
      
      // Verificar se tem botão fechar
      const closeBtn = inputModal.querySelector('.close, .modal-close');
      if (closeBtn) {
        console.log('✅ Botão fechar encontrado');
        closeBtn.click();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar se fechou
        const stillOpen = document.querySelector('.input-modal, #inputModal');
        console.log(`📋 Modal fecha: ${!stillOpen ? '✅ FUNCIONANDO' : '❌ BUG CONFIRMADO'}`);
        results.modalFecha = !stillOpen;
      } else {
        console.log('❌ BUG CONFIRMADO: Modal sem botão fechar');
        results.modalFecha = false;
      }
    } else {
      console.log('⚠️ Modal customizado não encontrado - pode estar usando prompt() nativo');
      results.modalFecha = false;
    }
  }
  
  // TESTE 4: Testar Quiz IA - Erro de conexão
  if (quizCard) {
    console.log('\n4️⃣ TESTANDO QUIZ IA...');
    console.log('🔄 Clicando em Quiz IA...');
    
    quizCard.click();
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Verificar se apareceu erro
    const errorText = 'Não foi possível gerar o quiz';
    const bodyText = document.body.textContent;
    const hasError = bodyText.includes(errorText);
    
    console.log(`📋 Erro de conexão Quiz: ${hasError ? '❌ BUG CONFIRMADO' : '✅ FUNCIONANDO'}`);
    results.quizError = hasError;
  }
  
  // TESTE 5: Testar Analisar - Erro de conexão
  if (analisarCard) {
    console.log('\n5️⃣ TESTANDO ANALISAR RECURSOS...');
    console.log('🔄 Clicando em Analisar...');
    
    analisarCard.click();
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Verificar se apareceu erro
    const errorText = 'Não foi possível analisar o recurso';
    const bodyText = document.body.textContent;
    const hasError = bodyText.includes(errorText);
    
    console.log(`📋 Erro de conexão Analisar: ${hasError ? '❌ BUG CONFIRMADO' : '✅ FUNCIONANDO'}`);
    results.analisarError = hasError;
  }
  
  console.log('\n==================================');
  console.log('📊 RESUMO DOS BUGS ENCONTRADOS:');
  console.log('==================================');
  
  if (results.selecaoVisual === false) console.log('❌ Seleção visual das alternativas não funciona');
  if (results.modalFecha === false) console.log('❌ Modal do Mentor IA não fecha corretamente');
  if (results.quizError === true) console.log('❌ Quiz IA retorna erro de conexão');
  if (results.analisarError === true) console.log('❌ Analisar Recursos retorna erro de conexão');
  
  const bugsCount = Object.values(results).filter(v => v === false || v === true && ['quizError', 'analisarError'].includes(Object.keys(results).find(k => results[k] === v))).length;
  console.log(`\n📈 TOTAL DE BUGS: ${bugsCount}`);
  
  return results;
}

// Executar teste
testBugsCriticos().then(results => {
  console.log('\n🎯 TESTE CONCLUÍDO!');
  console.log('Resultados:', results);
});
