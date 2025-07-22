// Sistema de Progresso do Usuário
class UserProgressSystem {
    constructor() {
        this.progress = this.loadProgress();
        this.badges = this.initializeBadges();
        this.init();
    }

    loadProgress() {
        const saved = localStorage.getItem('userProgress');
        return saved ? JSON.parse(saved) : {
            roadmaps: {},
            completedTopics: [],
            studyHours: 0,
            badgesEarned: [],
            lastStudyDate: null,
            tasksCompleted: 0,
            questionsAnswered: 0
        };
    }

    saveProgress() {
        localStorage.setItem('userProgress', JSON.stringify(this.progress));
    }

    initializeBadges() {
        return [
            {
                id: 'first_steps',
                title: 'Primeiros Passos',
                desc: 'Complete seu primeiro tópico',
                icon: '🚀',
                condition: () => this.progress.completedTopics.length >= 1
            },
            {
                id: 'dedicated_learner',
                title: 'Estudante Dedicado',
                desc: 'Complete 10 tópicos',
                icon: '📚',
                condition: () => this.progress.completedTopics.length >= 10
            },
            {
                id: 'roadmap_explorer',
                title: 'Explorador de Trilhas',
                desc: 'Inicie 3 roadmaps diferentes',
                icon: '🗺️',
                condition: () => Object.keys(this.progress.roadmaps).length >= 3
            },
            {
                id: 'section_master',
                title: 'Mestre de Seção',
                desc: 'Complete uma seção inteira',
                icon: '✅',
                condition: () => this.hasCompletedSection()
            },
            {
                id: 'quiz_master',
                title: 'Mestre dos Quizzes',
                desc: 'Responda 50 questões corretamente',
                icon: '🧠',
                condition: () => this.progress.questionsAnswered >= 50
            },
            {
                id: 'task_warrior',
                title: 'Guerreiro das Tarefas',
                desc: 'Complete 25 tarefas IA',
                icon: '⚡',
                condition: () => this.progress.tasksCompleted >= 25
            },
            {
                id: 'hour_warrior',
                title: 'Guerreiro das Horas',
                desc: 'Acumule 50 horas de estudo',
                icon: '⏰',
                condition: () => this.progress.studyHours >= 50
            },
            {
                id: 'data_specialist',
                title: 'Especialista em Dados',
                desc: 'Complete roadmap de Data Analyst',
                icon: '📊',
                condition: () => this.isRoadmapCompleted('data-analyst')
            },
            {
                id: 'bi_expert',
                title: 'Expert em BI',
                desc: 'Complete roadmap de BI Analyst',
                icon: '📈',
                condition: () => this.isRoadmapCompleted('bi-analyst')
            },
            {
                id: 'data_scientist',
                title: 'Cientista de Dados',
                desc: 'Complete roadmap de Data Scientist',
                icon: '🧠',
                condition: () => this.isRoadmapCompleted('data-scientist')
            },
            {
                id: 'perfectionist',
                title: 'Perfeccionista',
                desc: 'Complete 2 roadmaps inteiros',
                icon: '💎',
                condition: () => {
                    const completed = Object.keys(this.progress.roadmaps).filter(id => 
                        this.isRoadmapCompleted(id)
                    );
                    return completed.length >= 2;
                }
            },
            {
                id: 'legend',
                title: 'Lenda Tech',
                desc: 'Complete todos os roadmaps disponíveis',
                icon: '👑',
                condition: () => {
                    if (!window.roadmaps) return false;
                    const availableRoadmaps = window.roadmaps.length;
                    const completedRoadmaps = Object.keys(this.progress.roadmaps).filter(id => 
                        this.isRoadmapCompleted(id)
                    ).length;
                    return availableRoadmaps > 0 && completedRoadmaps === availableRoadmaps;
                }
            },
            // NOVOS BADGES MOTIVACIONAIS
            {
                id: 'speed_learner',
                title: 'Aprendiz Veloz',
                desc: 'Complete 5 tópicos em um dia',
                icon: '⚡',
                condition: () => this.checkDailyTopics(5)
            },
            {
                id: 'consistency_king',
                title: 'Rei da Consistência',
                desc: 'Estude por 7 dias consecutivos',
                icon: '🔥',
                condition: () => this.checkConsecutiveDays(7)
            },
            {
                id: 'quiz_champion',
                title: 'Campeão dos Quizzes',
                desc: 'Acerte 10 questões seguidas',
                icon: '🏆',
                condition: () => this.progress.correctStreak >= 10
            },
            {
                id: 'morning_warrior',
                title: 'Guerreiro Matinal',
                desc: 'Estude antes das 9h por 5 dias',
                icon: '🌅',
                condition: () => this.checkMorningStudy(5)
            },
            {
                id: 'night_owl',
                title: 'Coruja Noturna',
                desc: 'Estude depois das 22h por 5 dias',
                icon: '🦉',
                condition: () => this.checkNightStudy(5)
            },
            {
                id: 'resource_explorer',
                title: 'Explorador de Recursos',
                desc: 'Analise 20 recursos com IA',
                icon: '🔍',
                condition: () => this.progress.resourcesAnalyzed >= 20
            },
            {
                id: 'mentor_seeker',
                title: 'Buscador de Mentoria',
                desc: 'Faça 15 perguntas ao Mentor IA',
                icon: '🎓',
                condition: () => this.progress.mentorQuestions >= 15
            },
            {
                id: 'task_master',
                title: 'Mestre das Tarefas',
                desc: 'Complete 50 tarefas IA',
                icon: '💪',
                condition: () => this.progress.tasksCompleted >= 50
            },
            {
                id: 'hardcore_learner',
                title: 'Aprendiz Hardcore',
                desc: 'Acumule 100 horas de estudo',
                icon: '💀',
                condition: () => this.progress.studyHours >= 100
            },
            {
                id: 'elite_student',
                title: 'Estudante Elite',
                desc: 'Complete 100 tópicos',
                icon: '⭐',
                condition: () => this.progress.completedTopics.length >= 100
            },
            {
                id: 'difficulty_master',
                title: 'Mestre das Dificuldades',
                desc: 'Complete tarefas em todos os níveis',
                icon: '🎯',
                condition: () => this.checkAllDifficultiesCompleted()
            },
            {
                id: 'comeback_king',
                title: 'Rei do Retorno',
                desc: 'Volte a estudar após 7 dias parado',
                icon: '🔄',
                condition: () => this.checkComebackAfterBreak(7)
            },
            {
                id: 'weekend_warrior',
                title: 'Guerreiro de Fim de Semana',
                desc: 'Estude em 4 fins de semana seguidos',
                icon: '🏋️',
                condition: () => this.checkWeekendStudy(4)
            },
            {
                id: 'big_tech_dreamer',
                title: 'Sonhador Big Tech',
                desc: 'Complete 50% de qualquer roadmap',
                icon: '🌟',
                condition: () => this.checkRoadmapHalfway()
            },
            {
                id: 'certification_hunter',
                title: 'Caçador de Certificação',
                desc: 'Complete um roadmap completo',
                icon: '🏅',
                condition: () => {
                    const completed = Object.keys(this.progress.roadmaps).filter(id => 
                        this.isRoadmapCompleted(id)
                    );
                    return completed.length >= 1;
                }
            }
        ];
    }

    hasCompletedSection() {
        for (const roadmapId in this.progress.roadmaps) {
            const roadmap = this.progress.roadmaps[roadmapId];
            for (const sectionId in roadmap.sections || {}) {
                const section = roadmap.sections[sectionId];
                if (section.completed) return true;
            }
        }
        return false;
    }

    isRoadmapCompleted(roadmapId) {
        const roadmap = this.progress.roadmaps[roadmapId];
        if (!roadmap || !window.roadmaps) return false;
        
        const roadmapData = window.roadmaps.find(r => r.id === roadmapId);
        if (!roadmapData || !roadmapData.sections) return false;

        // Verifica se todas as seções estão completas
        const totalSections = roadmapData.sections.length;
        const completedSections = roadmapData.sections.filter(section => {
            return roadmap.sections && roadmap.sections[section.id] && roadmap.sections[section.id].completed;
        }).length;
        
        return totalSections > 0 && completedSections === totalSections;
    }

    init() {
        this.updateDashboard();
        this.checkNewBadges();
    }

    updateDashboard() {
        this.updateOverallStats();
        this.updateRoadmapProgress();
        this.updateBadges();
    }

    updateOverallStats() {
        const totalTopics = this.progress.completedTopics.length;
        const studyHours = this.progress.studyHours;
        const badgesCount = this.progress.badgesEarned.length;

        // Calcular progresso geral baseado nos roadmaps
        let totalProgress = 0;
        const roadmapCount = Object.keys(this.progress.roadmaps).length;
        
        if (roadmapCount > 0) {
            for (const roadmapId in this.progress.roadmaps) {
                const roadmap = this.progress.roadmaps[roadmapId];
                const sections = roadmap.sections || {};
                const totalSections = Object.keys(sections).length;
                const completedSections = Object.values(sections).filter(s => s.completed).length;
                totalProgress += totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
            }
            totalProgress = Math.round(totalProgress / roadmapCount);
        }

        // Atualizar elementos do DOM se existirem
        const totalProgressEl = document.getElementById('totalProgress');
        const completedTopicsEl = document.getElementById('completedTopics');
        const studyHoursEl = document.getElementById('studyHours');
        const badgesEarnedEl = document.getElementById('badgesEarned');

        if (totalProgressEl) totalProgressEl.textContent = `${totalProgress}%`;
        if (completedTopicsEl) completedTopicsEl.textContent = totalTopics;
        if (studyHoursEl) studyHoursEl.textContent = `${studyHours}h`;
        if (badgesEarnedEl) badgesEarnedEl.textContent = badgesCount;
    }

    updateRoadmapProgress() {
        const container = document.getElementById('roadmapProgress');
        if (!container) return;
        
        if (Object.keys(this.progress.roadmaps).length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📊</div>
                    <p>Comece estudando um roadmap para ver seu progresso aqui!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        
        for (const roadmapId in this.progress.roadmaps) {
            const roadmap = this.progress.roadmaps[roadmapId];
            const roadmapData = window.roadmaps?.find(r => r.id === roadmapId);
            
            if (!roadmapData) continue;

            const sections = roadmap.sections || {};
            const totalSections = roadmapData.sections?.length || 0;
            const completedSections = Object.values(sections).filter(s => s.completed).length;
            const percentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;

            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item';
            progressItem.innerHTML = `
                <div class="progress-header">
                    <div class="progress-title">${roadmapData.title}</div>
                    <div class="progress-percentage">${percentage}%</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-details">
                    <span>${completedSections}/${totalSections} seções concluídas</span>
                    <span>${roadmapData.estimatedHours || 0}h estimadas</span>
                </div>
            `;
            
            progressItem.addEventListener('click', () => {
                window.location.href = `roadmap.html?id=${roadmapId}`;
            });
            
            container.appendChild(progressItem);
        }
    }

    updateBadges() {
        const container = document.getElementById('badgesContainer');
        if (!container) return;

        container.innerHTML = '';

        this.badges.forEach(badge => {
            const isEarned = this.progress.badgesEarned.includes(badge.id);
            const badgeElement = document.createElement('div');
            badgeElement.className = `badge ${isEarned ? 'earned' : ''}`;
            badgeElement.innerHTML = `
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-title">${badge.title}</div>
                <div class="badge-desc">${badge.desc}</div>
            `;
            container.appendChild(badgeElement);
        });
    }

    checkNewBadges() {
        const newBadges = [];
        
        this.badges.forEach(badge => {
            if (!this.progress.badgesEarned.includes(badge.id) && badge.condition()) {
                this.progress.badgesEarned.push(badge.id);
                newBadges.push(badge);
            }
        });

        if (newBadges.length > 0) {
            this.saveProgress();
            
            // Mostrar notificação de nova conquista
            newBadges.forEach((badge, index) => {
                setTimeout(() => {
                    this.showAchievementNotification(badge);
                }, index * 2000);
            });
        }
    }

    showAchievementNotification(badge) {
        // Criar notificação temporária
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
            color: #333;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            max-width: 300px;
            animation: slideIn 0.5s ease;
            cursor: pointer;
        `;
        
        notification.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 8px;">${badge.icon} Nova Conquista!</div>
            <div style="font-weight: 600; margin-bottom: 4px;">${badge.title}</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">${badge.desc}</div>
        `;

        // Adicionar estilo de animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remover após 5 segundos ou ao clicar
        const remove = () => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        };

        notification.addEventListener('click', remove);
        setTimeout(remove, 5000);
    }

    // Métodos públicos para serem chamados por outras páginas
    completeTask(roadmapId, sectionId, topicId) {
        if (!this.progress.roadmaps[roadmapId]) {
            this.progress.roadmaps[roadmapId] = { sections: {} };
        }
        
        if (!this.progress.roadmaps[roadmapId].sections[sectionId]) {
            this.progress.roadmaps[roadmapId].sections[sectionId] = { topics: {}, completed: false };
        }

        this.progress.roadmaps[roadmapId].sections[sectionId].topics[topicId] = true;
        
        const topicKey = `${roadmapId}_${sectionId}_${topicId}`;
        if (!this.progress.completedTopics.includes(topicKey)) {
            this.progress.completedTopics.push(topicKey);
        }

        // Verificar se a seção foi completada
        this.checkSectionCompletion(roadmapId, sectionId);
        
        this.saveProgress();
        this.checkNewBadges();
    }

    checkSectionCompletion(roadmapId, sectionId) {
        const roadmapData = window.roadmaps?.find(r => r.id === roadmapId);
        if (!roadmapData) return;

        const section = roadmapData.sections?.find(s => s.id === sectionId);
        if (!section) return;

        const completedTopics = this.progress.roadmaps[roadmapId].sections[sectionId].topics;
        const totalTopics = section.topics?.length || 0;
        const completedCount = Object.values(completedTopics).filter(Boolean).length;

        if (completedCount === totalTopics && totalTopics > 0) {
            this.progress.roadmaps[roadmapId].sections[sectionId].completed = true;
        }
    }

    addStudyHours(hours) {
        this.progress.studyHours += hours;
        this.progress.lastStudyDate = new Date().toISOString();
        this.saveProgress();
        this.checkNewBadges();
    }

    addTaskCompletion() {
        this.progress.tasksCompleted += 1;
        this.saveProgress();
        this.checkNewBadges();
    }

    addQuestionAnswered() {
        this.progress.questionsAnswered += 1;
        this.saveProgress();
        this.checkNewBadges();
    }

    // NOVAS FUNÇÕES AUXILIARES PARA BADGES AVANÇADOS
    checkDailyTopics(required) {
        const today = new Date().toDateString();
        const todayTopics = this.progress.dailyTopics || {};
        return (todayTopics[today] || 0) >= required;
    }

    checkConsecutiveDays(required) {
        const studyDates = this.progress.studyDates || [];
        if (studyDates.length < required) return false;
        
        const sortedDates = studyDates.sort((a, b) => new Date(b) - new Date(a));
        let consecutive = 1;
        
        for (let i = 1; i < sortedDates.length && consecutive < required; i++) {
            const current = new Date(sortedDates[i-1]);
            const previous = new Date(sortedDates[i]);
            const diffDays = Math.floor((current - previous) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                consecutive++;
            } else {
                break;
            }
        }
        
        return consecutive >= required;
    }

    checkMorningStudy(required) {
        const morningStudy = this.progress.morningStudyDays || [];
        return morningStudy.length >= required;
    }

    checkNightStudy(required) {
        const nightStudy = this.progress.nightStudyDays || [];
        return nightStudy.length >= required;
    }

    checkAllDifficultiesCompleted() {
        const difficulties = this.progress.completedDifficulties || {};
        return difficulties.easy && difficulties.medium && difficulties.hard;
    }

    checkComebackAfterBreak(days) {
        const lastStudy = this.progress.lastStudyDate;
        if (!lastStudy) return false;
        
        const daysSinceLastStudy = Math.floor((new Date() - new Date(lastStudy)) / (1000 * 60 * 60 * 24));
        return daysSinceLastStudy >= days && this.progress.hasComeback;
    }

    checkWeekendStudy(required) {
        const weekendStudy = this.progress.weekendStudyDays || [];
        return weekendStudy.length >= required;
    }

    checkRoadmapHalfway() {
        for (const roadmapId in this.progress.roadmaps) {
            const roadmap = this.progress.roadmaps[roadmapId];
            const sections = roadmap.sections || {};
            const totalSections = Object.keys(sections).length;
            const completedSections = Object.values(sections).filter(s => s.completed).length;
            
            if (totalSections > 0 && (completedSections / totalSections) >= 0.5) {
                return true;
            }
        }
        return false;
    }

    // ATUALIZAR PROGRESSO COM NOVOS CAMPOS
    initializeNewProgressFields() {
        if (!this.progress.dailyTopics) this.progress.dailyTopics = {};
        if (!this.progress.studyDates) this.progress.studyDates = [];
        if (!this.progress.morningStudyDays) this.progress.morningStudyDays = [];
        if (!this.progress.nightStudyDays) this.progress.nightStudyDays = [];
        if (!this.progress.completedDifficulties) this.progress.completedDifficulties = {};
        if (!this.progress.weekendStudyDays) this.progress.weekendStudyDays = [];
        if (!this.progress.correctStreak) this.progress.correctStreak = 0;
        if (!this.progress.resourcesAnalyzed) this.progress.resourcesAnalyzed = 0;
        if (!this.progress.mentorQuestions) this.progress.mentorQuestions = 0;
        if (!this.progress.hasComeback) this.progress.hasComeback = false;
    }

    // REGISTRAR ATIVIDADE DE ESTUDO
    recordStudyActivity() {
        const now = new Date();
        const today = now.toDateString();
        const hour = now.getHours();
        
        // Registrar data de estudo
        if (!this.progress.studyDates.includes(today)) {
            this.progress.studyDates.push(today);
        }
        
        // Registrar estudo matinal (antes das 9h)
        if (hour < 9 && !this.progress.morningStudyDays.includes(today)) {
            this.progress.morningStudyDays.push(today);
        }
        
        // Registrar estudo noturno (após 22h)
        if (hour >= 22 && !this.progress.nightStudyDays.includes(today)) {
            this.progress.nightStudyDays.push(today);
        }
        
        // Registrar estudo de fim de semana
        const dayOfWeek = now.getDay();
        if ((dayOfWeek === 0 || dayOfWeek === 6) && !this.progress.weekendStudyDays.includes(today)) {
            this.progress.weekendStudyDays.push(today);
        }
        
        // Incrementar tópicos do dia
        if (!this.progress.dailyTopics[today]) {
            this.progress.dailyTopics[today] = 0;
        }
        this.progress.dailyTopics[today]++;
        
        // Detectar retorno após pausa
        if (this.progress.lastStudyDate) {
            const daysSinceLastStudy = Math.floor((now - new Date(this.progress.lastStudyDate)) / (1000 * 60 * 60 * 24));
            if (daysSinceLastStudy >= 7) {
                this.progress.hasComeback = true;
            }
        }
        
        this.progress.lastStudyDate = now.toISOString();
        this.saveProgress();
    }

    isTopicCompleted(roadmapId, sectionId, topicId) {
        return this.progress.roadmaps[roadmapId]?.sections[sectionId]?.topics[topicId] || false;
    }

    isSectionCompleted(roadmapId, sectionId) {
        return this.progress.roadmaps[roadmapId]?.sections[sectionId]?.completed || false;
    }
}

// Inicializar sistema quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema global
    if (!window.userProgressSystem) {
        window.userProgressSystem = new UserProgressSystem();
    }

    // Tornar funções disponíveis globalmente
    window.completeTask = (roadmapId, sectionId, topicId) => {
        window.userProgressSystem.completeTask(roadmapId, sectionId, topicId);
    };

    window.addStudyHours = (hours) => {
        window.userProgressSystem.addStudyHours(hours);
    };

    window.addTaskCompletion = () => {
        window.userProgressSystem.addTaskCompletion();
    };

    window.addQuestionAnswered = () => {
        window.userProgressSystem.addQuestionAnswered();
    };

    window.isTopicCompleted = (roadmapId, sectionId, topicId) => {
        return window.userProgressSystem.isTopicCompleted(roadmapId, sectionId, topicId);
    };

    window.isSectionCompleted = (roadmapId, sectionId) => {
        return window.userProgressSystem.isSectionCompleted(roadmapId, sectionId);
    };
});

// Exportar para uso em módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserProgressSystem;
}
