// Simple hash-based SPA router for Roadmap Tech
// Responsibilities:
// 1. Detect route changes (#/ or #/roadmap/:id)
// 2. Toggle list view vs. detail view
// 3. Dynamically import roadmap data and render a detail page
// 4. Keep the implementation framework-free and lightweight

/*
  Assumptions:
  – `pages/roadmaps.html` owns the shell layout.
  – List view is wrapped in a #list-view element (shown by default).
  – Detail view placeholder is #roadmap-detail (initially hidden).
  – Data lives in ./data/roadmaps.js and is exported as `roadmaps` (object keyed by id).
*/

// Cache DOM references once – they exist only on roadmaps.html.
const listView = document.getElementById('list-view');
const detailView = document.getElementById('roadmap-detail');

// Guard in case script is executed on other pages.
if (!listView || !detailView) {
  console.warn('[SPA Router] Not on roadmaps.html – aborting router initialisation.');
  // Don't use return in global scope - just exit gracefully
} else {
  // Initialize router only if elements exist
  initializeRouter();
}

function initializeRouter() {
  // Kick-off router
  window.addEventListener('hashchange', route);
  route();
}

// Lazy-loaded copy of the data module.
let roadmapsData = null;

async function loadRoadmaps() {
  if (roadmapsData) return roadmapsData;
  try {
    const module = await import('./data/roadmaps.js');
    roadmapsData = module.roadmaps || module.default || {};
  } catch (err) {
    console.error('[SPA Router] Failed to load roadmaps data:', err);
    roadmapsData = {};
  }
  return roadmapsData;
}

function route() {
  const hash = window.location.hash || '#/';
  if (hash.startsWith('#/roadmap/')) {
    const id = decodeURIComponent(hash.split('/')[2] || '').trim();
    renderDetail(id);
  } else {
    // Default route → list
    showList();
  }
}

function showList() {
  listView.style.display = '';
  detailView.style.display = 'none';
  detailView.innerHTML = '';
  document.title = 'Roadmaps - Roadmap Tech';
}

async function renderDetail(id) {
  const data = await loadRoadmaps();
  const roadmap = data[id];
  if (!roadmap) {
    console.warn('[SPA Router] unknown roadmap id:', id);
    showList();
    return;
  }

  // Build markup – keep it lightweight but styled.
  const htmlParts = [];

  htmlParts.push(`<section class="roadmap-hero" style="text-align:center;margin:2rem auto;max-width:900px;">
    <div style="font-size:4rem;">${roadmap.icon || '📍'}</div>
    <h1 style="font-size:clamp(2rem,4vw,3rem);margin:1rem 0;">${roadmap.title}</h1>
    <p style="opacity:0.8;font-size:1.1rem;max-width:700px;margin:0 auto 2rem;">${roadmap.description || ''}</p>
    <button id="back-to-list" style="padding:0.75rem 1.5rem;border-radius:8px;border:none;cursor:pointer;background:#3b82f6;color:#fff;font-weight:600;">← Voltar</button>
  </section>`);

  // Add AI Cards Section


  roadmap.sections?.forEach(section => {
    htmlParts.push(`<section class="roadmap-section" style="margin:3rem auto;max-width:900px;">
      <h2 style="font-size:1.5rem;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">${section.icon || '📂'} ${section.title}</h2>
      ${section.description ? `<p style="margin-bottom:1rem;opacity:0.8;">${section.description}</p>` : ''}
      ${section.topics?.map(renderTopic).join('') || ''}
    </section>`);
  });

  detailView.innerHTML = htmlParts.join('\n');
  listView.style.display = 'none';
  detailView.style.display = 'block';
  document.title = `${roadmap.title} - Roadmap`; // Update tab title

  // Back button
  const backBtn = detailView.querySelector('#back-to-list');
  backBtn?.addEventListener('click', () => {
    window.location.hash = '#/';
  });


}

function renderTopic(topic) {
  return `<div class="topic-card" style="background:var(--glass-bg,rgba(255,255,255,0.1));border:1px solid var(--glass-border,rgba(255,255,255,0.2));border-radius:12px;padding:1.25rem;margin-bottom:1.25rem;">
    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
      <span style="font-size:1.25rem;">${getResourceIcon(topic.type)}</span>
      <strong>${topic.title}</strong>
      ${topic.estimatedHours ? `<span style="margin-left:auto;font-size:0.875rem;opacity:0.7;">${topic.estimatedHours}h</span>` : ''}
    </div>
    ${topic.description ? `<p style="font-size:0.95rem;opacity:0.8;margin-bottom:0.75rem;">${topic.description}</p>` : ''}
    ${topic.resources ? renderResources(topic.resources) : ''}
  </div>`;
}

function renderResources(resources = []) {
  if (!resources.length) return '';
  return `<ul style="display:flex;flex-direction:column;gap:0.5rem;">
    ${resources.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener" style="color:#60a5fa;text-decoration:none;">${getResourceIcon(r.type)} ${r.title}</a></li>`).join('')}
  </ul>`;
}





// AI Function Placeholders (will use global functions if available)
function generateProgressiveTask(topic) {
  if (typeof window.generateTask === 'function') {
    window.generateTask(topic);
  } else {
    console.warn('generateTask function not available');
    closeLoadingModal();
    alert('Sistema de Tarefas IA temporariamente indisponível');
  }
}

function askPersonalizedMentor(question) {
  if (typeof window.askMentor === 'function') {
    window.askMentor(question);
  } else {
    console.warn('askMentor function not available');
    alert('Mentor IA temporariamente indisponível');
  }
}

function generateAdvancedQuiz(topic) {
  if (typeof window.generateQuiz === 'function') {
    window.generateQuiz(topic);
  } else {
    console.warn('generateQuiz function not available');
    closeLoadingModal();
    alert('Quiz IA temporariamente indisponível');
  }
}

function analyzeResourceWithAI(resource) {
  if (typeof window.analyzeResource === 'function') {
    window.analyzeResource('Recurso de Aprendizado', resource);
  } else {
    console.warn('analyzeResource function not available');
    alert('Análise IA temporariamente indisponível');
  }
}

// Modal Functions Placeholders
function showLoadingModal(title, message) {
  if (typeof window.showLoadingModal === 'function') {
    window.showLoadingModal(title, message);
  } else {
    console.log(`Loading: ${title} - ${message}`);
  }
}

function closeLoadingModal() {
  if (typeof window.closeLoadingModal === 'function') {
    window.closeLoadingModal();
  }
}

function showInputModal(question, callback) {
  if (typeof window.showInputModal === 'function') {
    window.showInputModal(question, callback);
  } else {
    const result = prompt(question);
    if (result && callback) callback(result);
  }
}

function getResourceIcon(type = '') {
  switch ((type || '').toLowerCase()) {
    case 'curso':
    case 'course':
      return '🎓';
    case 'prática':
    case 'practice':
      return '💻';
    case 'vídeo':
    case 'video':
      return '🎬';
    case 'livro':
    case 'book':
      return '📖';
    case 'artigo':
    case 'article':
      return '📰';
    case 'dataset':
      return '📂';
    case 'documentação':
    case 'referência':
      return '📚';
    case 'template':
      return '📑';
    default:
      return '📌';
  }
}

// End of file
