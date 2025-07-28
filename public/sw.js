// Service Worker para Roadmap Tech PWA
const CACHE_NAME = 'roadmap-tech-v1.2.0';
const STATIC_CACHE = 'roadmap-tech-static-v1.2.0';
const DYNAMIC_CACHE = 'roadmap-tech-dynamic-v1.2.0';

// Assets estáticos para cache inicial
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/roadmaps.html',
  '/dashboard.html', 
  '/tech-tracks.html',
  '/tech-track.html',
  '/data/roadmaps.js',
  '/js/progress-system.js',
  '/js/spa-router.js',
  '/js/tech-tracks.js',
  '/manifest.json',
  // Fallbacks
  '/offline.html'
];

// URLs dinâmicas que devem ser cacheadas
const DYNAMIC_URLS = [
  '/',
  '/data/',
  '/js/'
];

// Assets que nunca devem ser cacheados
const EXCLUDE_URLS = [
  '/admin',
  '/api/analytics',
  'chrome-extension://'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('🚀 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 Service Worker: Fazendo cache dos assets estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Cache inicial completo');
        // Força o SW a se tornar ativo imediatamente
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker: Erro no cache inicial:', error);
      })
  );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        // Remove caches antigos
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Ativado e assumindo controle');
        // Assume controle de todas as abas
        return self.clients.claim();
      })
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições que não devem ser cacheadas
  if (EXCLUDE_URLS.some(excludeUrl => url.href.includes(excludeUrl))) {
    return;
  }
  
  // Estratégia: Cache First para assets estáticos
  if (STATIC_ASSETS.some(asset => url.pathname.includes(asset))) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Estratégia: Network First para páginas dinâmicas
  if (url.origin === location.origin) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Estratégia: Stale While Revalidate para recursos externos
  event.respondWith(staleWhileRevalidate(request));
});

// Estratégia Cache First - Prioriza cache, fallback para network
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // Cacheia resposta se for bem-sucedida
    if (networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache First falhou:', error);
    
    // Fallback para página offline se for navegação
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Estratégia Network First - Prioriza network, fallback para cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cacheia resposta se for bem-sucedida
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network First: Tentando cache para:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para página offline se for navegação
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Estratégia Stale While Revalidate - Serve cache e atualiza em background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Busca versão atualizada em background
  const networkPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => cachedResponse);
  
  // Retorna cache imediatamente se disponível, senão espera network
  return cachedResponse || networkPromise;
}

// Escutar mensagens do cliente
self.addEventListener('message', event => {
  const { data } = event;
  
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME
    });
  }
  
  if (data.type === 'CLEAN_CACHE') {
    cleanOldCaches();
  }
});

// Limpar caches antigos
async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => {
      if (cacheName !== STATIC_CACHE && 
          cacheName !== DYNAMIC_CACHE && 
          cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    })
  );
  console.log('🧹 Service Worker: Caches antigos limpos');
}

// Sincronização em background (quando conexão volta)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('🔄 Service Worker: Sincronização em background');
  // Aqui podemos sincronizar dados quando conexão voltar
  try {
    // Implementar lógica de sincronização se necessário
    console.log('✅ Service Worker: Sincronização completa');
  } catch (error) {
    console.error('❌ Service Worker: Erro na sincronização:', error);
  }
}

// Notificações push (se implementadas no futuro)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/assets/icon-192x192.png',
        badge: '/assets/badge-72x72.png',
        data: data.url
      })
    );
  }
});

// Clique em notificações
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});

console.log('🚀 Service Worker: Carregado e pronto!');
