import { APIError, APIErrorOptions } from './APIError.class';

export class Error404 extends APIError {
  code: number = 404;

  constructor(options: APIErrorOptions) {
    super({ ...options, message: options.message || 'Not Found' });
  }
}
