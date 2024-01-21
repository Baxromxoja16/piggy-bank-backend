const HttpError = require('./httpError');

describe('HttpError module testing for throwing Error  ', () => {
  it('should throw error with 400 Bad Request', () => {
    expect(() => {
      throw new HttpError('Bad Request', 400);
    }).toThrow();
    throwErr();
    function throwErr() {
      try {
        throw new HttpError('Bad Request', 400);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Bad Request');
        expect(err.statusCode).toBe(400);
      }
    }
  });

  it('should throw error with body', () => {
    throwErr();
    function throwErr() {
      try {
        throw new HttpError('Not found', 404, { reason: 'some reason' });
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Not found');
        expect(err.statusCode).toBe(404);
        expect(err.body).toEqual({ reason: 'some reason' });
      }
    }
  });
});
