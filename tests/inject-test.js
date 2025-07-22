// Teste direto para ser executado no console do browser
console.log('🚨 DIAGNÓSTICO BUGS CRÍTICOS - PRODUÇÃO REAL');

// Verificar cards de IA
const tarefasCard = document.querySelector('[data-card="ai-task"]');
const mentorCard = document.querySelector('[data-card="ai-mentor"]');
const quizCard = document.querySelector('[data-card="ai-quiz"]');
const analisarCard = document.querySelector('[data-card="ai-analyze"]');

console.log('Cards encontrados:', {
  tarefas: !!tarefasCard,
  mentor: !!mentorCard, 
  quiz: !!quizCard,
  analisar: !!analisarCard
});

// Executar teste de Tarefas IA
if (tarefasCard) {
  console.log('Testando Tarefas IA...');
  tarefasCard.click();
}
