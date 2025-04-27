export function errorResponse(
  status: number,
  code: string,
  message: string = "Ocurrió un error. Contacte con el administrador de Verso."
) {
  return { status, code, message: `${message} [${code}]` };
}
