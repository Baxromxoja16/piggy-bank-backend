export class HttpError extends Error {
  public statusCode: number;

  public body?: { [key: string]: unknown };

  constructor(message: string, statusCode: number, body?: { [key: string]: unknown }) {
    super(message);
    this.statusCode = statusCode;
    this.body = body;
  }

  toString() {
    return this.message;
  }
}
