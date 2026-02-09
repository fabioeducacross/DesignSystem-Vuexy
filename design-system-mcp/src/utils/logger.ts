/**
 * Structured Logger
 * 
 * Sistema de logging estruturado para debugging do MCP server
 */

/**
 * Níveis de log disponíveis
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4
}

/**
 * Mapeamento de string para LogLevel
 */
const LOG_LEVEL_MAP: Record<string, LogLevel> = {
  'debug': LogLevel.DEBUG,
  'info': LogLevel.INFO,
  'warn': LogLevel.WARN,
  'error': LogLevel.ERROR,
  'silent': LogLevel.SILENT
};

/**
 * Configuração do logger
 */
export interface LoggerConfig {
  /** Nível mínimo de log */
  level: LogLevel;
  
  /** Prefix para todas as mensagens */
  prefix?: string;
  
  /** Output colorido? (desabilitar para stdio transport) */
  colors?: boolean;
  
  /** Incluir timestamp? */
  timestamp?: boolean;
  
  /** Output em JSON? */
  json?: boolean;
}

/**
 * Entrada de log estruturada
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
  error?: Error;
}

/**
 * Logger estruturado
 */
export class Logger {
  private config: LoggerConfig;
  
  constructor(config: Partial<LoggerConfig> = {}) {
    const envLevel = process.env.LOG_LEVEL?.toLowerCase();
    const level = envLevel && envLevel in LOG_LEVEL_MAP 
      ? LOG_LEVEL_MAP[envLevel]
      : LogLevel.INFO;
    
    this.config = {
      level,
      prefix: config.prefix || '[MCP]',
      colors: config.colors ?? false, // Disabled by default for stdio
      timestamp: config.timestamp ?? true,
      json: config.json ?? false
    };
  }
  
  /**
   * Log debug (desenvolvimento)
   */
  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }
  
  /**
   * Log info (operações normais)
   */
  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }
  
  /**
   * Log warning (atenção necessária)
   */
  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }
  
  /**
   * Log error (erro crítico)
   */
  error(message: string, error?: Error | unknown): void {
    const errorObj = error instanceof Error ? error : undefined;
    this.log(LogLevel.ERROR, message, undefined, errorObj);
  }
  
  /**
   * Log interno
   */
  private log(level: LogLevel, message: string, data?: unknown, error?: Error): void {
    if (level < this.config.level) return;
    
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      data,
      error
    };
    
    if (this.config.json) {
      this.outputJSON(entry);
    } else {
      this.outputText(entry);
    }
  }
  
  /**
   * Output em formato JSON
   */
  private outputJSON(entry: LogEntry): void {
    const obj: Record<string, unknown> = {
      level: LogLevel[entry.level],
      message: entry.message,
      timestamp: entry.timestamp.toISOString()
    };
    
    if (entry.data !== undefined) {
      obj.data = entry.data;
    }
    
    if (entry.error) {
      obj.error = {
        message: entry.error.message,
        stack: entry.error.stack
      };
    }
    
    // CRITICAL: Use stderr para logs, stdout é reservado para MCP protocol
    console.error(JSON.stringify(obj));
  }
  
  /**
   * Output em formato texto
   */
  private outputText(entry: LogEntry): void {
    const parts: string[] = [];
    
    // Timestamp
    if (this.config.timestamp) {
      const time = entry.timestamp.toISOString().substr(11, 8);
      parts.push(`[${time}]`);
    }
    
    // Level
    const levelStr = this.getLevelString(entry.level);
    parts.push(levelStr);
    
    // Prefix
    if (this.config.prefix) {
      parts.push(this.config.prefix);
    }
    
    // Message
    parts.push(entry.message);
    
    let output = parts.join(' ');
    
    // Data
    if (entry.data !== undefined) {
      output += '\n' + JSON.stringify(entry.data, null, 2);
    }
    
    // Error
    if (entry.error) {
      output += '\n' + entry.error.stack;
    }
    
    // CRITICAL: Use stderr, não stdout (MCP protocol)
    console.error(output);
  }
  
  /**
   * Formata string de level
   */
  private getLevelString(level: LogLevel): string {
    const labels = {
      [LogLevel.DEBUG]: 'DEBUG',
      [LogLevel.INFO]: 'INFO ',
      [LogLevel.WARN]: 'WARN ',
      [LogLevel.ERROR]: 'ERROR'
    };
    
    return `[${labels[level] || 'UNKNOWN'}]`;
  }
  
  /**
   * Cria child logger com prefix adicional
   */
  child(prefix: string): Logger {
    return new Logger({
      ...this.config,
      prefix: `${this.config.prefix} ${prefix}`
    });
  }
  
  /**
   * Altera nível de log em runtime
   */
  setLevel(level: LogLevel): void {
    this.config.level = level;
  }
}

/**
 * Logger global singleton
 */
export const logger = new Logger();

/**
 * Helper para medir tempo de operação
 */
export class Timer {
  private startTime: number;
  private label: string;
  
  constructor(label: string) {
    this.label = label;
    this.startTime = Date.now();
  }
  
  /**
   * Finaliza timer e loga resultado
   */
  end(): number {
    const duration = Date.now() - this.startTime;
    logger.debug(`${this.label} took ${duration}ms`);
    return duration;
  }
}

/**
 * Cria timer para medir performance
 */
export function startTimer(label: string): Timer {
  return new Timer(label);
}
