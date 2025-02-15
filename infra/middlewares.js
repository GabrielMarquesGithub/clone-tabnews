import { InternalServerError, MethodNotAllowedError } from "infra/errors";

function onNoMatchHandler(_, response) {
  const methodNotAllowedError = new MethodNotAllowedError();
  console.error(methodNotAllowedError);
  response.status(405).json(methodNotAllowedError);
}

function onErrorHandler(error, _, response) {
  const internalServerError = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });
  console.error(internalServerError);
  response.status(internalServerError.statusCode).json(internalServerError);
}

export const errorMiddleware = {
  onError: onErrorHandler,
  onNoMatch: onNoMatchHandler,
};
