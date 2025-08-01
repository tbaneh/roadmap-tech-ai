// Roadmap Card Component
export function createRoadmapCard(roadmap, index = 0) {
  const difficultyColors = {
    beginner: 'difficulty-beginner',
    intermediate: 'difficulty-intermediate',
    advanced: 'difficulty-advanced'
  };

  const gradientClasses = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    purple: 'from-purple-500 to-purple-700',
    red: 'from-red-500 to-red-700'
  };

  const difficultyLabels = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado'
  };

  const staggerClass = index < 4 ? `stagger-${index + 1}` : '';

  return `
    <article class="roadmap-card slide-up ${staggerClass}" data-roadmap-id="${roadmap.id}">
      <div class="roadmap-card-header">
        <div class="roadmap-icon bg-gradient-to-br ${gradientClasses[roadmap.color]}">
          ${roadmap.icon}
        </div>
        <div>
          <h2 class="roadmap-title">${roadmap.title}</h2>
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="difficulty-badge ${difficultyColors[roadmap.difficulty]}">
              ${difficultyLabels[roadmap.difficulty]}
            </span>
            <span>•</span>
            <span>⏱️ ${roadmap.duration}</span>
          </div>
        </div>
      </div>
      
      <p class="roadmap-description">${roadmap.description}</p>
      
      <div class="roadmap-tags">
        ${roadmap.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      
      <div class="roadmap-meta">
        <div class="flex items-center gap-4 text-xs">
          <span class="flex items-center gap-1">
            <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
            ${roadmap.sections.length} seções
          </span>
          <span class="flex items-center gap-1">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            ${roadmap.sections.reduce((sum, section) => sum + section.topics.length, 0)} tópicos
          </span>
        </div>
        <div class="text-xs font-medium text-green-600 dark:text-green-400">
          ${roadmap.averageSalary}
        </div>
      </div>
      
      <div class="mt-auto">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Progresso</span>
          <span class="text-sm font-medium text-blue-600 dark:text-blue-400" id="progress-${roadmap.id}">0%</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar" style="width: 0%" id="progress-bar-${roadmap.id}"></div>
        </div>
      </div>
      
      <div class="mt-6 flex gap-3">
        <a href="./roadmap.html?id=${roadmap.id}" class="flex-1 bg-gradient-to-r ${gradientClasses[roadmap.color]} text-white py-3 px-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-center no-underline">
          🚀 Iniciar Trilha
        </a>
        <button class="btn-icon tooltip" data-tooltip="Adicionar aos favoritos">
          ❤️
        </button>
        <button class="btn-icon tooltip" data-tooltip="Compartilhar">
          📤
        </button>
      </div>
      
      <div class="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span class="font-medium">Trilha de carreira:</span> ${roadmap.careerPath}
      </div>
    </article>
  `;
}

// Progress management
export class ProgressManager {
  constructor() {
    this.loadProgress();
  }

  loadProgress() {
    this.progress = JSON.parse(localStorage.getItem('roadmap-progress') || '{}');
  }

  saveProgress() {
    localStorage.setItem('roadmap-progress', JSON.stringify(this.progress));
  }

  getProgress(roadmapId) {
    return this.progress[roadmapId] || { completed: [], percentage: 0 };
  }

  updateProgress(roadmapId, topicId, completed = true) {
    if (!this.progress[roadmapId]) {
      this.progress[roadmapId] = { completed: [], percentage: 0 };
    }

    const roadmapProgress = this.progress[roadmapId];
    
    if (completed && !roadmapProgress.completed.includes(topicId)) {
      roadmapProgress.completed.push(topicId);
    } else if (!completed) {
      roadmapProgress.completed = roadmapProgress.completed.filter(id => id !== topicId);
    }

    // Calculate percentage (this would need the roadmap data to get total topics)
    // For now, we'll update it when rendering
    
    this.saveProgress();
    this.updateProgressDisplay(roadmapId);
  }

  updateProgressDisplay(roadmapId) {
    const progressText = document.getElementById(`progress-${roadmapId}`);
    const progressBar = document.getElementById(`progress-bar-${roadmapId}`);
    
    if (progressText && progressBar) {
      const progress = this.getProgress(roadmapId);
      progressText.textContent = `${progress.percentage}%`;
      progressBar.style.width = `${progress.percentage}%`;
    }
  }

  calculateProgress(roadmapId, roadmapData) {
    const roadmapProgress = this.getProgress(roadmapId);
    const totalTopics = roadmapData.sections.reduce((sum, section) => 
      sum + section.topics.length, 0
    );
    
    const completedCount = roadmapProgress.completed.length;
    const percentage = Math.round((completedCount / totalTopics) * 100);
    
    this.progress[roadmapId] = {
      ...roadmapProgress,
      percentage
    };
    
    this.saveProgress();
    return percentage;
  }
}

// Initialize progress manager
if (typeof window !== 'undefined') {
  window.progressManager = new ProgressManager();
}

export default createRoadmapCard;
