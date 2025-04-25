const LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
  };
  
  // Niveau de journalisation actuel - changez en INFO ou ERROR pour la production
  const CURRENT_LOG_LEVEL = LOG_LEVELS.DEBUG;
  
  export default {
    error: (message, ...args) => {
      if (CURRENT_LOG_LEVEL >= LOG_LEVELS.ERROR) {
        console.error(`[ERROR] ${message}`, ...args);
      }
    },
    
    warn: (message, ...args) => {
      if (CURRENT_LOG_LEVEL >= LOG_LEVELS.WARN) {
        console.warn(`[WARN] ${message}`, ...args);
      }
    },
    
    info: (message, ...args) => {
      if (CURRENT_LOG_LEVEL >= LOG_LEVELS.INFO) {
        console.info(`[INFO] ${message}`, ...args);
      }
    },
    
    debug: (message, ...args) => {
      if (CURRENT_LOG_LEVEL >= LOG_LEVELS.DEBUG) {
        console.log(`[DEBUG] ${message}`, ...args);
      }
    },
    
    logApiRequest: (url, method, data) => {
      if (CURRENT_LOG_LEVEL >= LOG_LEVELS.DEBUG) {
        console.log(`[API REQUEST] ${method} ${url}`, data || '');
      }
    },
    
    logApiResponse: (url, response) => {
      if (CURRENT_LOG_LEVEL >= LOG_LEVELS.DEBUG) {
        console.log(`[API RESPONSE] ${url}`, response);
      }
    }
  };