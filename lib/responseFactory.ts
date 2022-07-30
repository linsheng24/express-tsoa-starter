interface Response {
  code: number;
  message?: string;
  data?: any;
}
export default (data = null, message = null, code = 200): Response => {
  const response: Response = { code: code };
  if (message) {
    response.message = message;
  }
  if (data) {
    response.data = data;
  }
  return response;
};
