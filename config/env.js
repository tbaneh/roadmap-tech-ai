// Configuração segura de variáveis de ambiente
// Este arquivo lida com variáveis de ambiente tanto em desenvolvimento quanto em produção

class EnvironmentConfig {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    // Para ambientes diferentes (Node.js vs Browser)
    if (typeof process !== 'undefined' && process.env) {
      // Ambiente Node.js (build time ou server-side)
      return {
        geminiApiKey: process.env.geminiApiKey || process.env.GEMINI_API_KEY,
        environment: process.env.NODE_ENV || 'development',
        isDevelopment: process.env.NODE_ENV !== 'production'
      };
    } else if (typeof window !== 'undefined') {
      // Ambiente browser - variáveis devem ser injetadas durante o build
      return {
        geminiApiKey: window.GEMINI_API_KEY || null,
        environment: window.NODE_ENV || 'development',
        isDevelopment: window.NODE_ENV !== 'production'
      };
    } else {
      // Fallback para desenvolvimento local
      return {
        geminiApiKey: null,
        environment: 'development',
        isDevelopment: true
      };
    }
  }

  getGeminiApiKey() {
    const apiKey = this.config.geminiApiKey;
    
    if (!apiKey && !this.config.isDevelopment) {
      console.error('🚨 ERRO: Variável de ambiente geminiApiKey não configurada em produção!');
      throw new Error('API Key não configurada. Configure a variável de ambiente geminiApiKey.');
    }
    
    if (!apiKey && this.config.isDevelopment) {
      console.warn('⚠️ AVISO: Usando fallback da API Key para desenvolvimento local');
      return 'AIzaSyDXFW0fdQRnFMC7jIAtHIqJFREF6sp7nMc'; // Fallback apenas para desenvolvimento
    }
    
    return apiKey;
  }

  isProduction() {
    return !this.config.isDevelopment;
  }

  logConfiguration() {
    console.log('🔧 Configuração do ambiente:');
    console.log('📍 Ambiente:', this.config.environment);
    console.log('🔐 API Key:', this.config.geminiApiKey ? 'Configurada' : 'Usando fallback');
    console.log('🚀 Produção:', this.isProduction() ? 'Sim' : 'Não');
  }
}

// Exportar instância singleton
const envConfig = new EnvironmentConfig();

// Para uso em módulos ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = envConfig;
}

// Para uso global no browser
if (typeof window !== 'undefined') {
  window.EnvironmentConfig = envConfig;
}
