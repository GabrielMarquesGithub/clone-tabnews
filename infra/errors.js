class ApiError extends Error {
  constructor({ name, message, action, statusCode, cause }) {
    super(message, { cause });
    this.name = name;
    this.action = action;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class InternalServerError extends ApiError {
  constructor({ statusCode, cause }) {
    super({
      name: "InternalServerError",
      message: "Erro interno do servidor.",
      action: "Entre em contato com o suporte.",
      statusCode: statusCode ?? 500,
      cause,
    });
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor() {
    super({
      name: "MethodNotAllowedError",
      message: "Método não permitido para este endpoint.",
      action: "Verifique se o método HTTP está correto.",
      statusCode: 405,
    });
  }
}

export class ServiceError extends ApiError {
  constructor({ cause, message }) {
    super({
      name: "ServiceError",
      message: message ?? "Serviço indisponível no momento.",
      action: "Verifique se o serviço está disponível.",
      statusCode: 503,
      cause,
    });
  }
}
